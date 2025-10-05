export default function LoadingToken() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
      <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
      <div className="h-56 rounded-2xl bg-white/5 animate-pulse md:col-span-2" />
    </div>
  );
}
