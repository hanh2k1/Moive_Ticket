import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAs6yzV7BEpV44nppjBEKndpUbGgWqP-7w",
    authDomain: "movie-ticket-800f0.firebaseapp.com",
    projectId: "movie-ticket-800f0",
    storageBucket: "movie-ticket-800f0.appspot.com",
    messagingSenderId: "865710570188",
    appId: "1:865710570188:web:9f2c57ed6628342492e069"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STO = getStorage(FIREBASE_APP);
export const app = initializeApp(firebaseConfig);