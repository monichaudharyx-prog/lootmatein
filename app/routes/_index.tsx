import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/lib/firebase";
import { trackView } from "~/lib/analytics";
import { Link } from "@remix-run/react";

export default function HomePage() {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    const snap = await getDocs(collection(db, "offers"));

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setOffers(data);
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="topbar">
        <div>
          <h2>🔥 LootMate</h2>
          <p>Nearby Deals & Cashback</p>
        </div>

        <Link to="/wallet" className="walletBtn">
          💰 Wallet
        </Link>
      </header>

      {/* SEARCH */}
      <div className="searchBox">
        <input placeholder="Search offers, shops..." />
      </div>

      {/* OFFERS */}
      <div className="offerGrid">
        {offers.map((offer: any) => (
          <div
            key={offer.id}
            className="offerCard"
            onClick={() => trackView(offer.id)}
          >
            {/* IMAGE */}
            <img
              src={
                offer.image ||
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              }
              alt={offer.title}
            />

            {/* CONTENT */}
            <div className="offerContent">
              <div className="offerTop">
                <h3>{offer.title}</h3>

                <span className="price">
                  ₹{offer.price}
                </span>
              </div>

              {/* SHOP */}
              <Link
                to={`/shop/${offer.shopId}`}
                className="shopName"
              >
                🏪 {offer.shopName}
              </Link>

              {/* LOCATION */}
              <a
                href={`https://maps.google.com/?q=${offer.lat},${offer.lng}`}
                target="_blank"
                className="location"
              >
                📍 Open Location
              </a>

              {/* STATS */}
              <div className="stats">
                <span>👁 {offer.views || 0}</span>
                <span>⭐ {offer.rating || 4.5}</span>
              </div>

              {/* ACTION */}
              <button className="claimBtn">
                Claim Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottomNav">
        <Link to="/">🏠</Link>
        <Link to="/affiliate">🔗</Link>

        <Link to="/seller" className="addBtn">
          ➕
        </Link>

        <Link to="/wallet">💰</Link>
        <Link to="/login">👤</Link>
      </nav>
    </div>
  );
}
