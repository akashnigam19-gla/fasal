import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseCredentials = {
  apiKey: "AIzaSyDsfwHGZP4QJAbfW-wxdquX6ztofoNI9R4",
  authDomain: "fasal-d23ed.firebaseapp.com",
  projectId: "fasal-d23ed",
  storageBucket: "fasal-d23ed.appspot.com",
  messagingSenderId: "1080673270597",
  appId: "1:1080673270597:web:aa0668e0fc23c409cd5c2c",
  measurementId: "G-GEB53EK9K7"  
};

//If an firebase app hasn't already been created
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCredentials)
}

export default firebase;
