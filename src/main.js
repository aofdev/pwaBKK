import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import { firebaseListener } from './config/firebaseConfig';

Vue.config.productionTip = false;



firebaseListener(authStatusChange); //call auth

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});



function authStatusChange() {
  if (store) {
    store.commit('AUTH_STATUS_CHANGE');
  }
}
