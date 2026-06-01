---
title: FAQ
description: Common questions about walletgenerator.dev — safety, offline use, mainnet keys, derivation, and why generation happens entirely in your browser.
---

## Is this safe to use for real funds?

No — and that is by design. walletgenerator.dev is built for **development and test wallets**. Even though the cryptography is standard and correct, a key you generated in a browser tab, displayed on screen, and exported to a plaintext file has a far larger exposure surface than a key from a hardware wallet. Use it for testnets, local chains, and fixtures. For mainnet funds, use a hardware wallet.

## Does anything get sent to a server?

No. All key generation and serialization happen in your browser. The site ships a Content Security Policy with `connect-src 'none'`, so the page **cannot** make network requests even if something tried to. There is no backend, no analytics, and no persistence. See the [security model](/security/) for details.

## Can I use it offline?

Yes. Once the page has loaded, you can disconnect from the network and everything still works — generation never needed the network in the first place. You can also save the page or run the project locally.

## Why one seed phrase per wallet set, instead of one phrase for everything?

A "wallet set" is a numbered group with one wallet per selected chain, all sharing **one** 12-word mnemonic. This mirrors how developers actually restore test wallets: import a single phrase and recover the whole multi-chain set. Generating 20 sets gives you 20 independent mnemonics. See [derivation paths](/derivation-paths/).

## Can it generate mainnet keys?

Yes. Switch the network mode to **mainnet**. For most chains the key and address are identical across modes — only Bitcoin changes (different derivation path and `bc1`/`tb1` prefix). The mode mainly drives which RPC/endpoint placeholders the export includes. The keys are real either way, which is exactly why you should not fund them.

## Are the keys actually valid?

Yes. Each chain uses standard derivation and encoding — BIP-39/BIP-32 mnemonics, SLIP-0010 for ed25519 chains, BIP-84 native SegWit for Bitcoin, StrKey for Stellar, and standard XRPL family seeds. Anything generated here can be imported into the matching wallet or SDK. See the per-chain pages under **Chains**.

## Which chains are supported?

EVM (Ethereum and all EVM-compatible chains), Solana, Stellar, XRP Ledger, and Bitcoin. See [supported chains](/supported-chains/).

## How many wallets can I generate at once?

Presets are 1, 5, 10, 20, 50, and 100, with 20 as the default. 100 is the maximum.

## Why don't the secrets show by default?

Secrets (seed phrases, private keys, WIFs, secret seeds) are masked until you reveal them, so you don't accidentally expose a key while screen-sharing or recording. Reveal individual values when you need them.

## Is it open source?

Yes. See [contributing](/contributing/) for how to run it locally and contribute.
