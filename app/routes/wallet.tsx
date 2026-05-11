import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "~/lib/firebase";

export default function Wallet() {
  const userId = "demo-user";
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const snap = await getDoc(doc(db, "users", userId));

    if (snap.exists()) {
      setWallet(snap.data().wallet || 0);
    }
  };

  const addMoney = async () => {
    await updateDoc(doc(db, "users", userId), {
      wallet: increment(10)
    });

    alert("Reward Added 🎁");
    load();
  };

  return (
    <div className="page">
      <h2>💰 Wallet</h2>

      <div className="card">
        <h1>₹ {wallet}</h1>
      </div>

      <button className="btn" onClick={addMoney}>
        🎁 Add Reward (Demo)
      </button>

      <div className="card">
        <p>✔ Daily login reward</p>
        <p>✔ Offer claim reward</p>
        <p>✔ Referral bonus</p>
      </div>
    </div>
  );
}
