// app/deploy/page.tsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  useAccount,
  useChainId,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import type { Abi } from 'viem';
import { decodeEventLog, parseEther, zeroAddress } from 'viem';
import factoryJson from '@/abis/TrenchFactory.json';
import { useIsMounted } from '@/lib/useIsMounted';
import PageBanner from '@/components/PageBanner';

const REQUIRED_CHAIN_ID = 84532; // Base Sepolia
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;
const FACTORY_ABI = (factoryJson as { abi: Abi }).abi;

// Optional: set a default ETH price via env (can be edited on page)
const DEFAULT_ETH_USD = Number(process.env.NEXT_PUBLIC_ETH_USD || 3200);

function isProbablyAddress(a?: string) {
  return !!a && /^0x[a-fA-F0-9]{40}$/.test(a);
}
function normalizeUrl(u: string) {
  if (!u) return '';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  return `https://${u}`;
}

export default function DeployPage() {
  const mounted = useIsMounted();
  const chainId = useChainId();
  const { address: devWallet, isConnected } = useAccount();

  // Form state
  const [name, setName] = useState('Trench Token');
  const [symbol, setSymbol] = useState('TRENCH');
  const [bondEth, setBondEth] = useState('8'); // editable
  const [ethUsd, setEthUsd] = useState<string>(String(DEFAULT_ETH_USD));

  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');

  // Acknowledgements
  const [agreePublic, setAgreePublic] = useState(false);
  const [ackRugTax, setAckRugTax] = useState(false);

  const bondWei = useMemo(() => {
    const n = Number(bondEth);
    if (!Number.isFinite(n) || n <= 0) return 0n;
    try {
      return parseEther(n.toString());
    } catch {
      return 0n;
    }
  }, [bondEth]);

  const approxUsd = useMemo(() => {
    const e = Number(bondEth);
    const p = Number(ethUsd);
    if (!Number.isFinite(e) || e <= 0 || !Number.isFinite(p) || p <= 0) return '';
    try {
      const usd = Math.round(e * p);
      return usd.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    } catch {
      return `$${Math.round(e * p).toLocaleString()}`;
    }
  }, [bondEth, ethUsd]);

  const canPrepare =
    mounted &&
    isConnected &&
    chainId === REQUIRED_CHAIN_ID &&
    isProbablyAddress(FACTORY_ADDRESS) &&
    !!name &&
    !!symbol &&
    bondWei > 0n &&
    agreePublic &&
    ackRugTax;

  // Simulate for UX
  const { data: simData, error: simError, isPending: isSimPending } = useSimulateContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'launch',
    args: [name, symbol, devWallet ?? zeroAddress, bondWei],
    chainId: REQUIRED_CHAIN_ID,
    query: { enabled: canPrepare },
  });

  // Write + wait
  const { writeContract, data: txHash, isPending: isWriting } = useWriteContract();
  const {
    data: receipt,
    isLoading: isWaiting,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: txHash });

  // Navigate after Launched event
  useEffect(() => {
    if (!isSuccess || !receipt) return;
    for (const log of receipt.logs ?? []) {
      try {
        const decoded = decodeEventLog({
          abi: FACTORY_ABI,
          data: log.data,
          topics: log.topics as readonly `0x${string}`[],
        });
        if (decoded.eventName === 'Launched') {
          const tokenAddr = (decoded.args as Record<string, unknown>).token as `0x${string}`;
          window.location.assign(`/token/${tokenAddr}`);
          break;
        }
      } catch {
        // ignore
      }
    }
  }, [isSuccess, receipt]);

  const onDeploy = () => {
    if (!mounted) return;
    if (!isConnected) return alert('Connect wallet first.');
    if (chainId !== REQUIRED_CHAIN_ID) return alert('Switch to Base Sepolia (84532).');
    if (!isProbablyAddress(FACTORY_ADDRESS)) return alert('Factory address missing/invalid in .env.local.');
    if (!agreePublic) return alert('Please confirm your listing info is public and accurate.');
    if (!ackRugTax) return alert('Please acknowledge the pre-bond rug-tax rule.');
    if (!name || !symbol || bondWei <= 0n) return alert('Please fill out Name, Symbol, and Bond target.');
    if (simError) return alert(simError.message || 'Simulation failed. Check inputs.');

    writeContract({
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: 'launch',
      args: [name, symbol, devWallet ?? zeroAddress, bondWei],
      chainId: REQUIRED_CHAIN_ID,
    });
  };

  if (!mounted) return <div className="text-white/60 p-6">Loading…</div>;

  return (
    <div className="space-y-8">
      {/* Consistent hero size like other pages */}
      <PageBanner
        src="/images/banners/deploy-hero.png"
        alt="Deploy your token — Trench Town"
        title="Deploy a Token"
        subtitle="Set name, symbol, and bond target. LP locks & ownership renounced at bond. Bond Strong."
        heightClassName="h-64 md:h-72 lg:h-80"
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Form (opaque) */}
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-5 space-y-5">
          <h2 className="text-2xl font-extrabold tracking-tight">Token Details</h2>

          {/* Readiness */}
          <div className="text-xs space-y-1 p-3 rounded border border-white/10 bg-white/5">
            <div>
              Network:{' '}
              <span className={chainId === REQUIRED_CHAIN_ID ? 'text-green-400' : 'text-red-400'}>
                {chainId === REQUIRED_CHAIN_ID ? 'Base Sepolia' : `Chain ID ${chainId || 'Unknown'}`}
              </span>
            </div>
            <div>
              Wallet:{' '}
              <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                {isConnected ? devWallet : 'Disconnected'}
              </span>
            </div>
            <div>
              Factory:{' '}
              <span className={isProbablyAddress(FACTORY_ADDRESS) ? 'text-green-400' : 'text-red-400'}>
                {FACTORY_ADDRESS || '(missing)'}
              </span>
            </div>
            {isSimPending && <div className="text-white/60">Simulating…</div>}
            {simError && <div className="text-red-400">Sim error: {simError.message}</div>}
          </div>

          {/* Name / Symbol */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Token Name</label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Token"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Symbol</label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="MYT"
              maxLength={12}
            />
          </div>

          {/* Bond target with presets + USD */}
          <div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-1">Bond Target (ETH)</label>
                <input
                  className="w-full p-3 bg-white/5 border border-white/10 rounded"
                  value={bondEth}
                  onChange={(e) => setBondEth(e.target.value)}
                  placeholder="8"
                  inputMode="decimal"
                />
              </div>
              <div className="w-40">
                <label className="block text-sm text-white/60 mb-1">ETH Price (USD)</label>
                <input
                  className="w-full p-3 bg-white/5 border border-white/10 rounded"
                  value={ethUsd}
                  onChange={(e) => setEthUsd(e.target.value)}
                  inputMode="decimal"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex gap-2 mt-2">
              {['5', '8', '16'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setBondEth(p)}
                  className={`px-3 py-1 rounded border border-white/10 ${
                    bondEth === p ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {p} ETH
                </button>
              ))}
            </div>

            {/* Approx USD */}
            <div className="mt-2 text-sm text-white/70">
              ≈ <b>{approxUsd || '—'}</b>
            </div>

            {/* Required rug-tax ack */}
            <label className="mt-3 flex items-start gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={ackRugTax}
                onChange={(e) => setAckRugTax(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                I understand that <b>pre-bond sells incur a 50% “rug tax”</b>. This protects buyers until the bond
                target is reached and LP/ownership are locked.
              </span>
            </label>
          </div>

          {/* Listing info */}
          <div className="pt-2 border-t border-white/10">
            <h3 className="font-bold mb-2">Listing Info (optional)</h3>

            <label className="block text-sm text-white/60 mb-1">Image URL</label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded mb-3"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />

            <label className="block text-sm text-white/60 mb-1">Short Description</label>
            <textarea
              className="w-full p-3 bg-white/5 border border-white/10 rounded mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is your token about? (max 280 chars)"
              rows={3}
              maxLength={280}
            />

            <label className="block text-sm text-white/60 mb-1">Website</label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded mb-3"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="yourdomain.xyz"
            />

            <label className="block text-sm text-white/60 mb-1">X (Twitter)</label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded mb-3"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="@handle or full URL"
            />

            <label className="block text-sm text-white/60 mb-1">Telegram</label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@channel or full URL"
            />
          </div>

          {/* Public info confirmation */}
          <label className="flex items-start gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={agreePublic}
              onChange={(e) => setAgreePublic(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I confirm my listing details are accurate and will be public. LP locks & ownership are renounced at bond.
              Bond Strong.
            </span>
          </label>

          {/* Launch */}
          <button
            onClick={onDeploy}
            disabled={isWriting || isWaiting || !canPrepare}
            className="w-full p-3 rounded font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isWriting ? 'Confirm in Wallet…' : isWaiting ? 'Deploying…' : 'Launch'}
          </button>
        </div>

        {/* Right: Preview & Step guide (opaque) */}
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-5 space-y-5">
          <h3 className="font-bold">Preview</h3>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded bg-white/10 overflow-hidden">
              {image ? <img src={normalizeUrl(image)} alt="logo" className="w-full h-full object-cover" /> : null}
            </div>
            <div>
              <div className="font-bold text-lg">{name || 'Token Name'}</div>
              <div className="text-xs text-white/60">{symbol || 'SYMB'}</div>
            </div>
          </div>
          {description ? (
            <p className="text-sm text-white/80 mt-3">{description}</p>
          ) : (
            <p className="text-sm text-white/40 mt-3 italic">No description yet.</p>
          )}
          <div className="mt-3 text-sm text-white/70">
            Bond Target: <b>{bondEth || '0'}</b> ETH {approxUsd ? <span>({approxUsd})</span> : null}
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="font-semibold mb-2">How deploying works (quick)</h4>
            <ol className="list-decimal pl-5 text-sm text-white/80 space-y-1">
              <li>Fill out name, symbol, and your <b>Bond Target</b> (the pre-bond goal in ETH).</li>
              <li>Confirm the <b>pre-bond rug-tax</b> acknowledgement (protects buyers until bond).</li>
              <li>Deploy — your token page goes live immediately with bond progress + swap.</li>
              <li>As buys push to the target, once reached: <b>LP locks</b> & <b>ownership renounced</b>.</li>
            </ol>

            <h4 className="font-semibold mt-4 mb-2">Tips to reach bond faster</h4>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              <li>Keep symbol short (3–6 chars) and share your token page link early.</li>
              <li>Use a clean logo + concise description people can repeat.</li>
              <li>Be present in chat to build conviction. Bond Strong.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}




