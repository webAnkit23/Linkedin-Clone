import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSAazNoyqebxHrEyQSUm_Wjd9E_aXiLvQ",
  authDomain: "linkedclone-257a0.firebaseapp.com",
  projectId: "linkedclone-257a0",
  storageBucket: "linkedclone-257a0.appspot.com",
  messagingSenderId: "392372128608",
  appId: "1:392372128608:web:2f66bcf666d2552c7eac05",
  measurementId: "G-80ZEYDS974"
};
 const app = initializeApp(firebaseConfig);
 const auth = getAuth();
const storage = getStorage(app);
const firestore = getFirestore(app);

export {auth,app,storage ,firestore};