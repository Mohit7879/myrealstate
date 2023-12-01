// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId:import.meta.env.projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId:import.meta.env.messagingSenderId,
  appId:import.meta.env.appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



// firebase storage 

// allow read, 
// allow write:if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')