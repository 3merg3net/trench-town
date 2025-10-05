export default function Explainer() {
  return (
    <section className="grid md:grid-cols-3 gap-4">
      <div className="p-4 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <img src="/images/trenchtown/icon-flag.png" className="w-5 h-5" alt="" />
          <h3 className="font-semibold">Bond-First</h3>
        </div>
        <p className="text-sm text-white/70">
          Launches target a preset bond (5/8/16 ETH). When reached, liquidity is paired & locked.
        </p>
      </div>
      <div className="p-4 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <img src="/images/trenchtown/icon-grenade.png" className="w-5 h-5" alt="" />
          <h3 className="font-semibold">SAFU Mechanics</h3>
        </div>
        <p className="text-sm text-white/70">
          Anti-rug rules & early-sell tax discourage bad actors; rewards flow to good users.
        </p>
      </div>
      <div className="p-4 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <img src="/images/trenchtown/icon-rifle.png" className="w-5 h-5" alt="" />
          <h3 className="font-semibold">V3-Native</h3>
        </div>
        <p className="text-sm text-white/70">
          Post-bond liquidity migrates to a Uniswap v3 pool for deeper markets.
        </p>
      </div>
    </section>
  )
}
