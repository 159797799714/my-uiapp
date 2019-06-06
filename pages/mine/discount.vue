<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>我的优惠券</text>
      <text class="iconfont" @click="goMean">&#xe611;</text>
    </view>
  	<scroll-view scroll-y="true" class="content"></scroll-view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        
      }
    },
    methods: {
      goMean() {
        uni.navigateTo({
          url: 'mean'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    display: flex;
    justify-content: space-between;
    font-size: $font-38;
    color: $color-white;
    font-weight: $font-bold;
    .iconfont{
      font-size: $font-42;
      font-weight: 500;
    }
  }
</style>
