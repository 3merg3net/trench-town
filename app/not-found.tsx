import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto text-center space-y-4 py-20">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="text-white/70">The trenches are deep, but this path isn’t one of them.</p>
      <Link href="/" className="inline-block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">Return home</Link>
    </div>
  );
}
