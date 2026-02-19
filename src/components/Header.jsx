"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
// import AboutPage from "@/app/about/about.js";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
        
          <Link
  href="/"
  className="group flex items-center gap-3 transition duration-300"
>
  {/* Logo */}
  <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105">
    <Image
      src="/logo.png"
      alt="AI Tech Tactics Logo"
      fill
      sizes="48px"
      className="object-contain"
      priority
    />
  </div>

  {/* Brand Text */}
  <div className="leading-tight">
    <span className="block text-sm font-bold tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition">
      AI TECH TACTICS
    </span>
    <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
      Smart Tools Hub
    </span>
  </div>
</Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-[var(--accent)]">
              Home
            </Link>
            <Link href="/tools" className="hover:text-[var(--accent)]">
              Tools
            </Link>
            <Link href="/blog" className="hover:text-[var(--accent)]">
              Blog
            </Link>
            <Link href="/comparisons" className="hover:text-[var(--accent)]">
              Comparisons
            </Link>
            <Link href="/about" className="hover:text-[var(--accent)]">
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/free-tools"
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium"
            >
              Free Tools
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 border border-[var(--border)] rounded-lg"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="px-4 py-4 flex flex-col gap-4 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/tools" onClick={() => setOpen(false)}>
              Tools
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/comparisons" onClick={() => setOpen(false)}>
              Comparisons
            </Link>
            <Link href="/about" className="hover:text-[var(--accent)]">
              About
            </Link>

            <div className="pt-2 flex items-center justify-between">
              <ThemeToggle />
              <Link
                href="/free-tools"
                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm"
                onClick={() => setOpen(false)}
              >
                Free Tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
