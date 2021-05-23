import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyClhiBhsXnaadf_f7x3uEXVyFr8208p2Ag",
    authDomain: "laptopseller-8a205.firebaseapp.com",
    projectId: "laptopseller-8a205",
    storageBucket: "laptopseller-8a205.appspot.com",
    messagingSenderId: "417858816622",
    appId: "1:417858816622:web:2a4a4a11e1861e9848b47f"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()