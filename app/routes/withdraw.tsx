import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/lib/firebase";

export default function Withdraw() {
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");

  const requestWithdraw = async () => {
    if (Number(amount) < 50) {
      alert("Minimum ₹50 required");
      return;
    }

    await addDoc(collection(db, "withdrawals"), {
      upi,
      amount: Number(amount),
      status: "pending",
      createdAt: Date.now()
    });

    alert("Withdraw request sent 🚀 (Admin approval required)");
  };

  return (
    <div className="page">
      <h2>💰 Withdraw Money</h2>

      <input
        placeholder="Enter UPI ID"
        onChange={(e) => setUpi(e.target.value)}
      />

      <input
        placeholder="Amount (₹)"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="btn" onClick={requestWithdraw}>
        Request Withdraw
      </button>

      <div className="card">
        <p>⚠ Minimum withdraw: ₹50</p>
        <p>⏳ Approval by Admin required</p>
      </div>
    </div>
  );
}
