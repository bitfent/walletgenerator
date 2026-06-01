import type { WalletSet } from "../../lib/types/wallet";
import { CHAINS } from "../../lib/types/chains";
import { copyToClipboard } from "../../lib/utils/clipboard";
import { truncateMiddle } from "../../lib/utils/format";
import { REVEAL_SEED_WARNING } from "../../lib/utils/security";
import SecretReveal from "./SecretReveal";
import { useState } from "react";

type ChainRow = {
  chainId: string;
  label: string;
  network: string;
  address: string;
  secretLabel: string;
  secret: string;
  note: string;
};

function buildRows(set: WalletSet): ChainRow[] {
  const meta = (id: string) => CHAINS.find((c) => c.id === id)!;
  const network = (id: string) =>
    set.networkMode === "mainnet" ? meta(id).mainnetLabel : meta(id).testnetLabel;
  const rows: ChainRow[] = [];

  if (set.evm) {
    rows.push({
      chainId: "evm",
      label: "EVM",
      network: network("evm"),
      address: set.evm.address,
      secretLabel: "Private key",
      secret: set.evm.privateKey,
      note: meta("evm").note,
    });
  }
  if (set.solana) {
    rows.push({
      chainId: "solana",
      label: "Solana",
      network: network("solana"),
      address: set.solana.address,
      secretLabel: "Secret key",
      secret: set.solana.secretKeyBase58,
      note: meta("solana").note,
    });
  }
  if (set.stellar) {
    rows.push({
      chainId: "stellar",
      label: "Stellar",
      network: network("stellar"),
      address: set.stellar.publicKey,
      secretLabel: "Secret key",
      secret: set.stellar.secretKey,
      note: meta("stellar").note,
    });
  }
  if (set.xrp) {
    rows.push({
      chainId: "xrp",
      label: "XRP Ledger",
      network: network("xrp"),
      address: set.xrp.address,
      secretLabel: "Seed",
      secret: set.xrp.seed,
      note: meta("xrp").note,
    });
  }
  if (set.bitcoin) {
    rows.push({
      chainId: "bitcoin",
      label: "Bitcoin",
      network: network("bitcoin"),
      address: set.bitcoin.address,
      secretLabel: "WIF",
      secret: set.bitcoin.wif,
      note: meta("bitcoin").note,
    });
  }
  return rows;
}

function AddressCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    if (await copyToClipboard(value)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-slate-200" title={value}>
        {truncateMiddle(value, 10, 8)}
      </span>
      <button
        type="button"
        onClick={handle}
        className="shrink-0 rounded border border-ink-600 px-1.5 py-0.5 text-[11px] text-slate-300 hover:border-ink-500"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

type Props = {
  set: WalletSet;
  forceReveal: boolean;
};

export default function WalletRow({ set, forceReveal }: Props) {
  const rows = buildRows(set);

  return (
    <tbody className="border-t-2 border-ink-700">
      <tr className="bg-ink-800/40">
        <td className="px-3 py-2 align-top text-sm font-semibold text-white">#{set.index}</td>
        <td className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Seed phrase
        </td>
        <td className="px-3 py-2" colSpan={4}>
          <SecretReveal
            value={set.seedPhrase}
            forceReveal={forceReveal}
            confirmMessage={REVEAL_SEED_WARNING}
          />
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={`${set.index}-${row.chainId}`} className="border-t border-ink-800">
          <td className="px-3 py-2" />
          <td className="px-3 py-2 align-top text-sm font-medium text-white">{row.label}</td>
          <td className="px-3 py-2 align-top text-xs text-slate-400">{row.network}</td>
          <td className="px-3 py-2 align-top">
            <AddressCell value={row.address} />
          </td>
          <td className="px-3 py-2 align-top">
            <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">
              {row.secretLabel}
            </div>
            <SecretReveal value={row.secret} forceReveal={forceReveal} />
          </td>
          <td className="px-3 py-2 align-top text-xs text-slate-400">{row.note}</td>
        </tr>
      ))}
    </tbody>
  );
}
