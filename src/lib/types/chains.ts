import type { ChainId, EvmCompatibleChain } from "./wallet";

export type ChainMeta = {
  id: ChainId;
  label: string;
  defaultSelected: boolean;
  testnetLabel: string;
  mainnetLabel: string;
  note: string;
  secretLabel: string;
};

export const EVM_COMPATIBLE_CHAINS: EvmCompatibleChain[] = [
  "ethereum",
  "polygon",
  "arbitrum",
  "optimism",
  "base",
  "bnb-chain",
  "avalanche-c-chain",
  "mantle",
  "linea",
  "zksync-era",
];

export const EVM_CHAIN_LABELS: Record<EvmCompatibleChain, string> = {
  ethereum: "Ethereum",
  polygon: "Polygon",
  arbitrum: "Arbitrum",
  optimism: "Optimism",
  base: "Base",
  "bnb-chain": "BNB Chain",
  "avalanche-c-chain": "Avalanche C-Chain",
  mantle: "Mantle",
  linea: "Linea",
  "zksync-era": "zkSync Era",
};

export const CHAINS: ChainMeta[] = [
  {
    id: "evm",
    label: "EVM",
    defaultSelected: true,
    testnetLabel: "Sepolia / EVM testnets",
    mainnetLabel: "Ethereum + EVM chains",
    note: "Same address across all EVM chains.",
    secretLabel: "Private key",
  },
  {
    id: "solana",
    label: "Solana",
    defaultSelected: true,
    testnetLabel: "Devnet",
    mainnetLabel: "Mainnet Beta",
    note: "Use Devnet for app testing.",
    secretLabel: "Secret key",
  },
  {
    id: "stellar",
    label: "Stellar",
    defaultSelected: true,
    testnetLabel: "Testnet",
    mainnetLabel: "Public network",
    note: "Fund the account to activate it on-chain.",
    secretLabel: "Secret key",
  },
  {
    id: "xrp",
    label: "XRP Ledger",
    defaultSelected: true,
    testnetLabel: "Testnet",
    mainnetLabel: "Mainnet",
    note: "Fund the account before use; testnets may reset.",
    secretLabel: "Seed",
  },
  {
    id: "bitcoin",
    label: "Bitcoin",
    defaultSelected: true,
    testnetLabel: "Testnet",
    mainnetLabel: "Mainnet",
    note: "Native SegWit P2WPKH address.",
    secretLabel: "WIF",
  },
];

export const QUANTITY_PRESETS = [1, 5, 10, 20, 50, 100];
export const DEFAULT_QUANTITY = 20;
export const MAX_QUANTITY = 100;
