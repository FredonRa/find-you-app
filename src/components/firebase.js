import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);

const authentication = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export {db}
export default {authentication, firebaseConfig, storage};
