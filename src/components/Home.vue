<template>
  <div>
    <div class="row">
      <appPostItem></appPostItem>
    </div>
  </div>
</template>

<script>
  import PostItem from './postItem.vue'
export default{
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
