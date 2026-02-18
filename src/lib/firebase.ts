import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz5fT0mCyFqZ6nNxCFzu2SHalDj_GM-mQ",
  authDomain: "carovictorialocutora-ab405.firebaseapp.com",
  projectId: "carovictorialocutora-ab405",
  storageBucket: "carovictorialocutora-ab405.firebasestorage.app",
  messagingSenderId: "465176313716",
  appId: "1:465176313716:web:784e7b8a0b85a2c947b621",
  measurementId: "G-MFXXD06WLF",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, storage, auth };
