// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJv_7A_kTRjWJJ-76Bo4PtVyjqFl9v484",
  authDomain: "meal-subcription-plan.firebaseapp.com",
  projectId: "meal-subcription-plan",
  storageBucket: "meal-subcription-plan.appspot.com",
  messagingSenderId: "1083026922411",
  appId: "1:1083026922411:web:caf54e0da5802659a290ee",
  measurementId: "G-LXJQ7FDLWX",
};

// Initialize Firebase
//  initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
