---
title: Stellar keypairs
description: Stellar keypairs derived over ed25519 (SLIP-0010) at m/44'/148'/0', encoded as StrKey G... public keys and S... secret seeds.
---

Each wallet set includes a Stellar keypair derived from the set's mnemonic at `m/44'/148'/0'` (SEP-0005) using ed25519 (SLIP-0010).

## What you get

| Field | Format | Notes |
| --- | --- | --- |
| Public key | `G...` StrKey | The account address, used to receive and look up the account. |
| Secret key | `S...` StrKey | The signing seed. Anyone with this controls the account. |

## How StrKey encoding works

Stellar does not expose raw key bytes — it wraps them in **StrKey**, a base32 encoding with a version byte and checksum. The generator implements this directly:

1. Prepend a version byte — `6 << 3` (`G`) for accounts, `18 << 3` (`S`) for seeds.
2. Append a **CRC16-XModem** checksum over the version byte + key, little-endian.
3. Base32-encode the result (RFC 4648, no padding).

This is why public keys always start with `G` and secret seeds always start with `S`.

## Use it in a project

The secret seed works directly with the Stellar SDK:

```ts
import { Keypair } from "@stellar/stellar-sdk";

const keypair = Keypair.fromSecret(STELLAR_SECRET_KEY_1);
console.log(keypair.publicKey()); // G...
```

## Testnet vs mainnet

The keypair is identical across [network modes](/security/#network-mode); only the Horizon endpoint and network passphrase differ. A Stellar account **doesn't exist on-ledger until it's created and funded** — on testnet, [Friendbot](https://friendbot.stellar.org) does both at once. See [funding test wallets](/funding/#stellar) for the account-reserve model. The `.env` export includes a `STELLAR_HORIZON_URL` placeholder.

:::caution
The `S...` secret seed is the full signing key. Treat it like a private key — never commit one tied to real funds.
:::
