// Import the necessary Firebase services from the modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwDqgxvf3tS4riQj16_Vi_D2Fw92NcvaE",
  authDomain: "my-project-ab9e1.firebaseapp.com",
  projectId: "my-project-ab9e1",
  storageBucket: "my-project-ab9e1.appspot.com",
  messagingSenderId: "729775461779",
  appId: "1:729775461779:web:f30a19d7f532ff80fbc466",
  measurementId: "G-T4NB9S9PBZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app); 
const storage = getStorage(app); 


export { auth, db, storage };
