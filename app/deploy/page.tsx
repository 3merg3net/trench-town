// app/deploy/page.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  usePublicClient,
} from 'wagmi';
import { decodeEventLog } from 'viem';
import factoryAbi from '@/abis/TrenchFactory.json';
import { useIsMounted } from '@/lib/useIsMounted';


const REQUIRED_CHAIN_ID = 84532;
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

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
  const { address: devWallet, isConnected } = useAccount();
  const { chain } = useNetwork();
  const publicClient = usePublicClient();

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [bondEth, setBondEth] = useState('8');
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

  const { config, error: prepareError } = usePrepareContractWrite({
    address: FACTORY_ADDRESS,
    abi: (factoryAbi as any).abi,
    functionName: 'launch',
    args: [name, symbol, devWallet ?? '0x0000000000000000000000000000000000000000', bondWei],
    enabled: mounted && isConnected && chain?.id === REQUIRED_CHAIN_ID && isProbablyAddress(FACTORY_ADDRESS) && !!name && !!symbol && bondWei > 0n && agree,
  });

  const { data: writeData, write, isLoading: isWriting, error: writeError } = useContractWrite(config);
  const { isLoading: isWaiting, isSuccess, data: receipt } = useWaitForTransaction({ hash: writeData?.hash });

  const onDeploy = () => {
    if (!mounted || !isConnected) return alert('Connect wallet first.');
    if (chain?.id !== REQUIRED_CHAIN_ID) return alert('Switch to Base Sepolia.');
    if (!isProbablyAddress(FACTORY_ADDRESS)) return alert('Factory not set.');
    if (!agree) return alert('Accept terms first.');
    if (!write) return alert(prepareError?.message || 'Check inputs.');
    write();
  };

  if (isSuccess && receipt && publicClient) {
    for (const log of receipt.logs ?? []) {
      try {
        const decoded = decodeEventLog({
          abi: (factoryAbi as any).abi,
          data: log.data,
          topics: log.topics as any,
        });
        if (decoded.eventName === 'Launched') {
          const tokenAddr = (decoded.args as any).token as string;
          location.assign(`/token/${tokenAddr}`);
          break;
        }
      } catch {}
    }
  }

  if (!mounted) return <div className="text-white/50 p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-12">
      {/* Left */}
      <div className="space-y-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-white">🚀 Deploy Token</h2>

        <div className="text-xs space-y-1 p-3 rounded border border-white/10 bg-white/5">
          <div>Network: <span className={chain?.id === REQUIRED_CHAIN_ID ? 'text-green-400' : 'text-red-400'}>{chain?.name ?? 'Unknown'}</span></div>
          <div>Wallet: <span className={isConnected ? 'text-green-400' : 'text-red-400'}>{isConnected ? devWallet : 'Disconnected'}</span></div>
          <div>Factory: <span className={isProbablyAddress(FACTORY_ADDRESS) ? 'text-green-400' : 'text-red-400'}>{FACTORY_ADDRESS}</span></div>
        </div>

        <input className="w-full p-3 bg-white/5 border border-white/10 rounded" value={name} onChange={(e) => setName(e.target.value)} placeholder="Token Name" />
        <input className="w-full p-3 bg-white/5 border border-white/10 rounded" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="SYMB" maxLength={12} />
        <input className="w-full p-3 bg-white/5 border border-white/10 rounded" value={bondEth} onChange={(e) => setBondEth(e.target.value)} placeholder="8" />

        <textarea className="w-full p-3 bg-white/5 border border-white/10 rounded" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} />

        <input className="w-full p-3 bg-white/5 border border-white/10 rounded" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
        <input className="w-full p-3 bg-white/5 border border-white/10 rounded" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="X handle or URL" />
        <input className="w-full p-3 bg-white/5 border border-white/10 rounded" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="Telegram handle or URL" />

        <label className="flex items-center gap-2 text-sm text-white/70 pt-2">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I accept that listing info is public and accurate.
        </label>

        <button onClick={onDeploy} disabled={isWriting || isWaiting} className="w-full p-3 rounded font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
          {isWriting ? 'Confirm in Wallet…' : isWaiting ? 'Deploying…' : 'Launch'}
        </button>

        {(prepareError || writeError) && <div className="text-xs text-red-400">{prepareError?.message || writeError?.message}</div>}
      </div>

      {/* Right */}
      <div className="p-6 rounded border border-white/10 bg-white/5">
        <h3 className="font-bold mb-4">Preview</h3>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/10 rounded overflow-hidden">{image ? <img src={normalizeUrl(image)} alt="logo" className="object-cover w-full h-full" /> : null}</div>
          <div>
            <div className="font-bold text-lg">{name || 'Token Name'}</div>
            <div className="text-xs text-white/60">{symbol || 'SYMB'}</div>
          </div>
        </div>
        {description ? <p className="mt-3 text-sm">{description}</p> : <p className="mt-3 text-sm italic text-white/40">No description yet.</p>}
      </div>
    </div>
  );
}





