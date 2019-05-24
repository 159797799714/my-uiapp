<template>
  <view class="content">
    <view class="input-group">
      <view class="input-row border">
        <text class="title">账号：</text>
        <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
      </view>
      <view class="input-row">
        <text class="title">密码：</text>
      </view>
    </view>
    <view class="btn-row">
      <button type="primary" class="primary" @tap="bindLogin">登录</button>
    </view>
    <view class="action-row">
      <navigator url="../reg/reg">注册账号</navigator>
      <text>|</text>
      <navigator url="../pwd/pwd">忘记密码</navigator>
    </view>
    <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
      <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
        <image :src="provider.image" @tap="oauth(provider.value)"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import service from '../../service.js';
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        providerList: [],
        hasProvider: false,
        account: '',
        password: '',
        positionTop: 0
      }
    }
  }
</script>

<style>
  .action-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .action-row navigator {
    color: #007aff;
    padding: 0 20upx;
  }

  .oauth-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .oauth-image {
    width: 100upx;
    height: 100upx;
    border: 1upx solid #dddddd;
    border-radius: 100upx;
    margin: 0 40upx;
    background-color: #ffffff;
  }

  .oauth-image image {
    width: 60upx;
    height: 60upx;
    margin: 20upx;
  }
</style>
