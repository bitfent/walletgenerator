import { MAX_QUANTITY, QUANTITY_PRESETS } from "../../lib/types/chains";

type Props = {
  value: number;
  onChange: (count: number) => void;
};

export default function QuantitySelector({ value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-slate-300">Wallet sets</legend>
      <div className="flex flex-wrap items-center gap-2">
        {QUANTITY_PRESETS.map((preset) => {
          const active = preset === value;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              aria-pressed={active}
              className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-accent-500 bg-accent-500/10 text-white"
                  : "border-ink-600 bg-ink-800 text-slate-300 hover:border-ink-500"
              }`}
            >
              {preset}
            </button>
          );
        })}
        <label className="flex items-center gap-2 text-sm text-slate-400">
          <span>Custom</span>
          <input
            type="number"
            min={1}
            max={MAX_QUANTITY}
            value={value}
            onChange={(e) => {
              const n = Math.max(1, Math.min(MAX_QUANTITY, Number(e.target.value) || 1));
              onChange(n);
            }}
            className="w-20 rounded-lg border border-ink-600 bg-ink-800 px-2 py-2 text-white focus:border-accent-500 focus:outline-none"
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-slate-500">Maximum {MAX_QUANTITY} wallet sets.</p>
    </fieldset>
  );
}
