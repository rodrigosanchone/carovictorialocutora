import { db, storage } from "./firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

/**
 * Elimina un post y su imagen asociada de Firestore y Storage
 */
export async function deletePost(postId: string) {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    throw new Error("El post no existe");
  }

  const postData = postSnap.data();

  // Si el post tiene imagen, intentar eliminarla del bucket
  if (postData.image) {
    try {
      const imagePath = decodeURIComponent(
        postData.image.split("/o/")[1].split("?")[0],
      );
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log("Imagen eliminada correctamente");
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        console.warn("La imagen no existe en Storage, no se pudo eliminar.");
      } else {
        console.error("Error al eliminar la imagen:", error);
      }
    }
  }

  // Eliminar el documento en Firestore
  await deleteDoc(postRef);
  console.log(`Post con ID ${postId} eliminado correctamente`);
}
