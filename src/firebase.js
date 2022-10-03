// import firebase from 'firebase/app';
// import 'firebase/compact/auth'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    // databaseURL: process.env.REACT_APP_FIREBASE_DB
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
// const firestore = app.firestore()
// export const database = {
//     words: firestore.collection('words')
// }
export const auth = getAuth()
// export const database = getDatabase(app)
export default app