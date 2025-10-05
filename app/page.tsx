import Hero from "@/components/Hero";
import TokenTile from "@/components/TokenTile";
import Link from "next/link";


export default function HomePage() {
  const tokens = [
    { name: "$TRENCH", mc: 48000, bond: 50000, image: "/images/tokens/trench.png", address: "0x..." },
    { name: "$DEGEN", mc: 15000, bond: 50000, image: "/images/tokens/degen.png", address: "0x..." },
  ];

  return (
    
    <div className="space-y-8">
      <Hero />
      
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
            Set name, symbol, and bond target. LP locks & ownership renounced at bond.{" "}
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
