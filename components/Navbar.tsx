import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <div className="navbar">

      <h2>🔥 LootMate</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/affiliate">Affiliate</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/seller">Sell</Link>
      </div>

    </div>
  );
}
