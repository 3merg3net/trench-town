'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  const LINKS_LEFT = [
    { href: '/', label: 'Home' },
    { href: '/tokens', label: 'Tokens' },
    { href: '/deploy', label: 'Deploy' },
    { href: '/trench-bag', label: 'Trench Bag' },
  ];

  const LINKS_RIGHT = [
    { href: '/faq', label: 'FAQ' },
    { href: '/support', label: 'Support' },
    { href: '/bunker', label: 'Bunker' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ];

  const SOCIALS = [
    { href: 'https://x.com/', label: 'X' },
    { href: 'https://t.me/', label: 'Telegram' },
    { href: 'https://github.com/', label: 'GitHub' },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/footer-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>
      {/* Readability overlays */}
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="pointer-events-none absolute -top-10 inset-x-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* top row: brand + nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/wordmark-light.png"
              alt="Trench Town"
              width={180}
              height={42}
              className="h-9 w-auto object-contain"
            />
            <span className="text-xs text-white/70 hidden md:inline">
              From the trenches, we rise.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <nav className="flex items-center gap-4">
              {LINKS_LEFT.map((l) => (
                <Link key={l.href} href={l.href} className="text-white/80 hover:text-white">
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav className="flex items-center gap-4">
              {LINKS_RIGHT.map((l) => (
                <Link key={l.href} href={l.href} className="text-white/80 hover:text-white">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="my-6 h-px bg-white/15" />

        {/* bottom row: socials + legal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 text-sm">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="text-xs text-white/70">
            © {year} Trench Town — Bond strong. Stay SAFU.
          </div>
        </div>
      </div>
    </footer>
  );
}



