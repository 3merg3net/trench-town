'use client';

import { useEffect, useMemo, useState } from 'react';

type Pair = {
  pairAddress: string;
  chainId: string;
  dexId: string;
  baseToken?: { address?: string; symbol?: string };
  quoteToken?: { address?: string; symbol?: string };
  liquidity?: { usd?: number };
};

export default function DexscreenerChart({ token }: { token: `0x${string}` }) {
  const [pair, setPair] = useState<Pair | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Base chains we care about
  const preferredChains = new Set(['base', 'basesepolia']);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        setError(null);
        setPair(null);
        // Dexscreener token lookup
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`);
        if (!res.ok) throw new Error(`Dexscreener ${res.status}`);
        const data = await res.json();
        const pairs: Pair[] = data?.pairs || [];
        // pick best Base/Basesepolia pair by liquidity
        const best = pairs
          .filter((p) => preferredChains.has((p.chainId || '').toLowerCase()))
          .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];
        if (!stop) setPair(best || null);
      } catch (e: any) {
        if (!stop) setError(e?.message || 'Failed to load pairs');
      }
    })();
    return () => { stop = true; };
  }, [token]);

  const iframeSrc = useMemo(() => {
    if (!pair) return null;
    // Dexscreener embed by PAIR address:
    // https://dexscreener.com/<chain>/<pairAddress>?embed=1&theme=dark
    const chain = pair.chainId.toLowerCase() === 'basesepolia' ? 'basesepolia' : 'base';
    return `https://dexscreener.com/${chain}/${pair.pairAddress}?embed=1&theme=dark&trades=0`;
  }, [pair]);

  if (error) {
    return (
      <div className="tt-card p-4">
        <div className="text-sm text-red-400">Dexscreener: {error}</div>
      </div>
    );
  }

  if (!pair || !iframeSrc) {
    return (
      <div className="tt-card p-4 text-sm text-white/60">
        Looking up Dexscreener pair for <span className="text-white">{token}</span>…
      </div>
    );
  }

  return (
    <div className="tt-card p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-sm font-semibold">Chart</div>
        <div className="text-xs text-white/60">
          {pair.baseToken?.symbol}/{pair.quoteToken?.symbol} · {pair.dexId}
        </div>
      </div>
      <iframe
        src={iframeSrc}
        title="Dexscreener Chart"
        className="w-full"
        style={{ height: 500, border: 0 }}
        allow="clipboard-write; fullscreen"
      />
    </div>
  );
}
