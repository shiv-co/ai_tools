
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
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
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Discover the best free AI tools to improve productivity, creativity, and growth.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/tools">AI Tools</a></li>
              {/* <li><a href="/free-tools">Free Tools</a></li> */}
              <li><a href="/about">Blog</a></li>
              <li><a href="/comparisons">Comparisons</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-3">Newsletter</h4>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Weekly updates on AI Tech Tactics.
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm outline-none"
            />
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] text-sm text-[var(--text-secondary)] flex flex-col sm:flex-row justify-between gap-3">
          <span>© {new Date().getFullYear()} AI Tech Tactics. All rights reserved.</span>
          <span>Websites Developed and Maintained by Shivam</span>
        </div>

      </div>
    </footer>
  );
}
