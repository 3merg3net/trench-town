// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tokens', label: 'Tokens' },
  { href: '/deploy', label: 'Deploy' },
  { href: '/trench-bag', label: 'Trench Bag' },
  { href: '/leaderboard', label: 'Leaderboard' },   // ← added
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Support' },
  { href: '/bunker', label: 'Bunker Chat' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false); // close sheet when route changes
  }, [pathname]);

  const LinkItem = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded hover:bg-white/10 ${
        pathname === href ? 'text-white font-semibold' : 'text-white/70'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/wordmark-light.png"
            alt="Trench Town"
            className="h-20 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => <LinkItem key={l.href} {...l} />)}
        </div>

        {/* Right: wallet */}
        <div className="hidden md:block">
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded bg-white/10 border border-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {open ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
            {LINKS.map((l) => (
              <LinkItem key={l.href} {...l} />
            ))}
            <div className="py-2">
              <ConnectButton showBalance={false} chainStatus="icon" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}



