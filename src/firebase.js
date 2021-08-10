import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyCTjqjtwrrRp6NOtoODxiNnaErUsR3GKII",
  authDomain: "pokedex-app-dev.firebaseapp.com",
  projectId: "pokedex-app-dev",
  storageBucket: "pokedex-app-dev.appspot.com",
  messagingSenderId: "1056536101621",
  appId: "1:1056536101621:web:47ff784c34c97d6a81fbbc",
});

export const auth = app.auth();
export const firestore = app.firestore();
export const functions = app.functions();
export default app;
