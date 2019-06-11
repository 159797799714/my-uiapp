<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>收货地址</text>
      <text class="iconfont" @click="addAction">&#xe620;</text>
    </view>
    <view class="content padding-30 border-box bg-white">
      <view class="item">
        <view>
          <text class="name">撒浪嘿</text>
          <text class="tel">15999999999</text>
          <view class="tags">
            <text class="tag">默认</text>
          </view>
        </view>
        <view class="address">广东省深圳市南山区 三航科技大厦 11108</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      }, 
      addAction() {
        uni.navigateTo({
          url: 'addAddress'
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
  }
  .content{
    .item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 148upx;
      font-size: $font-24;
      border-bottom: 1px solid $color-f5;
      .name{
        font-size: $font-30;
      }
      .tel{
        margin-left: 52upx;
        color: $word-color;
        font-size: $font-30;
      }
      .tags{
        display: inline-block;
        .tag{
          margin-left: 23upx;
          display: inline-block;
          height: 30upx;
          width: 72upx;
          border-radius: 15upx;
          line-height: 30upx;
          text-align: center;
          color: $color-white;
          background:  $color-red;
        }
      }
      .address{
        margin-top: 24upx;
        line-height: 24upx;
        color: $word-color;
      }
    }
  }
</style>
