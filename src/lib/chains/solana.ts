import { ed25519 } from "@noble/curves/ed25519";
import { base58 } from "@scure/base";
import type { SolanaWallet } from "../types/wallet";
import { deriveEd25519 } from "./slip10";

const SOLANA_PATH = "m/44'/501'/0'/0'";

export function generateSolana(seed: Uint8Array): SolanaWallet {
  const privateKey = deriveEd25519(seed, SOLANA_PATH);
  const publicKey = ed25519.getPublicKey(privateKey);

  // Solana secret keys are the 64-byte concatenation of private + public key.
  const secretKey = new Uint8Array(64);
  secretKey.set(privateKey, 0);
  secretKey.set(publicKey, 32);

  const address = base58.encode(publicKey);

  return {
    chainFamily: "solana",
    address,
    publicKey: address,
    secretKeyBase58: base58.encode(secretKey),
    secretKeyArray: Array.from(secretKey),
    derivationPath: SOLANA_PATH,
  };
}
