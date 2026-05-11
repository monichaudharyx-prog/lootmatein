import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8V2d9BVEz4cBcVmPimwBOY6JjbcJSXfw",
  authDomain: "lootmate-4e206.firebaseapp.com",
  projectId: "lootmate-4e206",
  storageBucket: "lootmate-4e206.firebasestorage.app",
  messagingSenderId: "664879164462",
  appId: "1:664879164462:web:7bba9a0d31b26820ac43bf"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
