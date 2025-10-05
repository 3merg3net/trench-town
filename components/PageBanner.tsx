// components/PageBanner.tsx
export default function PageBanner({
  src,
  alt,
  height = 120, // tweak per page if needed
}: {
  src: string;
  alt: string;
  height?: number;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 mb-6">
      <img
        src={src}
        alt={alt}
        className={`w-full h-[${height}px] md:h-[${Math.round(
          height * 1.3
        )}px] object-contain`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
    </section>
  );
}
