// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4oVuhRsfk9GjGcbLY2_zC1Hid3XafpVc",
  authDomain: "netflix-clone-cfcda.firebaseapp.com",
  projectId: "netflix-clone-cfcda",
  storageBucket: "netflix-clone-cfcda.firebasestorage.app",
  messagingSenderId: "881939987323",
  appId: "1:881939987323:web:c69755f2e5c421e992dbde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
