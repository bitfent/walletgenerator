import type { ChainId, NetworkMode } from "../../lib/types/wallet";
import { CHAINS } from "../../lib/types/chains";

type Props = {
  selected: ChainId[];
  networkMode: NetworkMode;
  onToggle: (chain: ChainId) => void;
};

export default function ChainSelector({ selected, networkMode, onToggle }: Props) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-slate-300">Chains</legend>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CHAINS.map((chain) => {
          const active = selected.includes(chain.id);
          const network = networkMode === "mainnet" ? chain.mainnetLabel : chain.testnetLabel;
          return (
            <label
              key={chain.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition-colors ${
                active
                  ? "border-accent-500 bg-accent-500/10"
                  : "border-ink-600 bg-ink-800 hover:border-ink-500"
              }`}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onToggle(chain.id)}
                className="mt-0.5 h-4 w-4 accent-accent-500"
              />
              <span>
                <span className="block text-sm font-medium text-white">{chain.label}</span>
                <span className="block text-xs text-slate-400">{network}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
