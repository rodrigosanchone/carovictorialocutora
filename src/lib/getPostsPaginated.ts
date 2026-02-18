import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAt,
} from "firebase/firestore";
import { getPosts } from "./getPosts";

export async function getPostsPaginated(page: number, perPage = 4) {
  const offset = (page - 1) * perPage;

  // Obtener todos los docs para calcular el cursor
  const allSnapshot = await getDocs(
    query(collection(db, "posts"), orderBy("createdAt", "desc"))
  );
  const allDocs = allSnapshot.docs;
  const startDoc = allDocs[offset - 1];

  const posts = await getPosts({
    limitCount: perPage,
    startAfterDoc: startDoc,
  });

  return {
    posts,
    total: allDocs.length,
  };
}
