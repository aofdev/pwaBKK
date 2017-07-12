<template>
  <div>

    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h1 class="panel-title text-center" style="font-size: 2em"><b>Create Post</b></h1>
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
                  <label for="textarea" class="col-lg-2 control-label">Analyze images</label>
                  <div class="col-lg-10">
                    <select class="form-control"
                            v-model="analyze"
                    >
                      <option v-for="modes in mode">{{ modes }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">

                  <div class="col-lg-10 col-lg-offset-2">

                    <label class="btn btn-primary btn-file">
                <input accept="image/*" type="file" value="upload" style="display:none;" @change="fileBtn(file, $event)">
                      upload image
                    </label>
                    <progress value="0" max="100" id="uploader"></progress>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" class="btn btn-info" id="btnUpdate" style="display: none" @click.prevent="createPosts">save</button>
                    <button type="reset" class="btn btn-danger">Clear</button>

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
  export default {
    data(){
      return {
        topic: '',
        detail: '',
        image:'',
        analyze:'Labels',
        mode:['Labels','Faces']
      }
    },
    computed:{
      userName(){
          if (this.$store.getters.currentUser.name){
            return this.$store.getters.currentUser.name;
          }else{
            return this.$store.getters.currentUser.email;
          }
      },
      userId(){
        return this.$store.getters.currentUser.uid;
      }
    },
    methods:{
      fileBtn: function (file, e) {
        e.preventDefault();
        const uploader = document.getElementById('uploader');
        //get file
        let getFile = e.target.files[0];
        this.image = getFile.name;
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
            document.getElementById('btnUpdate').style.display = "";
            //this.btnUpdate = true;
          }
        );

      },
      createPosts(){
        let posts = {
          id: Math.floor(100000 + Math.random() * 900000),
          topic: this.topic,
          detail: this.detail,
          created: this.userName,
          userUid: this.userId,
          image: this.image,
          analyze: this.analyze
        };
        this.$store.dispatch('insertPost', posts).then((posts) => {

          this.$router.push({name: 'Home'});
        }).catch((error) => {
          console.log('insert error', error);
        });
      }
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
