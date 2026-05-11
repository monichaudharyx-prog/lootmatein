import { useEffect, useState } from "react";
import { db } from "~/lib/firebase";
import { collection, getDocs, updateDoc, doc, increment } from "firebase/firestore";

export default function Home() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "offers"));
      setOffers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    load();
  }, []);

  const trackView = async (id: string) => {
    await updateDoc(doc(db, "offers", id), {
      views: increment(1)
    });
  };

  return (
    <div className="container">
      <header>🔥 LootMate Deals</header>

      {offers.map((o: any) => (
        <div className="card" key={o.id} onClick={() => trackView(o.id)}>

          {/* SHOP NAME + OFFER */}
          <h3>🏪 {o.shopName}</h3>
          <p>🎁 {o.title}</p>

          {/* PRICE */}
          <p>💰 ₹{o.price}</p>

          {/* VIEWS EVERYWHERE */}
          <p>👁 Views: {o.views || 0}</p>

          {/* LOCATION */}
          <a href={`https://maps.google.com/?q=${o.lat},${o.lng}`}>
            📍 Open Location
          </a>

          <button className="btn">Claim Offer</button>
        </div>
      ))}
    </div>
  );
}
