import Image from "next/image";
import Link from "next/link";
import { FiInstagram, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Link href="/" className="group flex items-center gap-3 transition duration-300">
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

                <div className="leading-tight">
                  <span className="block text-sm font-bold tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition">
                    AI TECH TACTICS
                  </span>
                  <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                    Smart Tools Hub
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Discover the best free AI tools to improve productivity, creativity, and growth.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link href="/tools">AI Tools</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/comparisons">Comparisons</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Connect With Us</h4>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Follow AI Tech Tactics for updates, suggestions, and support.
            </p>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <a
                href="https://instagram.com/aitechtactics.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FiInstagram className="h-4 w-4 shrink-0" />
                <span>@aitechtactics.official</span>
              </a>
              <a
                href="mailto:aitechtactics@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FiMail className="h-4 w-4 shrink-0" />
                <span>aitechtactics@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] text-sm text-[var(--text-secondary)] flex flex-col sm:flex-row justify-between gap-3">
          <span>© {new Date().getFullYear()} AI Tech Tactics. All rights reserved.</span>
          <span>Websites Developed and Maintained by Shivam</span>
        </div>
      </div>
    </footer>
  );
}
