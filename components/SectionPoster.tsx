import Image from 'next/image';

export default function SectionPoster({ src, alt, title }: { src: string; alt: string; title?: string }) {
  return (
    <section className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      {title ? <div className="px-4 pt-4 text-sm text-white/60">{title}</div> : null}
      <div className="relative w-full h-[440px]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </section>
  );
}
