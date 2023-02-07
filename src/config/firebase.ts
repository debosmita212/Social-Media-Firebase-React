// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZtFxYUsTAwtEV6Re30BdBydU-UeGiLLs",
  authDomain: "react-demo-app-ead92.firebaseapp.com",
  projectId: "react-demo-app-ead92",
  storageBucket: "react-demo-app-ead92.appspot.com",
  messagingSenderId: "405134033088",
  appId: "1:405134033088:web:e0a3babca9a2b11b5eed25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app); //indicates that the app is autheticated
export const provider=new GoogleAuthProvider(); //authentication provided by google
export const db=getFirestore(app);