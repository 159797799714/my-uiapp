<template>
</template>

<script>
  export default{
    data() {
      return {
        class: ''
      }
    },
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option.class)
      this.class = option.class
    },
  }
</script>

<style>
</style>
