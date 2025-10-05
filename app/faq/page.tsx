'use client';

import { useState } from 'react';

type QA = { q: string; a: JSX.Element };

function AccordionItem({ qa }: { qa: QA }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/10"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{qa.q}</span>
        <span className="text-white/60 text-sm">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4 text-white/80 text-sm">{qa.a}</div>}
    </div>
  );
}

export default function FAQPage() {
  const faqs: QA[] = [
    {
      q: 'What is Trench Town?',
      a: (
        <>
          Trench Town is a bond-first launchpad on Base. Tokens start in a single-sided vault until
          they hit a predefined <b>Bond Target</b>. On bond, liquidity migrates to a v3 pool and
          trading continues normally.
        </>
      ),
    },
    {
      q: 'How does bond-first reduce rug risk?',
      a: (
        <>
          Pre-bond, dev controls are restricted and early selling is disincentivized. This makes rugs
          unattractive and rewards legit projects that reach bond.
        </>
      ),
    },
    {
      q: 'Are there taxes before bond?',
      a: (
        <>
          Investor sells have a small platform sell tax, while a much larger penalty applies if the
          dev attempts to exit early. Exact values are shown on each token page at launch.
        </>
      ),
    },
    {
      q: 'Do I need a platform token?',
      a: (
        <>
          No—ETH is enough to deploy and trade. A platform token may be added later for rewards,
          but it’s not required to use Trench Town.
        </>
      ),
    },
    {
      q: 'Any launch tips?',
      a: (
        <>
          Use a clear name + symbol, add a short description and working socials, and pick a realistic
          bond target (e.g. 5, 8, or 16 ETH). Push early volume to reach bond faster.
        </>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header / Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="relative h-[320px] w-full">
          <img
            src="/images/banners/faq-hero.png"
            alt="FAQ"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">FAQ</h1>
            <p className="text-white/70 text-sm">Bond Strong. Rise from the Trenches.</p>
          </div>
        </div>
      </section>

      {/* Infographics — displayed inline, clean and readable */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Quick Visuals</h2>
        <p className="text-white/70 text-sm">
          The essentials of Trench Town, at a glance. These are live images on the page (click to open full size if you want).
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Anti-Rug */}
          <a
            href="/images/trenchtown/infographic-safu.png"
            target="_blank"
            className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10"
          >
            <div className="aspect-[4/5] bg-black/20">
              <img
                src="/images/trenchtown/infographic-safu.png"
                alt="Anti-Rug System"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm">Anti-Rug System</div>
              <div className="text-xs text-white/60">Rug tax + dev restrictions pre-bond.</div>
            </div>
          </a>

          {/* Bond Mechanics */}
          <a
            href="/images/trenchtown/infographic-bond.png"
            target="_blank"
            className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10"
          >
            <div className="aspect-[4/5] bg-black/20">
              <img
                src="/images/trenchtown/infographic-bond.png"
                alt="Bond Mechanics"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm">Bond Mechanics</div>
              <div className="text-xs text-white/60">Single-sided vault → hit target → v3 pool.</div>
            </div>
          </a>

          {/* How to Launch */}
          <a
            href="/images/trenchtown/infographic-launch.png"
            target="_blank"
            className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10"
          >
            <div className="aspect-[4/5] bg-black/20">
              <img
                src="/images/trenchtown/infographic-launch.png"
                alt="How to Launch"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm">How to Launch</div>
              <div className="text-xs text-white/60">30-second deploy flow with socials.</div>
            </div>
          </a>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Common Questions</h2>
        <div className="space-y-2">
          {faqs.map((qa, i) => (
            <AccordionItem key={i} qa={qa} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
        <div className="text-sm text-white/80">
          Ready to launch from the trenches? Pick your bond target and deploy in under a minute.
        </div>
        <a
          href="/deploy"
          className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
        >
          Open Deployer
        </a>
      </section>
    </div>
  );
}

