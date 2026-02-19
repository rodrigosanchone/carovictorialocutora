import { db, storage } from "./firebase";
import { doc, updateDoc, Timestamp, getDoc, getDocs } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

export async function updatePost({
  postId,
  title,
  description,
  content,
  imageFile,
  authorName,
  authorImage,
  selectedTags,
}: {
  postId: string;
  title: string;
  description: string;
  content: string;
  imageFile?: File;
  authorName: string;
  authorImage: string;
  selectedTags: string[];
}) {
  const postRef = doc(db, "posts", postId);
  const existingPost = await getDoc(postRef);

  if (!existingPost.exists()) {
    throw new Error("El post no existe");
  }

  const date = new Date();
  let imageUrl = existingPost.data().image;

  // Si hay nueva imagen, eliminar la anterior y subir la nueva
  if (imageFile) {
    try {
      const previousImagePath = decodeURIComponent(
        imageUrl.split("/o/")[1].split("?")[0],
      );
      const previousRef = ref(storage, previousImagePath);
      await deleteObject(previousRef);
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        console.warn("La imagen anterior no existe, no se pudo eliminar.");
      } else {
        console.warn("No se pudo eliminar la imagen anterior:", error);
      }
    }

    const safeTitle = title.trim().replace(/[^a-zA-Z0-9-_]/g, "_");
    const formattedDate = date.toISOString().split("T")[0];
    const newImageRef = ref(storage, `posts/${safeTitle}_${formattedDate}`);
    await uploadBytes(newImageRef, imageFile);
    imageUrl = await getDownloadURL(newImageRef);
  }

  // Resolver nombres de etiquetas
  const tagNames = await resolveTagNames(selectedTags);

  // Actualizar documento
  await updateDoc(postRef, {
    title,
    description,
    content,
    image: imageUrl,
    updatedAt: Timestamp.fromDate(date),
    author: {
      name: authorName,
      photo: authorImage,
    },
    tags: tagNames, // ← ahora guarda los nombres
  });
}
