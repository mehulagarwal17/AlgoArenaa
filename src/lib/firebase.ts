import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-542707319-af169',
  appId: '1:1098936362283:web:a56b4024ddf882330c516e',
  apiKey: 'AIzaSyDYTuuQoK-y1q4NBnLnLQ7KTdwm74Kv-aA',
  authDomain: 'studio-542707319-af169.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '1098936362283',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
