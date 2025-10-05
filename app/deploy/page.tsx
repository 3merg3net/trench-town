// app/deploy/page.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  useAccount,
  useChainId,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { decodeEventLog } from 'viem';
import factoryAbi from '@/abis/TrenchFactory.json';
import { useIsMounted } from '@/lib/useIsMounted';

const REQUIRED_CHAIN_ID = 84532; // Base Sepolia
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

function isProbablyAddress(a?: string) {
  return !!a && /^0x[a-fA-F0-9]{40}$/.test(a);
}
function normalizeUrl(u: string) {
  if (!u) return '';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  return `https://${u}`;
}
function normalizeHandleOrUrl(u: string, prefix: 'https://x.com/' | 'https://t.me/') {
  if (!u) return '';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  const handle = u.replace(/^@/, '');
  return `${prefix}${handle}`;
}

export default function DeployPage() {
  const mounted = useIsMounted();
  const chainId = useChainId();
  const { address: devWallet, isConnected } = useAccount();

  // Core fields
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [bondEth, setBondEth] = useState('8'); // presets will set this

  // Listing info (off-chain metadata for now)
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [agree, setAgree] = useState(false);

  const bondWei = useMemo(() => {
    const n = Number(bondEth);
    if (!Number.isFinite(n) || n <= 0) return 0n;
    return BigInt(Math.floor(n * 1e18));
  }, [bondEth]);

  const canPrepare =
    mounted &&
    isConnected &&
    chainId === REQUIRED_CHAIN_ID &&
    isProbablyAddress(FACTORY_ADDRESS) &&
    !!name &&
    !!symbol &&
    bondWei > 0n &&
    agree;

  // Simulate to get a prepared request (wagmi v2 pattern)
  const {
    data: sim,
    error: simError,
    isLoading: isSimulating,
  } = useSimulateContract({
    address: FACTORY_ADDRESS,
    abi: (factoryAbi as any).abi,
    functionName: 'launch',
    args: [
      name,
      symbol,
      (devWallet as `0x${string}`) ?? '0x0000000000000000000000000000000000000000',
      bondWei,
    ],
    chainId,
    query: { enabled: canPrepare },
  });

  const {
    writeContract,
    data: txHash,
    isPending: isWriting,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isWaiting,
    isSuccess,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const onDeploy = () => {
    if (!mounted) return;
    if (!isConnected) return alert('Connect wallet first.');
    if (chainId !== REQUIRED_CHAIN_ID) return alert('Switch network to Base Sepolia (84532).');
    if (!isProbablyAddress(FACTORY_ADDRESS)) return alert('Invalid FACTORY address in .env.local.');
    if (!agree) return alert('Please accept the terms.');
    if (!sim?.request) {
      const msg = simError?.message || 'Unable to prepare transaction. Check inputs and try again.';
      return alert(msg);
    }
    // Fire tx
    writeContract(sim.request);
  };

  // On success, decode Launched(token, vault) and navigate
  if (isSuccess && receipt) {
    try {
      for (const log of receipt.logs ?? []) {
        try {
          const decoded = decodeEventLog({
            abi: (factoryAbi as any).abi,
            data: log.data,
            topics: log.topics as any,
          });
          if (decoded.eventName === 'Launched') {
            const tokenAddr = (decoded.args as any).token as string;
            // Prevent duplicate navigation on re-render
            // @ts-ignore
            if (!window.__tt_routed__) {
              // @ts-ignore
              window.__tt_routed__ = true;
              location.assign(`/token/${tokenAddr}`);
            }
            break;
          }
        } catch {
          // ignore non-matching logs
        }
      }
    } catch {
      // ignore
    }
  }

  // Skeleton pre-mount prevents hydration mismatch
  if (!mounted) {
    return (
      <div className="max-w-5xl grid md:grid-cols-2 gap-6 opacity-50">
        <div className="space-y-3">
          <div className="h-10 bg-white/10 rounded" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="h-10 bg-white/10 rounded" />
        </div>
        <div className="h-64 bg-white/10 rounded" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-12">
      {/* Left: form */}
      <div className="space-y-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-white">🚀 Deploy Token</h2>

        {/* Readiness */}
        <div className="text-xs space-y-1 p-3 rounded border border-white/10 bg-white/5">
          <div>
            Network:{' '}
            <span className={chainId === REQUIRED_CHAIN_ID ? 'text-green-400' : 'text-red-400'}>
              {chainId === REQUIRED_CHAIN_ID ? 'Base Sepolia' : `Chain ID ${chainId || 'unknown'}`}
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
              {FACTORY_ADDRESS}
            </span>
          </div>
        </div>

        {/* Core */}
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

        {/* Bond */}
        <div>
          <label className="block text-sm text-white/60 mb-1">Bond Target (ETH)</label>
          <div className="flex gap-2 mb-2">
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
          <input
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
            value={bondEth}
            onChange={(e) => setBondEth(e.target.value)}
            placeholder="8"
            inputMode="decimal"
          />
        </div>

        {/* Listing info (optional) */}
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

        {/* Terms */}
        <label className="flex items-center gap-2 text-sm text-white/70 pt-2">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I accept that listing info is public and I’m responsible for accuracy.
        </label>

        {/* Launch */}
        <button
          onClick={onDeploy}
          disabled={isWriting || isWaiting || isSimulating || !canPrepare}
          className="w-full p-3 rounded font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSimulating ? 'Preparing…' : isWriting ? 'Confirm in Wallet…' : isWaiting ? 'Deploying…' : 'Launch'}
        </button>

        {(simError || writeError) && (
          <div className="text-xs text-red-400 whitespace-pre-wrap">
            {simError?.message || writeError?.message}
          </div>
        )}

        {isSuccess && receipt && (
          <p className="text-xs text-green-400">
            Deployed! Looking for <b>Launched</b> event…
          </p>
        )}
      </div>

      {/* Right: live preview */}
      <div className="p-6 rounded border border-white/10 bg-white/5">
        <h3 className="font-bold mb-4">Preview</h3>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/10 rounded overflow-hidden">
            {image ? <img src={normalizeUrl(image)} alt="logo" className="object-cover w-full h-full" /> : null}
          </div>
          <div>
            <div className="font-bold text-lg">{name || 'Token Name'}</div>
            <div className="text-xs text-white/60">{symbol || 'SYMB'}</div>
          </div>
        </div>
        {description ? (
          <p className="mt-3 text-sm">{description}</p>
        ) : (
          <p className="mt-3 text-sm italic text-white/40">No description yet.</p>
        )}

        <div className="mt-4 text-xs space-y-1 text-white/70">
          {website && (
            <div>
              🌐 <a className="underline" href={normalizeUrl(website)} target="_blank"> {normalizeUrl(website)} </a>
            </div>
          )}
          {twitter && (
            <div>
              𝕏{' '}
              <a className="underline" href={normalizeHandleOrUrl(twitter, 'https://x.com/')} target="_blank">
                {normalizeHandleOrUrl(twitter, 'https://x.com/')}
              </a>
            </div>
          )}
          {telegram && (
            <div>
              ✈️{' '}
              <a className="underline" href={normalizeHandleOrUrl(telegram, 'https://t.me/')} target="_blank">
                {normalizeHandleOrUrl(telegram, 'https://t.me/')}
              </a>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-white/60">
          Bond Target: <b>{bondEth || '0'}</b> ETH
        </div>
      </div>
    </div>
  );
}





