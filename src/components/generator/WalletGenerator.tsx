import { useState } from "react";
import type { ChainId, NetworkMode, WalletSet } from "../../lib/types/wallet";
import { CHAINS, DEFAULT_QUANTITY } from "../../lib/types/chains";
import { generateWalletSets } from "../../lib/chains";
import { REVEAL_ALL_WARNING, SECURITY_SUMMARY } from "../../lib/utils/security";
import NetworkModeSelector from "./NetworkModeSelector";
import ChainSelector from "./ChainSelector";
import QuantitySelector from "./QuantitySelector";
import WalletTable from "./WalletTable";
import ExportPanel from "./ExportPanel";

const DEFAULT_CHAINS = CHAINS.filter((c) => c.defaultSelected).map((c) => c.id);

export default function WalletGenerator() {
  const [networkMode, setNetworkMode] = useState<NetworkMode>("testnet");
  const [chains, setChains] = useState<ChainId[]>(DEFAULT_CHAINS);
  const [count, setCount] = useState(DEFAULT_QUANTITY);
  const [sets, setSets] = useState<WalletSet[]>([]);
  const [revealAll, setRevealAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleChain = (chain: ChainId) => {
    setChains((prev) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain],
    );
  };

  const handleGenerate = async () => {
    if (chains.length === 0) {
      setError("Select at least one chain.");
      return;
    }
    setError(null);
    setBusy(true);
    setRevealAll(false);
    // Yield once so the busy state can paint before the synchronous crypto work.
    await new Promise((resolve) => setTimeout(resolve, 10));
    try {
      const result = generateWalletSets({ count, networkMode, chains });
      setSets(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate wallets.");
    } finally {
      setBusy(false);
    }
  };

  const handleRevealAll = () => {
    if (!revealAll && !window.confirm(REVEAL_ALL_WARNING)) return;
    setRevealAll((r) => !r);
  };

  const handleClear = () => {
    setSets([]);
    setRevealAll(false);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="card space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <NetworkModeSelector value={networkMode} onChange={setNetworkMode} />
          <QuantitySelector value={count} onChange={setCount} />
        </div>
        <ChainSelector selected={chains} networkMode={networkMode} onToggle={toggleChain} />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={busy}
            className="btn-primary px-6 py-3 text-base disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Generating…" : "Generate developer wallets"}
          </button>
          {sets.length > 0 && (
            <>
              <button type="button" onClick={handleRevealAll} className="btn-ghost">
                {revealAll ? "Hide all secrets" : "Reveal all secrets"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20"
              >
                Clear generated wallets
              </button>
            </>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <p className="rounded-lg border border-ink-700 bg-ink-800/50 px-4 py-3 text-xs text-slate-400">
          {SECURITY_SUMMARY}
        </p>
      </div>

      {sets.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {sets.length} wallet set{sets.length === 1 ? "" : "s"}
            </h2>
            <span className="text-sm text-slate-400">
              {networkMode === "mainnet" ? "Mainnet address format" : "Testnet / Devnet"}
            </span>
          </div>
          <WalletTable sets={sets} forceReveal={revealAll} />
          <ExportPanel sets={sets} />
        </div>
      )}
    </div>
  );
}
