'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/tokens', label: 'Tokens' },
  { href: '/deploy', label: 'Deploy' },
  { href: '/trench-bag', label: 'Trench Bag' },
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Support' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu when route changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/wordmark-light.png"
            alt="Trench Town"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Center: Tabs */}
        <div className="hidden md:flex items-center gap-4">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 text-sm rounded ${
                  active
                    ? 'text-white font-semibold bg-white/10'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Wallet */}
        <div className="hidden md:block">
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>

        {/* Mobile: simple menu */}
        <button
          className="md:hidden px-2 py-1 rounded border border-white/10 text-white/80"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {NAV.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-2 rounded ${
                    active
                      ? 'text-white font-semibold bg-white/10'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <ConnectButton showBalance={false} chainStatus="icon" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}



