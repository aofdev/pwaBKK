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
                    <button type="submit" class="btn btn-warning" @click.prevent="editPosts">บันทึก</button>
                    <button type="reset" class="btn btn-default">Clear</button>
                    <button type="button" class="btn btn-danger pull-right" @click.prevent="deletePt">ลบ</button>

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
  import { mapActions } from 'vuex';
  export default {
    data(){
      return {
        topic: this.$route.query.dataTopic,
        detail:this.$route.query.dataDetail
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
      ...mapActions({
        updatePost: 'updatePosts',
        deletePosts: 'deletePost'
      }),
      editPosts() {
        const data = {
          id: this.$route.params.id,
          topic: this.topic,
          detail: this.detail,
          created: this.userName,
          userUid:this.userId,
          keyId: this.$route.query.dataKey
        };
        this.updatePost(data);
        this.topic = '';
        this.detail = '';
        this.$router.push({name: 'Home'});
      },
      deletePt(){
        const data = {
          keyId:this.$route.query.dataKey
        };
        this.deletePosts(data);
        this.$router.push({name: 'Home'});
      }
    }
  }

</script>

<style>

</style>
