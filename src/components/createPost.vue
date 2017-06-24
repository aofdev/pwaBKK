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
                  <label for="inputPost" class="col-lg-2 control-label">ชื่อโฟส</label>
                  <div class="col-lg-10">
                    <input type="text" class="form-control" id="inputPost" placeholder="ชื่อโฟส" v-model="topic">
                  </div>
                </div>
                <div class="form-group">
                  <label for="textarea" class="col-lg-2 control-label">รายละเอียด</label>
                  <div class="col-lg-10">
                    <textarea type="password" class="form-control" id="textarea" placeholder="รายละเอียด" v-model="detail"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" class="btn btn-warning" @click.prevent="createPosts">บันทึก</button>
                    <button type="reset" class="btn btn-default">Clear</button>

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
  export default {
    data(){
      return {
        topic: '',
        detail: ''
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
      createPosts(){
        let posts = {
          id: Math.floor(100000 + Math.random() * 900000),
          topic: this.topic,
          detail: this.detail,
          created: this.userName,
          userUid: this.userId
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

</style>
