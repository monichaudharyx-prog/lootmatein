import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import {
  collection,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";

import { db } from "~/lib/firebase";

export default function ShopPage() {
  const { id } = useParams();

  const [shop, setShop] = useState<any>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    const shopRef = doc(db, "shops", id || "");
    const shopSnap = await getDoc(shopRef);

    if (shopSnap.exists()) {
      setShop(shopSnap.data());
    }

    const offersSnap = await getDocs(collection(db, "offers"));

    const offerData = offersSnap.docs
      .map((d) => ({
        id: d.id,
        ...d.data()
      }))
      .filter((o: any) => o.shopId === id);

    setOffers(offerData);

    const reviewSnap = await getDocs(collection(db, "reviews"));

    const reviewData = reviewSnap.docs
      .map((d) => ({
        id: d.id,
        ...d.data()
      }))
      .filter((r: any) => r.shopId === id);

    setReviews(reviewData);
  };

  if (!shop) return <p>Loading...</p>;

  return (
    <div className="page">
      {/* SHOP INFO */}
      <div className="shopHeader">
        <img
          src={
            shop.image ||
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
          }
          alt={shop.name}
        />

        <div className="shopInfo">
          <h1>{shop.name}</h1>

          <p>⭐ {shop.rating || 4.5}</p>

          <a
            href={`https://maps.google.com/?q=${shop.lat},${shop.lng}`}
            target="_blank"
          >
            📍 Open Location
          </a>

          <p>👤 Owner: {shop.owner}</p>

          <p>🧾 GST: {shop.gst}</p>

          <p>👁 Views: {shop.views || 0}</p>
        </div>
      </div>

      {/* OFFERS */}
      <div className="section">
        <h2>🔥 Active Offers</h2>

        {offers.map((offer: any) => (
          <div key={offer.id} className="offerMini">
            <div>
              <h4>{offer.title}</h4>
              <p>₹{offer.price}</p>
            </div>

            <button>Claim</button>
          </div>
        ))}
      </div>

      {/* REVIEWS */}
      <div className="section">
        <h2>💬 Reviews</h2>

        {reviews.map((review: any) => (
          <div key={review.id} className="reviewCard">
            <strong>⭐ {review.rating}</strong>

            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
