'use client';

type Props = { address: string; symbol?: string };

export default function ShareBar({ address, symbol = 'Token' }: Props) {
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `${symbol} just launched on Trench Town — ${address}`
  )}`;

  const dsUrl = `https://dexscreener.com/base/${address}`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <button
        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/10"
        onClick={() => navigator.clipboard.writeText(address)}
        title="Copy contract address"
      >
        Copy CA
      </button>
      <a
        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/10"
        href={xUrl}
        target="_blank"
      >
        Share on X
      </a>
      <a
        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/10"
        href={dsUrl}
        target="_blank"
      >
        View on Dexscreener
      </a>
    </div>
  );
}
