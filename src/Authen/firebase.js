// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBv-1vK0uvZ7adwvpQg09bKVKapIt7dA0I",
    authDomain: "user-e9453.firebaseapp.com",
    projectId: "user-e9453",
    storageBucket: "user-e9453.appspot.com",
    messagingSenderId: "415699261029",
    appId: "1:415699261029:web:d1d62330adce6a552d588c",
    measurementId: "G-C8ZMFQHMES",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const provider = new GoogleAuthProvider();
