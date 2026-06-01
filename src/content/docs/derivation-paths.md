---
title: Derivation paths
description: The exact BIP-32 and SLIP-0010 derivation paths walletgenerator.dev uses for each chain.
---

Each wallet set has its own freshly generated 12-word BIP-39 mnemonic. Every chain in the set derives its keys from that single mnemonic at the paths below.

| Chain | Curve | Path |
| --- | --- | --- |
| EVM | secp256k1 | `m/44'/60'/0'/0/0` |
| Solana | ed25519 (SLIP-0010) | `m/44'/501'/0'/0'` |
| Stellar | ed25519 (SLIP-0010) | `m/44'/148'/0'` |
| XRP Ledger | ed25519 | `m/44'/144'/0'` |
| Bitcoin (mainnet) | secp256k1 | `m/84'/0'/0'/0/0` |
| Bitcoin (testnet) | secp256k1 | `m/84'/1'/0'/0/0` |

## Notes by curve

### secp256k1 (EVM, Bitcoin)

Standard BIP-32 derivation. EVM uses the BIP-44 coin type `60'`; Bitcoin uses BIP-84 (`84'`) for native SegWit P2WPKH, with coin type `0'` on mainnet and `1'` on testnet.

### ed25519 (Solana, Stellar)

Ed25519 keys use SLIP-0010, where **every** path segment is hardened. Solana follows the common `m/44'/501'/0'/0'` convention; Stellar follows SEP-0005's `m/44'/148'/0'`.

### XRP Ledger

The XRPL wallet is an ed25519 wallet. A deterministic 16-byte entropy is derived from the mnemonic at `m/44'/144'/0'` and encoded as a standard XRPL ed25519 seed (`sEd…`), from which the keypair and `r…` address are derived.

## Why one mnemonic per set

A "wallet set" is a numbered group of wallets — one per selected chain — that all share a single seed phrase. This mirrors how developers actually import and reproduce test wallets: restore one mnemonic and recover the whole set across chains.
