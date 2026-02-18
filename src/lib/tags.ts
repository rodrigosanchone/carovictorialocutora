import { db } from "./firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function updateTag(tagId: string, newName: string) {
  const tagRef = doc(db, "tags", tagId);
  await updateDoc(tagRef, { name: newName });
}

export async function deleteTag(tagId: string) {
  const tagRef = doc(db, "tags", tagId);
  await deleteDoc(tagRef);
}
