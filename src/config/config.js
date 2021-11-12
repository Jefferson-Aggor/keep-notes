import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCApsZkStESj0EjwcjTnZy2HW5wUtSnrCg",
  authDomain: "keep-clone-f2d44.firebaseapp.com",
  projectId: "keep-clone-f2d44",
  storageBucket: "keep-clone-f2d44.appspot.com",
  messagingSenderId: "218596556874",
  appId: "1:218596556874:web:1613b79c8965680ca9e6b3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
