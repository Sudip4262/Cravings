// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC5BWuCRZj_VrxqKkcjluYA0Dhu-VcNnBc",
  authDomain: "cravings-fc942.firebaseapp.com",
  projectId: "cravings-fc942",
  storageBucket: "cravings-fc942.appspot.com",
  messagingSenderId: "898506915280",
  appId: "1:898506915280:web:94f487db92ba095b784dd5",
  measurementId: "G-7CZ9NH2V2K"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app)

export { db , auth};
