import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

function serializeDoc(docSnap: any) {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    slug: data.slug ?? docSnap.id,
    title: data.title,
    description: data.description ?? "",
    content: data.content ?? "",
    image: data.image ?? "",
    tags: data.tags ?? [],
    author: data.author ?? { name: "", photo: "" },
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : (data.createdAt ?? null),
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : (data.updatedAt ?? null),
  };
}

export async function getTagsPaginator(
  tagName: string,
  page: number,
  perPage = 4,
) {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("tags", "array-contains", tagName));
  const snapshot = await getDocs(q);

  const allPosts = snapshot.docs.map(serializeDoc);
  const total = allPosts.length;

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const posts = allPosts.slice(start, end);

  return { posts, total };
}
