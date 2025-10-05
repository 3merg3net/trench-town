'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden rounded-2xl border border-white/10
        min-h-[280px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px]
      "
      aria-label="Trench Town Hero"
    >
      {/* Background image (mobile-safe, covers, centered on faces/logo) */}
      <div className="absolute inset-0">
        <Image
          src="/images/banners/home-hero.png"         // <- wide banner
          alt="Trench Town — Bond Strong"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          className="object-cover object-center md:object-center pointer-events-none select-none"
          // tiny transparent placeholder to avoid layout shift
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAAAAACw="
        />
        {/* Subtle vignette/gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10 flex flex-col justify-end h-full
          p-4 sm:p-6 md:p-8 lg:p-10
        "
      >
        {/* Wordmark (separate from the background so it never gets cropped) */}
        <div className="flex items-end gap-3">
          <Image
            src="/images/wordmark-light.png"
            alt="Trench Town"
            width={520}
            height={120}
            className="h-auto w-[68%] sm:w-[56%] md:w-[48%] lg:w-[44%]"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="mt-3 text-white/80 text-sm sm:text-base md:text-lg">
          From the trenches, we rise. <span className="text-white">Bond strong.</span>
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/deploy"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Launch a Token
          </Link>
          <Link
            href="/tokens"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10"
          >
            Explore Tokens
          </Link>
        </div>
      </div>
    </section>
  );
}






