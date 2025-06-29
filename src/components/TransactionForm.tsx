import React, { useState } from "react";
import { TransactionParams, SignedTransactionResult } from "../types/transactionTypes";
import { buildTransaction, signTransaction } from "../services/transactionService";
import { TransactionPreview } from "./TransactionPreview";

export const TransactionForm: React.FC = () => {
  const [form, setForm] = useState<TransactionParams>({
    nonce: 0,
    gasPrice: "20",
    gasLimit: "21000",
    to: "",
    value: "0",
    data: "0x"
  });
  const [privateKey, setPrivateKey] = useState<string>("");
  const [signedTx, setSignedTx] = useState<SignedTransactionResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSign = async () => {
    try {
      const tx = buildTransaction(form);
      const signed = await signTransaction(tx, privateKey);
      setSignedTx(signed);
    } catch (error) {
      console.error("Error signing transaction:", error);
      alert("Error signing transaction. Check console for details.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Transaction Builder</h2>
      <div>
        <label>Nonce:</label>
        <input type="number" name="nonce" value={form.nonce} onChange={handleChange} />
      </div>
      <div>
        <label>Gas Price (Gwei):</label>
        <input type="text" name="gasPrice" value={form.gasPrice} onChange={handleChange} />
      </div>
      <div>
        <label>Gas Limit:</label>
        <input type="text" name="gasLimit" value={form.gasLimit} onChange={handleChange} />
      </div>
      <div>
        <label>To:</label>
        <input type="text" name="to" value={form.to} onChange={handleChange} />
      </div>
      <div>
        <label>Value (ETH):</label>
        <input type="text" name="value" value={form.value} onChange={handleChange} />
      </div>
      <div>
        <label>Data (hex):</label>
        <input type="text" name="data" value={form.data} onChange={handleChange} />
      </div>
      <div>
        <label>Private Key:</label>
        <input
          type="password"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </div>
      <button onClick={handleSign}>Sign Transaction</button>

      {signedTx && <TransactionPreview signedTx={signedTx} />}
    </div>
  );
};
