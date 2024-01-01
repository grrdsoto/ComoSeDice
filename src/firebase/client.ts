/**
 * Configuration to use the database on the client side.
 */
export const prerender = true;
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_CLIENT_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_CLIENT_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_CLIENT_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_CLIENT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_CLIENT_MESSAGE_SENDER_ID,
  appId: import.meta.env.PUBLIC_CLIENT_APP_ID,
};

export const app = initializeApp(firebaseConfig);