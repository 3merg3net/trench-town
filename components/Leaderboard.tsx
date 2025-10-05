'use client';

import { useState } from 'react';

type Row = { name: string; mc: number; holders: number; address: string; change?: string };

const gainers: Row[] = [
  { name: '$TRENCH', mc: 48000, holders: 512, address: '0xtren...', change: '+62%' },
  { name: '$DEGEN',  mc: 15000, holders: 221, address: '0xdegn...',  change: '+31%' },
  { name: '$BRO',    mc:  9200, holders: 133, address: '0xbroo...',  change: '+18%' },
];

const viewed: Row[] = [
  { name: '$CHAD',   mc: 21000, holders: 300, address: '0xchad...', change: '—' },
  { name: '$APE',    mc: 17000, holders: 280, address: '0xapee...', change: '—' },
  { name: '$TRENCH', mc: 48000, holders: 512, address: '0xtren...', change: '—' },
];

export default function Leaderboard() {
  const [tab, setTab] = useState<'gainers' | 'viewed'>('gainers');
  const rows = tab === 'gainers' ? gainers : viewed;

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 text-sm">
          <button
            className={`px-3 py-1 rounded ${tab === 'gainers' ? 'bg-white/15' : 'hover:bg-white/10'}`}
            onClick={() => setTab('gainers')}
          >
            Top Gainers
          </button>
          <button
            className={`px-3 py-1 rounded ${tab === 'viewed' ? 'bg-white/15' : 'hover:bg-white/10'}`}
            onClick={() => setTab('viewed')}
          >
            Most Viewed
          </button>
        </div>
      </div>
      <div className="mt-2 divide-y divide-white/10">
        <div className="px-4 py-2 grid grid-cols-5 text-[11px] uppercase tracking-wide text-white/50">
          <div className="col-span-2">Name</div>
          <div>MC</div>
          <div>Holders</div>
          <div>Change</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="px-4 py-3 grid grid-cols-5 text-sm">
            <div className="col-span-2">{r.name}</div>
            <div className="text-white/80">${r.mc.toLocaleString()}</div>
            <div className="text-white/60">{r.holders}</div>
            <div className={`${(r.change || '').startsWith('+') ? 'text-emerald-400' : 'text-white/50'}`}>{r.change ?? '—'}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

