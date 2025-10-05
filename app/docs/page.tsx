export default function DocsPage() {
  const docs = [
    {
      title: 'Anti-Rug System',
      img: '/images/trenchtown/infographic-safu.png',
      href: '/images/trenchtown/infographic-safu.png',
      blurb: 'How the rug tax & dev constraints reduce risk pre-bond.',
    },
    {
      title: 'Bond Mechanics',
      img: '/images/trenchtown/infographic-bond.png',
      href: '/images/trenchtown/infographic-bond.png',
      blurb: 'Single-sided vault → hit target → migrate to v3 liquidity.',
    },
    {
      title: 'How to Launch',
      img: '/images/trenchtown/infographic-launch.png',
      href: '/images/trenchtown/infographic-launch.png',
      blurb: '30-second deploy flow with listing details & socials.',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <div className="relative h-[200px] w-full">
          <img
            src="/images/hero-banner-degen.png"
            alt="Docs"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Docs</h1>
            <p className="text-white/70 text-sm">Quick overviews of Trench Town mechanics.</p>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((d) => (
          <a
            key={d.title}
            href={d.href}
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
          >
            <div className="aspect-[16/10] bg-black/30">
              <img src={d.img} alt={d.title} className="w-full h-full object-cover opacity-90" />
            </div>
            <div className="p-4">
              <div className="font-semibold">{d.title}</div>
              <div className="text-sm text-white/70 mt-1">{d.blurb}</div>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
