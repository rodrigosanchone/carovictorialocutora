import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function createPost({
  title,
  description,
  content,
  imageFile,
  authorName,
  authorImage,
  selectedTags,
  youtubeUrl,
}: {
  title: string;
  description: string;
  content: string;
  imageFile: File;
  authorName: string;
  authorImage: string;
  selectedTags: string[];
  youtubeUrl?: string;
}) {
  if (!imageFile || !(imageFile instanceof File)) {
    throw new Error("Archivo de imagen inválido");
  }

  const date = new Date();
  const safeTitle = title.trim().replace(/[^a-zA-Z0-9-_]/g, "_");
  const imageRef = ref(storage, `posts/${safeTitle}_${date.getTime()}`);

  // Subir imagen al bucket
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  // Resolver nombres de etiquetas
  const tagNames = await Promise.all(
    selectedTags.map(async (id) => {
      const tagRef = doc(db, "tags", id);
      const tagSnap = await getDoc(tagRef);
      return tagSnap.exists() ? tagSnap.data().name : id;
    }),
  );

  // Extraer ID de YouTube
  const videoId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;

  // Crear documento en Firestore
  const docRef = await addDoc(collection(db, "posts"), {
    title,
    description,
    content,
    image: imageUrl,
    createdAt: Timestamp.fromDate(date),
    author: {
      name: authorName,
      photo: authorImage,
    },
    tags: tagNames,
    youtubeVideoId: videoId || null,
  });

  // Guardar el slug como el ID del documento
  await setDoc(docRef, { slug: docRef.id }, { merge: true });

  return docRef.id;
}

// Helper para extraer ID de YouTube
function extractYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
