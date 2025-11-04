import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Read Firebase config from Vite env variables (VITE_ prefix).
// These values are present in `.env` but can be set in your environment for CI.
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyClD9vJHahnVyi4jM--dG75J7wCrxRph6Q",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "anaaj-farmers.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "anaaj-farmers",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "anaaj-farmers.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "148276495427",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:148276495427:web:59ba1f429d23453660c0f6",
};

// Initialize Firebase app and export commonly used services
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
