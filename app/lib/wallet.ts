import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function addPoints(userId: string, points: number) {
  await updateDoc(doc(db, "users", userId), {
    points: increment(points)
  });
}

export async function addEarnings(userId: string, amount: number) {
  await updateDoc(doc(db, "users", userId), {
    earnings: increment(amount)
  });
}
