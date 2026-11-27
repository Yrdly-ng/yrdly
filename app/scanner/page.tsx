"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import jsQR from "jsqr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Loader2, ScanLine, Clock, User, Calendar, Camera, Keyboard } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function ScannerPage() {
  const [ticketId, setTicketId] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [useCameraScanning, setUseCameraScanning] = useState(true)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const scanningRef = useRef(false)

  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error('[scanner] Camera access denied:', error)
      toast.error('Camera access denied. Please enable camera permissions.')
      setUseCameraScanning(false)
    }
  }

  // Stop camera
  const stopCamera = () => {
    scanningRef.current = false
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
    }
  }

  // QR scan loop — runs every animation frame while camera is active
  const scanQRCode = useCallback(() => {
    if (!scanningRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanQRCode)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    })

    if (code?.data) {
      const decoded = code.data.trim().toUpperCase()
      setTicketId(decoded)
      // Auto-submit — use a direct fetch so we don't need to wait for state to flush
      autoSubmitScan(decoded)
      return // stop loop until result is processed
    }

    requestAnimationFrame(scanQRCode)
  }, [adminPassword])

  // Auto-submit on QR decode (avoids stale state in handleScan)
  const autoSubmitScan = async (id: string) => {
    if (!id) return
    setIsLoading(true)
    setResult(null)
    try {
      const response = await fetch('/api/events/scan-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword}`,
        },
        body: JSON.stringify({ ticketId: id }),
      })
      const data = await response.json()
      setResult(data)
      if (data.success) {
        toast.success('Ticket Validated!')
        setTicketId('')
        // Resume scanning after a brief pause so the operator can read the result
        setTimeout(() => { if (scanningRef.current) requestAnimationFrame(scanQRCode) }, 2500)
      } else {
        toast.error(data.message || 'Invalid Ticket')
        setTicketId('')
        setTimeout(() => { if (scanningRef.current) requestAnimationFrame(scanQRCode) }, 2000)
      }
    } catch {
      toast.error('Network error during scan.')
      setTimeout(() => { if (scanningRef.current) requestAnimationFrame(scanQRCode) }, 1500)
    } finally {
      setIsLoading(false)
    }
  }

  // Start scan loop once camera is active
  useEffect(() => {
    if (isLoggedIn && useCameraScanning) {
      startCamera()
    } else {
      stopCamera()
    }
    return () => stopCamera()
  }, [isLoggedIn, useCameraScanning])

  useEffect(() => {
    if (isCameraActive) {
      scanningRef.current = true
      requestAnimationFrame(scanQRCode)
    } else {
      scanningRef.current = false
    }
  }, [isCameraActive, scanQRCode])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword) {
      setIsLoggedIn(true)
      toast.success("Logged in as Admin")
    } else {
      toast.error("Please enter the admin password")
    }
  }

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!ticketId) {
      toast.error("Please enter a ticket ID")
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/events/scan-v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminPassword}`,
        },
        body: JSON.stringify({ ticketId }),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        toast.success("Ticket Validated!")
        setTicketId("") // Clear for next scan
      } else {
        toast.error(data.message || "Invalid Ticket")
      }
    } catch (error) {
      console.error("[v0] Scan error:", error)
      toast.error("An error occurred during scanning.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/yrdly-logo.png"
              alt="YRDLY Logo"
              width={100}
              height={70}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Event Scanner</h1>
          <p className="text-gray-600 mt-2">Admin Ticket Verification Tool</p>
        </div>

        {!isLoggedIn ? (
          <Card className="shadow-lg border-2 border-green-100">
            <CardHeader className="bg-white">
              <CardTitle className="text-green-700">Admin Login</CardTitle>
              <CardDescription>
                Please enter the event admin password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    name="adminPassword"
                    autoComplete="current-password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="h-12"
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-green-600 hover:bg-green-700 font-semibold"
                >
                  Access Scanner
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-2 border-green-100">
            <CardHeader className="bg-white">
              <CardTitle className="flex items-center text-green-700">
                <ScanLine className="mr-2 h-5 w-5" />
                Scan Ticket
              </CardTitle>
              <CardDescription>
                {useCameraScanning ? "Point camera at QR code" : "Enter the unique ticket ID"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {useCameraScanning && (
                <>
                  <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden mb-4 border-2 border-green-200">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    {isCameraActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        {/* Corner brackets */}
                        <div className="relative w-48 h-48">
                          <span className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400 rounded-tl" />
                          <span className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400 rounded-tr" />
                          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400 rounded-bl" />
                          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400 rounded-br" />
                          {/* Animated scan line */}
                          <div
                            className="absolute left-1 right-1 h-0.5 bg-green-400 opacity-80"
                            style={{ animation: 'scanline 1.8s ease-in-out infinite' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <style>{`
                    @keyframes scanline {
                      0%   { top: 4px; }
                      50%  { top: calc(100% - 4px); }
                      100% { top: 4px; }
                    }
                  `}</style>
                  <p className="text-xs text-center text-gray-500 mb-4">
                    {isLoading ? 'Validating...' : isCameraActive ? 'Scanning for QR code...' : 'Initializing camera...'}
                  </p>
                </>
              )}

              <form onSubmit={handleScan} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder={useCameraScanning ? "Will auto-scan QR code" : "e.g. A1B2C3D4"}
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                    className="text-center text-2xl font-bold tracking-widest h-16 uppercase"
                    disabled={isLoading || useCameraScanning}
                    autoFocus={!useCameraScanning}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold"
                  disabled={isLoading || (useCameraScanning && !ticketId)}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Verify Ticket"
                  )}
                </Button>
                
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant={useCameraScanning ? "default" : "outline"}
                    className={`flex-1 flex items-center justify-center gap-2 ${useCameraScanning ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => {
                      setUseCameraScanning(true)
                      setTicketId("")
                    }}
                  >
                    <Camera className="h-4 w-4" />
                    Camera
                  </Button>
                  <Button
                    type="button"
                    variant={!useCameraScanning ? "default" : "outline"}
                    className={`flex-1 flex items-center justify-center gap-2 ${!useCameraScanning ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => {
                      setUseCameraScanning(false)
                      stopCamera()
                      setTicketId("")
                    }}
                  >
                    <Keyboard className="h-4 w-4" />
                    Manual
                  </Button>
                </div>
              </form>

              {result && (
                <div className={`mt-8 p-6 rounded-xl border-2 ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center mb-4">
                    {result.success ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 mr-3" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600 mr-3" />
                    )}
                    <h3 className={`text-xl font-bold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                      {result.success ? "TICKET VALID" : "TICKET INVALID"}
                    </h3>
                  </div>
                  
                  <p className={`text-sm mb-4 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>

                  {result.attendee && (
                    <div className="space-y-3 pt-4 border-t border-black/5 text-sm text-gray-700">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-semibold">{result.attendee.eventName}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{result.attendee.email}</span>
                      </div>
                      {result.attendee.scannedAt && (
                        <div className="flex items-center text-green-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Verified: {new Date(result.attendee.scannedAt).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <Button 
                variant="ghost" 
                onClick={() => setIsLoggedIn(false)}
                className="w-full mt-4 text-gray-500 text-xs"
              >
                Logout from Admin
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-green-600 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
