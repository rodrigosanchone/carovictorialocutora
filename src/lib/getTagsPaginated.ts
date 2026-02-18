import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";

const POSTS_PER_PAGE = 4;

export async function getTagsPaginator(tag: string, page: number) {
  const postsRef = collection(db, "posts");
  const baseQuery = query(
    postsRef,
    where("tags", "array-contains", tag),
    orderBy("createdAt", "desc"),
    limit(POSTS_PER_PAGE * page)
  );

  const snapshot = await getDocs(baseQuery);
  const allDocs = snapshot.docs;

  const paginatedDocs = allDocs.slice(
    POSTS_PER_PAGE * (page - 1),
    POSTS_PER_PAGE * page
  );

  const posts = paginatedDocs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    posts,
    total: allDocs.length,
  };
}
