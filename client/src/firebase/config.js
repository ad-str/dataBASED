// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
  } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh49RkjHkg3O_aYTRHild7ygQryYmvOGU",
  authDomain: "artbased-login.firebaseapp.com",
  projectId: "artbased-login",
  storageBucket: "artbased-login.appspot.com",
  messagingSenderId: "298552680315",
  appId: "1:298552680315:web:d5fa497aeda8cb278aa7de",
  measurementId: "G-ST9583CCE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };