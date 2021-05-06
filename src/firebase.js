import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8M4dfi4-2Bb7sC-DwptKXlQoaQP1BVKo",
    authDomain: "chat-app-ffaa3.firebaseapp.com",
    projectId: "chat-app-ffaa3",
    storageBucket: "chat-app-ffaa3.appspot.com",
    messagingSenderId: "518681347334",
    appId: "1:518681347334:web:ee880a1f05bc310b648a87",
    measurementId: "G-M4QSPX0H1P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;