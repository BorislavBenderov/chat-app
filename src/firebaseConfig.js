import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADms3SFcXTso6pZ1qrrAwTqqcqB9c3IdM",
  authDomain: "chat-app-2fb65.firebaseapp.com",
  projectId: "chat-app-2fb65",
  storageBucket: "chat-app-2fb65.appspot.com",
  messagingSenderId: "867632473489",
  appId: "1:867632473489:web:499e2b308e49e302fd2630"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore(app);