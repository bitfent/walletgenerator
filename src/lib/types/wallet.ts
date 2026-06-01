export type NetworkMode = "testnet" | "mainnet";

export type ChainId = "evm" | "solana" | "stellar" | "xrp" | "bitcoin";

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

export type EvmWallet = {
  chainFamily: "evm";
  address: string;
  privateKey: string;
  publicKey?: string;
  derivationPath?: string;
  compatibleChains: EvmCompatibleChain[];
};

export type SolanaWallet = {
  chainFamily: "solana";
  address: string;
  publicKey: string;
  secretKeyBase58: string;
  secretKeyArray: number[];
  derivationPath?: string;
};

export type StellarWallet = {
  chainFamily: "stellar";
  publicKey: string;
  secretKey: string;
  derivationPath?: string;
};

export type XrpWallet = {
  chainFamily: "xrp";
  address: string;
  seed: string;
  privateKey?: string;
  publicKey?: string;
  derivationPath?: string;
};

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

export type WalletSet = {
  index: number;
  createdAt: string;
  networkMode: NetworkMode;
  seedPhrase: string;
  evm?: EvmWallet;
  solana?: SolanaWallet;
  stellar?: StellarWallet;
  xrp?: XrpWallet;
  bitcoin?: BitcoinWallet;
};

export type GenerateOptions = {
  count: number;
  networkMode: NetworkMode;
  chains: ChainId[];
};
