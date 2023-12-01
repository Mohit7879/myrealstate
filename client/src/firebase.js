// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-d124d.firebaseapp.com",
  projectId: "realestate-d124d",
  storageBucket: "realestate-d124d.appspot.com",
  messagingSenderId: "1050502617728",
  appId: "1:1050502617728:web:33a3d9206029ef073ae465"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



// firebase storage 

// allow read, 
// allow write:if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')