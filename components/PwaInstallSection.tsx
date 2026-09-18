"use client";

import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Share, 
  PlusSquare, 
  MoreVertical, 
  Download, 
  Zap, 
  Bell, 
  HardDrive, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface Step {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const iosSteps: Step[] = [
  {
    step: '01',
    title: 'Open Safari',
    description: 'Launch Safari browser on your iPhone or iPad and navigate to yrdly.app',
    icon: <Smartphone className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '02',
    title: 'Tap the Share Button',
    description: 'Tap the Share icon in the bottom Safari toolbar (the square with an arrow pointing up).',
    icon: <Share className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '03',
    title: 'Select "Add to Home Screen"',
    description: 'Scroll down the share sheet menu and tap "Add to Home Screen".',
    icon: <PlusSquare className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '04',
    title: 'Confirm & Launch',
    description: 'Tap "Add" in the top right corner. Yrdly will instantly appear on your home screen!',
    icon: <CheckCircle2 className="w-5 h-5 text-[#82DB7E]" />,
  },
];

const androidSteps: Step[] = [
  {
    step: '01',
    title: 'Open Chrome',
    description: 'Launch Google Chrome or your default Android browser and open yrdly.app',
    icon: <Smartphone className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '02',
    title: 'Tap the 3-Dot Menu',
    description: 'Tap the three vertical dots icon in the top right corner of the browser.',
    icon: <MoreVertical className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '03',
    title: 'Tap "Install App"',
    description: 'Select "Add to Home screen" or "Install App" from the dropdown options.',
    icon: <Download className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '04',
    title: 'Confirm Installation',
    description: 'Tap "Install" in the prompt. Yrdly is ready to use like a native app!',
    icon: <CheckCircle2 className="w-5 h-5 text-[#82DB7E]" />,
  },
];

const desktopSteps: Step[] = [
  {
    step: '01',
    title: 'Open Browser',
    description: 'Visit yrdly.app in Google Chrome, Microsoft Edge, or Brave on your computer.',
    icon: <Monitor className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '02',
    title: 'Click Address Bar Icon',
    description: 'Look for the computer/install icon on the right side of your browser URL bar.',
    icon: <Download className="w-5 h-5 text-[#82DB7E]" />,
  },
  {
    step: '03',
    title: 'Click "Install"',
    description: 'Click "Install" in the browser popup prompt to launch Yrdly as a standalone app.',
    icon: <CheckCircle2 className="w-5 h-5 text-[#82DB7E]" />,
  },
];

export const PwaInstallSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ios');

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-muted/20 to-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#82DB7E]/10 border border-[#82DB7E]/30 text-[#82DB7E] text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4" />
            No App Store Download Needed
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Add Yrdly to Your Home Screen
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get instant access, fast offline browsing, and neighbourhood notifications without taking up storage space on your phone.
          </p>
        </div>

        {/* Highlight Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#82DB7E]/10 text-[#82DB7E] shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Lightning Fast</h4>
              <p className="text-xs text-muted-foreground">Instant page loads</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#82DB7E]/10 text-[#82DB7E] shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Under 2 MB</h4>
              <p className="text-xs text-muted-foreground">Saves your storage</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#82DB7E]/10 text-[#82DB7E] shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Live Alerts</h4>
              <p className="text-xs text-muted-foreground">Estate event updates</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="p-2.5 rounded-lg bg-[#82DB7E]/10 text-[#82DB7E] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Always Current</h4>
              <p className="text-xs text-muted-foreground">Auto-updates online</p>
            </div>
          </div>
        </div>

        {/* Interactive Platform Tabs */}
        <Tabs defaultValue="ios" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-muted/60 p-1.5 rounded-xl border border-border grid grid-cols-3 w-full max-w-md">
              <TabsTrigger 
                value="ios" 
                className="data-[state=active]:bg-[#82DB7E] data-[state=active]:text-background font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>iPhone / iPad</span>
              </TabsTrigger>
              <TabsTrigger 
                value="android" 
                className="data-[state=active]:bg-[#82DB7E] data-[state=active]:text-background font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Android</span>
              </TabsTrigger>
              <TabsTrigger 
                value="desktop" 
                className="data-[state=active]:bg-[#82DB7E] data-[state=active]:text-background font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Desktop</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* iOS Content */}
          <TabsContent value="ios">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {iosSteps.map((s, idx) => (
                <Card key={idx} className="border-border hover:border-[#82DB7E]/50 transition-all hover:shadow-md relative overflow-hidden bg-card">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#82DB7E]/40 tracking-wider">{s.step}</span>
                      <div className="p-2 bg-[#82DB7E]/10 rounded-lg">
                        {s.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-base mb-2 text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Android Content */}
          <TabsContent value="android">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {androidSteps.map((s, idx) => (
                <Card key={idx} className="border-border hover:border-[#82DB7E]/50 transition-all hover:shadow-md relative overflow-hidden bg-card">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#82DB7E]/40 tracking-wider">{s.step}</span>
                      <div className="p-2 bg-[#82DB7E]/10 rounded-lg">
                        {s.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-base mb-2 text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Desktop Content */}
          <TabsContent value="desktop">
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {desktopSteps.map((s, idx) => (
                <Card key={idx} className="border-border hover:border-[#82DB7E]/50 transition-all hover:shadow-md relative overflow-hidden bg-card">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#82DB7E]/40 tracking-wider">{s.step}</span>
                      <div className="p-2 bg-[#82DB7E]/10 rounded-lg">
                        {s.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-base mb-2 text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
