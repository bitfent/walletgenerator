---
title: Quickstart
description: Generate, reveal, and export your first batch of developer wallets in under a minute.
---

The whole workflow lives on the [generator](/). No account, no install, no network access required.

## 1. Select a network mode

Choose **Testnet / Devnet** (the default) or **Mainnet address format**.

For most chains the keys are identical across networks — only the address formatting and network configuration change. Bitcoin is the exception: testnet uses a `tb1q…` prefix and a different WIF version byte.

## 2. Select chains

EVM, Solana, Stellar, XRP Ledger, and Bitcoin are all selected by default. Deselect any you don't need. EVM-compatible chains (Polygon, Arbitrum, …) are represented as compatibility labels on the single EVM wallet rather than separate wallets — see [EVM wallets](/chains/evm/).

## 3. Choose a quantity

Pick a preset (1, 5, 10, 20, 50, 100) or enter a custom number. The default is **20** and the maximum is **100** wallet sets.

## 4. Generate

Click **Generate developer wallets**. Each wallet set gets its own freshly generated 12-word mnemonic, and every selected chain derives its keys from that mnemonic.

## 5. Review

Results appear in a table grouped by wallet set. Public addresses are shown; **seed phrases and secrets are hidden by default.** Per value you can:

- **Reveal** / **Hide** a single secret
- **Copy** an address, seed phrase, or secret
- **Reveal all secrets** (with a confirmation prompt)
- **Clear generated wallets** to wipe everything from memory

:::note
Generated wallets live in memory only. A page refresh clears them. If you want to keep a set, export it.
:::

## 6. Export

Open the export panel, pick a format, and **Copy** or **Download**:

- [`.env`](/export-formats/#env) — ready-to-paste variables + RPC placeholders
- [JSON](/export-formats/#json) — structured wallet sets
- [CSV](/export-formats/#csv) — one row per wallet set
- [Hardhat](/guides/hardhat/) — `hardhat.config.ts`
- [Foundry](/guides/foundry/) — `.env` + `foundry.toml`
