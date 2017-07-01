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
};

export function loginWithGoogle({commit}) {
 return firebaseAuth.signInWithPopup(providerGoogle).then(function(result) {
    console.log(result);
  }).catch(function(error) {});
};

export function loginWithFacebook({commit}) {
  return firebaseAuth.signInWithPopup(providerFacebook).then(function(result) {
    console.log(result);
  }).catch(function(error) {
    console.log('facebook fail '+error);
  });
};

export function loginWithGithub({commit}) {
  providerGithub.addScope('repo');
  providerGithub.setCustomParameters({
    'allow_signup': 'false'
  });
  return firebaseAuth.signInWithPopup(providerGithub).then(function(result) {
    console.log(result);
  }).catch(function(error) {
    console.log('github fail '+error);
  });
};


export function listenToPostList({commit}) {
  return db.ref("posts/").on('value', (posts) => {
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

  return refdb.update(insert).then(function () {



    axios({
      method: 'post',
      url: 'https://onesignal.com/api/v1/notifications',
      withCredentials: true,
      headers: {
        'Authorization': 'Basic NTRjZDY1ODgtNjJiNi00YmFjLTk0MmEtYTM1ZjJhMjdkN2U3',
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=utf-8',
        'X-PINGOTHER': 'pingpong',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':'*',
        'X-Requested-With': 'XMLHttpRequest',
        'cache-control': 'no-cache'
      },
      data: {
        "app_id": "8e86143e-0052-4f0c-bb61-83b82b4525f4",
        "contents": {
          "en": "test api"
        },
        "included_segments": [
          "All"
        ]
      }
    }).catch(function (error) {
      if (error.response) {
        console.log('error-response-data-'+error.response.data);
        console.log('error-response-status-'+error.response.status);
        console.log('error-response-headers-'+error.response.headers);
      } else if (error.request) {
        console.log('error-request-'+error.request);
      } else {
        console.log('Error', error.message);
      }
    });

    //
    //
    // var http = require("https");
    //
    // var options = {
    //   "method": "POST",
    //   "hostname": "onesignal.com",
    //   "port": null,
    //   "path": "/api/v1/notifications",
    //   "headers": {
    //     "Access-Control-Allow-Headers": "X-ACCESS_TOKEN,Access-Control-Allow-Origin,Authorization,Origin,x-requested-with,Content-Type,Content-Range,Content-Disposition,Content-Description",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //     "authorization": "Basic NTRjZDY1ODgtNjJiNi00YmFjLTk0MmEtYTM1ZjJhMjdkN2U3",
    //     "content-type": "application/json",
    //     "cache-control": "no-cache",
    //     "postman-token": "429aca0b-e70d-17af-e6a0-5cb8b13a0c87"
    //   }
    // };
    //
    // var req = http.request(options, function (res) {
    //   var chunks = [];
    //
    //   res.on("data", function (chunk) {
    //     chunks.push(chunk);
    //   });
    //
    //   res.on("end", function () {
    //     var body = Buffer.concat(chunks);
    //     console.log(body.toString());
    //   });
    // });
    //
    // req.write(JSON.stringify({ app_id: '8e86143e-0052-4f0c-bb61-83b82b4525f4',
    //   contents: { en: 'new post '+topic },
    //   included_segments: [ 'All' ] }));
    // req.end();
  });
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

