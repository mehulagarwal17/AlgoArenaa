import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYTuuQoK-y1q4NBnLnLQ7KTdwm74Kv-aA",
  authDomain: "studio-542707319-af169.firebaseapp.com",
  projectId: "studio-542707319-af169",
  storageBucket: "studio-542707319-af169.appspot.com",
  messagingSenderId: "1098936362283",
  appId: "1:1098936362283:web:a56b4024ddf882330c516e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
