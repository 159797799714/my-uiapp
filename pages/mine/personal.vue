<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">个人信息</text>
    </view>
  	<view class="content padding-30 bg-white">
      <view class="personal-img">
        <text>个人头像</text>
        <view class="center">
          <image :src="userinfo.avatarUrl" mode=""></image>
        </view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="name row">
        <text>用户昵称</text>
        <view class="center">
          <text>{{ userinfo.nickName }}</text>
        </view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="sex row" @click="selectSex">
        <text>性别</text>
        <view class="center">
          <text>{{ userinfo.gender }}</text>
        </view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="sign row">
        <text>个人签名</text>
        <view class="center">
          <text>未设置签名</text>
        </view>
        <text class="iconfont">&#xe644;</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data () {
      return {
        userinfo: {}
      }
    },
    onLoad(option) {
      let userinfo = option.userinfo
      console.log(JSON.parse(userinfo))
      if(userinfo) {
        this.userinfo = JSON.parse(userinfo)
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      selectSex() {
        uni.showActionSheet({
          itemList: ['男', '女'],
          success: function (res) {
            console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
          },
          fail: function (res) {
            console.log(res.errMsg);
          }
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
  .content{
    font-size: $font-28;
    .personal-img, .row{
      display: flex;
      align-items: center;
      overflow: hidden;
      .center{
        flex: 1;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: $color-99;
        &>image{
          height: 114upx;
          width: 114upx;
          margin-right: 27upx;
          border-radius: 100%;
        }
      }
    }
    .personal-img{
      height: 174upx;
      line-height: 174upx;
    }
    .row{
      height: 104upx;
      line-height: 104upx;
      border-bottom: 1px solid $color-f5;
    }
    .iconfont{
      margin-right: 0;
      margin-left: 23upx;
    }
  }
  
</style>
