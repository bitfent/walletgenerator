import { HDNodeWallet } from "ethers";
import type { EvmWallet } from "../types/wallet";
import { EVM_COMPATIBLE_CHAINS } from "../types/chains";

const EVM_PATH = "m/44'/60'/0'/0/0";

export function generateEvm(mnemonic: string): EvmWallet {
  const wallet = HDNodeWallet.fromPhrase(mnemonic, undefined, EVM_PATH);
  return {
    chainFamily: "evm",
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    derivationPath: EVM_PATH,
    compatibleChains: [...EVM_COMPATIBLE_CHAINS],
  };
}
