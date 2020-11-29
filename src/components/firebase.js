import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCgwlJO2fEXCTLjm3ViW2-3UYQpevkWyqw",
    authDomain: "app-react-comit.firebaseapp.com",
    databaseURL: "https://app-react-comit.firebaseio.com",
    projectId: "app-react-comit",
    storageBucket: "app-react-comit.appspot.com",
    messagingSenderId: "946623724982",
    appId: "1:946623724982:web:9c4eaf3b8ce76c6e6a1517"
};

firebase.initializeApp(firebaseConfig);

const authentication = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export {db, storage}
export default {authentication, firebaseConfig};
