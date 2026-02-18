import { db, storage } from "./firebase";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Convierte IDs de etiquetas en nombres
export async function resolveTagNames(tagIds: string[]): Promise<string[]> {
  const names: string[] = [];

  for (const id of tagIds) {
    const tagRef = doc(db, "tags", id);
    const tagSnap = await getDoc(tagRef);
    if (tagSnap.exists()) {
      names.push(tagSnap.data().name);
    }
  }

  return names;
}

// Formatea la fecha como DD/MM
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

// Extrae el ID del video de YouTube desde una URL
function extractYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Crea un nuevo post en Firestore
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
  const formattedDate = formatDate(date);
  const safeTitle = title.trim().replace(/[^a-zA-Z0-9-_]/g, "_");
  const imageRef = ref(storage, `posts/${safeTitle}_${formattedDate}`);

  // Subir imagen al bucket
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  // Resolver nombres de etiquetas
  const tagNames = await resolveTagNames(selectedTags);

  // Validar y extraer ID de YouTube
  const videoId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;

  // Crear documento en Firestore
  const docRef = await addDoc(collection(db, "posts"), {
    title,
    description,
    content,
    image: imageUrl,
    createdAt: formattedDate,
    author: {
      name: authorName,
      photo: authorImage,
    },
    tags: tagNames,
    youtubeVideoId: videoId || null,
  });

  return docRef.id;
}
