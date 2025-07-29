// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXRAp9e8PANzUTeZV0nTyT1LlKZcbmnIo",
  authDomain: "villasbyserene-6a7c7.firebaseapp.com",
  projectId: "villasbyserene-6a7c7",
  storageBucket: "villasbyserene-6a7c7.firebasestorage.app",
  messagingSenderId: "20664879757",
  appId: "1:20664879757:web:26b03e86f0ffbf983570c4",
  measurementId: "G-N8W81KP676"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};