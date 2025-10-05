'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section
      aria-label="Trench Town Hero"
      className="
        relative overflow-hidden rounded-2xl border border-white/10
        bg-black
        h-[300px] sm:h-[340px] md:h-[420px] lg:h-[520px]
      "
    >
      {/* Background image, always contained + centered */}
      <Image
        src="/images/banners/home-hero.png"
        alt="Trench Town"
        fill
        priority
        sizes="100vw"
        className="object-contain object-center"
      />

      {/* Subtle overlay only for contrast at bottom; safe with contain */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Tagline only (no buttons here) */}
      <div className="relative z-10 h-full flex items-end p-5 sm:p-6 md:p-8">
        <p className="text-white/80 text-sm sm:text-base md:text-lg">
          From the trenches, we rise. <span className="text-white font-semibold">Bond strong.</span>
        </p>
      </div>
    </section>
  );
}







