<template>
  <view class="container">
    <view class="topBar">
      <text class="title">设置</text>
    </view>
  	<view class="content bg-white border-box">
      <view class="user" @click="goPersonal">
        <view class="img">
          <image :src="userinfo.avatarUrl" mode=""></image>
        </view>
        <view class="name">{{ userinfo.nickName }}</view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view v-for="(item, index) in menu" :key="index" class="item" @click="selAction(item.url)">
        <text v-if="index === 0" class="iconfont iconlogo">&#xe646;</text>
        <text v-if="index === 1" class="iconfont iconlogo">&#xe64c;</text>
        <text v-if="index === 2" class="iconfont iconlogo">&#xe740;</text>
        <text v-if="index === 3" class="iconfont iconlogo">&#xe763;</text>
        <view class="menuWord">{{ item.title }}</view>
        <text class="iconfont info">&#xe644;</text>
      </view>
      <view class="loginout" @click="loginOut">退出登录</view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        userinfo: {},
        menu: [{
          icon: '&#xe646;',
          title: '我的收获地址',
          url: 'address'
        }, {
          icon: '&#xe64c;',
          title: '更改密码',
          url: 'changePassword'
        }, {
          icon: '&#xe740;',
          title: '电话客服',
          url: 'call'
        }, {
          icon: '&#xe763;',
          title: '关于我们',
          url: 'about'
        }]
      }
    },
    onLoad(option) {
      // console.log(JSON.parse(option.userinfo))
      if(option.userinfo) {
        this.userinfo = JSON.parse(option.userinfo)
      }
    },
    methods: {
      goPersonal() {
        uni.navigateTo({
          url: 'personal'
        })
      },
      selAction(url) {
        if(url === 'call') {
          uni.makePhoneCall({
            phoneNumber: '15979779714' //仅为示例
          })
          return
        }
        uni.navigateTo({
          url: url
        })
      },
      loginOut() {
        this.$store.commit('loginout')
        uni.clearStorageSync()
        uni.reLaunch({
          url: '../login/login'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    font-size: $font-38;
    color: $color-white;
  }
  .content{
    padding: 0 30upx;
    .user{
      height: 174upx;
      width: 100%;
      display: flex;
      align-items: center;
      line-height: 174upx;
      font-size: $font-36;
      .img{
        height: 114upx;
        width: 114upx;
        margin-left: 37upx;
        margin-right: 37upx;
        border-radius: 100%;
        overflow: hidden;
        &>image{
          height: 100%;
          width: 100%;
        }
      }
      .name{
        flex: 1;
      }
      &>.iconfont{
        margin-right: 0;
        font-size: $font-24;
      }
    }
    .item{
      display: flex;
      align-items: center;
      height: 104upx;
      line-height: 104upx;
      font-size: $font-28;
      border-top: 1px solid $color-f5;
      .iconlogo{
        margin-right: 28upx;
        margin-left: 13upx;
        font-size: $font-32;
        color: $color-bb;
      }
      &>view{
        flex: 1;
      }
      .info{
        margin-right: 0;
        font-size: $font-24;
      }
    }
    .loginout{
      height: 98upx;
      width: 360upx;
      display: inline-block;
      margin: 0 auto;
      margin-top: 121upx;
      border-radius: 49upx;
      border: 1px solid $word-color;
      font-size: $font-30;
      line-height: 98upx;
      text-align: center;
      color: $word-color;
    }
  }
</style>
