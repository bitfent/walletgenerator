---
title: Generate Hardhat accounts
description: Generate EVM private keys and export a ready-to-use hardhat.config.ts for local and testnet networks.
---

Generate a batch of EVM wallets, then choose the **Hardhat** export. You get a `hardhat.config.ts` with your private keys wired into the in-process `hardhat` network and common testnets.

## Steps

1. Open the [generator](/) and keep **EVM** selected.
2. Pick a quantity — 20 is a good default for test accounts.
3. Click **Generate developer wallets**.
4. In the export panel, choose **Hardhat** and download `hardhat.config.ts`.

## Example config

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
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEYS
    }
  }
};

export default config;
```

## Funding accounts

The in-process `hardhat` network pre-funds each account with the `balance` shown above. For public testnets, set the matching `*_RPC_URL` environment variable and fund the addresses with a faucet.

:::tip
Use the `.env` export alongside the Hardhat config — it includes the same private keys plus RPC placeholders like `SEPOLIA_RPC_URL=` ready to fill in.
:::
