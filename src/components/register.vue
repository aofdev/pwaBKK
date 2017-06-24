<template>
  <div>

    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h1 class="panel-title"><b>register</b></h1>
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
                    <button type="submit" class="btn btn-success" @click.prevent="registerByEmailLocal">register</button>
                    <button type="button" class="btn btn-success" @click.prevent="registerByGoogle">Google</button>
                    <button type="reset" class="btn btn-default">Clear</button>

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
  import {firebaseAuth ,providerGoogle} from '../config/firebaseConfig';
  export default {
    data(){
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      registerByEmailLocal(){
        let data = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('registerByEmail', data).then((user) => {
          this.$router.push({name: 'Home'});
        }).catch((error) => {
          console.log('register error', error);
        });
      },
      registerByGoogle(){

        firebaseAuth().signInWithPopup(providerGoogle).then(function(result) {
          console.log(result);
          this.$router.push({name: 'Home'});
        }).catch(function(error) {});

      }
    }
  }

</script>

<style>

</style>
