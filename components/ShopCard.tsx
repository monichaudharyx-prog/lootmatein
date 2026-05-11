import { Link } from "@remix-run/react";

export default function ShopCard({ shop }: any) {
  return (
    <div className="card">

      <h3>🏪 {shop.name}</h3>

      <p>⭐ Rating: {shop.rating || 4.0}</p>

      <p>👤 Owner: {shop.owner}</p>

      <p>👁 Views: {shop.views || 0}</p>

      <Link to={`/shop/${shop.id}`}>
        Open Shop
      </Link>

    </div>
  );
}
