import { useState } from "react";
import { useAccount } from "wagmi";
import { useApproveSpend } from "./hooks/use-approve-spend";

import type { Address } from "viem";

export const currencies = [
  {
    symbol: "AERO",
    address: "0x940181a94a35a4569e4529a3cdfb74e38fd98631",
    decimals: 18,
    image: "/images/aero.webp",
  },
  {
    symbol: "USDC",
    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    decimals: 6,
    image: "/images/usdc.webp",
  },
  {
    symbol: "CBBTC",
    address: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
    decimals: 8,
    image: "/images/cbbtc.webp",
  },
];

function App() {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const { isPending, isApproving, triggerApprove } = useApproveSpend({
    address: selectedCurrency.address as Address,
    decimals: selectedCurrency.decimals,
    totalAmount: amount,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-400 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h10v10H0V0zm10%2010h10v10H10V10z%22%20fill%3D%22%23ffffff22%22%2F%3E%3C%2Fsvg%3E')] bg-repeat">
      <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm shadow-lg shadow-blue-500 flex flex-col gap-4 justify-center items-center">
        <appkit-button />

        <div className="flex justify-between w-full">
          {currencies.map((currency) => (
            <button
              key={currency.symbol}
              onClick={() => setSelectedCurrency(currency)}
              className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-colors
                ${
                  selectedCurrency === currency
                    ? "bg-white/40 ring-2 ring-white"
                    : "bg-white/20 hover:bg-white/30"
                }`}
            >
              <img src={currency.image} alt={currency.symbol} width={32} />
              <p>{currency.symbol}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg ">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            placeholder="Enter amount"
          />
          <button
            onClick={() => triggerApprove()}
            disabled={isPending || isApproving || !amount}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {isPending || isApproving
              ? "Approving..."
              : "Approve amount to spend"}
          </button>
        </div>
      </div>
      {address && (
        <p className="mt-4 text-sm text-white underline">
          <a
            href={`https://revoke.cash/address/${address}?chainId=8453`}
            target="_blank"
          >
            Check your approvals here
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
