import Image from "next/image";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-10">
      {/* Top banner: wide, contained, centered */}
      <section
        className="
          relative overflow-hidden rounded-2xl border border-white/10 bg-black
          h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px]
        "
        aria-label="Docs banner"
      >
        <Image
          src="/images/banners/docs-hero.png"
          alt="Trench Town Docs"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-4 right-4 bottom-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Docs
          </h1>
          <p className="text-white/75 text-sm sm:text-base">
            Architecture, mechanics, and rewards — the Trench Town playbook.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="text-white/80">
          Trench Town is a <b>bond-strong</b> launchpad on Base. Tokens begin in a{" "}
          <b>single-sided bonding vault</b> that accumulates ETH until a target
          is reached. When the target hits, LP is created and locked, ownership
          is renounced, and trading continues with <b>no buy tax</b>. The aim:
          <b> fairer</b>, <b>safer</b> launches and a culture that rewards strong
          holders (&quot;good soldiers&quot;).
        </p>
      </section>

      {/* Anti-rug explainer with inline image */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold">Anti-Rug Mechanics</h3>
        <p className="text-white/80">
          The system removes common attack surfaces during and after launch:
          <b> LP lock at bond</b>, no mint/burn/blacklist backdoors, and an{" "}
          optional <b>early-seller tax</b> during the first blocks/minutes to
          discourage paper hands (if enabled for a token). The tax can route to
          a protocol pool for community rewards.
        </p>
        <figure className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative w-full h-72">
            <Image
              src="/images/trenchtown/infographic-safu.png"
              alt="Anti-rug system"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="mt-2 text-sm text-white/70">
            Anti-rug system at a glance.
          </figcaption>
        </figure>
      </section>

      {/* Bonding flow + inline image */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold">Bonding Vault → LP</h3>
        <p className="text-white/80">
          During pre-bond, buyers send ETH to the vault. Once the{" "}
          <b>bond target</b> is reached, the vault pairs ETH with the token,
          creates and locks LP, then renounces ownership. Post-bond, trading
          continues normally. Projects then migrate to Uniswap V3
          pool (concentrated ranges; optional, disclosed fee-share).
        </p>
        <figure className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative w-full h-72">
            <Image
              src="/images/trenchtown/infographic-bond.png"
              alt="Bonding vault life cycle"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="mt-2 text-sm text-white/70">
            Bonding → LP creation → lock → renounce.
          </figcaption>
        </figure>
      </section>

      {/* How to launch + inline image */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold">How to Launch</h3>
        <ol className="list-decimal pl-5 space-y-3 text-white/80">
          <li>Choose <b>Name</b>, <b>Symbol</b>, and <b>Bond Target (ETH)</b>.</li>
          <li>Community bonds ETH; progress updates live on your token page.</li>
          <li>
            On target, the protocol creates and <b>locks LP</b> and{" "}
            <b>renounces</b> ownership.
          </li>
          <li>Trading continues with no buy tax. Optional early-seller tax may decay quickly.</li>
        </ol>
        <figure className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative w-full h-72">
            <Image
              src="/images/trenchtown/infographic-launch.png"
              alt="How to launch on Trench Town"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="mt-2 text-sm text-white/70">
            The deploy flow in four steps.
          </figcaption>
        </figure>
        <div className="flex gap-3 pt-1">
          <Link
            href="/deploy"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Deploy a Token
          </Link>
          <Link
            href="/tokens"
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/10"
          >
            Explore Tokens
          </Link>
        </div>
      </section>

      {/* Rewards & notes */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold">Rewards &amp; Notes</h3>
        <p className="text-white/80">
          A portion of protocol revenue (e.g. early-seller tax or optional V3
          fee share) will be directed to a <b>community rewards pool</b> for
          periodic distributions (weekly/monthly or on threshold). The{" "}
          <b>Trench Token</b> will introduce boosts and loyalty mechanics later.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-white/70">
          <li>Crypto is risky. Market conditions can affect outcomes.</li>
          <li>Any token-specific tax/fees are disclosed on that token’s page.</li>
          <li>Security reviews are ongoing; updates will be posted here.</li>
        </ul>
      </section>
    </div>
  );
}
