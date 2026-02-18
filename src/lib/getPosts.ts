import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

function serializeDoc(docSnap: any) {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    slug: data.slug ?? docSnap.id, // 👈 usa el campo slug si existe, si no el id
    title: data.title,
    content: data.content,
    description: data.description ?? "",
    image: data.image,
    tags: data.tags ?? [],
    author: data.author ?? { name: "", photo: "" },
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : (data.createdAt ?? null),
  };
}

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

  return snapshot.docs.map(serializeDoc);
}
