import { db, firebaseAuth,providerGoogle,providerFacebook,providerGithub,firebaseStorage } from '../config/firebaseConfig';
import axios from 'axios';

export const registerByEmail = ({commit}, {email, password}) => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

export const logout = ({commit}) => {
  return firebaseAuth.signOut();
};

export function loginWithEmail ({commit}, {email, password}) {
  return firebaseAuth.signInWithEmailAndPassword(email, password);
}

export function loginWithGoogle({commit}) {
 return firebaseAuth.signInWithPopup(providerGoogle).then(function(result) {
  }).catch(function(error) {});
}

export function loginWithFacebook({commit}) {
  return firebaseAuth.signInWithPopup(providerFacebook).then(function(result) {
  }).catch(function(error) {
    console.log('facebook fail '+error);
  });
}

export function loginWithGithub({commit}) {
  providerGithub.addScope('repo');
  providerGithub.setCustomParameters({
    'allow_signup': 'false'
  });
  return firebaseAuth.signInWithPopup(providerGithub).then(function(result) {
  }).catch(function(error) {
    console.log('github fail '+error);
  });
}


export function listenToPostList({commit}) {
  return db.ref("posts/").on('value', (posts) => {
    commit('UPDATE_POST_LIST', posts.val());
  });
}

export function insertPost ({commit}, {id,topic,detail,created,userUid,image,analyze}) {
  const refdb =  db.ref();
  const key = refdb.push().getKey();
  let posts = {
    id:id,
    topic:topic,
    detail:detail,
    created:created,
    userUid:userUid,
    image:image,
    analyze:analyze,
    keyId: key
  };

  const insert = {};
  insert['/posts/' + key] = posts;

  return refdb.update(insert);
}

export function updatePosts({commit}, {id,topic,detail,created,userUid,keyId,image,analyze}) {
  let posts = {
    id:id,
    topic:topic,
    detail:detail,
    created:created,
    userUid:userUid,
    image: image,
    analyze:analyze,
    keyId: keyId
  };
  return db.ref("posts/"+keyId).update(posts);
}

export function deletePost({commit},{keyId,image}) {
  let storageRef = firebaseStorage.ref('posts/' + image);
  storageRef.delete().then(function() {
    let storageRefResize = firebaseStorage.ref('posts/thumb_' + image);
    storageRefResize.delete();
    return db.ref("posts/"+keyId).remove();
  }).catch(function(error) {
    console.log(error);
  });
}

export function deleteImageOld({commit},{image}) {
  let storageRef = firebaseStorage.ref('posts/' + image);
  storageRef.delete().then(function () {
    let storageRefResize = firebaseStorage.ref('posts/thumb_' + image);
    storageRefResize.delete();
  }).catch(function (error) {
    console.log(error);
  });
}
  //
  // export function likePosts({commit},{like,userUid,keyId}) {
  //   const refdb =  db.ref();
  //
  //   const key = refdb.push().getKey();
  //   let postLike = {
  //         total: like
  //
  //   };
  //   let userLikes = {
  //     userLike:userUid,
  //     keyIdLike:key
  //   };
  //
  //  const ObjectToSave = JSON.parse(JSON.stringify(postLike));
  //
  //    // console.log('like'+like);
  //
  //   const updateLike = {};
  //   updateLike['/posts/' + keyId+'/like'] = postLike;
  //
  //   return refdb.update(updateLike).then(function () {
  //     const updateLikeUser = {};
  //     updateLikeUser['/posts/' + keyId+'/like/userLike/'+key] = userLikes;
  //      refdb.update(updateLikeUser);
  //   });
  //
  // }

