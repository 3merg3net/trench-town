'use client';

import BunkerChat from '@/components/BunkerChat';
import PageBanner from '@/components/PageBanner';

export default function BunkerPage() {
  return (
    <div className="space-y-6">
      <PageBanner src="/images/banners/bunker-hero.png" alt="The Bunker — Token Chat" />
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="relative h-[220px] w-full">
          <img
            src="/images/bunker-banner.png"
            alt="The Bunker"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">THE BUNKER</h1>
            <p className="text-white/70 text-sm">Live chat for degen dispatches. Keep it civil, keep it on-chain.</p>
          </div>
        </div>
      </section>

      {/* Chat */}
      <BunkerChat />
    </div>
  );
}
