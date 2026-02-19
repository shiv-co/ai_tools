

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center font-bold">
                AI
              </div>
              <span className="font-semibold text-lg">
                AITools
              </span>
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
              Weekly updates on AI tools.
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
          <span>© {new Date().getFullYear()} AITools. All rights reserved.</span>
          <span>Websites Developed and Maintained by Shivam</span>
        </div>

      </div>
    </footer>
  );
}
