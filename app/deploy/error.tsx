'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="tt-card p-6">
      <h2 className="font-bold text-xl mb-2">Something went wrong on Deploy</h2>
      <pre className="text-xs whitespace-pre-wrap text-red-400">{error?.message}</pre>
      <button onClick={() => reset()} className="tt-btn mt-3">Try again</button>
    </div>
  );
}
