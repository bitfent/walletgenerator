import { HDKey } from "@scure/bip32";
import { bech32, base58 } from "@scure/base";
import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { bytesToHex } from "@noble/hashes/utils";
import type { BitcoinWallet, NetworkMode } from "../types/wallet";

const MAINNET_PATH = "m/84'/0'/0'/0/0";
const TESTNET_PATH = "m/84'/1'/0'/0/0";

function hash160(data: Uint8Array): Uint8Array {
  return ripemd160(sha256(data));
}

function base58check(payload: Uint8Array): string {
  const checksum = sha256(sha256(payload)).slice(0, 4);
  const full = new Uint8Array(payload.length + 4);
  full.set(payload, 0);
  full.set(checksum, payload.length);
  return base58.encode(full);
}

function encodeWif(privateKey: Uint8Array, network: "mainnet" | "testnet"): string {
  const prefix = network === "mainnet" ? 0x80 : 0xef;
  const payload = new Uint8Array(1 + 32 + 1);
  payload[0] = prefix;
  payload.set(privateKey, 1);
  payload[33] = 0x01; // compressed public key flag
  return base58check(payload);
}

export function generateBitcoin(seed: Uint8Array, networkMode: NetworkMode): BitcoinWallet {
  const network = networkMode === "mainnet" ? "mainnet" : "testnet";
  const path = network === "mainnet" ? MAINNET_PATH : TESTNET_PATH;
  const hrp = network === "mainnet" ? "bc" : "tb";

  const node = HDKey.fromMasterSeed(seed).derive(path);
  if (!node.privateKey || !node.publicKey) {
    throw new Error("Failed to derive Bitcoin key material");
  }

  const program = hash160(node.publicKey);
  const words = [0, ...bech32.toWords(program)]; // witness version 0
  const address = bech32.encode(hrp, words);

  return {
    chainFamily: "bitcoin",
    network,
    addressType: "p2wpkh",
    address,
    wif: encodeWif(node.privateKey, network),
    privateKeyHex: bytesToHex(node.privateKey),
    publicKey: bytesToHex(node.publicKey),
    derivationPath: path,
  };
}
