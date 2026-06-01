---
title: EVM wallets
description: One EVM private key controls the same address across Ethereum, Polygon, Arbitrum, Optimism, Base, BNB Chain, Avalanche, Mantle, Linea, and zkSync Era.
---

The generator creates one EVM wallet per set: a seed phrase, a `0x` private key, and a `0x` address derived at `m/44'/60'/0'/0/0`.

## One key, many chains

EVM-compatible chains share the same key and address format. That single private key controls the same address on:

- Ethereum, Polygon, Arbitrum, Optimism, Base
- BNB Chain, Avalanche C-Chain, Mantle, Linea, zkSync Era

The generator does **not** create separate keys per EVM network — that would duplicate material and teach the wrong mental model. Only the network configuration changes between chains: RPC URL, chain ID, explorer, faucet, and gas token. The address and private key are identical across mainnet and testnets.

## Testnet RPC placeholders

The `.env` export includes placeholders for each EVM testnet:

```bash
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

## Use it in a project

Export directly to [Hardhat](/guides/hardhat/) or [Foundry](/guides/foundry/) to wire these accounts into a project, or drop the `.env` into any `ethers`/`viem` script.
