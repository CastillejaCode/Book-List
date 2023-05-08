// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhJ0M0uCJ8AeWcZCjYG4_pnEJ4Jnnor7s",
  authDomain: "book-list-a8a32.firebaseapp.com",
  projectId: "book-list-a8a32",
  storageBucket: "book-list-a8a32.appspot.com",
  messagingSenderId: "867747876742",
  appId: "1:867747876742:web:c9dbe5db6bcd9cc160a607",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
