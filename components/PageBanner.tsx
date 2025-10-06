// components/PageBanner.tsx
'use client';

import Image from 'next/image';
import clsx from 'clsx';

type Props = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  // Optional override (keeps consistent size like other pages)
  heightClassName?: string; // e.g. "h-64 md:h-72 lg:h-80"
  className?: string;
};

export default function PageBanner({
  src,
  alt,
  title,
  subtitle,
  heightClassName = 'h-64 md:h-72 lg:h-80',
  className,
}: Props) {
  return (
    <section
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-white/10',
        heightClassName,
        className
      )}
      aria-label={title || alt}
    >
      {/* Background image (we prefer object-contain site-wide) */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-contain"
        priority
      />

      {/* Subtle overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {(title || subtitle) && (
        <div className="absolute bottom-4 left-4 right-4">
          {title && <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>}
          {subtitle && <p className="text-white/80 text-sm md:text-base mt-1">{subtitle}</p>}
        </div>
      )}
    </section>
  );
}

