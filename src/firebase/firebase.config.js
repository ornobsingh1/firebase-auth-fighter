// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcRKiEdJOJEWakFtQ6uDnYE_l4O6S6Mas",
  authDomain: "fir-auth-fighter-9c0a5.firebaseapp.com",
  projectId: "fir-auth-fighter-9c0a5",
  storageBucket: "fir-auth-fighter-9c0a5.firebasestorage.app",
  messagingSenderId: "518963621922",
  appId: "1:518963621922:web:3d863e4d51998b7ad95a7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
