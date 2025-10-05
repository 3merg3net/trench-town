'use client';
import { useNetwork } from 'wagmi';

const REQUIRED = process.env.NEXT_PUBLIC_TARGET === 'base' ? 8453 : 84532;

export default function NetworkGuard() {
  const { chain } = useNetwork();
  if (!chain || chain.id === REQUIRED) return null;
  return (
    <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm">
      You’re on <b>{chain?.name}</b>. Switch to <b>{REQUIRED === 8453 ? 'Base Mainnet' : 'Base Sepolia'}</b> for full functionality.
    </div>
  );
}
