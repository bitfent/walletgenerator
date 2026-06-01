---
title: Generate Foundry wallets
description: Generate EVM private keys and export Foundry-ready .env variables plus a foundry.toml rpc_endpoints snippet.
---

Generate EVM wallets and choose the **Foundry** export. You get `PRIVATE_KEY_*` environment variables and a `foundry.toml` snippet.

## .env variables

```bash
PRIVATE_KEY_1=0x...
PRIVATE_KEY_2=0x...
PRIVATE_KEY_3=0x...

SEPOLIA_RPC_URL=
BASE_SEPOLIA_RPC_URL=
ARBITRUM_SEPOLIA_RPC_URL=
OPTIMISM_SEPOLIA_RPC_URL=
POLYGON_AMOY_RPC_URL=
```

## foundry.toml

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

## Deploying with a generated key

```bash
forge script script/Deploy.s.sol \
  --rpc-url sepolia \
  --private-key $PRIVATE_KEY_1 \
  --broadcast
```

:::caution
These keys are for testnets and local development. Never commit a `.env` with real funds to source control.
:::
