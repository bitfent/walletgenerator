---
title: Bitcoin wallets
description: Bitcoin native SegWit (P2WPKH) wallets derived with BIP-84 at m/84'/0'/0'/0/0 (mainnet) or m/84'/1'/0'/0/0 (testnet), exported as bech32 addresses with WIF and hex keys.
---

Each wallet set includes a Bitcoin **native SegWit (P2WPKH)** wallet derived with BIP-84.

## What you get

| Field | Format | Notes |
| --- | --- | --- |
| Address | bech32 | `bc1q...` on mainnet, `tb1q...` on testnet. Witness version 0. |
| WIF | base58check | The standard wallet-import-format private key. |
| Private key | hex | The raw 32-byte private key. |
| Public key | hex | The compressed public key. |

## Derivation and address type

The address type and derivation path depend on the [network mode](/security/#network-mode):

| Network | Path | HRP | Address prefix |
| --- | --- | --- | --- |
| mainnet | `m/84'/0'/0'/0/0` | `bc` | `bc1q...` |
| testnet | `m/84'/1'/0'/0/0` | `tb` | `tb1q...` |

Both use BIP-84 (`84'`) for native SegWit. Only the BIP-44 coin type changes — `0'` for mainnet, `1'` for all testnets — which is what flips the address prefix.

The address is built by hashing the compressed public key with `HASH160` (SHA-256 then RIPEMD-160) and bech32-encoding the 20-byte program with witness version 0.

## WIF encoding

The WIF is base58check over `version || privateKey || compression-flag`:

- version byte `0x80` (mainnet) or `0xef` (testnet)
- the 32-byte private key
- a trailing `0x01` marking a compressed public key

## Use it in a project

The WIF imports into Bitcoin tooling directly — for example with `bitcoinjs-lib`:

```ts
import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";

const ECPair = ECPairFactory(ecc);
const keyPair = ECPair.fromWIF(BITCOIN_WIF_1, bitcoin.networks.testnet);
```

## Testnet vs mainnet

Switching network mode regenerates the address with the correct path and prefix. Bitcoin has no account or reserve — just send testnet sats from a [Bitcoin testnet faucet](https://coinfaucet.eu/en/btc-testnet/) and spend the resulting UTXOs. See [funding test wallets](/funding/#utxo-bitcoin). The `.env` export records the selected `BITCOIN_NETWORK` and address type.

:::caution
The WIF and hex private key both fully control the address. Never reuse a development key for an address holding real BTC.
:::
