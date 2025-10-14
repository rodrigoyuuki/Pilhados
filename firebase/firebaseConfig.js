import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCZMhFsA7xKsUPXsrADOQaT0CZeSxdX9Zk",
  authDomain: "interdisciplinar---pilhados.firebaseapp.com",
  projectId: "interdisciplinar---pilhados",
  storageBucket: "interdisciplinar---pilhados.firebasestorage.app",
  messagingSenderId: "357437224635",
  appId: "1:357437224635:web:824dd2f2a02fbe95da1b9e",
  measurementId: "G-RHVPT9BKEY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { db, auth, app };
