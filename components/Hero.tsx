// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10">
      {/* Banner image */}
      <img
        src="/images/banners/home-hero.png"
        alt="Trench Town — Bond Strong on Base"
        className="w-full h-[1260px] md:h-[540px] object-contain"
      />

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Wordmark overlay */}
      <div className="absolute left-5 md:left-8 bottom-6 md:bottom-8">
        <img
          src="/images/wordmark-light.png"
          alt="Trench Town"
          className="h-12 md:h-16 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)]"
        />
        <p className="mt-2 text-white/80 text-sm md:text-base">
          From the trenches we rise — <span className="font-semibold">Bond Strong on Base</span>
        </p>
      </div>
    </section>
  );
}





