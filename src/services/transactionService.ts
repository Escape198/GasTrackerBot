import { ethers } from "ethers";
import { TransactionParams, SignedTransactionResult } from "../types/transactionTypes";

export function buildTransaction(params: TransactionParams, chainId: number = 1) {
  return {
    nonce: ethers.utils.hexlify(params.nonce),
    gasPrice: ethers.utils.parseUnits(params.gasPrice, "gwei"),
    gasLimit: ethers.utils.hexlify(params.gasLimit),
    to: params.to,
    value: ethers.utils.parseEther(params.value),
    data: params.data,
    chainId
  };
}

export async function signTransaction(
  tx: any,
  privateKey: string
): Promise<SignedTransactionResult> {
  const wallet = new ethers.Wallet(privateKey);
  const signedTx = await wallet.signTransaction(tx);
  const hash = ethers.utils.keccak256(signedTx);
  return {
    rawTransaction: signedTx,
    transactionHash: hash
  };
}
