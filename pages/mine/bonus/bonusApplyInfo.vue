<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">佣金提现明细</text>
    </view>
  	<scroll-view scroll-y="true" class="content"></scroll-view>
      
  </view>
</template>

<script>
  export default{
    data() {
      return {
        receive: {}
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
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
    .iconfont{
      font-size: $font-42;
      font-weight: 500;
    }
    .title{
      flex: 1;
      text-align: center;
    }
  }
  
</style>
