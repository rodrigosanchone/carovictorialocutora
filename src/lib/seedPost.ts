import { db } from "./firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function seedPost() {
  const ref = doc(collection(db, "posts")); // genera ID automático

  const postData = {
    title: "SE IMPECABLE CON TUS PALABRAS",
    content:
      "Habla con integridad.Di solamente lo que quieras decir.Evita hablar contra ti mismo y chismorrear sobre los demas.Utiliza el poder de tus palabras para avanzar en la dirección de la verdad y el amor.",
    tags: ["Filosofía", "Renovacion"],
    author: {
      name: "Carolina",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/carovictorialocutora-ab405.firebasestorage.app/o/caro.jpg?alt=media&token=37b67aee-cb27-4b17-b486-b086262e67b2",
    },
    createdAt: serverTimestamp(),
  };

  await setDoc(ref, postData);
  console.log("Post creado con ID:", ref.id);
}
