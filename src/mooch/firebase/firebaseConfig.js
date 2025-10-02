// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc , updateDoc, arrayUnion, onSnapshot, getDocs , getDoc, arrayRemove, getCountFromServer, deleteDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata, listAll } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNY3QtX3Rcc2q4uL4BZJI3seiMHkW6aUI",
  authDomain: "mooch-65f87.firebaseapp.com",
  projectId: "mooch-65f87",
  storageBucket: "mooch-65f87.appspot.com",
  messagingSenderId: "112146305733",
  appId: "1:112146305733:web:699568a71dbd72ded416ac",
  measurementId: "G-N0417L2WLJ",
};
// storageBucket: "gs://mooch-65f87.appspot.com"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
const db = getFirestore(app);
const storage = getStorage(app);
const itemsRef = ref(storage, 'items');
const profilePicsRef = ref(storage, 'profilePictures');
// const storage = getStorage(firebaseApp, "gs://my-custom-bucket");

export { app, auth, db, storage, getFirestore, collection, doc, addDoc, setDoc, updateDoc, arrayUnion, ref, uploadBytes, onSnapshot, getDocs, getDownloadURL, getMetadata, listAll, getDoc, arrayRemove, getCountFromServer, deleteDoc};
