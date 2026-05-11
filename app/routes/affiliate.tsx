import { useState } from "react";

export default function Affiliate() {
  const [link, setLink] = useState("");

  const generateLink = () => {
    const userId = "USER123";
    setLink(`https://lootmate.app/track?ref=${userId}`);
  };

  return (
    <div className="container">
      <header>🔗 Affiliate Center</header>

      <button className="btn" onClick={generateLink}>
        Generate Referral Link
      </button>

      {link && (
        <div className="card">
          <p>Share this link:</p>
          <p>{link}</p>
        </div>
      )}
    </div>
  );
}
