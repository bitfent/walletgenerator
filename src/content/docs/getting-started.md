---
title: Introduction
description: walletgenerator.dev is an open-source, browser-only tool for batch-generating developer wallet sets across EVM, Solana, Stellar, XRP Ledger, and Bitcoin.
---

**walletgenerator.dev** is an open-source, browser-based utility for generating batches of blockchain wallets for development, testing, demos, QA, scripts, faucets, and hackathons.

> Generate developer wallet sets across EVM, Solana, Stellar, XRP Ledger, and Bitcoin — including seed phrases and private keys — then export them directly into your development stack.

It is a **developer tool**, not a consumer wallet or custody product. Every seed phrase, private key, and export file is produced locally in your browser. Nothing is sent to a server.

:::caution[Development and testing only]
Generated wallets are intended for local development, testnets, QA, demos, and hackathons. **Do not use them to store meaningful mainnet funds.** See the [Security model](/security/).
:::

## What you get

For each wallet set, the generator produces a 12-word seed phrase plus chain-specific key material:

- **EVM** — one `0x` address + private key that works across Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche C-Chain, Mantle, Linea, and zkSync Era
- **Solana** — base58 address, base58 secret key, and the 64-byte secret key array
- **Stellar** — `G…` public key and `S…` secret key
- **XRP Ledger** — `r…` address and `sEd…` seed
- **Bitcoin** — native SegWit P2WPKH address (`bc1q…`/`tb1q…`), WIF, and private key hex

Export everything to **`.env`, JSON, CSV, Hardhat, or Foundry**.

## Who it's for

- Smart-contract developers generating accounts for Hardhat, Foundry, and Anvil
- dApp developers testing multiple users and wallet states
- Solana, Stellar, XRPL, and Bitcoin developers needing testnet keypairs
- Hackathon teams, QA engineers, DevRel, and educators who need disposable wallets fast

## What it is *not* for

Long-term custody, production treasury management, cold storage, consumer savings, or key management for production systems. The tool can technically produce mainnet-valid wallets, but its entire design points at disposable, testing-grade use.

## Next steps

- [Quickstart](/quickstart/) — generate your first wallet set
- [Security model](/security/) — how keys stay local
- [Supported chains](/supported-chains/) — what each chain returns
- [Export formats](/export-formats/) — `.env`, JSON, CSV, Hardhat, Foundry
