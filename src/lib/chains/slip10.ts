import { hmac } from "@noble/hashes/hmac";
import { sha512 } from "@noble/hashes/sha512";

const HARDENED_OFFSET = 0x80000000;

type Node = { key: Uint8Array; chainCode: Uint8Array };

function ser32(index: number): Uint8Array {
  const out = new Uint8Array(4);
  new DataView(out.buffer).setUint32(0, index, false);
  return out;
}

function master(seed: Uint8Array): Node {
  const I = hmac(sha512, new TextEncoder().encode("ed25519 seed"), seed);
  return { key: I.slice(0, 32), chainCode: I.slice(32) };
}

function ckdPriv(node: Node, index: number): Node {
  const data = new Uint8Array(1 + 32 + 4);
  data[0] = 0x00;
  data.set(node.key, 1);
  data.set(ser32(index), 33);
  const I = hmac(sha512, node.chainCode, data);
  return { key: I.slice(0, 32), chainCode: I.slice(32) };
}

/**
 * SLIP-0010 ed25519 derivation. Every path segment is hardened, per the spec.
 * Returns the 32-byte private key for the given BIP-32 style path.
 */
export function deriveEd25519(seed: Uint8Array, path: string): Uint8Array {
  const segments = path
    .replace(/^m\/?/, "")
    .split("/")
    .filter(Boolean)
    .map((seg) => {
      const hardened = seg.endsWith("'") || seg.endsWith("h");
      const num = parseInt(seg.replace(/['h]$/, ""), 10);
      if (!Number.isFinite(num)) throw new Error(`Invalid path segment: ${seg}`);
      // ed25519 derivation requires hardened indices.
      return num + (hardened ? HARDENED_OFFSET : HARDENED_OFFSET);
    });

  let node = master(seed);
  for (const index of segments) {
    node = ckdPriv(node, index);
  }
  return node.key;
}
