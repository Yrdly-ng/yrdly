"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  MoreVertical, 
  Download, 
  Monitor, 
  Zap, 
  Package, 
  Bell, 
  RefreshCw 
} from 'lucide-react';

const FEATURES = [
  { icon: <Zap className="w-5 h-5 text-[#82DB7E]" />, label: 'Lightning Fast', sub: 'Instant page loads' },
  { icon: <Package className="w-5 h-5 text-[#82DB7E]" />, label: 'Under 2 MB', sub: 'Saves your storage' },
  { icon: <Bell className="w-5 h-5 text-[#82DB7E]" />, label: 'Live Alerts', sub: 'Estate event updates' },
  { icon: <RefreshCw className="w-5 h-5 text-[#82DB7E]" />, label: 'Always Current', sub: 'Auto-updates online' },
];

const TABS = ['iPhone / iPad', 'Android', 'Desktop'] as const;
type Tab = (typeof TABS)[number];

interface Step {
  num: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}

const STEPS: Record<Tab, Step[]> = {
  'iPhone / iPad': [
    { num: '01', title: 'Open Safari', body: 'Launch Safari on your iPhone or iPad and navigate to yrdly.app', icon: <Globe className="w-5 h-5" /> },
    { num: '02', title: 'Tap the Share Button', body: 'Tap the Share icon in the bottom Safari toolbar — the square with an arrow pointing up.', icon: <Share2 className="w-5 h-5" /> },
    { num: '03', title: 'Select "Add to Home Screen"', body: 'Scroll down the share sheet menu and tap "Add to Home Screen".', icon: <PlusSquare className="w-5 h-5" /> },
    { num: '04', title: 'Confirm & Launch', body: 'Tap "Add" in the top right corner. Yrdly will instantly appear on your home screen!', icon: <CheckCircle2 className="w-5 h-5" /> },
  ],
  Android: [
    { num: '01', title: 'Open Chrome', body: 'Launch Chrome on your Android device and navigate to yrdly.app', icon: <Globe className="w-5 h-5" /> },
    { num: '02', title: 'Open Menu', body: 'Tap the three-dot menu in the top right corner of Chrome.', icon: <MoreVertical className="w-5 h-5" /> },
    { num: '03', title: 'Add to Home Screen', body: 'Tap "Add to Home Screen" from the dropdown menu.', icon: <PlusSquare className="w-5 h-5" /> },
    { num: '04', title: 'Confirm', body: 'Tap "Add" to confirm. The Yrdly icon will appear on your home screen.', icon: <CheckCircle2 className="w-5 h-5" /> },
  ],
  Desktop: [
    { num: '01', title: 'Open Chrome or Edge', body: 'Visit yrdly.app in Chrome or Microsoft Edge on your computer.', icon: <Monitor className="w-5 h-5" /> },
    { num: '02', title: 'Find the Install Icon', body: 'Look for a small install icon in the address bar on the right side.', icon: <Download className="w-5 h-5" /> },
    { num: '03', title: 'Click Install', body: 'Click "Install Yrdly" in the prompt that appears.', icon: <PlusSquare className="w-5 h-5" /> },
    { num: '04', title: 'Launch', body: 'Yrdly opens as a standalone app — pin it to your taskbar for quick access.', icon: <CheckCircle2 className="w-5 h-5" /> },
  ],
};

const AppleLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 fill-current" }) => (
  <svg viewBox="0 0 170 170" className={className} fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.1-3.23-2.63-7.14-7.25-11.73-13.84-6.45-9.26-11.46-19.72-15.03-31.39-3.57-11.67-5.36-22.88-5.36-33.63 0-15.53 3.96-28.53 11.89-39 7.93-10.47 18.17-15.8 30.72-16 6.34 0 12.87 1.63 19.59 4.88 6.72 3.25 11.36 4.97 13.92 5.15 2.14-.3 6.95-2.07 14.43-5.32 7.48-3.25 13.99-4.73 19.54-4.43 14.47 1.15 25.56 6.81 33.27 16.98-12.98 7.84-19.34 18.57-19.08 32.19.26 10.63 4.26 19.51 12.01 26.64 3.79 3.49 8.21 6.16 13.26 8.01-2.73 8.01-6.52 16.08-11.38 24.23zm-30.82-108.97c0-7.39 2.65-14.36 7.95-20.91 5.3-6.55 11.95-10.37 19.95-11.46.26.96.39 1.95.39 2.97 0 7.31-2.73 14.35-8.19 21.13-5.46 6.78-12.11 10.63-19.95 11.55-.13-1.09-.15-2.18-.15-3.28z" />
  </svg>
);

const PlayStoreLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path fill="#00E676" d="M99.617 8.057a33.567 33.567 0 0 0-33.6 33.575v428.736a33.567 33.567 0 0 0 33.6 33.575 33.09 33.09 0 0 0 18.895-5.839l.643-.443 234.821-233.593L118.878 14.316a33.09 33.09 0 0 0-19.261-6.259z"/>
    <path fill="#FF3D00" d="m353.976 265.947-44.59-44.59L99.617 8.057c3.966 0 7.82.96 11.261 2.805l243.098 138.835 44.59 44.59-44.59 71.66z" opacity="0.9"/>
    <path fill="#FFD600" d="m398.566 221.357 78.435 44.595c9.559 5.435 9.559 24.16 0 29.595l-78.435 44.59-44.59-74.185 44.59-44.595z"/>
    <path fill="#00F0FF" d="M99.617 503.943c3.966 0 7.82-.96 11.261-2.805l243.098-138.835-44.59-44.59-209.769 186.23z"/>
  </svg>
);

export const PwaInstallSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('iPhone / iPad');

  return (
    <section className="py-20 lg:py-28 bg-background text-foreground border-t border-border relative overflow-hidden transition-colors duration-200">
      {/* Background glow gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#82DB7E]/10 dark:bg-[#82DB7E]/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-card border border-border text-foreground shadow-xs">
            <div className="flex items-center gap-2 border-r border-border pr-3">
              <AppleLogo className="w-4 h-4 text-foreground" />
              <PlayStoreLogo className="w-4 h-4" />
            </div>
            <span>Coming Soon to App Store & Google Play</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Add{' '}
            <span className="text-[#82DB7E] relative inline-block">
              Yrdly
              <svg viewBox="0 0 120 8" className="absolute left-0 -bottom-1.5 w-full h-2" preserveAspectRatio="none">
                <path d="M2 6 Q30 1 60 5 Q90 9 118 4" stroke="#82DB7E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
              </svg>
            </span>{' '}
            to Your Home Screen
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Get instant access, fast offline browsing, and neighbourhood notifications without taking up storage space on your phone.
          </p>
        </div>

        {/* Feature Cards Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-card border border-border hover:border-[#82DB7E]/50 transition-all duration-200 group cursor-default shadow-xs"
            >
              <div className="p-2.5 rounded-xl bg-[#82DB7E]/10 border border-[#82DB7E]/20 group-hover:bg-[#82DB7E]/20 transition-colors shrink-0">
                {f.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground leading-tight">{f.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1.5 p-1.5 rounded-2xl bg-muted border border-border">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#82DB7E] text-slate-950 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground bg-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS[activeTab].map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col px-6 pt-6 pb-8 rounded-3xl bg-card border border-border hover:border-[#82DB7E]/50 transition-all duration-300 hover:-translate-y-1 shadow-xs group overflow-hidden"
            >
              {/* Large watermark step number */}
              <span className="absolute top-3 right-4 select-none pointer-events-none text-5xl font-black text-muted-foreground/15 group-hover:text-[#82DB7E]/20 transition-colors">
                {step.num}
              </span>

              {/* Icon Container */}
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold mb-6 bg-[#82DB7E]/10 border border-[#82DB7E]/30 text-[#82DB7E] group-hover:bg-[#82DB7E] group-hover:text-slate-950 transition-all duration-300">
                {step.icon}
              </div>

              <h3 className="text-base font-bold mb-2 leading-snug text-foreground">
                {step.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>

              {/* Connector Glow Dot for Desktop */}
              {i < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#82DB7E] shadow-[0_0_12px_#82DB7E] opacity-80" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
