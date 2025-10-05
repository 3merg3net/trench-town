'use client';

export default function ProgressBar({
  pct,
  thick = 'h-2.5',
}: { pct: number; thick?: string }) {
  const clamped = Math.max(0, Math.min(100, Math.floor(pct)));
  return (
    <div className={`w-full ${thick} bg-white/10 rounded-full overflow-hidden tt-bar`}>
      <div
        className={`${thick} rounded-full`}
        style={{
          width: `${clamped}%`,
          background: 'linear-gradient(90deg,#41EAD4,#7F5AF0)',
        }}
      />
    </div>
  );
}
