import { encodeSeed } from "ripple-address-codec";
import { deriveKeypair, deriveAddress } from "ripple-keypairs";
import type { XrpWallet } from "../types/wallet";
import { deriveEd25519 } from "./slip10";

const XRP_PATH = "m/44'/144'/0'";

export function generateXrp(seed: Uint8Array): XrpWallet {
  // Derive a deterministic 16-byte entropy from the wallet set's seed, then
  // build a standard XRPL ed25519 keypair from it.
  const entropy = deriveEd25519(seed, XRP_PATH).slice(0, 16);
  const xrplSeed = encodeSeed(entropy, "ed25519");
  const { publicKey, privateKey } = deriveKeypair(xrplSeed);
  const address = deriveAddress(publicKey);

  return {
    chainFamily: "xrp",
    address,
    seed: xrplSeed,
    privateKey,
    publicKey,
    derivationPath: XRP_PATH,
  };
}
