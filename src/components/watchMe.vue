<template>
  <div>
    <div class="row">
      <transition-group name="slide">
        <appPostMe v-for="(prod, idx) in posts" :item="prod" :key="prod.id"></appPostMe>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import PostMe from './postMe.vue'
  export default{
    computed: {
      posts() {
        return this.$store.getters.posts;
      }
    },
    components:{
      appPostMe: PostMe
    }
  }
</script>

<style>
  body {
    background-color: #EEEEEE;
  }
  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
  }

  .slide-move {
    transition: transform 1s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>
