import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getPosts(params?: {
  limitCount?: number;
  startAfterDoc?: any;
}) {
  const { limitCount, startAfterDoc } = params ?? {};

  const postsRef = collection(db, "posts");

  let q = query(postsRef, orderBy("createdAt", "desc"));
  if (limitCount) q = query(q, limit(limitCount));
  if (startAfterDoc) q = query(q, startAfter(startAfterDoc));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      description: data.description ?? "",
      image: data.image,
      tags: data.tags ?? [],
      author: data.author ?? { name: "", photo: "" },
      createdAt: data.createdAt ?? null,
    };
  });
}
