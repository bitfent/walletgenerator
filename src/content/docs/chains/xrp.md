---
title: XRP Ledger wallets
description: XRP Ledger ed25519 wallets built from a deterministic seed derived at m/44'/144'/0', encoded as a standard sEd... family seed with an r... classic address.
---

Each wallet set includes an XRP Ledger (XRPL) wallet. It is an **ed25519** wallet built deterministically from the set's mnemonic.

## What you get

| Field | Format | Notes |
| --- | --- | --- |
| Address | `r...` classic address | The account address on the XRPL. |
| Seed | `sEd...` family seed | The standard XRPL secret. `sEd` prefix marks it as ed25519. |
| Private key | hex | The derived ed25519 private key. |

## How the wallet is derived

XRPL seeds are normally 16 bytes of entropy, not a BIP-39 mnemonic. To keep every wallet in a set reproducible from one phrase, the generator bridges the two:

1. Derive an ed25519 key from the mnemonic at `m/44'/144'/0'` (SLIP-0010).
2. Take the first **16 bytes** as XRPL entropy.
3. Encode it as a standard XRPL ed25519 family seed (`encodeSeed(entropy, "ed25519")`) → `sEd...`.
4. Derive the keypair and `r...` address from that seed with `ripple-keypairs`.

Because step 3 produces a normal XRPL seed, you can import the `sEd...` value into any XRPL tool and get the same account.

## Use it in a project

```ts
import { Wallet } from "xrpl";

const wallet = Wallet.fromSeed(XRP_SEED_1); // sEd...
console.log(wallet.classicAddress); // r...
```

## Testnet vs mainnet

The wallet is identical across [network modes](/security/#network-mode). An XRPL account **must be activated with a base reserve before it exists on-ledger** — on testnet, the [XRPL Testnet Faucet](https://xrpl.org/xrp-testnet-faucet.html) activates and funds the `r...` address in one step. See [funding test wallets](/funding/#xrp-ledger) for the reserve model. The `.env` export includes an `XRPL_WEBSOCKET_URL` placeholder.

:::caution
The `sEd...` seed is the full signing key for the account. Keep it out of source control.
:::
