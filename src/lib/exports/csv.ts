import type { WalletSet } from "../types/wallet";

const COLUMNS = [
  "index",
  "network_mode",
  "seed_phrase",
  "evm_address",
  "evm_private_key",
  "solana_address",
  "solana_secret_key_base58",
  "stellar_public_key",
  "stellar_secret_key",
  "xrp_address",
  "xrp_seed",
  "xrp_private_key",
  "bitcoin_address",
  "bitcoin_wif",
  "bitcoin_private_key_hex",
];

function escape(value: string | undefined): string {
  const v = value ?? "";
  if (/[",\n]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export function toCsv(sets: WalletSet[]): string {
  const rows = [COLUMNS.join(",")];
  for (const set of sets) {
    const cells = [
      String(set.index),
      set.networkMode,
      set.seedPhrase,
      set.evm?.address,
      set.evm?.privateKey,
      set.solana?.address,
      set.solana?.secretKeyBase58,
      set.stellar?.publicKey,
      set.stellar?.secretKey,
      set.xrp?.address,
      set.xrp?.seed,
      set.xrp?.privateKey,
      set.bitcoin?.address,
      set.bitcoin?.wif,
      set.bitcoin?.privateKeyHex,
    ];
    rows.push(cells.map(escape).join(","));
  }
  return rows.join("\n") + "\n";
}
