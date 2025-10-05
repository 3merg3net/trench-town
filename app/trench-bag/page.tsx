'use client';

import Link from 'next/link';
import { useMemo } from 'react';

type Holding = {
  name: string;
  symbol: string;
  address: string;
  image?: string;
  balance: number;   // token units (mock)
  price: number;     // USD per token (mock)
  bonded: boolean;
  mc: number;        // current market cap (mock, USD)
  bondTarget: number;// target market cap to bond (USD)
};

const MOCK: Holding[] = [
  {
    name: 'Trench Token',
    symbol: 'TRENCH',
    address: '0xA3885a0Bb3c68a9552803896f5Cb76aE8Ae8e057',
    image: '/images/mascot-soldier.png',
    balance: 120_000,
    price: 0.00018,
    bonded: false,
    mc: 48_000,
    bondTarget: 50_000,
  },
  {
    name: 'DEGEN',
    symbol: 'DEGEN',
    address: '0x28442822b156c348992fbb055070ddeb17dd5905',
    image: '/images/community-cta.png',
    balance: 55_000,
    price: 0.00011,
    bonded: false,
    mc: 15_000,
    bondTarget: 50_000,
  },
];

function formatUSD(n: number) {
  try {
    return n.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    });
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

function StatusPill({ bonded }: { bonded: boolean }) {
  return (
    <span
      className={`text-[11px] px-2 py-1 rounded border ${
        bonded
          ? 'bg-green-500/20 border-green-500/40 text-green-200'
          : 'bg-amber-500/20 border-amber-500/40 text-amber-100'
      }`}
    >
      {bonded ? 'BONDED' : 'PRE-BOND'}
    </span>
  );
}

function PageBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10">
      <img src={src} alt={alt} className="w-full h-[180px] md:h-[320px] object-contain" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <h1 className="text-3xl font-extrabold">Trench Bag</h1>
        <p className="text-white/70 text-sm">Your positions and bond status at a glance.</p>
      </div>
    </section>
  );
}

export default function TrenchBagPage() {
  const rows = useMemo(() => {
    return MOCK.map((h) => {
      const value = h.balance * h.price;
      const progress = Math.max(0, Math.min(100, (h.mc / h.bondTarget) * 100));
      return { ...h, value, progress };
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <PageBanner
        src="/images/banners/trench-bag-hero.png"
        alt="Trench Bag — Your holdings"
      />

      {/* Holdings Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 gap-3 text-xs uppercase tracking-wide text-white/60 px-4 py-2 border-b border-white/10">
          <div>Token</div>
          <div className="text-right">Balance</div>
          <div className="text-right">Value</div>
          <div className="text-center">Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Rows */}
        {rows.map((h) => (
          <div key={h.address} className="px-4 py-3 border-b border-white/10 last:border-b-0">
            {/* Top row */}
            <div className="grid grid-cols-5 gap-3 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-white/10 overflow-hidden flex-shrink-0">
                  {h.image ? (
                    <img src={h.image} alt={h.symbol} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div>
                  <div className="font-semibold leading-tight">{h.name}</div>
                  <div className="text-xs text-white/60">{h.symbol}</div>
                </div>
              </div>

              <div className="text-right text-white/80">
                {h.balance.toLocaleString()}
              </div>

              <div className="text-right font-semibold">
                {formatUSD(h.value)}
              </div>

              <div className="text-center">
                <StatusPill bonded={h.bonded} />
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-2">
                  <Link
                    href={`/token/${h.address}`}
                    className="px-3 py-1.5 rounded bg-white/10 border border-white/10 hover:bg-white/20 text-sm"
                  >
                    View
                  </Link>
                  <a
                    className="px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-sm font-semibold"
                    href={`/token/${h.address}`}
                  >
                    Trade
                  </a>
                  <a
                    className="text-white/70 hover:underline text-sm"
                    href={`https://dexscreener.com/base/${h.address}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chart
                  </a>
                  <button
                    className="text-white/70 hover:underline text-sm"
                    onClick={() => navigator.clipboard.writeText(h.address)}
                    title="Copy contract address"
                  >
                    Copy CA
                  </button>
                </div>
              </div>
            </div>

            {/* Bond progress */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                <span>Bond Progress</span>
                <span>
                  {Math.round(h.progress)}% &nbsp; • &nbsp;
                  {formatUSD(h.mc)} / {formatUSD(h.bondTarget)}
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded overflow-hidden">
                <div
                  className={`${h.bonded ? 'bg-green-500' : 'bg-amber-400'} h-2`}
                  style={{ width: `${h.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help strip */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-white/80">
          Want to launch your own token? It’s a 30-second flow with bond-first safety.
        </div>
        <Link
          href="/deploy"
          className="px-3 py-1.5 rounded bg-white/10 border border-white/10 hover:bg-white/20 text-sm"
        >
          Open Deployer
        </Link>
      </div>
    </div>
  );
}
