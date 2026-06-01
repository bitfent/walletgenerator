---
title: Security model
description: How walletgenerator.dev keeps seed phrases and private keys local — browser-only generation, no backend, no persistence, no analytics, and a strict CSP.
---

Because this tool handles seed phrases and private keys, trust is part of the product. This page describes exactly how it works and where the boundaries are.

## Browser-only generation

Every seed phrase, private key, secret key, address, and export file is produced locally in your browser. There is no "wallet service." Generating a wallet is deterministic math:

```text
CSPRNG entropy → mnemonic (BIP-39) → seed → key derivation (BIP-32 / SLIP-0010)
→ public key (secp256k1 / ed25519) → hash + encode → address
```

None of these steps require the network. An address is not "registered" anywhere — it simply exists the moment the math runs, and a blockchain only learns of it when a transaction references it. (That's why Stellar and XRP Ledger accounts must be *funded* before they exist on-chain.)

## What we never do

- No backend wallet generation
- No transmission of seed phrases, private keys, or secret keys
- No transmission of export files
- No database storage of generated keys
- No `localStorage`, cookies, or IndexedDB for generated wallets
- No analytics on the generator

## No persistence

Generated wallets live in memory only. Refreshing the page or clicking **Clear generated wallets** removes everything. There is no auto-save — if you need a set, export it yourself.

## Randomness

Mnemonics are generated from the platform CSPRNG via the Web Crypto API (`crypto.getRandomValues`), the same source every browser wallet relies on. Randomness quality therefore depends on your browser and OS. This is appropriate for development and testing — the tool's stated purpose — but is one more reason not to use generated wallets for meaningful funds.

## Cryptography

The tool does not hand-roll low-level cryptography. It composes audited, widely used primitives that all run **in your browser**:

| Concern | Library |
| --- | --- |
| Mnemonics (BIP-39) | `@scure/bip39` |
| HD derivation (BIP-32) | `@scure/bip32` |
| secp256k1 / ed25519 | `@noble/curves` |
| Hashing (SHA-256, RIPEMD-160, …) | `@noble/hashes` |
| base58 / bech32 / base32 | `@scure/base` |
| EVM key derivation | `ethers` |
| XRPL encoding | `ripple-keypairs`, `ripple-address-codec` |

Stellar StrKey encoding (version byte + CRC16-XModem + base32) is implemented directly in the project and cross-checked for round-trip correctness.

## Recommended Content Security Policy

The generator is designed to run with no outbound connections. A strict CSP for the generator page:

```text
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

The key line is `connect-src 'none'` — the generator needs no network access to function.

## Offline use

Because nothing depends on the network, you can verify the safety claim directly: load the page, disconnect from the internet, and generate. The output is identical. For maximum assurance you can self-host or build a local copy and run it air-gapped.

## Open source and auditability

The full implementation is open source so you can inspect it, audit the cryptography, review the dependency list, self-host an offline copy, and contribute additional chain support. See [Contributing](/contributing/).

## Reporting a vulnerability

If you find a security issue, please report it privately via a GitHub security advisory on the repository rather than opening a public issue. We'll coordinate a fix and disclosure.
