import type { WalletSet } from "../types/wallet";

export function toJson(sets: WalletSet[]): string {
  const networkMode = sets[0]?.networkMode ?? "testnet";
  const doc = {
    generatedBy: "walletgenerator.dev",
    generatedAt: new Date().toISOString(),
    networkMode,
    warning: "Development/test wallets only. Do not use for production funds.",
    wallets: sets.map((set) => {
      const wallet: Record<string, unknown> = {
        index: set.index,
        seedPhrase: set.seedPhrase,
      };
      if (set.evm) {
        wallet.evm = {
          address: set.evm.address,
          privateKey: set.evm.privateKey,
          compatibleChains: set.evm.compatibleChains,
        };
      }
      if (set.solana) {
        wallet.solana = {
          address: set.solana.address,
          secretKeyBase58: set.solana.secretKeyBase58,
          secretKeyArray: set.solana.secretKeyArray,
        };
      }
      if (set.stellar) {
        wallet.stellar = {
          publicKey: set.stellar.publicKey,
          secretKey: set.stellar.secretKey,
        };
      }
      if (set.xrp) {
        wallet.xrp = {
          address: set.xrp.address,
          seed: set.xrp.seed,
          privateKey: set.xrp.privateKey,
        };
      }
      if (set.bitcoin) {
        wallet.bitcoin = {
          network: set.bitcoin.network,
          addressType: set.bitcoin.addressType,
          address: set.bitcoin.address,
          wif: set.bitcoin.wif,
          privateKeyHex: set.bitcoin.privateKeyHex,
        };
      }
      return wallet;
    }),
  };

  return JSON.stringify(doc, null, 2) + "\n";
}
