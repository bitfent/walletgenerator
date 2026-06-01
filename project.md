# walletgenerator.dev

## Project Description

**walletgenerator.dev** is an open-source, browser-based developer utility for generating batches of blockchain wallets for development, testing, demos, QA workflows, scripts, faucets, and hackathon environments.

The product helps developers quickly generate wallet sets across multiple blockchain ecosystems and export them into formats that are immediately usable in common developer workflows, including `.env`, JSON, CSV, Hardhat, and Foundry configurations.

The core value proposition is:

> Generate developer wallet sets across EVM, Solana, Stellar, XRP Ledger, and Bitcoin, including seed phrases and private keys, then export them directly into your development stack.

Unlike generic wallet generators, walletgenerator.dev is explicitly positioned as a **developer tool**, not as a consumer wallet or custody product. All wallet generation happens locally in the browser. No seed phrases, private keys, secret keys, addresses, or export files are sent to a backend.

The repository will be open source so developers can inspect the implementation, self-host the tool, audit the code, and contribute additional chain support.

---

## Objective

The objective of walletgenerator.dev is to become the fastest way for blockchain developers to create disposable, multi-chain wallet sets for development and testing.

The product should optimize for:

* Speed
* Developer usefulness
* Clear exports
* Browser-only generation
* Testnet usability
* Open-source trust
* Multi-chain support
* Safe warnings around secret material

The first version should focus on the developer workflow:

> Generate wallet sets, reveal seed phrases and private keys when needed, select mainnet or testnet mode, and export directly into `.env`, JSON, CSV, Hardhat, or Foundry.

---

## Core Product Promise

walletgenerator.dev allows developers to:

1. Generate multiple wallet sets in the browser.
2. Receive both seed phrase and private/secret key material.
3. Support EVM chains, Solana, Stellar, XRP Ledger, and Bitcoin.
4. Select mainnet or testnet/devnet mode.
5. Export generated wallets into common development formats.
6. Use the output immediately in scripts, smart contract projects, QA workflows, and demos.

---

## Product Positioning

### Recommended Headline

> Generate developer wallets in seconds.

### Recommended Subheadline

> Batch-create wallet sets for EVM, Solana, Stellar, XRP Ledger, and Bitcoin. Get seed phrases, private keys, addresses, and exports for `.env`, JSON, CSV, Hardhat, and Foundry.

### Recommended Product Promise

> walletgenerator.dev helps developers quickly create multi-chain wallet batches for local development, testnets, QA, demos, scripts, and hackathons.

### What the Product Is For

* Local blockchain development
* Testnet workflows
* Faucet funding
* QA and role testing
* Demo wallets
* Hackathon environments
* Script automation
* Multi-account simulations
* Wallet import testing
* Hardhat and Foundry projects
* Multi-chain developer experiments
* Educational examples
* Developer onboarding

### What the Product Is Not For

* Long-term crypto custody
* Production treasury management
* Cold storage
* Consumer savings wallets
* Secure mainnet fund storage
* Institutional custody
* Key management for production systems

The product can technically generate mainnet-compatible wallets, but the UX should strongly communicate that generated wallets are intended for development, testing, demos, and disposable workflows.

---

## MVP Blockchain Support

The first version should support the following blockchains and chain families.

| Chain / family    | Support type       | Notes                           |
| ----------------- | ------------------ | ------------------------------- |
| Ethereum          | Native EVM support | Same address for all EVM chains |
| Polygon           | EVM-compatible     | Use EVM wallet                  |
| Arbitrum          | EVM-compatible     | Use EVM wallet                  |
| Optimism          | EVM-compatible     | Use EVM wallet                  |
| Base              | EVM-compatible     | Use EVM wallet                  |
| BNB Chain         | EVM-compatible     | Use EVM wallet                  |
| Avalanche C-Chain | EVM-compatible     | Use EVM wallet                  |
| Mantle            | EVM-compatible     | Use EVM wallet                  |
| Linea             | EVM-compatible     | Use EVM wallet                  |
| zkSync Era        | EVM-compatible     | Use EVM wallet                  |
| Solana            | Native support     | Ed25519 keypair                 |
| Stellar           | Native support     | Stellar keypair                 |
| XRP Ledger        | Native support     | XRPL wallet                     |
| Bitcoin           | Native support     | P2WPKH                          |

---

## Key Product Decision: Return Seed Phrase and Private Key

The MVP should return **both**:

1. **Seed phrase**
2. **Chain-specific private/secret key material**

This means each generated wallet set should include a seed phrase or mnemonic where applicable, plus the actual private key, secret key, seed, or WIF needed to use the wallet in developer tooling.

Different chains use different terminology and formats. The UI should avoid oversimplifying everything as only a “private key.” Instead, it should use a broader label:

> Secret / Private Key

This allows the product to correctly represent EVM private keys, Solana secret keys, Stellar secret keys, XRP Ledger seeds, and Bitcoin WIF private keys.

---

## Wallet Generation Model

The MVP should generate wallet sets.

A wallet set is a numbered group of wallets across selected chains.

Example:

```txt
Wallet Set #1
- Seed phrase
- EVM address and private key
- Solana address and secret key
- Stellar public key and secret key
- XRP Ledger address and seed/private key
- Bitcoin address and WIF/private key
```

The default quantity should be:

```txt
20 wallet sets
```

Recommended quantity presets:

```txt
1, 5, 10, 20, 50, 100
```

Recommended MVP maximum:

```txt
100 wallet sets
```

---

## Seed Phrase Handling

The seed phrase should be visible as part of each wallet set’s secret material.

The product should support seed phrases because developers may need to:

* Import wallets into browser wallets
* Reproduce test setups
* Share deterministic fixtures in local environments
* Restore wallets in different tools
* Generate consistent test wallets across multiple chains
* Use wallets in demos and tutorials

### Seed Phrase UX

Seed phrases should be hidden by default, just like private keys.

The UI should support:

* Reveal seed phrase
* Copy seed phrase
* Reveal all seed phrases
* Export seed phrases
* Include seed phrases in JSON and CSV exports
* Optionally include seed phrases in `.env` exports

Before revealing seed phrases, show a warning:

```txt
This seed phrase controls the generated wallet. Anyone with access to it can control the wallet. Use these wallets for development and testing only.
```

### Seed Phrase Export

Seed phrases should be included in exports, clearly labeled.

Example `.env` format:

```env
WALLET_1_SEED_PHRASE="word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"
WALLET_1_EVM_PRIVATE_KEY=0x...
WALLET_1_EVM_ADDRESS=0x...
```

Example JSON format:

```json
{
  "index": 1,
  "seedPhrase": "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
  "evm": {
    "address": "0x...",
    "privateKey": "0x..."
  }
}
```

---

## Chain-Specific Outputs

Each supported chain should return both a public identifier and secret material.

| Chain / family    | Public output                  | Secret output                                                               |
| ----------------- | ------------------------------ | --------------------------------------------------------------------------- |
| EVM               | `0x...` address                | Seed phrase and `0x...` private key                                         |
| Polygon           | same EVM address               | Seed phrase and same EVM private key                                        |
| Arbitrum          | same EVM address               | Seed phrase and same EVM private key                                        |
| Optimism          | same EVM address               | Seed phrase and same EVM private key                                        |
| Base              | same EVM address               | Seed phrase and same EVM private key                                        |
| BNB Chain         | same EVM address               | Seed phrase and same EVM private key                                        |
| Avalanche C-Chain | same EVM address               | Seed phrase and same EVM private key                                        |
| Mantle            | same EVM address               | Seed phrase and same EVM private key                                        |
| Linea             | same EVM address               | Seed phrase and same EVM private key                                        |
| zkSync Era        | same EVM address               | Seed phrase and same EVM private key                                        |
| Solana            | base58 public key              | Seed phrase, secret key as base58, and secret key as byte array             |
| Stellar           | `G...` public key              | Seed phrase where supported, plus `S...` Stellar secret key                 |
| XRP Ledger        | `r...` address                 | Seed phrase where supported, plus XRPL seed and private key where available |
| Bitcoin           | `bc1q...` or `tb1q...` address | Seed phrase, WIF private key, and private key hex                           |

---

## EVM Wallet Model

For EVM-compatible chains, the product should generate one EVM wallet and show that the same address is compatible with many EVM networks.

The MVP should not generate separate EVM private keys for Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche C-Chain, Mantle, Linea, and zkSync Era by default.

Instead, it should generate:

```txt
Seed phrase
EVM private key
EVM address
Compatible EVM chains
```

Example:

```txt
EVM Wallet #1
Seed phrase: hidden
Private key: hidden
Address: 0x...

Compatible with:
- Ethereum
- Polygon
- Arbitrum
- Optimism
- Base
- BNB Chain
- Avalanche C-Chain
- Mantle
- Linea
- zkSync Era
```

This avoids unnecessary private key duplication and teaches developers the correct EVM model.

---

## Testnet Support

Testnet support should be a first-class part of the product experience.

Developers do not only need an address, seed phrase, and private key. They also need to know:

1. Which network the wallet is meant to be used on.
2. Whether the address format changes on testnet.
3. Whether the account needs to be funded before it exists.
4. Which faucet or funding flow to use.
5. Which RPC URL or cluster to configure.
6. Whether the same credentials work across mainnet and testnet.
7. Whether a test network may reset.

The MVP should include a network mode selector.

```txt
Network mode:
(o) Testnet / Devnet
( ) Mainnet address format
```

The default should be:

```txt
Testnet / Devnet
```

This matches the developer-focused positioning of the product.

---

## Testnet UX Requirements

For each selected chain, the results table should show:

* Chain
* Network
* Address or public key
* Seed phrase
* Secret / private key
* Derivation path where applicable
* Account activation notes
* Faucet guidance
* Export variables for the selected network

Recommended results table:

|  # | Chain      | Network                | Address / Public Key | Seed Phrase | Secret / Private Key | Notes                          |
| -: | ---------- | ---------------------- | -------------------- | ----------- | -------------------- | ------------------------------ |
|  1 | EVM        | Sepolia / EVM testnets | `0x...`              | hidden      | hidden               | Same address across EVM chains |
|  1 | Solana     | Devnet                 | base58 public key    | hidden      | hidden               | Use Devnet for app testing     |
|  1 | Stellar    | Testnet                | `G...`               | hidden      | hidden               | Fund account to activate       |
|  1 | XRP Ledger | Testnet                | `r...`               | hidden      | hidden               | Fund account before use        |
|  1 | Bitcoin    | Testnet                | `tb1q...`            | hidden      | hidden               | P2WPKH testnet address         |

---

## EVM Testnet Handling

For EVM-compatible networks, the wallet address and private key format are the same across mainnet and testnets.

The difference is the network configuration:

* RPC URL
* Chain ID
* Explorer URL
* Faucet
* Native gas token
* Deployment target

The UI should explain:

```txt
This EVM private key controls the same address across Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche C-Chain, Mantle, Linea, zkSync Era, and compatible EVM testnets.
```

Recommended EVM testnet export fields:

```env
EVM_SEED_PHRASE_1="..."
EVM_PRIVATE_KEY_1=0x...
EVM_ADDRESS_1=0x...

SEPOLIA_RPC_URL=
BASE_SEPOLIA_RPC_URL=
ARBITRUM_SEPOLIA_RPC_URL=
OPTIMISM_SEPOLIA_RPC_URL=
POLYGON_AMOY_RPC_URL=
BSC_TESTNET_RPC_URL=
AVALANCHE_FUJI_RPC_URL=
MANTLE_SEPOLIA_RPC_URL=
LINEA_SEPOLIA_RPC_URL=
ZKSYNC_SEPOLIA_RPC_URL=
```

---

## Solana Testnet Handling

Solana wallets use the same keypair format across clusters.

The network choice is a cluster selection:

* Localnet
* Devnet
* Testnet
* Mainnet

For developer UX, the default should be:

```txt
Solana Devnet
```

The export should include:

```env
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

SOLANA_SEED_PHRASE_1="..."
SOLANA_ADDRESS_1=...
SOLANA_SECRET_KEY_BASE58_1=...
SOLANA_SECRET_KEY_ARRAY_1=[...]
```

The UI should explain:

```txt
Solana uses the same keypair format across clusters. Choose Devnet for most application development and testing.
```

---

## Stellar Testnet Handling

A Stellar keypair can be generated locally, but the account is not active on-chain until it is funded.

For testnet use, the UI should include:

```txt
This Stellar keypair has been generated locally. To activate it on Testnet, fund the public key on the Stellar test network.
```

Recommended export fields:

```env
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

STELLAR_SEED_PHRASE_1="..."
STELLAR_PUBLIC_KEY_1=G...
STELLAR_SECRET_KEY_1=S...
```

Important UX note:

```txt
A Stellar account does not exist on-chain until it receives funding.
```

---

## XRP Ledger Testnet Handling

An XRP Ledger wallet can be generated locally, but a testnet or devnet account needs funding before it is useful.

The UI should include:

```txt
XRPL test networks are separate from mainnet and may reset. Do not use production credentials for testnet workflows.
```

Recommended export fields:

```env
XRPL_NETWORK=testnet
XRPL_RPC_URL=wss://s.altnet.rippletest.net:51233

XRPL_SEED_PHRASE_1="..."
XRP_ADDRESS_1=r...
XRP_SEED_1=s...
XRP_PRIVATE_KEY_1=...
```

Important UX note:

```txt
An XRP Ledger account must be funded before it becomes active on-chain.
```

---

## Bitcoin Testnet Handling

Bitcoin testnet addresses use a different address prefix from mainnet.

For the MVP, Bitcoin should support native SegWit P2WPKH addresses.

| Network         | Address type | Example prefix |
| --------------- | ------------ | -------------- |
| Bitcoin mainnet | P2WPKH       | `bc1q...`      |
| Bitcoin testnet | P2WPKH       | `tb1q...`      |

The UI should make the selected network explicit.

Recommended export fields:

```env
BITCOIN_NETWORK=testnet
BITCOIN_ADDRESS_TYPE=p2wpkh

BITCOIN_SEED_PHRASE_1="..."
BITCOIN_ADDRESS_1=tb1q...
BITCOIN_WIF_1=...
BITCOIN_PRIVATE_KEY_HEX_1=...
```

---

## Core User Workflow

### Step 1: Select Network Mode

Default:

```txt
Testnet / Devnet
```

Options:

```txt
- Testnet / Devnet
- Mainnet address format
```

### Step 2: Select Chains

Default selected chains:

* EVM
* Solana
* Stellar
* XRP Ledger
* Bitcoin

EVM-compatible chains should be displayed as compatibility labels, not separate wallets.

### Step 3: Select Quantity

Default:

```txt
20 wallet sets
```

Suggested presets:

```txt
1, 5, 10, 20, 50, 100
```

### Step 4: Generate Wallets

Primary button:

```txt
Generate developer wallets
```

The app generates wallet sets in the browser.

Each wallet set may contain:

* Seed phrase
* EVM wallet
* Solana wallet
* Stellar wallet
* XRP Ledger wallet
* Bitcoin wallet

### Step 5: Review Results

The results table should show public addresses by default.

Seed phrases, private keys, secret keys, and WIFs should be hidden by default.

Each row should support:

* Reveal seed phrase
* Reveal secret/private key
* Copy address
* Copy seed phrase
* Copy private key
* Copy row
* Export selected row

### Step 6: Export

The user can export the generated wallets as:

* `.env`
* JSON
* CSV
* Hardhat config
* Foundry config

---

## Technology

walletgenerator.dev should be structured as an **Astro project** with interactive wallet generation handled by client-side components.

Astro is a strong fit because the project combines:

* Static marketing pages
* SEO-friendly documentation
* Fast-loading pages
* Client-only interactive generator
* Simple static deployment
* No required backend
* Open-source distribution
* Documentation-first product structure

---

## Recommended Tech Stack

### Framework

```txt
Astro
```

Astro should handle:

* Landing page
* Documentation pages
* Supported chain pages
* Security page
* Export format pages
* Static routing
* SEO metadata

### Interactive Generator

Use a client-side island for the generator.

Recommended:

```txt
React + TypeScript
```

React is a strong default because of ecosystem compatibility and developer familiarity.

### Styling

Recommended:

```txt
Tailwind CSS
```

Tailwind is a good fit for fast UI development, clean utility classes, and responsive layouts.

### Wallet Generation Libraries

Recommended libraries by chain family:

| Chain family  | Suggested libraries                         |
| ------------- | ------------------------------------------- |
| EVM           | `ethers`                                    |
| Solana        | `@solana/web3.js`, `bs58`                   |
| Stellar       | `@stellar/stellar-sdk`                      |
| XRP Ledger    | `xrpl`                                      |
| Bitcoin       | `bitcoinjs-lib`, `ecpair`, `tiny-secp256k1` |
| Mnemonics     | `@scure/bip39`                              |
| HD derivation | `@scure/bip32`                              |
| CSV export    | `papaparse` or custom CSV serializer        |
| File download | Browser Blob API                            |

Optional lower-level cryptography libraries for future optimization:

```txt
@noble/secp256k1
@noble/ed25519
@scure/base
@scure/btc-signer
```

---

## Proposed Astro Project Structure

```txt
walletgenerator.dev/
├── public/
│   ├── favicon.svg
│   └── og-image.png
│
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── SecurityBanner.astro
│   │   ├── SupportedChains.astro
│   │   ├── ExportFormats.astro
│   │   ├── FAQ.astro
│   │   └── generator/
│   │       ├── WalletGenerator.tsx
│   │       ├── NetworkModeSelector.tsx
│   │       ├── ChainSelector.tsx
│   │       ├── QuantitySelector.tsx
│   │       ├── WalletTable.tsx
│   │       ├── WalletRow.tsx
│   │       ├── SecretReveal.tsx
│   │       ├── ExportPanel.tsx
│   │       └── ExportPreview.tsx
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── lib/
│   │   ├── chains/
│   │   │   ├── evm.ts
│   │   │   ├── solana.ts
│   │   │   ├── stellar.ts
│   │   │   ├── xrp.ts
│   │   │   └── bitcoin.ts
│   │   │
│   │   ├── exports/
│   │   │   ├── env.ts
│   │   │   ├── json.ts
│   │   │   ├── csv.ts
│   │   │   ├── hardhat.ts
│   │   │   └── foundry.ts
│   │   │
│   │   ├── types/
│   │   │   ├── wallet.ts
│   │   │   └── chains.ts
│   │   │
│   │   └── utils/
│   │       ├── download.ts
│   │       ├── clipboard.ts
│   │       ├── format.ts
│   │       └── security.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── security.astro
│   │   ├── supported-chains.astro
│   │   ├── export-formats.astro
│   │   └── docs/
│   │       ├── hardhat.astro
│   │       ├── foundry.astro
│   │       ├── evm-wallets.astro
│   │       ├── solana-wallets.astro
│   │       ├── stellar-wallets.astro
│   │       ├── xrp-wallets.astro
│   │       └── bitcoin-wallets.astro
│   │
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## Browser-Only Architecture

The core wallet generator should run entirely in the browser.

### Requirements

* No backend wallet generation
* No API call required to generate wallets
* No seed phrase transmission
* No private key transmission
* No secret key transmission
* No export file transmission
* No storage of generated keys in a database
* No default storage in `localStorage`
* No cookies for generated wallet data
* No analytics on the generator route

### Recommended Security Copy

```txt
Wallets are generated locally in your browser. Seed phrases and private keys are not sent to a server. This tool is designed for development and testing. Do not use generated wallets for meaningful mainnet funds.
```

### Recommended Technical Constraint

The generator page should be able to run with:

```txt
connect-src 'none'
```

This means the generator itself should not need network access.

---

## Open-Source Strategy

The repository should be open source from the beginning.

Recommended license:

```txt
MIT
```

or:

```txt
Apache-2.0
```

Recommended repository name:

```txt
walletgenerator.dev
```

Suggested GitHub topics:

```txt
wallet-generator
ethereum
solana
bitcoin
stellar
xrp
hardhat
foundry
web3
crypto
blockchain
astro
typescript
```

The repository should include:

* README
* Security model
* Supported chains
* Export examples
* Contribution guide
* Roadmap
* License
* Dependency notes
* Clear warning against using generated wallets for meaningful funds

---

## Data Model

### Wallet Set

```ts
export type WalletSet = {
  index: number;
  createdAt: string;
  networkMode: "testnet" | "mainnet";
  seedPhrase: string;
  evm?: EvmWallet;
  solana?: SolanaWallet;
  stellar?: StellarWallet;
  xrp?: XrpWallet;
  bitcoin?: BitcoinWallet;
};
```

### EVM Wallet

```ts
export type EvmWallet = {
  chainFamily: "evm";
  address: string;
  privateKey: string;
  publicKey?: string;
  derivationPath?: string;
  compatibleChains: EvmCompatibleChain[];
};

export type EvmCompatibleChain =
  | "ethereum"
  | "polygon"
  | "arbitrum"
  | "optimism"
  | "base"
  | "bnb-chain"
  | "avalanche-c-chain"
  | "mantle"
  | "linea"
  | "zksync-era";
```

### Solana Wallet

```ts
export type SolanaWallet = {
  chainFamily: "solana";
  address: string;
  publicKey: string;
  secretKeyBase58: string;
  secretKeyArray: number[];
  derivationPath?: string;
};
```

### Stellar Wallet

```ts
export type StellarWallet = {
  chainFamily: "stellar";
  publicKey: string;
  secretKey: string;
  derivationPath?: string;
};
```

### XRP Wallet

```ts
export type XrpWallet = {
  chainFamily: "xrp";
  address: string;
  seed: string;
  privateKey?: string;
  publicKey?: string;
  derivationPath?: string;
};
```

### Bitcoin Wallet

```ts
export type BitcoinWallet = {
  chainFamily: "bitcoin";
  network: "mainnet" | "testnet";
  addressType: "p2wpkh";
  address: string;
  wif: string;
  privateKeyHex: string;
  publicKey: string;
  derivationPath?: string;
};
```

---

## Export Formats

Export quality is the main product differentiator.

Every export format should support:

* Seed phrase
* Public address
* Chain-specific private/secret key
* Network mode
* Chain notes where useful

---

## `.env` Export

The `.env` export should be optimized for immediate developer use.

Example:

```env
# Generated by walletgenerator.dev
# Development/test wallets only. Do not use for production funds.

NETWORK_MODE=testnet

WALLET_1_SEED_PHRASE="word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"

EVM_PRIVATE_KEY_1=0x...
EVM_ADDRESS_1=0x...

SOLANA_SECRET_KEY_BASE58_1=...
SOLANA_SECRET_KEY_ARRAY_1=[...]
SOLANA_ADDRESS_1=...

STELLAR_SECRET_KEY_1=S...
STELLAR_PUBLIC_KEY_1=G...

XRP_SEED_1=s...
XRP_PRIVATE_KEY_1=...
XRP_ADDRESS_1=r...

BITCOIN_WIF_1=...
BITCOIN_PRIVATE_KEY_HEX_1=...
BITCOIN_ADDRESS_1=tb1q...
```

Grouped EVM variables:

```env
EVM_PRIVATE_KEYS=0x...,0x...,0x...
EVM_ADDRESSES=0x...,0x...,0x...
```

Testnet RPC placeholders:

```env
SEPOLIA_RPC_URL=
BASE_SEPOLIA_RPC_URL=
ARBITRUM_SEPOLIA_RPC_URL=
OPTIMISM_SEPOLIA_RPC_URL=
POLYGON_AMOY_RPC_URL=
BSC_TESTNET_RPC_URL=
AVALANCHE_FUJI_RPC_URL=
MANTLE_SEPOLIA_RPC_URL=
LINEA_SEPOLIA_RPC_URL=
ZKSYNC_SEPOLIA_RPC_URL=

SOLANA_RPC_URL=https://api.devnet.solana.com
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
XRPL_RPC_URL=wss://s.altnet.rippletest.net:51233
```

---

## JSON Export

```json
{
  "generatedBy": "walletgenerator.dev",
  "generatedAt": "2026-06-01T00:00:00.000Z",
  "networkMode": "testnet",
  "warning": "Development/test wallets only. Do not use for production funds.",
  "wallets": [
    {
      "index": 1,
      "seedPhrase": "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
      "evm": {
        "address": "0x...",
        "privateKey": "0x...",
        "compatibleChains": [
          "ethereum",
          "polygon",
          "arbitrum",
          "optimism",
          "base",
          "bnb-chain",
          "avalanche-c-chain",
          "mantle",
          "linea",
          "zksync-era"
        ]
      },
      "solana": {
        "address": "...",
        "secretKeyBase58": "...",
        "secretKeyArray": []
      },
      "stellar": {
        "publicKey": "G...",
        "secretKey": "S..."
      },
      "xrp": {
        "address": "r...",
        "seed": "s...",
        "privateKey": "..."
      },
      "bitcoin": {
        "network": "testnet",
        "addressType": "p2wpkh",
        "address": "tb1q...",
        "wif": "...",
        "privateKeyHex": "..."
      }
    }
  ]
}
```

---

## CSV Export

Recommended columns:

```csv
index,network_mode,seed_phrase,evm_address,evm_private_key,solana_address,solana_secret_key_base58,stellar_public_key,stellar_secret_key,xrp_address,xrp_seed,xrp_private_key,bitcoin_address,bitcoin_wif,bitcoin_private_key_hex
```

---

## Hardhat Export

The Hardhat export should focus on EVM wallets.

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEYS = [
  "0x...",
  "0x...",
  "0x..."
];

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: PRIVATE_KEYS.map((privateKey) => ({
        privateKey,
        balance: "10000000000000000000000"
      }))
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEYS
    },
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "",
      accounts: PRIVATE_KEYS
    },
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEYS
    },
    optimismSepolia: {
      url: process.env.OPTIMISM_SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEYS
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEYS
    }
  }
};

export default config;
```

---

## Foundry Export

Generate `.env` variables:

```env
PRIVATE_KEY_1=0x...
PRIVATE_KEY_2=0x...
PRIVATE_KEY_3=0x...

SEPOLIA_RPC_URL=
BASE_SEPOLIA_RPC_URL=
ARBITRUM_SEPOLIA_RPC_URL=
OPTIMISM_SEPOLIA_RPC_URL=
POLYGON_AMOY_RPC_URL=
```

Generate `foundry.toml` snippet:

```toml
[rpc_endpoints]
sepolia = "${SEPOLIA_RPC_URL}"
base_sepolia = "${BASE_SEPOLIA_RPC_URL}"
arbitrum_sepolia = "${ARBITRUM_SEPOLIA_RPC_URL}"
optimism_sepolia = "${OPTIMISM_SEPOLIA_RPC_URL}"
polygon_amoy = "${POLYGON_AMOY_RPC_URL}"

[profile.default]
src = "src"
out = "out"
libs = ["lib"]
```

---

## Security and Trust

Because the product handles seed phrases and private keys, trust is a core part of the product.

### Required Trust Features

1. **Open-source repository**

   * Developers can inspect and audit the code.

2. **Browser-only generation**

   * Seed phrases and private keys are generated locally.

3. **No backend for generation**

   * The core product should not need an API.

4. **No analytics on the generator page**

   * Analytics scripts should not run where seed phrases and private keys are generated.

5. **No key persistence**

   * Do not store generated wallets in `localStorage`, cookies, or IndexedDB by default.

6. **Explicit development-only warning**

   * The product should repeatedly communicate that generated wallets are intended for development and testing.

7. **Offline-capable version**

   * A later version should support PWA installation or downloadable offline builds.

8. **Strict Content Security Policy**

   * The generator page should minimize or eliminate external network access.

### Recommended CSP for Generator Page

```txt
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
connect-src 'none';
font-src 'self';
base-uri 'none';
form-action 'none';
frame-ancestors 'none';
```

---

## UX Requirements

### Secret Handling

Seed phrases, private keys, secret keys, seeds, and WIFs should be hidden by default.

User actions:

* Reveal seed phrase
* Reveal private key
* Reveal all secrets
* Copy seed phrase
* Copy private key
* Copy all addresses
* Copy export
* Download export
* Clear generated wallets

Before revealing all secrets, show a confirmation:

```txt
These values control the generated wallets. Anyone with access to the seed phrase or private key can control the wallet. These wallets are intended for development and testing only.
```

### Clear Generated Wallets

There should be a prominent button:

```txt
Clear generated wallets
```

This should remove all wallet data from memory.

### No Auto-Save

Generated wallets should disappear on refresh unless the user exports them.

---

## MVP Feature Set

### Generator

* Generate 1 to 100 wallet sets
* Default to 20 wallet sets
* Support EVM, Solana, Stellar, XRP Ledger, and Bitcoin
* Generate seed phrase and chain-specific private/secret keys
* Generate entirely in browser
* Support testnet/devnet and mainnet address modes
* Hide secrets by default
* Reveal/copy individual secrets
* Clear generated wallets

### Export

* `.env`
* JSON
* CSV
* Hardhat config
* Foundry config

### Content

* Landing page
* Supported chains section
* Security section
* Export formats section
* Testnet guide
* FAQ
* Documentation pages for major workflows

---

## Future Roadmap

### Phase 1: MVP

* Astro landing page
* Client-side generator component
* EVM, Solana, Stellar, XRP Ledger, and Bitcoin support
* Seed phrase output
* Private/secret key output
* Testnet/devnet mode
* `.env`, JSON, CSV export
* Hardhat and Foundry export
* Basic documentation
* Static deployment
* Open-source GitHub repository

### Phase 2: Developer Workflow Improvements

* Role labels
* Presets
* Testnet faucet links
* Export templates
* Copy-ready scripts
* Better Hardhat/Foundry examples
* Solana CLI export format
* Stellar testnet funding link
* XRP testnet funding link

### Phase 3: More Chains

Potential additions:

* Litecoin
* Dogecoin
* Bitcoin Cash
* Cosmos Hub
* Injective
* Celestia
* Sui
* Aptos
* NEAR
* TON
* Cardano
* Polkadot

### Phase 4: Trust and Distribution

* Offline PWA
* Downloadable self-hosted version
* Reproducible builds
* CLI companion
* Security audit
* Dependency audit page
* Signed releases

### Phase 5: CLI Companion

A CLI would make the product more useful for advanced developers.

Example:

```bash
npx walletgenerator-dev --count 20 --chains evm,solana,stellar,xrp,bitcoin --format env
```

Possible outputs:

```bash
npx walletgenerator-dev --count 20 --format hardhat
npx walletgenerator-dev --count 50 --format csv
npx walletgenerator-dev --count 10 --chains evm,solana --roles deployer,admin,user
```

---

## GTM Strategy

## Target Audience

The initial target audience is developers working with blockchain apps, smart contracts, testnets, wallets, and multi-chain infrastructure.

### Primary Segments

| Segment                   | Use case                                      |
| ------------------------- | --------------------------------------------- |
| Smart contract developers | Generate accounts for Hardhat, Foundry, Anvil |
| dApp developers           | Test multiple users and wallet states         |
| Solana developers         | Generate keypairs for scripts and devnet      |
| Stellar developers        | Generate testnet accounts                     |
| XRPL developers           | Generate testnet wallets                      |
| Bitcoin developers        | Generate testnet P2WPKH wallets               |
| Hackathon teams           | Quickly generate demo wallets                 |
| QA teams                  | Create repeatable wallet fixtures             |
| DevRel teams              | Use in workshops and tutorials                |
| Web3 educators            | Generate wallets for students                 |
| Protocol teams            | Create test accounts for examples             |
| Wallet developers         | Test import flows                             |
| Faucet operators          | Help users create testnet accounts            |

---

## GTM Positioning

### Core GTM Message

> The fastest way to generate developer wallet sets for blockchain testing.

### Supporting Messages

* Generate 20 wallets in seconds
* Get seed phrases and private keys
* Export directly to `.env`, JSON, CSV, Hardhat, or Foundry
* Supports EVM, Solana, Stellar, XRP Ledger, and Bitcoin
* Testnet/devnet mode built in
* Runs locally in your browser
* No backend
* No account required
* Open source
* Built for developers, testnets, demos, and QA

---

## Acquisition Channels

### 1. SEO

SEO should be a major channel because developers search for specific wallet-generation tasks.

Recommended landing pages:

```txt
/generate-evm-wallets
/generate-hardhat-accounts
/generate-foundry-wallets
/generate-solana-keypairs
/generate-stellar-keypairs
/generate-xrp-wallets
/generate-bitcoin-testnet-wallets
/browser-wallet-generator
/multi-chain-wallet-generator
/testnet-wallet-generator
```

Target keywords:

| Keyword theme | Example search intent                      |
| ------------- | ------------------------------------------ |
| EVM wallets   | generate Ethereum private keys for testing |
| Hardhat       | generate Hardhat accounts                  |
| Foundry       | generate Foundry private keys              |
| Solana        | generate Solana keypair                    |
| Stellar       | generate Stellar keypair                   |
| XRP           | generate XRP wallet                        |
| Bitcoin       | generate Bitcoin testnet wallet            |
| Multi-chain   | generate wallets for multiple blockchains  |
| Testnet       | generate testnet wallets                   |
| Dev wallets   | crypto developer wallet generator          |
| Seed phrase   | generate wallet seed phrase for testing    |

### 2. GitHub

Open-source distribution is important for trust.

GitHub strategy:

* Publish the project as open source
* Add clear README
* Add security model
* Add examples
* Add export format docs
* Add roadmap
* Use GitHub Topics:

  * `wallet-generator`
  * `ethereum`
  * `solana`
  * `bitcoin`
  * `stellar`
  * `xrp`
  * `hardhat`
  * `foundry`
  * `web3`
  * `astro`
  * `typescript`

### 3. Developer Communities

Relevant communities:

* Ethereum developers
* Solana developers
* Stellar developers
* XRPL developers
* Bitcoin developers
* Hardhat users
* Foundry users
* Web3 hackathon communities
* DevRel communities
* Web3 Discord servers
* Reddit communities such as r/ethdev and r/solana

### 4. Content Marketing

Useful content ideas:

* How to generate 20 Hardhat accounts for testing
* How to create disposable wallets for a hackathon demo
* How EVM addresses work across Ethereum, Polygon, Arbitrum, Optimism, and Base
* How to generate Solana devnet keypairs in the browser
* Why Stellar and XRP accounts need funding before they exist on-chain
* How to export test wallets to `.env`
* Hardhat vs Foundry wallet setup
* How to safely use browser-generated wallets for development
* How to generate testnet wallets with seed phrases and private keys

### 5. Partnerships

Potential partners:

* RPC providers
* Faucet providers
* Hackathon organizers
* DevRel teams
* Web3 education platforms
* Smart contract security tools
* Testnet infrastructure providers
* Wallet SDK providers

Possible sponsorship categories:

* RPC endpoint placeholders
* Faucet links
* Developer tutorials
* Hackathon templates
* Export templates
* Sponsored documentation pages

### 6. Product-Led Growth

The generated exports should include a small comment:

```txt
Generated by walletgenerator.dev
Development/test wallets only.
```

This creates attribution when developers share `.env.example`, test fixtures, or internal tooling snippets.

Do not insert tracking links or anything that compromises privacy.

---

## Monetization

The best initial approach is to keep the core generator free.

Potential monetization paths:

### 1. Sponsorships

Best fit.

Possible sponsors:

* RPC providers
* Faucet providers
* Blockchain infrastructure companies
* Dev tooling companies
* Security scanning tools
* Hackathon platforms

### 2. Premium Self-Hosted Version

Offer a downloadable or private version for teams.

Possible premium features:

* Offline bundle
* Internal chain presets
* Custom export templates
* Company branding
* No external assets
* Air-gapped setup instructions
* Internal documentation mode

### 3. CLI Tool

A CLI can be free or freemium.

Free:

```bash
npx walletgenerator-dev
```

Paid or sponsored:

* Team templates
* Internal presets
* Enterprise support
* Custom chain integrations

### 4. Developer Templates

Premium templates could include:

* Hardhat starter
* Foundry starter
* Solana script starter
* QA wallet fixture generator
* Multi-chain demo kit
* Hackathon starter kit

### 5. Avoid Ads on the Generator Page

Ads are not recommended for the generator page because they reduce trust.

If monetization requires sponsors, use tasteful static sponsorship placements on documentation pages, not inside the private key generation workflow.

---

## Success Metrics

### Product Metrics

* Wallet batches generated
* Export format usage
* Most selected chain families
* Copy/export actions
* Documentation page visits
* GitHub stars
* Repeat visits

However, do not track generated wallet data, seed phrases, private keys, addresses, secrets, or export contents.

### SEO Metrics

* Organic traffic
* Search impressions
* Ranking for chain-specific wallet generator queries
* Documentation page engagement

### Developer Adoption Metrics

* GitHub stars
* Issues opened
* Pull requests
* Mentions in tutorials
* Hackathon usage
* Referrals from docs and forums

---

## Launch Plan

### Pre-Launch

* Build MVP
* Publish open-source repository
* Write security model
* Write supported chains documentation
* Add export examples
* Deploy static site
* Test in offline mode
* Confirm no generated data is transmitted
* Confirm generator works without backend connectivity
* Confirm seed phrases and private keys are hidden by default

### Launch

* Post on GitHub
* Share on X / Twitter
* Share in developer communities
* Post on relevant subreddits
* Submit to Product Hunt if polished enough
* Share with hackathon organizers
* Contact DevRel teams for feedback

### Post-Launch

* Add role labels
* Add more export templates
* Add faucet links
* Add chain-specific docs
* Add CLI prototype
* Collect developer feedback
* Add more chains based on actual demand

---

## Recommended MVP Homepage Sections

1. Hero
2. Generator
3. Seed phrase and private key explanation
4. Testnet/devnet mode explanation
5. Export formats
6. Supported chains
7. Security model
8. Developer workflow examples
9. FAQ
10. Open-source CTA

---

## Recommended FAQ

### Are wallets generated on a server?

No. Wallets are generated locally in your browser.

### Are seed phrases and private keys stored?

No. Generated wallets should remain only in memory unless the user exports them.

### Does the generator return both seed phrase and private key?

Yes. The MVP should return both the seed phrase and the chain-specific private or secret key material required to use the wallet.

### Can I use these wallets on mainnet?

Technically yes, but you should not use this tool for meaningful mainnet funds. It is designed for development and testing.

### Why is one EVM wallet compatible with many chains?

EVM-compatible chains use the same private key and address format. One EVM private key controls the same address on Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche C-Chain, Mantle, Linea, zkSync Era, and other EVM-compatible chains.

### Does a Stellar wallet exist immediately?

The keypair exists immediately, but the account does not exist on-chain until it is funded.

### Does an XRP wallet exist immediately?

The keypair and address can be generated offline, but an XRP Ledger account must be funded before it becomes active on-chain.

### What Bitcoin address type is generated?

The MVP should generate native SegWit P2WPKH addresses by default.

### Can I generate testnet wallets?

Yes. Testnet/devnet mode should be part of the MVP. The generator should include network-specific notes, address formats, and export variables.

### Can I export to Hardhat and Foundry?

Yes. EVM wallets should be exportable as Hardhat and Foundry-compatible configuration snippets.

### Is the project open source?

Yes. The repository should be open source so developers can inspect the implementation, self-host the tool, and contribute additional chain support.

---

## Final Recommendation

The first version of walletgenerator.dev should be a focused, browser-only Astro application with one primary workflow:

> Generate 20 developer wallet sets across EVM, Solana, Stellar, XRP Ledger, and Bitcoin, including seed phrases and private keys, then export them directly into `.env`, JSON, CSV, Hardhat, or Foundry.

The product should win by being:

* Fast
* Open source
* Browser-only
* Useful for real developer workflows
* Excellent at exports
* Clear about testnet/devnet usage
* Transparent about seed phrases and private keys
* Safer in positioning than generic wallet generators

The strongest positioning is:

> The fastest way to create test wallets for blockchain development.
