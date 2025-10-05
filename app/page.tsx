// app/page.tsx
import Link from "next/link";
import Hero from "@/components/Hero";
import TokenTile from "@/components/TokenTile";

type TokenCard = {
  name: string;
  mc: number;
  bond: number;
  image: string;
  address: string;
};

export default function HomePage() {
  const tokens: TokenCard[] = [
    { name: "$TRENCH", mc: 48000, bond: 50000, image: "/images/tokens/trench.png", address: "0x..." },
    { name: "$DEGEN",  mc: 15000, bond: 50000, image: "/images/tokens/degen.png",  address: "0x..." },
  ];

  return (
    <div className="space-y-8">
      {/* Pure image banner (no overlay). Ensure this file exists. */}
      <Hero
        src="/images/banners/home-hero.png"
        alt="Trench Town — Bond Strong"
        object="contain"                     // keep full image visible (no crop)
        heights={{ base: 240, md: 380, lg: 460 }}
      />

      {/* CTA row lives below the hero */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Link
          href="/deploy"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-semibold"
        >
          Launch
        </Link>
        <Link
          href="/tokens"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20"
        >
          Explore Tokens
        </Link>
      </div>

      {/* Quick intro */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-bold">What is Trench Town?</h3>
          <p className="text-white/70 text-sm mt-1">
            A Base-native launchpad with pre-bond single-sided vaults, anti-rug mechanics, and no buy tax.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-bold">How to Launch</h3>
          <p className="text-white/70 text-sm mt-1">
            Set name, symbol, and bond target. LP locks &amp; ownership renounced at bond.{" "}
            <Link href="/deploy" className="text-blue-400 underline">Deploy now</Link>.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-bold">How to Buy</h3>
          <p className="text-white/70 text-sm mt-1">
            Choose a token, use the built-in swap on its page, and watch bond progress in real-time.
          </p>
        </div>
      </section>

      {/* Tokens list */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Trending Tokens</h2>
          <Link href="/tokens" className="text-sm text-blue-400 underline">View all</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((t, i) => (
            <TokenTile key={i} token={t} />
          ))}
        </div>
      </section>
    </div>
  );
}

