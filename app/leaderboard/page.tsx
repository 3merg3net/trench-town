// app/leaderboard/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Soldier = {
  addr: string;
  name?: string;
  pfp?: string;
  holdScore: number;   // time-weighted holding score
  bondContrib: number; // ETH contributed pre-bond
  volume: number;      // trading volume
  helpful: number;     // upvotes / reports / positive actions
};

const MOCK: Soldier[] = [
  { addr: '0xA1...9c2', name: 'TrenchMaxi', pfp: '/images/tokens/bonded.png', holdScore: 9420, bondContrib: 3.2, volume: 12.3, helpful: 38 },
  { addr: '0xB7...e55', name: 'BaseBro',    pfp: '/images/tokens/leaderboard.png', holdScore: 8800, bondContrib: 1.1, volume: 5.4,  helpful: 21 },
  { addr: '0xC0...1af', name: 'NoRugNick',  pfp: '/images/tokens/community.png', holdScore: 7900, bondContrib: 0.7, volume: 2.1,  helpful: 14 },
  { addr: '0xD4...77b', name: 'VaultChad',  pfp: '/images/tokens/vault.png', holdScore: 6150, bondContrib: 2.6, volume: 8.9,  helpful: 19 },
  { addr: '0xE9...c01', name: 'BagBuilder', pfp: '/images/tokens/rug-tax.png', holdScore: 5600, bondContrib: 0.3, volume: 1.4,  helpful: 11 },
];

type TabKey = 'hold' | 'bond' | 'volume' | 'helpful';

export default function LeaderboardPage() {
  const [tab, setTab] = useState<TabKey>('hold');

  const sorted = useMemo(() => {
    const arr = [...MOCK];
    switch (tab) {
      case 'bond':   return arr.sort((a, b) => b.bondContrib - a.bondContrib);
      case 'volume': return arr.sort((a, b) => b.volume - a.volume);
      case 'helpful':return arr.sort((a, b) => b.helpful - a.helpful);
      case 'hold':
      default:       return arr.sort((a, b) => b.holdScore - a.holdScore);
    }
  }, [tab]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <img
          src="/images/banners/leaderboard-hero.png"
          alt="Leaderboard Banner"
          className="w-full h-[420px] object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-extrabold">Leaderboard</h1>
          <p className="text-white/70 text-sm max-w-3xl">
            Good soldiers get noticed. Hold strong through bond, contribute to bonding, trade without wrecking the trenches,
            and help flag or verify projects. A share of platform rewards is earmarked for top contributors.
          </p>
        </div>
      </section>

      {/* How rewards work */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="font-semibold text-lg mb-2">How rewards work (simple version)</h2>
        <ul className="list-disc pl-5 space-y-2 text-white/80 text-sm">
          <li>
            <span className="font-semibold">Good Soldiers Pool:</span> a portion of platform fees is reserved for users who
            hold through bond, contribute to bonding, maintain healthy trading behavior, and support community safety.
          </li>
          <li>
            <span className="font-semibold">Points:</span> actions earn points — time-weighted holding, bond contributions, reasonable
            volume, and helpful actions (e.g., reporting rugs, verifying deployers).
          </li>
          <li>
            <span className="font-semibold">Payouts:</span> pooled rewards are periodically distributed to the top ranks by category
            (Hold • Bond • Volume • Helpful), with transparency posted on-chain (coming soon).
          </li>
          <li>
            <span className="font-semibold">Anti-Rug stance:</span> dev pre-bond rug attempts incur heavy tax; portions route to the platform
            & Good Soldiers Pool (per config).
          </li>
        </ul>
        <div className="mt-3 text-xs text-white/50">
          Final parameters subject to iteration. This page shows a preview of the scoring & display logic.
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 text-sm">
        {[
          { key: 'hold', label: 'Top Holders' },
          { key: 'bond', label: 'Top Bonders' },
          { key: 'volume', label: 'Top Volume' },
          { key: 'helpful', label: 'Most Helpful' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key as TabKey)}
            className={`px-3 py-1.5 rounded border text-sm
              ${tab === key
                ? 'bg-white/20 border-white/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto">
          <Link
            href="/deploy"
            className="px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-sm font-semibold"
          >
            Launch a token
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 text-xs uppercase tracking-wide text-white/60 px-4 py-2 border-b border-white/10 bg-white/5">
          <div className="col-span-6 md:col-span-5">User</div>
          <div className="hidden md:block col-span-2 text-right">Hold Score</div>
          <div className="hidden md:block col-span-2 text-right">Bond (ETH)</div>
          <div className="hidden md:block col-span-2 text-right">Volume (ETH)</div>
          <div className="col-span-6 md:col-span-1 text-right">Helpful</div>
        </div>

        {sorted.map((s, i) => (
          <div key={s.addr} className="grid grid-cols-12 items-center px-4 py-3 border-b border-white/10 last:border-b-0">
            <div className="col-span-6 md:col-span-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 overflow-hidden border border-white/10">
                {s.pfp ? (
                  <img src={s.pfp} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div>
                <div className="font-semibold">{s.name || s.addr.slice(0,6) + '…' + s.addr.slice(-4)}</div>
                <div className="text-xs text-white/50">{s.addr}</div>
              </div>
            </div>

            <div className="hidden md:block col-span-2 text-right">{s.holdScore.toLocaleString()}</div>
            <div className="hidden md:block col-span-2 text-right">{s.bondContrib.toLocaleString(undefined, { maximumFractionDigits: 3 })}</div>
            <div className="hidden md:block col-span-2 text-right">{s.volume.toLocaleString(undefined, { maximumFractionDigits: 3 })}</div>
            <div className="col-span-6 md:col-span-1 text-right">{s.helpful}</div>
          </div>
        ))}
      </div>

      {/* Callouts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-1">Become a Good Soldier</h3>
          <p className="text-sm text-white/80">
            Hold through bond, help the community, and you’ll climb the ranks. Rewards are planned to
            flow to the most consistent contributors over time.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-1">Transparency first</h3>
          <p className="text-sm text-white/80">
            Scores are computed from objective signals (on-chain holding/bonding/volume) plus community-verified actions.
            Final scoring & payout math will be published.
          </p>
        </div>
      </div>
    </div>
  );
}
