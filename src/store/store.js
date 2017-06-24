import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import posts from './modules/posts';

import * as actions from './actions';

Vue.use(Vuex);


export default new Vuex.Store({
  actions,
  modules:{
    users,
    posts
  }
});
