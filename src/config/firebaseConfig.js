import firebase from 'firebase'


const config = {
  apiKey: "AIzaSyBFHkmekE0O4_q6602flTuDgIzHyk4boR0",
  authDomain: "pwa-bkk-7483e.firebaseapp.com",
  databaseURL: "https://pwa-bkk-7483e.firebaseio.com/",
  projectId: "pwa-bkk-7483e",
  storageBucket: "pwa-bkk-7483e.appspot.com",
  messagingSenderId: "452391333302"
};

firebase.initializeApp(config);

export const db = firebase.database();

