import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdefghijklmnop"
};

console.log('Firebase config:', {
  apiKey: firebaseConfig.apiKey ? 'Set' : 'Not set',
  authDomain: firebaseConfig.authDomain ? 'Set' : 'Not set',
  projectId: firebaseConfig.projectId ? 'Set' : 'Not set',
  storageBucket: firebaseConfig.storageBucket ? 'Set' : 'Not set',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'Set' : 'Not set',
  appId: firebaseConfig.appId ? 'Set' : 'Not set'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);

// Initialize Firebase Authentication and get a reference to the service
// Note: This will automatically use the free built-in reCAPTCHA for phone auth
export const auth = getAuth(app);
console.log('Firebase auth initialized:', auth);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log('Firebase firestore initialized:', db);

export default app;
