// components/TrenchBagItem.tsx

type Token = {
  name: string;
  amount: number;
  price: number;
};

export default function TrenchBagItem({ token }: { token: Token }) {
  const totalValue = (token.amount * token.price).toFixed(4);

  return (
    <li className="p-4 bg-white/5 border border-white/10 rounded flex justify-between items-center">
      <div>
        <h3 className="font-bold">{token.name}</h3>
        <p className="text-sm text-white/60">
          Amount: {token.amount.toLocaleString()}
        </p>
        <p className="text-sm text-white/60">
          Value: ${totalValue}
        </p>
      </div>
      <button className="text-sm text-green-400 hover:underline">
        🛒 Swap
      </button>
    </li>
  );
}
