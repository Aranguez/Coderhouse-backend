// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6_pZ3YX0wS8fb6lZlEfEM2jpspuvgb9U",
  authDomain: "coderhouse-ecommerce-32862.firebaseapp.com",
  projectId: "coderhouse-ecommerce-32862",
  storageBucket: "coderhouse-ecommerce-32862.appspot.com",
  messagingSenderId: "888740580899",
  appId: "1:888740580899:web:1ff93fc638cda3403cab96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;