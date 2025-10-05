'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Msg = {
  id: string;
  who: 'you' | 'anon';
  text: string;
  at: number; // epoch ms
};

const STORAGE_KEY = 'bunker_msgs_v1';

export default function BunkerChat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  // load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMsgs(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch {}
    // scroll to bottom on new message
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  const canSend = text.trim().length > 0 && text.trim().length <= 600;

  const send = () => {
    if (!canSend) return;
    const you: Msg = {
      id: crypto.randomUUID(),
      who: 'you',
      text: text.trim(),
      at: Date.now(),
    };
    setMsgs((m) => [...m, you]);
    setText('');

    // playful “radio static” bot reply (placeholder)
    const reply: Msg = {
      id: crypto.randomUUID(),
      who: 'anon',
      text: '📻 Copy that. Stand by for bond updates…',
      at: Date.now() + 400,
    };
    setTimeout(() => setMsgs((m) => [...m, reply]), 450);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const time = (ms: number) =>
    new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const disclaimer = useMemo(
    () => (
      <div className="text-[11px] text-white/50 leading-relaxed">
        ⚠️ DYOR. Nothing here is financial advice. Do not share private keys or seed phrases. Mods can purge messages if needed.
      </div>
    ),
    []
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* chat area */}
      <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/trenchtown/icon-radio.png" className="w-4 h-4" alt="" />
            <span className="text-sm font-semibold">Bunker Chat</span>
          </div>
          <span className="text-[11px] text-white/50">{msgs.length} msgs</span>
        </div>

        {/* messages */}
        <div ref={boxRef} className="h-[420px] overflow-y-auto p-4 space-y-3">
          {msgs.length === 0 ? (
            <div className="text-sm text-white/60">
              No messages yet. Say gm (Shift+Enter for newline).
            </div>
          ) : (
            msgs.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] md:max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                  m.who === 'you'
                    ? 'bg-green-600/25 border border-green-600/30 ml-auto'
                    : 'bg-white/10 border border-white/10'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wide text-white/50 mb-0.5">
                  {m.who === 'you' ? 'You' : 'Anon'} · {time(m.at)}
                </div>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            ))
          )}
        </div>

        {/* composer */}
        <div className="border-t border-white/10 p-3">
          <div className="rounded-xl bg-black/40 border border-white/10 p-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKey}
              rows={3}
              placeholder="Type your degen dispatch…"
              className="w-full bg-transparent outline-none resize-none text-sm"
              maxLength={600}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-white/40">
                Enter to send · Shift+Enter for newline
              </span>
              <button
                onClick={send}
                disabled={!canSend}
                className="px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50 text-sm font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* right info panel */}
      <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <img src="/images/trenchtown/icon-flag.png" className="w-5 h-5" alt="" />
          <h3 className="font-semibold">Bunker Rules</h3>
        </div>
        {disclaimer}
        <ul className="text-sm text-white/75 space-y-2">
          <li>• No spam/scams. Mods purge obvious grift.</li>
          <li>• Keep it on-topic: bond progress, launches, tips.</li>
          <li>• Respect fellow soldiers. No doxxing.</li>
        </ul>

        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <img src="/images/trenchtown/icon-rifle.png" className="w-5 h-5" alt="" />
            <h4 className="font-semibold text-sm">Useful Links</h4>
          </div>
          <div className="mt-2 grid gap-2">
            <a className="rounded border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href="/deploy">
              🚀 Deploy a Token
            </a>
            <a className="rounded border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href="/faq">
              📚 Read the FAQ
            </a>
            <a className="rounded border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href="/">
              🪖 Browse Tokens
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
