"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { appLink } from "@/lib/app-links";

const links = [
  { label: "Discover", href: "/#discover" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Events", href: "/events" },
  { label: "Businesses", href: "/businesses" },
  { label: "Our story", href: "/about" },
];

export default function Header({
  currentPage: _currentPage,
}: {
  currentPage?: string;
}) {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="site-nav wrap">
        <Link href="/" className="brand" aria-label="YRDLY home">
          <img src="/logo.png" width="42" height="42" alt="" />
          <span>
            yrdly<span className="brand-period">.</span>
          </span>
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="theme-button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle colour theme"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
            </svg>
          </button>
          <Link href="/login" className="nav-login">
            Log in
          </Link>
          <Link href="/signup" className="nav-signup">
            Sign up <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={trigger}
            className="menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link href="/blog">Journal</Link>
          <Link href="/faq">Help & FAQ</Link>
          <Link href="/contact">Contact</Link>
          <button className="text-link" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} aria-label="Toggle colour theme">Change colour theme</button>
          <a href={appLink()} className="button button-primary">
            Explore YRDLY ↗
          </a>
        </nav>
      )}
    </header>
  );
}
