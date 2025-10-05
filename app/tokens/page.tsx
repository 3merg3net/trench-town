import TokenTile from '@/components/TokenTile';
import Link from 'next/link';

export default function TokensPage() {
  const tokens = [
    { name: '$TRENCH', mc: 48000, bond: 50000, image: '/images/tokens/trench.png', address: '0x...' },
    { name: '$DEGEN', mc: 15000, bond: 50000, image: '/images/tokens/degen.png', address: '0x...' },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <img src="/images/banners/tokens-hero.png" alt="" className="w-full h-[380px] object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-extrabold">Tokens</h1>
          <p className="text-white/70 text-sm">Pre-bond vaults & bonded pools</p>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <p className="text-white/70 text-sm">Sorted by market cap</p>
        <Link href="/deploy" className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm">Launch Token</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((t, i) => <TokenTile key={i} token={t} />)}
      </div>
    </div>
  );
}
