// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXiA7nyGoxuFRFvHm34OnqN1-lZxdtcWY",
  authDomain: "firstreactproject-c5f5c.firebaseapp.com",
  projectId: "firstreactproject-c5f5c",
  storageBucket: "firstreactproject-c5f5c.appspot.com",
  messagingSenderId: "1086207337047",
  appId: "1:1086207337047:web:6a06ed9826fe83aedf3912",
  measurementId: "G-PDWM3V57RM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();