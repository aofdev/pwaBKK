<template>
  <div>

<div class="row">
  <div class="col-md-3"></div>
  <div class="col-md-6">
    <div class="panel panel-warning">
      <div class="panel-heading">
        <h1 class="panel-title"><b>Login</b></h1>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group">
              <label for="inputEmail" class="col-lg-2 control-label">Email</label>
              <div class="col-lg-10">
                <input type="text" class="form-control" id="inputEmail" placeholder="Email" v-model="email">
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-lg-2 control-label">Password</label>
              <div class="col-lg-10">
                <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="submit" class="btn btn-warning" @click.prevent="loginWithEmailLocal">Submit</button>
                <button type="reset" class="btn btn-default">Clear</button>
                <br/><br>
                <a class="btn btn-block btn-social btn-google" @click.prevent="loginByGoogle">
                  <span class="fa fa-google"></span> Sign in with Google
                </a>
                <!--<a class="btn btn-block btn-social btn-facebook" @click.prevent="loginByFacebook">-->
                  <!--<span class="fa fa-facebook"></span> Sign in with Facebook-->
                <!--</a>-->
                <!--<a class="btn btn-block btn-social btn-github" @click.prevent="loginByGithub">-->
                  <!--<span class="fa fa-github"></span> Sign in with Github-->
                <!--</a>-->


              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
  <div class="col-md-3"></div>
</div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        email: '',
        password:''
      }
    },
    methods:{
      loginWithEmailLocal() {
        let data = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('loginWithEmail', data).then((user) => {
          this.$router.push({name: 'Home'});
        }).catch((error) => {
          console.log('login error', error);
        });
      },
      loginByGoogle(){
        this.$store.dispatch('loginWithGoogle').then((user) => {
          this.$router.push({name: 'Home'});
        }).catch((error) => {
          console.log('login error', error);
        });
      }
//      loginByFacebook(){
//        this.$store.dispatch('loginWithFacebook').then((user) => {
//          this.$router.push({name: 'Home'});
//        }).catch((error) => {
//          console.log('login error', error);
//        });
//      },
//      loginByGithub(){
//        this.$store.dispatch('loginWithGithub').then((user) => {
//          this.$router.push({name: 'Home'});
//        }).catch((error) => {
//          console.log('login error', error);
//        });
//      }

    }
  }

</script>

<style>

</style>
