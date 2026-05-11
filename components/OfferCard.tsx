import { Link } from "@remix-run/react";

export default function OfferCard({ offer }: any) {
  return (
    <div className="card">
      <h3>🏪 {offer.shopName}</h3>

      <p>🎁 {offer.title}</p>
      <p>💰 ₹{offer.price}</p>

      <p>👁 Views: {offer.views || 0}</p>

      <Link to={`/shop/${offer.shopId}`}>
        📍 View Shop
      </Link>

      <button className="btn">
        Claim Offer
      </button>
    </div>
  );
}
