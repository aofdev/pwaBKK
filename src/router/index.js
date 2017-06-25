import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/login'
import Register from '@/components/register'
import CreatePost from '@/components/createPost'
import EditPost from '@/components/editPost'
import WatchMe from '@/components/watchMe'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/',name: 'Home', component: Home},
    { path: '/login',name: 'Login', component: Login},
    { path: '/register',name: 'Register', component: Register},
    { path: '/createPost',name: 'CreatePost', component: CreatePost},
    { path: '/editPost/:id',name: 'EditPost', component: EditPost},
    { path: '/WatchMe',name: 'WatchMe', component: WatchMe},
  ]
})
