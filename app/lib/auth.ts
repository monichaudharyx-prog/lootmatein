import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const login = (email: string, pass: string) =>
  signInWithEmailAndPassword(auth, email, pass);

export const signup = (email: string, pass: string) =>
  createUserWithEmailAndPassword(auth, email, pass);
