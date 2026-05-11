import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function trackView(id: string) {
  await updateDoc(doc(db, "offers", id), {
    views: increment(1)
  });
}

export async function trackClick(id: string) {
  await updateDoc(doc(db, "offers", id), {
    clicks: increment(1)
  });
}
