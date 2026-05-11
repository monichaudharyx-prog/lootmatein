import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function addCommission(userId: string, amount: number) {
  await updateDoc(doc(db, "users", userId), {
    earnings: increment(amount * 0.5) // 50% commission
  });
}
