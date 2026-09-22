"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Guides", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <img
            src="/logo.png"
            alt="Yrdly Logo"
            className="h-16 w-auto drop-shadow-xl hover:scale-125 transition-transform"
          />
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: "1.75rem",
            flex: 1,
            justifyContent: "center",
          }}
          className="desk-nav"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: currentPage === l.href ? 600 : 500,
                fontFamily: "var(--font-work-sans), sans-serif",
                color: currentPage === l.href ? "var(--green-text)" : "var(--fg-muted)",
                transition: "color 0.15s",
                padding: "0.25rem 0",
                borderBottom: currentPage === l.href ? "1px var(--green)" : "1px solid transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side: theme toggle + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle />
          <a
            href="https://app.yrdly.ng"
            target="_blank"
            rel="noreferrer"
            className="btn-cta desk-cta"
            style={{ fontSize: "0.82rem", padding: "0.5rem 1.2rem" }}
          >
            Open App
          </a>
          <button
            className="mob-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg)", padding: 4 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileMenuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px var(--border)",
            background: "var(--nav-bg)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "1rem 1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: currentPage === l.href ? 600 : 400,
                fontFamily: "var(--font-work-sans), sans-serif",
                color: currentPage === l.href ? "var(--green-text)" : "var(--fg-muted)",
                textAlign: "left",
                padding: 0,
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://app.yrdly.ng"
            target="_blank"
            rel="noreferrer"
            className="btn-cta"
            style={{ textAlign: "center", marginTop: 4 }}
          >
            Open App
          </a>
        </div>
      )}
    </nav>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      style={{
        position: "relative",
        width: 44,
        height: 24,
        borderRadius: 9999,
        border: "1px var(--border)",
        background: "var(--bg-raised)",
        cursor: "pointer",
        outline: "none",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: dark ? "calc(100% - 19px)" : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "var(--green)",
          transition: "left 0.2s",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: dark ? 5 : "auto",
          right: dark ? "auto" : 5,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 9,
          userSelect: "none",
          lineHeight: 1,
        }}
        >
          {mounted ? (dark ? "🌙" : "☀️") : ""}
        </span>
      </button>
    );
}
