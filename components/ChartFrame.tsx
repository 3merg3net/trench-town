'use client';
import { useMemo } from 'react';

type Props = {
  addressOrPair: string;
  baseOrChain?: 'base' | 'base-sepolia';
  height?: number;
};

export default function ChartFrame({ addressOrPair, baseOrChain = 'base', height = 360 }: Props) {
  const url = useMemo(() => {
    const chain = baseOrChain === 'base' ? 'base' : 'base-sepolia';
    return `https://dexscreener.com/${chain}/${addressOrPair}?embed=1&theme=dark&trades=0`;
  }, [addressOrPair, baseOrChain]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      <div className="px-3 py-2 text-xs text-white/60 border-b border-white/10 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
        Market • Dexscreener
      </div>
      <div className="relative w-full" style={{ height }}>
        <iframe
          src={url}
          className="absolute inset-0 w-full h-full"
          allow="clipboard-write; clipboard-read; fullscreen; encrypted-media"
        />
      </div>
    </div>
  );
}


