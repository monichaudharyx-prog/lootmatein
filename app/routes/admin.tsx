import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "~/lib/firebase";

export default function AdminPage() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const sellerSnap = await getDocs(collection(db, "sellers"));
    const offerSnap = await getDocs(collection(db, "offers"));

    setSellers(sellerSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setOffers(offerSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const approveSeller = async (id: string) => {
    await updateDoc(doc(db, "sellers", id), {
      status: "approved"
    });

    alert("Seller Approved ✅");
  };

  const blockOffer = async (id: string) => {
    await updateDoc(doc(db, "offers", id), {
      blocked: true
    });

    alert("Offer Blocked ❌");
  };

  return (
    <div className="page">
      <h2>🛠 Admin Control Panel</h2>

      {/* SELLERS */}
      <h3>🏪 Sellers</h3>

      {sellers.map((s: any) => (
        <div className="card" key={s.id}>
          <p>{s.shopName}</p>
          <p>Status: {s.status || "pending"}</p>

          <button onClick={() => approveSeller(s.id)}>
            ✅ Approve
          </button>
        </div>
      ))}

      {/* OFFERS */}
      <h3>🎁 Offers</h3>

      {offers.map((o: any) => (
        <div className="card" key={o.id}>
          <p>{o.title}</p>
          <p>👁 Views: {o.views}</p>

          <button onClick={() => blockOffer(o.id)}>
            ❌ Block Offer
          </button>
        </div>
      ))}
    </div>
  );
}
