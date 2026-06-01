---
title: Solana keypairs
description: Solana keypairs derived from a BIP-39 mnemonic over ed25519 (SLIP-0010) at m/44'/501'/0'/0', exported as a base58 address plus a 64-byte secret key.
---

Each wallet set includes a Solana keypair derived from the set's mnemonic at `m/44'/501'/0'/0'` using ed25519 (SLIP-0010).

## What you get

| Field | Format | Notes |
| --- | --- | --- |
| Address | base58 | The 32-byte ed25519 public key, base58-encoded. Same value as the public key. |
| Secret key (base58) | base58 | The 64-byte secret key, base58-encoded — the form `Keypair.fromSecretKey` and most wallets expect. |
| Secret key (array) | `number[]` | The same 64 bytes as a JSON array, the form the Solana CLI keypair file uses. |

## The 64-byte secret key

Solana's "secret key" is not just the 32-byte ed25519 private seed — it is the **64-byte concatenation of the private key followed by the public key**. The generator builds it exactly this way:

```text
secretKey = privateKey(32 bytes) || publicKey(32 bytes)
```

Both the base58 string and the integer array encode these same 64 bytes, so either can be restored into the same keypair.

## Use it in a project

The base58 secret key drops straight into `@solana/web3.js`:

```ts
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const keypair = Keypair.fromSecretKey(bs58.decode(SOLANA_SECRET_KEY_BASE58_1));
```

To use the array form as a CLI keypair file, write the `secretKeyArray` JSON to `~/.config/solana/id.json` (or any path you point `--keypair` at).

## Testnet vs mainnet

The Solana keypair is identical regardless of [network mode](/security/#network-mode) — only the RPC endpoint changes. The `.env` export appends a `SOLANA_RPC_URL` placeholder; point it at devnet, testnet, or a mainnet RPC as needed. Fund devnet addresses with `solana airdrop` — see [funding test wallets](/funding/#accounts-with-rent-solana).

:::caution
The base58 secret key and the integer array are the **full signing key**. Anyone who has either can spend the account. Keep development keys out of source control.
:::
