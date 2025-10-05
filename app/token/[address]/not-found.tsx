import Link from 'next/link';
export default function NotFoundToken() {
  return (
    <div className="max-w-lg mx-auto text-center space-y-4 py-16">
      <h1 className="text-2xl font-extrabold">Token not found</h1>
      <p className="text-white/70">Check the address and try again.</p>
      <Link href="/tokens" className="inline-block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
        Back to Tokens
      </Link>
    </div>
  );
}
