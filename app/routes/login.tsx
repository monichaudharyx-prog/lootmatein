import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "~/lib/firebase";
import { useNavigate } from "@remix-run/react";

const provider = new GoogleAuthProvider();

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // GOOGLE LOGIN
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    nav("/");
  };

  // EMAIL LOGIN
  const emailLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    nav("/");
  };

  // SIGNUP
  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    nav("/");
  };

  return (
    <div className="page">
      <h2>🔐 Login / Signup</h2>

      <button className="btn" onClick={googleLogin}>
        🔵 Continue with Google
      </button>

      <hr />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={emailLogin}>
        Login
      </button>

      <button className="btn" onClick={signup}>
        Create Account
      </button>
    </div>
  );
}
