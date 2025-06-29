export interface TransactionParams {
  nonce: number;
  gasPrice: string; // in Gwei
  gasLimit: string;
  to: string;
  value: string; // in Ether
  data: string;
}

export interface SignedTransactionResult {
  rawTransaction: string;
  transactionHash: string;
}
