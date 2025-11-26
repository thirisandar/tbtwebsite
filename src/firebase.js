// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ⭐️ NEW: Import Firestore ⭐️
import { getStorage } from "firebase/storage"; // 👈 1. Import getStorage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7CObypN_Qg9x4bDk-RKVRnS-6geY2cSU",
  authDomain: "tbtbusiness2-7e32d.firebaseapp.com",
  projectId: "tbtbusiness2-7e32d",
  storageBucket: "tbtbusiness2-7e32d.firebasestorage.app",
  messagingSenderId: "988044192206",
  appId: "1:988044192206:web:cafaf149c6c34c5dd0639f",
  measurementId: "G-2F5RDS463L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // 👈 2. Initialize and Export storage