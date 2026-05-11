import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export const trackView = async (id: string) => {
  await updateDoc(doc(db, "offers", id), {
    views: increment(1)
  });
};

export const trackClick = async (id: string) => {
  await updateDoc(doc(db, "offers", id), {
    clicks: increment(1)
  });
};
