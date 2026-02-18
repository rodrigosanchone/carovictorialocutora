import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  /*   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, */
  apiKey: "AIzaSyDz5fT0mCyFqZ6nNxCFzu2SHalDj_GM-mQ",
  authDomain: "carovictorialocutora-ab405.firebaseapp.com",
  databaseURL: "https://carovictorialocutora-ab405-default-rtdb.firebaseio.com",
  projectId: "carovictorialocutora-ab405",
  storageBucket: "carovictorialocutora-ab405.appspot.com", // 👈 usa este
  messagingSenderId: "465176313716",
  appId: "1:465176313716:web:784e7b8a0b85a2c947b621",
  measurementId: "G-MFXXD06WLF",
};

// Inicialización segura: usa la app existente si ya está creada
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

console.log("Firebase config:", firebaseConfig);
