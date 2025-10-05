'use client';

import { useState } from 'react';

export default function TokenBunker({ token }: { token: string }) {
  const [msgs, setMsgs] = useState<string[]>([
    `Welcome to the bunker for ${token}. Keep it clean.`,
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs((m) => [...m, t]);
    setInput('');
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Bunker</h3>
      <div className="h-56 overflow-auto rounded border border-white/10 bg-black/30 p-3 space-y-2 text-sm">
        {msgs.map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded px-2 py-1">
            {m}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-white/5 border border-white/10"
          placeholder={`Chat about ${token}…`}
        />
        <button onClick={send} className="px-3 py-2 rounded bg-white/10 border border-white/10 hover:bg-white/20">
          Send
        </button>
      </div>
    </div>
  );
}

