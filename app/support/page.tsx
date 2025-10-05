'use client';

import { useMemo, useState } from 'react';

export default function SupportPage() {
  const TELEGRAM = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/trenchtown';
  const EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@trenchtown.bond';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'deploy' | 'bond' | 'trading' | 'bug' | 'other'>('deploy');
  const [message, setMessage] = useState('');

  const mailtoHref = useMemo(() => {
    const subject = `[Support] ${topic.toUpperCase()} — ${name || 'Anon'}`;
    const body =
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}\n\n` +
      `—\nSent from trenchtown.bond/support`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [EMAIL, name, email, topic, message]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Hero / Header */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <img
          src="/images/banners/support-hero.png"
          alt="Support"
          className="w-full h-[380px] object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <h1 className="text-3xl font-extrabold tracking-tight">Support</h1>
          <p className="text-white/90 text-sm">Stuck in the trenches? We’ve got your back.</p>
        </div>
      </section>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href={TELEGRAM}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/10 bg-blue-600/80 hover:bg-blue-600 px-4 py-3 font-semibold text-center"
        >
          ✈️ Join Telegram
        </a>
       
      </div>

      {/* Email form (mailto) */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <h2 className="text-xl font-bold">Email the Team</h2>
        <p className="text-white/70 text-sm">
          This sends via your email app using a <code>mailto:</code> link (no backend required). For live help, use Telegram.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/60">Name</label>
            <input
              className="w-full p-2 rounded bg-white/10 border border-white/15"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or handle"
            />
          </div>
          <div>
            <label className="text-xs text-white/60">Email</label>
            <input
              className="w-full p-2 rounded bg-white/10 border border-white/15"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.xyz"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/60">Topic</label>
          <select
            className="w-full p-2 rounded bg-white/10 border border-white/15"
            value={topic}
            onChange={(e) => setTopic(e.target.value as any)}
          >
            <option value="deploy">Deploy / Launch</option>
            <option value="bond">Bonding / Vault</option>
            <option value="trading">Trading / Swap</option>
            <option value="bug">Bug Report</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-white/60">Message</label>
          <textarea
            className="w-full p-2 rounded bg-white/10 border border-white/15"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the issue, what you expected, and any steps to reproduce."
          />
        </div>

        <div className="flex gap-3">
          <a
            href={mailtoHref}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold"
          >
            Send Email
          </a>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
          >
            Open Telegram
          </a>
        </div>

        <p className="text-xs text-white/50">
          Tip: For faster help, include your wallet address and (if relevant) the token address.
        </p>
      </div>
    </div>
  );
}
