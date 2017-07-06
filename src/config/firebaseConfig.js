import firebase from 'firebase'


const config = {
  apiKey: "AIzaSyA8LZra3d7EmirSmX6JckaHDgIZqp8IAXk",
  authDomain: "test-sw-1587c.firebaseapp.com",
  databaseURL: "https://test-sw-1587c.firebaseio.com",
  projectId: "test-sw-1587c",
  storageBucket: "test-sw-1587c.appspot.com",
  messagingSenderId: "332585490248"
};

firebase.initializeApp(config);
export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      func(true, user)
    } else {
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const db = firebase.database();
export const firebaseAuth = firebase.auth();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerGithub = new firebase.auth.GithubAuthProvider();
export const firebaseStorage = firebase.storage();
