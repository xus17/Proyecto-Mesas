import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
  apiKey: "AIzaSyA52yI9x3xaNf0owa597Doj6Ev9idlPOtg",
  authDomain: "restaurante-mesas.firebaseapp.com",
  projectId: "restaurante-mesas",
  storageBucket: "restaurante-mesas.appspot.com",
  messagingSenderId: "959243396507",
  appId: "1:959243396507:web:11135473a1621c5224ed3e"
};

  
const db = firebase.initializeApp( firebaseConfig ).firestore();

export {db}
