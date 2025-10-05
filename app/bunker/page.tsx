'use client';

import BunkerChat from '@/components/BunkerChat';


export default function BunkerPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="relative h-[420px] w-full">
          <img
            src="/images/banners/bunker-hero.png"
            alt="The Bunker"
            className="w-full h-full object-contain"
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
