export default function HowTo() {
  return (
    <section className="grid md:grid-cols-2 gap-4">
      <div className="p-4 rounded-xl border border-white/10 bg-white/5">
        <h3 className="font-semibold mb-2">How to Launch</h3>
        <ol className="text-sm text-white/70 space-y-1 list-decimal list-inside">
          <li>Connect wallet & open <b>Deploy</b>.</li>
          <li>Name, symbol, pick bond target.</li>
          <li>Confirm tx → your token goes live.</li>
        </ol>
        <a href="/deploy" className="inline-block mt-3 px-3 py-1 rounded bg-white/10 hover:bg-white/20">
          Deploy Token →
        </a>
      </div>

      <div className="p-4 rounded-xl border border-white/10 bg-white/5">
        <h3 className="font-semibold mb-2">How to Buy</h3>
        <ol className="text-sm text-white/70 space-y-1 list-decimal list-inside">
          <li>Find a token from the home list.</li>
          <li>Open its page & use the swap box.</li>
          <li>Track bond progress and activity.</li>
        </ol>
        <a href="/" className="inline-block mt-3 px-3 py-1 rounded bg-white/10 hover:bg-white/20">
          Browse Tokens →
        </a>
      </div>
    </section>
  )
}
