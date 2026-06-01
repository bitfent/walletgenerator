import { ed25519 } from "@noble/curves/ed25519";
import { base32 } from "@scure/base";
import type { StellarWallet } from "../types/wallet";
import { deriveEd25519 } from "./slip10";

const STELLAR_PATH = "m/44'/148'/0'";

const VERSION_ACCOUNT = 6 << 3; // 'G'
const VERSION_SEED = 18 << 3; // 'S'

function crc16xmodem(bytes: Uint8Array): Uint8Array {
  let crc = 0x0000;
  for (const byte of bytes) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  // Stellar appends the checksum little-endian.
  return new Uint8Array([crc & 0xff, (crc >> 8) & 0xff]);
}

function encodeStrKey(versionByte: number, data: Uint8Array): string {
  const payload = new Uint8Array(1 + data.length);
  payload[0] = versionByte;
  payload.set(data, 1);
  const checksum = crc16xmodem(payload);
  const full = new Uint8Array(payload.length + 2);
  full.set(payload, 0);
  full.set(checksum, payload.length);
  // RFC 4648 base32, no padding (lengths align so no '=' is produced).
  return base32.encode(full).replace(/=+$/, "");
}

export function generateStellar(seed: Uint8Array): StellarWallet {
  const privateKey = deriveEd25519(seed, STELLAR_PATH);
  const publicKey = ed25519.getPublicKey(privateKey);

  return {
    chainFamily: "stellar",
    publicKey: encodeStrKey(VERSION_ACCOUNT, publicKey),
    secretKey: encodeStrKey(VERSION_SEED, privateKey),
    derivationPath: STELLAR_PATH,
  };
}
