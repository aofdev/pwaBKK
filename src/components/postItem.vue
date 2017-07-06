<template>
  <div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-image">
          <img :id="item.id" width="100%" height="260px">
          <span class="card-title"><b>{{ item.topic }}</b></span>
        </div>

        <div class="card-content card-background">
          <p>{{ item.detail }}</p>
        </div>

        <div class="card-action card-background">
          <a style="color: blueviolet" href="#" ><i class="fa fa-user-circle" aria-hidden="true"></i>
             {{ item.created }}</a>
          <!--<a href="" style="color: red" @click.prevent="likePost" v-if="isLoggedInLocal">-->
          <!--<i class="fa fa-heart-o" aria-hidden="true"></i> {{ item.like.total }}-->
          <!--</a>-->
          <!--<span style="color: red" v-else="isLoggedInLocal">-->
            <!--<i class="fa fa-heart-o" aria-hidden="true"></i> {{ item.like.total }}-->
          <!--</span>-->

          <router-link :to="link" class="pull-right"  v-if="item.userUid == userId"><i class="fa fa-pencil" aria-hidden="true"></i>
              แก้ไข</router-link>

            <div>
            <p v-for="label in item.labels" style="margin-left: 2px;" class="label label-primary">{{label}}</p>
          </div>

        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import { firebaseStorage } from '../config/firebaseConfig';
  export default{
    props: ['item'],
    data(){
      return {
        getNameImg: this.item.image,
        getIdElm: this.item.id,
        link: {
          name: 'EditPost',
          params: {
            id: this.item.id
          },
          query: {
            dataTopic: this.item.topic,
            dataDetail: this.item.detail,
            dataKey: this.item.keyId,
            dataImage: this.item.image
          }
        }
      }
    },
    computed: {
      userId(){
        return this.$store.getters.currentUser.uid;
      },
      isLoggedInLocal() {

        return this.$store.getters.isLoggedIn;
      },
    },
    methods: {
      Image(){
        const str = this.item.id.toString();
        //console.log(str);
        let storageRef = firebaseStorage.ref('posts/thumb_' + this.getNameImg);
        storageRef.getDownloadURL().then(function (url) {

          const img = document.getElementById(str);
          img.src = url;
        }).catch(function (error) {
          console.log(error);
        });
      },
//      likePost(){
//         const   likePush =  this.item.like.total +1;
//         let like = {
//           like: likePush,
//           userUid:  this.userId,
//           keyId:this.item.keyId
//         };
//        this.$store.dispatch('likePosts',like).then((user) => {
//          this.$router.push({name: 'Home'});
//        }).catch((error) => {
//          console.log('login error', error);
//        });
//      }
    },
    created() {
      this.Image();
    }
  }

</script>

<style>
  .card {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .card {
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 2px;
    background-clip: padding-box;
  }
  .card-background{
    background-color: #fff;
  }
  .card span.card-title {
    color:#fff;
    font-size: 26px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .card .card-image {
    position: relative;
    overflow: hidden;
  }
  .card .card-image img {
    border-radius: 2px 2px 0 0;
    background-clip: padding-box;
    position: relative;
    z-index: -1;
  }
  .card .card-image span.card-title {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 16px;
  }
  .card .card-content {
    padding: 16px;
    border-radius: 0 0 2px 2px;
    background-clip: padding-box;
    box-sizing: border-box;
  }
  .card .card-content p {
    margin: 0;
    color: inherit;
  }
  .card .card-content span.card-title {
    line-height: 48px;
  }
  .card .card-action {
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    padding: 16px;
  }
  .card .card-action a {
    color: #ffab40;
    margin-right: 16px;
    transition: color 0.3s ease;
    text-transform: uppercase;
  }
  .card .card-action a:hover {
    color: #ffd8a6;
    text-decoration: none;
  }
</style>
