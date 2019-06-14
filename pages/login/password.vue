<template>
  <view class="container">
    <image src="../../static/img/login/register_bg.png" mode="" class="content_bg"></image>
    <view class="content-cover">
      <view class="topBar">
        <text class="iconfont" @click="goBack">&#xe61c;</text>
      </view>
      <view class="content border-box">
        <view class="title">{{ title }}</view>
        <view v-if="type === 'forget'" class="info">为您的账号设置一个新密码</view>
        <view class="ipt">
          <input type="text" :value="username" placeholder="请输入您的手机号码" @input="onInput" maxlength="11">
          <text class="iconfont del">&#xe6cc;</text>
        </view>
        <view class="btn" foroType="submit" @click="sureAction">保存并登录</view>
      </view>  
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        title: '',
        type: '',
        showInfo: false,
        code_word: '获取验证码',
        username: '',
        code: ''
      }
    },
    onLoad(option) {
      this.type = option.type
      if(option.type === 'register') {
        this.title = '设置密码'
        return
      }
      if(option.type === 'forget') {
        this.title = '重置密码'
        return
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1,
          "animationType": "zoom-fade-out"
        })
      },
      onInput(e) {
        let value = e.detail.value
        this.username = value
      },
      sureAction() {
        uni.switchTab({
          url: '../index/index'
        })
      }
      
    }
  }
</script>

<style lang="scss" scoped>
  .content_bg {
    height: 100%;
    width: 100%;
  }
  
  .content-cover{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0);
    .topBar{
      margin-bottom: 43upx;
      background: rgba(0, 0, 0, 0);
      justify-content: flex-start;
      &>text{
        font-size: $font-42;
        color: $color-white;
      }
    }
    .content{
      display: flex;
      flex-direction: column;
      padding: 65upx 60upx 60upx;
      background: rgba(0, 0, 0, 0);
      .title{
        margin-bottom: 27upx;
        font-size: $font-54;
        line-height: 54upx;
        color: $color-white;
      }
      .info{
        margin-bottom: 83upx;
        font-size: $font-28;
        line-height: 27upx;
        color: $color-99;
      }
      .ipt{
        height: 104upx;
        display: flex;
        align-items: center;
        color: $color-white;
        border-bottom: 1px solid $color-90;
        &>text{
          font-size: $font-30;
        }
        &>input{
          flex: 1;
          font-size: $font-28;
        }
      }
      .btn{
        margin-top: 189upx;
        height: 98upx;
        width: 100%;
        border-radius: 49upx;
        font-size: $font-30;
        color: $color-white;
        line-height: 98upx;
        text-align: center;
        background: $color-red;
      }
      
    }
  }
</style>
