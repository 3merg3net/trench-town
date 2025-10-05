'use client';

import { useState } from "react";

export default function SwapWidget() {
  const [ethAmount, setEthAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const handleEthChange = (val: string) => {
    setEthAmount(val);

    const eth = parseFloat(val);
    const tokens = eth * 1000; // Mock rate
    setTokenAmount(isNaN(tokens) ? "" : tokens.toFixed(2));
  };

  const handleSwap = () => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) return;
    alert(`Swapped ${ethAmount} ETH for ${tokenAmount} tokens!`);
    setEthAmount("");
    setTokenAmount("");
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded space-y-3">
      <h3 className="text-white font-bold">Swap</h3>

      <div className="bg-black/40 border border-white/10 rounded p-3 space-y-2">
        <div>
          <label className="block text-white text-sm mb-1">From (ETH)</label>
          <input
            type="number"
            placeholder="0.0"
            value={ethAmount}
            onChange={(e) => handleEthChange(e.target.value)}
            className="w-full px-3 py-2 bg-black/70 text-white border border-white/10 rounded"
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-1">To (Token)</label>
          <input
            type="text"
            readOnly
            value={tokenAmount}
            className="w-full px-3 py-2 bg-black/70 text-white border border-white/10 rounded"
          />
        </div>

        <button
          onClick={handleSwap}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
        >
          Swap
        </button>
      </div>
    </div>
  );
}



