// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-next-app-c5ced.firebaseapp.com",
  projectId: "my-next-app-c5ced",
  storageBucket: "my-next-app-c5ced.appspot.com",
  messagingSenderId: "100735838536",
  appId: "1:100735838536:web:efb9c60a666142b86feb7d",
  measurementId: "G-Z55WSEN7VE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);