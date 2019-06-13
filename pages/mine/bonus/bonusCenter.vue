<template>
  <view class="container">
    <image src="../../../static/img/mine/head_bg.png" mode="" class="head-bg"></image>
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">推广人中心</text>
    </view>
  	<scroll-view scroll-y="true" class="content padding-30">
      <view class="user">
        <image src="../../../static/img/mine/bg.png" mode=""></image>
        <text>会爬树的猪</text>
      </view>
      <view class="user-data bg-white">
        <view v-for="(item, index) in info" :key="index" :class="{'data-item': true, after: index !== 3}" @click="selectTab(index)">
          <text class="num">{{ item.sum }}</text>
          <text>{{ item.title }}</text>
        </view>
      </view>
      <view class="menu">
        <view v-for="(item, index) in menu" :key="index" class="menuBar">
          <text>{{ item }}</text>
          <text class="iconfont">&#xe644;</text>
        </view>
      </view>
    </scroll-view>
      
  </view>
</template>

<script>
  export default{
    data() {
      return {
        info: [{
          sum: '4985',
          title: '获得佣金'
        }, {
          sum: '1985',
          title: '已提取佣金'
        }, {
          sum: '2',
          title: '银行卡'
        }, {
          sum: '199',
          title: '促成订单数'
        }],
        menu: ['邀请用户', '二维码推广', '升级代理人']
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 点击佣金明细一栏
      selectTab(index) {
        switch(index) {
          case 0:
            uni.navigateTo({
              url: 'bonusInfo?origin=' + '1'
            })
            break
          case 1:
            uni.navigateTo({
              url: 'bonusInfo?origin=' + '2'
            })
            break
          case 2:
            uni.navigateTo({
              url: 'myCard'
            })
            break
          case 3:
            
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .head-bg{
    height: 539upx;
    width: 100%;
    z-index: 3;
  }
  .topBar{
    margin-top: -539upx;
    display: flex;
    justify-content: space-between;
    font-size: $font-38;
    color: $color-white;
    background: rgba(0, 0, 0, 0);
    z-index: 5;
    .iconfont{
      font-size: $font-42;
      font-weight: 500;
    }
    .title{
      flex: 1;
      text-align: center;
    }
  }
  .content{
    z-index: 4;
    background: rgba(0, 0, 0, 0);
    margin-top: 54upx;
    .user{
      display: flex;
      height: 120upx;
      width: 100%;
      margin-bottom: 48upx;
      font-size: $font-30;
      color: $color-white;
      line-height: 120upx;
      letter-spacing: 5upx;
      &>image{
        display: inline-block;
        height: 120upx;
        width: 120upx;
        background: #ccc;
        margin-right: 36upx;
        border-radius: 100%;
      }
    }
    .user-data{
      height: 185upx;
      display: flex;
      box-shadow:0px 6px 18px 2px rgba(0, 0, 0, 0.03);
      .data-item{
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: $font-22;
        line-height: 22upx;
        color: $color-99;
        .num{
          margin-bottom: 25upx;
          font-size: $font-32;
          line-height: 32upx;
          color: $title-color;
        }
      }
      .after{
        &:after{
          content: '';
          height: 50upx;
          width: 2upx;
          position: absolute;
          right: 0;
          bottom: 67upx;
          background: $color-f5;
        }
      }
    }
    .menu{
      margin-top: 22upx;
      .menuBar{
        height: 99upx;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $color-f5;
        &>text{
          line-height: 99upx;
          font-size: $font-28;
        }
        &>.iconfont{
          font-size: 20upx;
          color: $color-99;
        }
      }
    }
  }
  
</style>
