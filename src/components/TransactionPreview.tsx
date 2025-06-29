import React from "react";
import { SignedTransactionResult } from "../types/transactionTypes";

interface Props {
  signedTx: SignedTransactionResult;
}

export const TransactionPreview: React.FC<Props> = ({ signedTx }) => {
  const handleDownload = () => {
    const blob = new Blob([signedTx.rawTransaction], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "signed_transaction.txt";
    link.click();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Signed Transaction</h3>
      <p><strong>Hash:</strong> {signedTx.transactionHash}</p>
      <textarea
        readOnly
        rows={6}
        style={{ width: "100%" }}
        value={signedTx.rawTransaction}
      />
      <button onClick={handleDownload}>Download Raw Transaction</button>
    </div>
  );
};
