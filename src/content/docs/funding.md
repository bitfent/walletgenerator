---
title: Funding test wallets
description: How to fund and activate generated wallets on testnets — account models, base reserves, and faucets for EVM, Solana, Stellar, XRP Ledger, and Bitcoin.
---

A generated address is valid the moment it's created — but whether it **exists on-chain** and how you get test funds into it depends on the chain's account model. This trips people up most on Stellar and XRP Ledger, where a freshly generated address returns "account not found" until something funds it.

## Account models at a glance

| Chain | Account model | Usable immediately? | Minimum to exist | Fund on testnet with |
| --- | --- | --- | --- | --- |
| EVM | Implicit account | Yes — just needs gas | None | Faucet drips test ETH/tokens |
| Solana | Account with rent | Yes — needs rent to persist | Rent-exempt minimum (~0.001 SOL) | `solana airdrop` (devnet) |
| Stellar | Account with reserve | **No — must be created first** | Base reserve (~1 XLM) | Friendbot (creates + funds, ~10,000 XLM) |
| XRP Ledger | Account with reserve | **No — must be activated first** | Base reserve (~1 XRP) | XRPL Testnet Faucet (~1,000 XRP) |
| Bitcoin | UTXO (no accounts) | Yes — just send to it | None | Testnet faucet sends sats |

## Implicit accounts: EVM

On EVM chains an address always "exists" — there's no activation step and no minimum balance. A generated `0x…` address can receive funds and be looked up immediately. To *send* a transaction it just needs enough native token to pay gas.

- **Testnet:** request test ETH from a faucet (e.g. a Sepolia faucet), then it's ready to deploy and transact.
- The `.env` export includes `*_RPC_URL` placeholders for each EVM testnet — see [EVM wallets](/chains/evm/).

## Accounts with rent: Solana

A Solana address is valid immediately and can receive funds, but an on-chain account must hold the **rent-exempt minimum** (a few thousand lamports) to persist; accounts below it can be purged.

```bash
solana airdrop 2 <ADDRESS> --url devnet
```

Devnet airdrops cover both the rent minimum and transaction fees. See [Solana keypairs](/chains/solana/).

## Accounts with a reserve: Stellar and XRP Ledger

These are the two that behave differently from the rest. **The account does not exist until it is created/activated with the base reserve.** Until then, balance lookups return 404 / "account not found" — the keypair is fine, there's just nothing on-ledger yet.

### Stellar

A `G…` account must be created by a payment that meets the **base reserve** (currently ~1 XLM). On testnet, [Friendbot](https://friendbot.stellar.org) both *creates and funds* the account in one step with ~10,000 test XLM — so a Stellar dev wallet is effectively **pre-funded** once you hit Friendbot:

```bash
curl "https://friendbot.stellar.org?addr=<G_PUBLIC_KEY>"
```

On mainnet, someone has to send the initial reserve before the account exists. See [Stellar keypairs](/chains/stellar/).

### XRP Ledger

An `r…` address must be **activated** by a payment meeting the base reserve (currently ~1 XRP). The [XRPL Testnet Faucet](https://xrpl.org/xrp-testnet-faucet.html) activates and funds the account with ~1,000 test XRP. Before activation, the account isn't on-ledger and can't send or hold trust lines. See [XRP Ledger wallets](/chains/xrp/).

:::note
The reserve is **locked**, not spent — it stays in the account as long as it exists. It's the on-ledger cost of occupying state, not a fee.
:::

## UTXO: Bitcoin

Bitcoin has no accounts and no reserve. A `tb1q…` (testnet) or `bc1q…` (mainnet) address is spendable as soon as a UTXO is sent to it. Fund a testnet address from a [Bitcoin testnet faucet](https://coinfaucet.eu/en/btc-testnet/), then spend the resulting UTXOs. See [Bitcoin wallets](/chains/bitcoin/).

:::caution
Faucets and reserves shown here are for **testnets**. These wallets are for development only — never fund a generated address with meaningful mainnet value. See the [security model](/security/).
:::
