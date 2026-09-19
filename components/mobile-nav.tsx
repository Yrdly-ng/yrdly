"use client"
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag as Bag, Users, Zap, Mail, ArrowRight, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "About Us", path: "/about" },
  { label: "Learn More", path: "/learn-more" },
  { label: "Contact Us", path: "/contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-green-200 transition-all active:scale-95"
        >
          <Menu className="h-6 w-6 text-gray-900" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0 border-l border-gray-100 bg-white text-gray-900 overflow-hidden">
        <VisuallyHidden.Root>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden.Root>

        <div className="flex flex-col h-full">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-8 py-8">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
              <img src="/logo.png" alt="Yrdly Logo" className="h-12 w-auto drop-shadow-sm" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-8 py-4 space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 ml-4">Main Menu</span>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all"
                >
                  <h3 className="text-xl font-black tracking-tighter text-gray-900 group-hover:text-green-600 transition-colors">{item.label}</h3>
                  <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            {/* Socials */}
            <div className="pt-8 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 ml-4">Connect</span>
              <div className="flex gap-4 px-2">
                {[
                  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/yrdly.ng?stkn=MTEzbzYzZ2J3dWR4dA==" },
                  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/yrdlyapp" },
                  { icon: <MessageCircle className="w-5 h-5" />, href: "mailto:support@yrdly.ng" },
                ].map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href} 
                    className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all border border-gray-100"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Bottom Bar */}
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng'}/marketplace`} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <Button className="w-full h-16 bg-gray-900 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-gray-900/10 transition-all active:scale-95">
                Visit Market Place
              </Button>
            </Link>
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
              © 2026 Yrdly Technologies
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
