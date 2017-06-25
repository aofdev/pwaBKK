import { db, firebaseAuth,providerGoogle,firebaseStorage } from '../config/firebaseConfig';


export const registerByEmail = ({commit}, {email, password}) => {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
};

export const logout = ({commit}) => {
  return firebaseAuth().signOut();
};

export function loginWithEmail ({commit}, {email, password}) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
};

export function loginWithGoogle({commit}) {
 return firebaseAuth().signInWithPopup(providerGoogle).then(function(result) {
    console.log(result);
  }).catch(function(error) {});
};


export function listenToPostList({commit}) {
  return db.ref("posts/").on('value', (posts) => {
    console.log(posts.val());
    commit('UPDATE_POST_LIST', posts.val());
  });
}

export function insertPost ({commit}, {id,topic,detail,created,userUid,image}) {
  const refdb =  db.ref();
  const key = refdb.push().getKey();
  let posts = {
    id:id,
    topic:topic,
    detail:detail,
    created:created,
    userUid:userUid,
    image:image,
    keyId: key
  };

  const insert = {};
  insert['/posts/' + key] = posts;

  return refdb.set(insert);
}

export function updatePosts({commit}, {id,topic,detail,created,userUid,keyId,image}) {
  let posts = {
    id:id,
    topic:topic,
    detail:detail,
    created:created,
    userUid:userUid,
    image: image,
    keyId: keyId
  };
  return db.ref("posts/"+keyId).update(posts);
}

export function deletePost({commit},{keyId,image}) {
  let storageRef = firebaseStorage.ref('posts/' + image);
  storageRef.delete().then(function() {
    return db.ref("posts/"+keyId).remove();
  }).catch(function(error) {
    console.log(error);
  });
}

export function deleteImageOld({commit},{image}) {
  let storageRef = firebaseStorage.ref('posts/' + image);
  storageRef.delete().then(function() {
  }).catch(function(error) {
    console.log(error);
  });
}
