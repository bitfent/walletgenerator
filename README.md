# walletgenerator.dev

Open-source, browser-based developer wallet generator. Batch-create wallet sets across **EVM, Solana, Stellar, XRP Ledger, and Bitcoin** — including seed phrases and chain-specific private keys — then export directly into `.env`, JSON, CSV, Hardhat, and Foundry.

> The fastest way to create test wallets for blockchain development.

**Development and testing only.** Do not use generated wallets for meaningful mainnet funds.

## Features

- Generate 1–100 wallet sets (default 20), each spanning the chains you select
- Seed phrase **and** chain-specific secret material per set
- One EVM wallet compatible with Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche C-Chain, Mantle, Linea, and zkSync Era
- Testnet/devnet and mainnet address modes
- Secrets hidden by default; reveal/copy individually or all at once
- Exports: `.env`, JSON, CSV, Hardhat config, Foundry config + `foundry.toml`
- Runs entirely in your browser — no backend, no account, no tracking

## Security model

- **Browser-only generation.** Seed phrases, private keys, and exports never leave your machine.
- **No persistence.** Keys live in memory only; a refresh clears everything.
- **No analytics on the generator.**
- **Open source.** Inspect, audit, self-host, and contribute.

The generator is designed to run under a strict CSP with `connect-src 'none'`. See the in-app [Security page](src/pages/security.astro).

## Tech stack

- [Astro](https://astro.build) for static pages, docs, and SEO
- React + TypeScript island for the interactive generator
- Tailwind CSS
- Cryptography: `@scure/bip39`, `@scure/bip32`, `@noble/curves`, `@noble/hashes`, `@scure/base`, `ethers`, `ripple-keypairs`, `ripple-address-codec`

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # static production build
npm run preview  # preview the build
```

## Derivation paths

| Chain   | Path                  |
| ------- | --------------------- |
| EVM     | `m/44'/60'/0'/0/0`    |
| Solana  | `m/44'/501'/0'/0'`    |
| Stellar | `m/44'/148'/0'`       |
| XRP     | `m/44'/144'/0'`       |
| Bitcoin | `m/84'/0'/0'/0/0` (mainnet) · `m/84'/1'/0'/0/0` (testnet) |

Each wallet set has its own freshly generated 12-word mnemonic; all chains in the set derive from it.

## Contributing

Contributions are welcome — especially additional chain support. Open an issue or PR.

## License

[MIT](LICENSE)
