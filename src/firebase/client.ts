import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJKH1IpkXR7RcuVY3kWwz8D3v2Rj1zpuY",
  authDomain: "como-se-dice.firebaseapp.com",
  projectId: "como-se-dice",
  storageBucket: "como-se-dice.appspot.com",
  messagingSenderId: "990105556597",
  appId: "1:990105556597:web:b2eb29c698e5a0951d4a3c",
};

export const app = initializeApp(firebaseConfig);