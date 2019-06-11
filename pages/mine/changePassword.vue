<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">更改密码</text>
    </view>
  	<view class="content padding-30 border-box bg-white">
      <view class="row">
        <text class="name">旧密码</text>
        <view class="ipt">
          <input type="text" :value="form.password1" placeholder="请输入旧密码"/>
        </view>
      </view>
      <view class="row">
        <text class="name">新密码</text>
        <view class="ipt">
          <input type="text" :value="form.password2" placeholder="请输入新密码"/>
        </view>
      </view>
      <view class="btn">确认修改</view>
      <view class="info">本操作将会重置您的登陆密码，请牢记新密码哦～</view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        form: {
          password1: '',
          password2: ''
        }
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
  .content{
    padding-top: 30upx;
    .row{
      display: flex;
      height: 104upx;
      line-height: 104upx;
      font-size: $font-28;
      border-bottom: 1px solid $color-f5;
      .name{
        display: inline-block;
        width: 160upx;
        text-align: left;
      }
      .ipt{
        flex: 1;
        &>input{
          height: 100%;
          width: 100%;
        }
      }
    }
    .btn{
      height: 98upx;
      width: 100%;
      margin-top: 67upx;
      margin-bottom: 28upx;
      border-radius: 49upx;
      color: $color-white;
      font-size: $font-30;
      text-align: center;
      line-height: 98upx;
      background: $title-color;
    }
    .info{
      font-size: $font-24;
      color: $color-99;
      text-align: center;
      line-height: 24upx;
    }
  }
</style>
