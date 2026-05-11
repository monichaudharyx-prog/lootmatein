import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/lib/firebase";

export default function SellerDashboard() {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const snap = await getDocs(collection(db, "offers"));

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));

    setOffers(data);
  };

  const totalViews = offers.reduce(
    (sum, o: any) => sum + (o.views || 0),
    0
  );

  const totalClicks = offers.reduce(
    (sum, o: any) => sum + (o.clicks || 0),
    0
  );

  const earnings = totalClicks * 2; // simple model

  return (
    <div className="page">
      <h2>📊 Seller Dashboard</h2>

      {/* STATS */}
      <div className="grid">
        <div className="card">
          👁 Views
          <h3>{totalViews}</h3>
        </div>

        <div className="card">
          🖱 Clicks
          <h3>{totalClicks}</h3>
        </div>

        <div className="card">
          💰 Earnings
          <h3>₹{earnings}</h3>
        </div>
      </div>

      {/* OFFERS LIST */}
      <h3>🔥 Your Offers</h3>

      {offers.map((o: any) => (
        <div key={o.id} className="card">
          <h4>{o.title}</h4>

          <p>🏪 {o.shopName}</p>

          <p>💰 ₹{o.price}</p>

          <p>👁 Views: {o.views || 0}</p>

          <p>🖱 Clicks: {o.clicks || 0}</p>

          <p>
            📍{" "}
            <a
              href={`https://maps.google.com/?q=${o.lat},${o.lng}`}
              target="_blank"
            >
              View Location
            </a>
          </p>

          {/* PERFORMANCE BADGE */}
          {o.views > 500 ? (
            <span className="badge">🔥 Trending</span>
          ) : (
            <span className="badge">📦 Normal</span>
          )}
        </div>
      ))}
    </div>
  );
}
