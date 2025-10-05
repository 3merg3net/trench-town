'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import SwapWidget from '@/components/SwapWidget';
import ChartFrame from '@/components/ChartFrame';
import TokenBunker from '@/components/TokenBunker';

export default function TokenPage() {
  const { address } = useParams<{ address: string }>();

  // TODO: replace with real onchain/backend fetch
  const token = useMemo(
    () => ({
      name: 'Trench Token',
      symbol: 'TRENCH',
      image: '/images/tokens/trench.png',
      mc: 25000,          // current market cap
      bondTarget: 50000,  // bond goal
      sellTax: '3% (pre-bond)',      // display only
      devRugTax: '50% (dev pre-bond)',
      website: '',
      twitter: '',
      telegram: '',
    }),
    []
  );

  const progressPct = Math.max(
    0,
    Math.min(100, Math.round((token.mc / token.bondTarget) * 100))
  );

  const chainForChart =
    process.env.NEXT_PUBLIC_CHAIN === 'base-sepolia' ? 'base-sepolia' : 'base';

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/images/banners/tokens-hero-alt.png"
          alt=""
          width={2400}
          height={1720}
          className="w-full h-[180px] md:h-[220px] object-contain"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-white/10 overflow-hidden">
              <Image
                src={token.image || '/images/tokens/token-placeholder.png'}
                alt={token.symbol}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">{token.name}</h1>
              <p className="text-white/70 text-sm">{token.symbol}</p>
            </div>
          </div>
          <div className="hidden md:block text-right text-sm text-white/70">
            <div>
              Token: <span className="font-mono">{address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top: Stats + Swap */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-3">Overview</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-white/60 text-sm">Market Cap</div>
              <div className="text-xl font-bold">${token.mc.toLocaleString()}</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/60 text-sm">Bond Target</div>
              <div className="text-xl font-bold">${token.bondTarget.toLocaleString()}</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/60 text-sm">Pre-bond Sell Tax</div>
              <div className="text-xl font-bold">{token.sellTax}</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/60 text-sm">Dev Rug Tax</div>
              <div className="text-xl font-bold">{token.devRugTax}</div>
            </div>
          </div>

          {/* Bond progress */}
          <div className="mt-5">
            <div className="flex justify-between mb-1 text-xs text-white/70">
              <span>Bond Progress</span>
              <span>
                ${token.mc.toLocaleString()} / ${token.bondTarget.toLocaleString()} ({progressPct}
                %)
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded">
              <div
                className="h-3 bg-green-500 rounded"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Swap */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-3">Swap {token.symbol}</h3>
          <SwapWidget />
        </div>
      </section>

      {/* Chart + Bunker */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-3">Chart</h3>
          <ChartFrame
            baseOrChain={chainForChart as 'base' | 'base-sepolia'}
            addressOrPair={address as string}
            height={360}
          />
        </div>

        {/* Bunker chat / thread */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <TokenBunker token={token.symbol} />
        </div>
      </section>

      {/* Links / resources */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h3 className="font-semibold mb-3">Links</h3>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <a
            href={`https://dexscreener.com/${chainForChart}/${address}`}
            target="_blank"
            className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/10 text-center"
          >
            Dexscreener
          </a>
          <a
            href={`https://${chainForChart === 'base' ? 'basescan.org' : 'sepolia.basescan.org'}/token/${address}`}
            target="_blank"
            className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/10 text-center"
          >
            Basescan
          </a>
          <a
            href={`https://x.com/search?q=${encodeURIComponent(address as string)}`}
            target="_blank"
            className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/10 text-center"
          >
            Search on X
          </a>
        </div>
      </section>
    </div>
  );
}
