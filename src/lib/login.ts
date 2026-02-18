import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export async function login(email: string, password: string): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    console.error("Código de error:", error.code);
    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function onUserChange(callback: (user: User | null) => void): void {
  onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
