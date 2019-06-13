<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">我的银行卡</text>
      <text class="iconfont del">&#xe620;</text>
    </view>
  	<scroll-view scroll-y="true" class="content padding-30">
      <view v-for="(item, index) in dataList" :key="index" class="item border-box">
        <image :src="item.bgImg" mode="" class="item-bg"></image>
        <view class="main border-box">
          <view class="logo">
            <image :src="item.imgUrl" mode=""></image>
          </view>
          <view>
            <view class="name">{{ item.name }}</view>
            <view class="type">{{ item.type }}</view>
            <view class="num">
              <text>****   ****   ****   </text>
              {{ item.num }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
      
  </view>
</template>

<script>
  export default{
    data() {
      return {
        dataList: [{
          bgImg: '../../../static/img/mine/card/post_bg.png',
          imgUrl: '../../../static/img/mine/card/post.png',
          name: '中国邮政储蓄银行',
          type: '储蓄卡',
          num: '6611'
        }, {
          bgImg: '../../../static/img/mine/card/china_bg.png',
          imgUrl: '../../../static/img/mine/card/china.png',
          name: '中国银行',
          type: '储蓄卡',
          num: '6611'
        }]
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
  }
  .content{
    background: $title-color;
    .item{
      position: relative;
      height: 230upx;
      width: 100%;
      margin-top: 30upx;
      color: $color-white;
      .item-bg{
        height: 100%;
        width:100%;
      }
      .main{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        padding: 36upx 50upx 0 50upx;
        &>view{
          width: 100%;
        }
        .logo{
          height: 51upx;
          width: 51upx;
          margin-right: 26upx;
          &>image{
            height: 100%;
            width: 100%;
          }
        }
        .name{
          font-size: $font-30;
          line-height: 29upx;
          margin-bottom: 16upx;
        }
        .type{
          font-size: $font-22;
          line-height: 21upx;
          margin-bottom: 29upx;
        }
        .num{
          display: flex;
          width: 100%;
          font-size: $font-42;
          line-height: 32upx;
          &>text{
            display: block;
            height: 32upx;
            width: 340upx;
            line-height: 42upx;
            margin-right: 42upx;
            padding-top: 11upx;
            opacity: 0.5;
          }
        }
      }
      
    }
  }
  
</style>
