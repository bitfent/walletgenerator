---
title: Supported chains
description: EVM (Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche, Mantle, Linea, zkSync Era), Solana, Stellar, XRP Ledger, and Bitcoin.
---

One EVM wallet covers ten EVM networks. Solana, Stellar, XRP Ledger, and Bitcoin each get native key material.

## Chain families

| Chain / family | Support | Notes |
| --- | --- | --- |
| Ethereum | Native EVM | Same address for all EVM chains |
| Polygon | EVM-compatible | Uses the EVM wallet |
| Arbitrum | EVM-compatible | Uses the EVM wallet |
| Optimism | EVM-compatible | Uses the EVM wallet |
| Base | EVM-compatible | Uses the EVM wallet |
| BNB Chain | EVM-compatible | Uses the EVM wallet |
| Avalanche C-Chain | EVM-compatible | Uses the EVM wallet |
| Mantle | EVM-compatible | Uses the EVM wallet |
| Linea | EVM-compatible | Uses the EVM wallet |
| zkSync Era | EVM-compatible | Uses the EVM wallet |
| Solana | Native | Ed25519 keypair |
| Stellar | Native | Stellar keypair (StrKey) |
| XRP Ledger | Native | XRPL ed25519 wallet |
| Bitcoin | Native | P2WPKH (native SegWit) |

## Outputs per chain

| Chain | Public output | Secret output |
| --- | --- | --- |
| EVM | `0x…` address | Seed phrase + `0x…` private key |
| Solana | base58 public key | Seed phrase + base58 secret key + byte array |
| Stellar | `G…` public key | Seed phrase + `S…` secret key |
| XRP Ledger | `r…` address | Seed phrase + `sEd…` seed + private key |
| Bitcoin | `bc1q…` / `tb1q…` address | Seed phrase + WIF + private key hex |

## The "Secret / Private Key" label

Different chains use different terminology — EVM private keys, Solana secret keys, Stellar secret keys, XRPL seeds, Bitcoin WIF. The UI uses the broader label **Secret / Private Key** so each chain's material is represented accurately rather than flattened into "private key."

## Per-chain guides

- [EVM wallets](/chains/evm/)
- [Solana keypairs](/chains/solana/)
- [Stellar keypairs](/chains/stellar/)
- [XRP Ledger wallets](/chains/xrp/)
- [Bitcoin wallets](/chains/bitcoin/)

See [Derivation paths](/derivation-paths/) for the exact BIP-32 / SLIP-0010 paths used.
