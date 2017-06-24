<template>
  <div>
    <div class="row">
      <appPostItem v-for="(prod, idx) in posts" :item="prod" :key="prod.id"></appPostItem>
    </div>
  </div>
</template>

<script>
  import PostItem from './postItem.vue'
export default{
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  },
    components:{
        appPostItem: PostItem
    }
}
</script>

<style>
  body {
    background-color: #EEEEEE;
  }

</style>
