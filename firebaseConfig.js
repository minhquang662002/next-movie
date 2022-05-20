import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB09Zfq8XWHjIbANFKjdS-U267tP_teZeQ",
  authDomain: "next-51045.firebaseapp.com",
  projectId: "next-51045",
  storageBucket: "next-51045.appspot.com",
  messagingSenderId: "937345406825",
  appId: "1:937345406825:web:5a983e962f4d6673ac8ff8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
