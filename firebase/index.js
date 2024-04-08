// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc,getDocs, doc, updateDoc,deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsoVcWYZxKUDHYviTo37vbzxk3LQXutvU",
  authDomain: "shoppin-app-k.firebaseapp.com",
  projectId: "shoppin-app-k",
  storageBucket: "shoppin-app-k.appspot.com",
  messagingSenderId: "117546670025",
  appId: "1:117546670025:web:b25a680fcd7638497b3a18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export {app,db, getFirestore,collection, addDoc,getDocs, doc, updateDoc,deleteDoc }