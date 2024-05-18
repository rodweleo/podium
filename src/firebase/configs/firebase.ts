import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZgokFtD5oKY10rDCCG_9I6b9xEQx8VZI",
  authDomain: "eventvista-28595.firebaseapp.com",
  projectId: "eventvista-28595",
  storageBucket: "eventvista-28595.appspot.com",
  messagingSenderId: "125004567651",
  appId: "1:125004567651:web:4507b1d1ca3a5072cad456",
  measurementId: "G-NRL0JXVV0L"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)