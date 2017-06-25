import { db, firebaseAuth,providerGoogle } from '../config/firebaseConfig';


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

  return refdb.update(insert);
}

export function updatePosts({commit}, {id,topic,detail,created,userUid,keyId}) {
  let posts = {
    id:id,
    topic:topic,
    detail:detail,
    created:created,
    userUid:userUid,
    keyId: keyId
  };
  return db.ref("posts/"+keyId).set(posts);
}

export function deletePost({commit},{keyId}) {
  return db.ref("posts/"+keyId).remove();
}
