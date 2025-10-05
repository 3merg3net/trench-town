export default function LaunchForm() {
  return (
    <form className="space-y-4 p-4 bg-white/5 border border-white/10 rounded">
      <div>
        <label className="block text-white text-sm mb-1">Token Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-black/50 text-white border border-white/10"
          placeholder="MyToken"
        />
      </div>
      <div>
        <label className="block text-white text-sm mb-1">Token Symbol</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-black/50 text-white border border-white/10"
          placeholder="MTK"
        />
      </div>
      <div>
        <label className="block text-white text-sm mb-1">Bond Market Cap</label>
        <select className="w-full px-3 py-2 rounded bg-black/50 text-white border border-white/10">
          <option value="25000">25k</option>
          <option value="50000">50k</option>
          <option value="100000">100k</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded mt-2"
      >
        Launch Token
      </button>
    </form>
  );
}

