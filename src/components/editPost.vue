<template>
  <div>

    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h1 class="panel-title text-center" style="font-size: 2em"><b>Edit Post</b></h1>
          </div>
          <div class="panel-body">
            <form class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label for="inputPost" class="col-lg-2 control-label">name</label>
                  <div class="col-lg-10">
                    <input type="text" class="form-control" id="inputPost" placeholder="name" maxlength="30" v-model="topic">
                  </div>
                </div>
                <div class="form-group">
                  <label for="textarea" class="col-lg-2 control-label">detail</label>
                  <div class="col-lg-10">
                    <textarea type="password" class="form-control" id="textarea" placeholder="detail" maxlength="150" v-model="detail"></textarea>
                  </div>
                </div>
                <div class="form-group">

                  <div class="col-lg-10 col-lg-offset-2">
                    <img id="myimg" width="150" height="100" alt=""><br>
                    <label style="margin-top: 5px" class="btn btn-primary btn-file">
                    <input accept="image/*" type="file" value="upload" style="display:none;" @change="fileBtn(file, $event)">
                    upload image
                  </label>
                    <progress style="margin-top: 5px" value="0" max="100" id="uploader"></progress>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" class="btn btn-warning" @click.prevent="editPosts">edit</button>
                    <button type="reset" class="btn btn-default">Clear</button>
                    <button type="button" class="btn btn-danger pull-right" data-toggle="modal" data-target="#deleteModal" ><i class="fa fa-trash-o" aria-hidden="true"></i> delete</button>

                    <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
                            <h4 class="modal-title" id="myModalLabel">Confirm deletion of post ?</h4>
                          </div>
                          <div class="modal-footer">
                            <center>
                            <button type="button" class="btn btn-lg btn-default" data-dismiss="modal">close</button>
                            <button type="button" class="btn btn-lg btn-danger" data-dismiss="modal" @click.prevent="deletePt">yes</button>
                            </center>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>

  </div>
</template>

<script>
  import { firebaseStorage } from '../config/firebaseConfig';
  import { mapActions } from 'vuex';
  export default {
    data(){
      return {
        topic: this.$route.query.dataTopic,
        detail: this.$route.query.dataDetail,
        getNameImg: this.$route.query.dataImage,
        upImage:''
      }
    },
    computed: {
      userName(){
        if (this.$store.getters.currentUser.name) {
          return this.$store.getters.currentUser.name;
        } else {
          return this.$store.getters.currentUser.email;
        }
      },
      userId(){
        return this.$store.getters.currentUser.uid;
      }
    },
    methods: {
      ...mapActions({
        updatePost: 'updatePosts',
        deletePosts: 'deletePost',
        delImageOld: 'deleteImageOld'
      }),
      fileBtn: function (file, e) {
        e.preventDefault();
        const uploader = document.getElementById('uploader');
        //get file
        let getFile = e.target.files[0];
        this.upImage = getFile.name;
        //set storage ref
        let storageRef =  firebaseStorage.ref('posts/'+ getFile.name);
        //upload file
        let task = storageRef.put(getFile);

        task.on('state_changed',
          function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
          },
          function error(err) {
          },
          function complete() {

          }
        );
      },
      editPosts() {
          if (this.upImage !== ''){
            const data = {
              id: this.$route.params.id,
              topic: this.topic,
              detail: this.detail,
              created: this.userName,
              userUid: this.userId,
              keyId: this.$route.query.dataKey,
              image:this.upImage
            };
            const imageOld = {
                image: this.getNameImg
            };
            this.delImageOld(imageOld);
            this.updatePost(data);
            this.topic = '';
            this.detail = '';
            this.upImage = '';
            this.$router.push({name: 'Home'});
          }else{
            const data = {
              id: this.$route.params.id,
              topic: this.topic,
              detail: this.detail,
              created: this.userName,
              userUid: this.userId,
              keyId: this.$route.query.dataKey,
              image:this.getNameImg
            };
            this.updatePost(data);
            this.topic = '';
            this.detail = '';
            this.$router.push({name: 'Home'});
          }


      },
      deletePt(){
        const data = {
          keyId: this.$route.query.dataKey,
          image: this.$route.query.dataImage
        };
        this.deletePosts(data);
        this.$router.push({name: 'Home'});
      },
    Image(){
      let storageRef = firebaseStorage.ref('posts/thumb_'+this.getNameImg);
      storageRef.getDownloadURL().then(function (url) {

        const img = document.getElementById('myimg');
        img.src = url;
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
    created() {
      this.Image();
    }
  }


</script>

<style>
  progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 250px;
    height: 20px;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }

  progress[value]::-webkit-progress-value {

    background-image:
      -webkit-linear-gradient(-45deg,
      transparent 33%, rgba(0, 0, 0, .1) 33%,
      rgba(0,0, 0, .1) 66%, transparent 66%),
      -webkit-linear-gradient(top,
      rgba(255, 255, 255, .25),
      rgba(0, 0, 0, .25)),
      -webkit-linear-gradient(left, #09c, #f44);

    border-radius: 2px;
    background-size: 35px 20px, 100% 100%, 100% 100%;
    -webkit-animation: animate-stripes 5s linear infinite;
  }
</style>
