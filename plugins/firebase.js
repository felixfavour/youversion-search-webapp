// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUKdUvLEgZADaw7bP5f3Z3sREgQhLbSPo",
  authDomain: "youversion-search.firebaseapp.com",
  projectId: "youversion-search",
  storageBucket: "youversion-search.appspot.com",
  messagingSenderId: "171068713669",
  appId: "1:171068713669:web:bb91a2b9f14a09f1501eac",
  measurementId: "G-JWQZZ359EL"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp)
getAnalytics(firebaseApp);