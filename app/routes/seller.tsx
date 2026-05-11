import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/lib/firebase";

export default function SellerPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [shopName, setShopName] = useState("");
  const [image, setImage] = useState("");

  const createOffer = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await addDoc(collection(db, "offers"), {
        title,
        price: Number(price),
        shopName,
        image,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        views: 0,
        clicks: 0,
        createdAt: Date.now()
      });

      alert("Offer Created Successfully 🚀");
    });
  };

  return (
    <div className="page">
      <h2>🏪 Create Offer</h2>

      <input
        placeholder="Shop Name"
        onChange={(e) => setShopName(e.target.value)}
      />

      <input
        placeholder="Offer Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Image URL (ImageKit)"
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={createOffer} className="btn">
        🚀 Publish Offer
      </button>
    </div>
  );
}
