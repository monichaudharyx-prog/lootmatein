import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="footer">

      <Link to="/">🏠</Link>
      <Link to="/affiliate">🔗</Link>

      {/* CENTER ADD BUTTON */}
      <Link to="/seller" className="add-btn">
        ➕
      </Link>

      <Link to="/wallet">💰</Link>
      <Link to="/profile">👤</Link>

    </div>
  );
}
