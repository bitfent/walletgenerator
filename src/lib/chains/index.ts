import { generateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import type { GenerateOptions, WalletSet } from "../types/wallet";
import { generateEvm } from "./evm";
import { generateSolana } from "./solana";
import { generateStellar } from "./stellar";
import { generateXrp } from "./xrp";
import { generateBitcoin } from "./bitcoin";

export function generateWalletSet(
  index: number,
  options: Pick<GenerateOptions, "networkMode" | "chains">,
): WalletSet {
  const { networkMode, chains } = options;
  const mnemonic = generateMnemonic(wordlist, 128); // 12 words
  const seed = mnemonicToSeedSync(mnemonic);

  const set: WalletSet = {
    index,
    createdAt: new Date().toISOString(),
    networkMode,
    seedPhrase: mnemonic,
  };

  if (chains.includes("evm")) set.evm = generateEvm(mnemonic);
  if (chains.includes("solana")) set.solana = generateSolana(seed);
  if (chains.includes("stellar")) set.stellar = generateStellar(seed);
  if (chains.includes("xrp")) set.xrp = generateXrp(seed);
  if (chains.includes("bitcoin")) set.bitcoin = generateBitcoin(seed, networkMode);

  return set;
}

export function generateWalletSets(options: GenerateOptions): WalletSet[] {
  const sets: WalletSet[] = [];
  for (let i = 1; i <= options.count; i++) {
    sets.push(generateWalletSet(i, options));
  }
  return sets;
}
