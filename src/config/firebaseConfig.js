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
export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User log in ok", user);
      func(true, user)
    } else {
      console.log("User log in failed", user);
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const db = firebase.database();
export const firebaseAuth = firebase.auth;
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerGithub = new firebase.auth.GithubAuthProvider();
export const firebaseStorage = firebase.storage();
