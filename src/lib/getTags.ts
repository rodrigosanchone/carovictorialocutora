import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getTags() {
  const snapshot = await getDocs(collection(db, "tags"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
}
