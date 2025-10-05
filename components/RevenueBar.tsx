'use client';

import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import feeSplitterAbi from '@/abis/FeeSplitter.json';

const FEE_SPLITTER = process.env.NEXT_PUBLIC_FEE_SPLITTER as `0x${string}`;

export default function RevenueBar() {
  const [usersAccrued, setUsersAccrued] = useState('0');

  const { data } = useReadContract({
    address: FEE_SPLITTER,
    abi: feeSplitterAbi.abi,
    functionName: 'usersAccrued',
  });

  useEffect(() => {
    if (data) setUsersAccrued((BigInt(data).toString()));
  }, [data]);

  return (
    <div className="p-3 border border-white/10 bg-white/5 rounded mt-4">
      <h3 className="font-bold text-sm mb-2">💰 Fee Splitter Transparency</h3>
      <p className="text-xs text-white/70">
        Users Accrued: <b>{Number(usersAccrued) / 1e18} ETH</b>
      </p>
    </div>
  );
}
