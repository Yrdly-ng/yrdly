"use client";

import React, { useState, useEffect } from "react";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "already_subscribed">("idle");
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);

  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem("yrdly_newsletter_popup_dismissed");
      const savedSubscribed = localStorage.getItem("yrdly_subscribed_emails");
      let currentSubscribed: string[] = [];
      if (savedSubscribed) {
        currentSubscribed = JSON.parse(savedSubscribed);
        setSubscribedEmails(currentSubscribed);
      }

      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("yrdly_newsletter_popup_dismissed", "true");
    } catch {}
  };

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || status === "loading") return;

    if (subscribedEmails.includes(trimmedEmail)) {
      setStatus("already_subscribed");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (res.ok) {
        setStatus("success");
        const updated = [...subscribedEmails, trimmedEmail];
        setSubscribedEmails(updated);
        try {
          localStorage.setItem("yrdly_subscribed_emails", JSON.stringify(updated));
          localStorage.setItem("yrdly_newsletter_popup_dismissed", "true");
        } catch {}
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          aria-label="Close newsletter signup"
        >
          <X size={20} />
        </button>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#82DB7E] text-background mb-2 shadow-md">
          <Mail size={30} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Join Our Community Pulse
          </h2>
          <p className="text-sm text-muted-foreground">
            Get weekly updates on what&apos;s happening in Lagos estates. No spam. Just community trust.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error" || status === "already_subscribed") {
                setStatus("idle");
              }
            }}
            className="w-full border-border bg-background h-11 text-sm"
            disabled={status === "loading" || status === "success"}
            required
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={
              status === "success" || status === "already_subscribed"
                ? "w-full bg-[#166534] hover:bg-[#166534] text-white font-semibold h-11 text-sm transition-colors"
                : "w-full bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-semibold h-11 text-sm transition-colors"
            }
          >
            {status === "loading"
              ? "Subscribing…"
              : status === "success"
              ? "✓ Subscribed!"
              : status === "already_subscribed"
              ? "✓ Subscribed!"
              : "Subscribe"}
          </Button>
        </form>

        {status === "already_subscribed" && (
          <p className="text-xs text-amber-600 font-medium">
            This email is already subscribed to the newsletter.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
        {status !== "error" && status !== "already_subscribed" && (
          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        )}
      </div>
    </div>
  );
}
