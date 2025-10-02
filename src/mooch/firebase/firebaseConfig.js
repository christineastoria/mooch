// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc , updateDoc, arrayUnion, onSnapshot, getDocs , getDoc, arrayRemove, getCountFromServer, deleteDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata, listAll } from "firebase/storage";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
