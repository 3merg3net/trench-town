// components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Background image with gradient mask */}
      <div className="absolute inset-0">
        <img
          src="/images/footer-bg.png"
          alt="Trench Town footer background"
          className="object-contain w-full h-[200px] sm:h-[220px] md:h-[260px] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12 text-center sm:text-left">
        {/* Navigation links row */}
        <nav
          className="
            overflow-x-auto whitespace-nowrap
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            mb-6
          "
          aria-label="Footer"
        >
          <div className="inline-flex items-center gap-5 text-sm">
            <Link href="/" className="text-white/80 hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/deploy" className="text-white/80 hover:text-blue-400 transition-colors">Deploy</Link>
            <Link href="/tokens" className="text-white/80 hover:text-blue-400 transition-colors">Tokens</Link>
            <Link href="/faq" className="text-white/80 hover:text-blue-400 transition-colors">FAQ</Link>
            <Link href="/docs" className="text-white/80 hover:text-blue-400 transition-colors">Docs</Link>
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-blue-400 transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://x.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-blue-400 transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </nav>

        {/* Bottom line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <div>© {new Date().getFullYear()} Trench Town — <span className="text-white">Bond Strong.</span></div>
          <div className="opacity-70"> Launch from the Trenches</div>
        </div>
      </div>
    </footer>
  );
}

