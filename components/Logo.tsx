'use client';

export default function Logo({
  size = 28,
  word = true,
}: { size?: number; word?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="shrink-0"
        aria-label="Trench Town Logo"
      >
        <defs>
          <linearGradient id="ttGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#41EAD4" />
            <stop offset="100%" stopColor="#7F5AF0" />
          </linearGradient>
        </defs>
        {/* badge */}
        <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#ttGrad)" opacity="0.18" />
        {/* trench helmet */}
        <path
          d="M18 36c.8-6.8 7.4-12 14-12s13.2 5.2 14 12h-6.5c-1.1 0-2 .9-2 2H26.5c0-1.1-.9-2-2-2H18z"
          fill="#41EAD4"
          opacity=".85"
        />
        {/* monogram T */}
        <path d="M24 42h16v3H35v7h-6v-7h-5v-3z" fill="#7F5AF0" opacity=".95" />
        {/* chevrons */}
        <path d="M12 48l4-2 2 2-6 4zM52 48l-4-2-2 2 6 4z" fill="#41EAD4" opacity=".45" />
      </svg>
      {word && (
        <span className="font-display text-lg md:text-xl tracking-wide">
          TRENCH <span className="text-white/60">TOWN</span>
        </span>
      )}
    </div>
  );
}

