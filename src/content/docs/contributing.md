---
title: Contributing
description: Run walletgenerator.dev locally, understand the project layout, and contribute new chains or export formats.
---

walletgenerator.dev is open source. Contributions — new chains, export formats, docs, and fixes — are welcome.

## Run it locally

```bash
git clone https://github.com/bitfent/walletgenerator
cd walletgenerator
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Build the static site with `npm run build` and preview the output with `npm run preview`.

## Project layout

| Path | What lives there |
| --- | --- |
| `src/pages/index.astro` | The custom landing page (hero + generator island). |
| `src/components/generator/` | The React generator island and its sub-components. |
| `src/lib/chains/` | Per-chain key derivation. One file per chain plus `slip10.ts` and `index.ts`. |
| `src/lib/exports/` | Export serializers (`.env`, JSON, CSV, Hardhat, Foundry). |
| `src/content/docs/` | These Starlight docs. |

## How generation works

All cryptography runs in the browser with audited pure-JS libraries — `@noble/curves`, `@noble/hashes`, `@scure/bip39`, `@scure/bip32`, and `@scure/base`, plus `ethers` for EVM and `ripple-keypairs`/`ripple-address-codec` for XRPL. There is no backend. The site enforces `connect-src 'none'`, so contributions must keep generation fully client-side and must not add network calls. See the [security model](/security/).

## Adding a chain

1. Add a generator in `src/lib/chains/<chain>.ts` that takes the wallet set's seed and returns the chain's wallet object.
2. Wire it into `generateWalletSet` in `src/lib/chains/index.ts`.
3. Extend the export serializers in `src/lib/exports/` so the new fields appear in every format.
4. Add the chain to the [`ChainSelector`](/supported-chains/) and the generator table.
5. Document it with a new page under `src/content/docs/chains/` and the [derivation paths](/derivation-paths/) table.

## Adding an export format

Add a serializer in `src/lib/exports/`, register it in the export spec, and surface a tab in the export panel. Document it on the [export formats](/export-formats/) page.

:::tip
Keep the same rule for every contribution: nothing leaves the browser. No analytics, no remote fonts, no network fetches.
:::
