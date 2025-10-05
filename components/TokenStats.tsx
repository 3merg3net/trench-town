// components/TokenStats.tsx

type Props = {
  address: string;
};

export default function TokenStats({ address }: Props) {
  // Dummy data for now — hook up to onchain data later
  const stats = {
    name: "$TRENCH",
    bondMC: 50000,
    currentMC: 41234,
    lpLocked: true,
    deployer: "0x123...abc",
  };

  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
      <h3 className="text-xl font-bold mb-2">📊 Token Stats</h3>
      <p className="text-sm text-white/60">Address: {address}</p>
      <ul className="mt-2 space-y-1 text-sm">
        <li>🪙 Name: {stats.name}</li>
        <li>📈 Current MC: ${stats.currentMC.toLocaleString()}</li>
        <li>🎯 Bond MC: ${stats.bondMC.toLocaleString()}</li>
        <li>🔒 LP Locked: {stats.lpLocked ? "Yes" : "No"}</li>
        <li>🧑‍🚀 Deployer: {stats.deployer}</li>
      </ul>
    </div>
  );
}
