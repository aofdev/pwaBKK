<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/"><b>Post Short</b></a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <router-link to="/createPost" activeClass="active" tag="li" v-if="isLoggedInLocal"><a><i class="fa fa-sticky-note" aria-hidden="true"></i> เขียนโฟส</a></router-link>
            <router-link to="/login" activeClass="active" tag="li" v-if="!isLoggedInLocal"><a><i class="fa fa-sign-in" aria-hidden="true"></i> Login</a></router-link>
            <router-link to="/register" activeClass="active" tag="li" v-if="!isLoggedInLocal"><a><i class="fa fa-registered" aria-hidden="true"></i> Register</a></router-link>
            <li class="dropdown" v-if="isLoggedInLocal">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-user" aria-hidden="true"></i>  {{ userName }} <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#" @click="logoutLocal"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <transition name="slide" mode="out-in">
      <router-view></router-view>
      </transition>
    </div>

  </div>
</template>
<script>


  import { mapActions } from 'vuex';
  export default {
    computed: {
      isLoggedInLocal() {
        return this.$store.getters.isLoggedIn;
      },
      userName() {
        if (this.isLoggedInLocal) {
            if (this.$store.getters.currentUser.name){
              return this.$store.getters.currentUser.name;
            }else{
              return this.$store.getters.currentUser.email;
            }
        } else {
          return '';
        }
      }
    },
    methods: {
      ...mapActions(['logout', 'listenToPostList']),
      logoutLocal() {
        this.logout();
      }
    },
      created() {
      this.listenToPostList();
    }

  }

</script>

<style>
  body {
    background-color: #EEEEEE;
    font-family: 'Kanit', sans-serif;
  }
  .slide-enter-active{
    animation: slide-in 100ms ease-out forwards;
  }

  .slide-leave-active{
    animation: slide-out 100ms ease-out forwards;
  }
  @keyframes slide-in {
    from{
      transform: translateY(-30px);
      opacity: 0;
    }
    to{
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from{
      transform: translateY(0);
      opacity: 1;
    }
    to{
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
