import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAo0mQ-YlPyJTQsPR26NdIq4PMpdj81jRc",
    authDomain: "react-snapchat-b4a8f.firebaseapp.com",
    projectId: "react-snapchat-b4a8f",
    storageBucket: "react-snapchat-b4a8f.appspot.com",
    messagingSenderId: "441336214049",
    appId: "1:441336214049:web:db5efb2f08ad3170482960",
    measurementId: "G-88EGM7XN3Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, storage, provider};
