// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import getStorage from "redux-persist/es/storage/getStorage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ae732.firebaseapp.com",
  projectId: "mern-estate-ae732",
  storageBucket: "mern-estate-ae732.appspot.com",
  messagingSenderId: "708065259716",
  appId: "1:708065259716:web:41d601417ce51d0d8d1991"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);



// firebase storage 

// allow read, 
// allow write:if
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')