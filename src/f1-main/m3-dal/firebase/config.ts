import {getFirestore, collection, getDocs} from "firebase/firestore"
import {initializeApp} from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyC_ScQLh9c5a_4sCqQGU8GYYPTuRqx2miw",
  authDomain: "cardsprojectforum.firebaseapp.com",
  projectId: "cardsprojectforum",
  storageBucket: "cardsprojectforum.appspot.com",
  messagingSenderId: "828487447380",
  appId: "1:828487447380:web:2fbc0a55ad139d94b58ec1",
  measurementId: "G-VQMSMV331K",
};

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore()

