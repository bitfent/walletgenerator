import type { NetworkMode } from "../../lib/types/wallet";

type Props = {
  value: NetworkMode;
  onChange: (mode: NetworkMode) => void;
};

const OPTIONS: { value: NetworkMode; label: string; hint: string }[] = [
  { value: "testnet", label: "Testnet / Devnet", hint: "Recommended for development" },
  { value: "mainnet", label: "Mainnet address format", hint: "Same keys, mainnet formatting" },
];

export default function NetworkModeSelector({ value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-slate-300">Network mode</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                active
                  ? "border-accent-500 bg-accent-500/10"
                  : "border-ink-600 bg-ink-800 hover:border-ink-500"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-white">
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full border ${
                    active ? "border-accent-500" : "border-ink-500"
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-accent-500" />}
                </span>
                {opt.label}
              </span>
              <span className="mt-1 block pl-6 text-xs text-slate-400">{opt.hint}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
