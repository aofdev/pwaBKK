const state = {
  postList: []
};

const mutations = {
  'UPDATE_POST_LIST' (state, postList) {
    state.postList = postList;
  }
};


const actions ={

};

const getters = {
  posts: (state) => {
    return state.postList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
