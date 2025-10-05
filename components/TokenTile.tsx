'use client';

import Link from 'next/link';
import { useState } from 'react';

type Token = {
  name: string;
  symbol?: string;
  mc: number;           // current market cap (USD)
  bond: number;         // bond target (USD)
  image?: string;
  address: string;      // contract
  bonded?: boolean;     // true when post-bond
};

export default function TokenTile({ token }: { token: Token }) {
  const pct = Math.max(0, Math.min(100, Math.round((token.mc / token.bond) * 100)));
  const [copied, setCopied] = useState(false);

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(token.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition">
      {/* banner */}
      <div className="relative h-28 w-full bg-black/40">
        {token.image ? (
          <img src={token.image} alt="" className="w-full h-full object-contain opacity-80" />
        ) : null}
        <div className="absolute top-2 left-2">
          <span className={`text-[11px] px-2 py-1 rounded border ${
            token.bonded ? 'bg-green-500/20 border-green-500/40 text-green-200' : 'bg-amber-500/20 border-amber-500/40 text-amber-100'
          }`}>
            {token.bonded ? 'BONDED' : 'PRE-BOND'}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="font-bold truncate">{token.name} <span className="text-white/50">{token.symbol ?? ''}</span></div>
            <div className="text-[11px] text-white/50 break-all">{token.address.slice(0, 6)}…{token.address.slice(-4)}</div>
          </div>
          <button
            onClick={copyCA}
            className="text-[11px] px-2 py-1 rounded bg-white/10 border border-white/10 hover:bg-white/20 whitespace-nowrap"
            title="Copy contract address"
          >
            {copied ? 'Copied!' : 'Copy CA'}
          </button>
        </div>

        {/* numbers */}
        <div className="text-sm flex items-center justify-between">
          <div className="text-white/70">MC</div>
          <div className="font-semibold">${token.mc.toLocaleString()}</div>
        </div>

        {/* bond progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-white/60">
            <span>Bond Progress</span>
            <span>${token.mc.toLocaleString()} / ${token.bond.toLocaleString()}</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded">
            <div className={`h-2.5 rounded ${token.bonded ? 'bg-green-500' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          <Link
            href={`/token/${token.address}`}
            className="flex-1 text-center px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
          >
            View
          </Link>
          <Link
            href={`/token/${token.address}`}
            className="flex-1 text-center px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-sm font-semibold"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}




