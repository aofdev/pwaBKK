import { db, firebaseAuth,providerGoogle } from '../config/firebaseConfig';


export const registerByEmail = ({commit}, {email, password}) => {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
};

export const logout = ({commit}) => {
  return firebaseAuth().signOut();
};

export function loginWithEmail ({commit}, {email, password}) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function loginWithGoogle({commit}) {
 return firebaseAuth().signInWithPopup(providerGoogle).then(function(result) {
    console.log(result);
  }).catch(function(error) {});
}
