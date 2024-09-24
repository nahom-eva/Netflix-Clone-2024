// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvKAIgVRbuoDVgiDAP6tr7FTFvCgMV600",
  authDomain: "netflix-clone-deploy-nah-e808b.firebaseapp.com",
  projectId: "netflix-clone-deploy-nah-e808b",
  storageBucket: "netflix-clone-deploy-nah-e808b.appspot.com",
  messagingSenderId: "417313385835",
  appId: "1:417313385835:web:90d125e6b252b4df81302e",
  measurementId: "G-64R7FP81H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);