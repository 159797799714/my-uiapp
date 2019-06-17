<template>
  <view class="container">
    <image src="../../static/img/login/login_bg.png" mode="" class="content_bg"></image>
    <view class="content border-box">
      <view class="main">
        <view class="logo">
          <image src="../../static/img/login/logo.png" mode=""></image>
        </view>
        <form @submit="login" @reset="formReset" class="form-main border-box">
          <view class="ipt">
            <text class="iconfont">&#xe763;</text>
            <input type="text" :value="username" placeholder="请输入账号" @input="onInput">
            <text v-if="showDel" class="iconfont del">&#xe620;</text>
          </view>
          <view class="ipt border-box">
            <text class="iconfont">&#xe64c;</text>
            <input type="text" :value="form.password" placeholder="请输入密码">
            <text class="iconfont">&#xe6cc;</text>
          </view>
          <view class="btn" foroType="submit" @click="goLogin">登录</view>
          <view class="other">
            <text class="forget" @click="clickAction('forget')">忘记密码？</text>
            <text @click="clickAction('register')">注册账号</text>
          </view>
          <view class="login-way">
            <view class="title">
              <text>第三方登录</text>
            </view>
            <view class="box">
              <text class="iconfont" @click="loginWay('weixin')">&#xe608;</text>
              <text class="iconfont" @click="loginWay('qq')">&#xe612;</text>
              <text class="iconfont" @click="loginWay('sinaweibo')">&#xe607;</text>
            </view>
          </view>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        form: {
          username: '11',
          password: ''
        },
        showDel: false
      }
    },
    methods: {
      onInput(e) {
        let value = e.detail.value
        if (value) {
          this.showDel = true
          return
        }
        this.showDel = false
      },
      clickAction(type) {
        uni.navigateTo({
          url: 'register?type=' + type,
          "animationType": "zoom-fade-out"
        })
      },
      goLogin() {
        uni.switchTab({
          url: '../index/index'
        })
      },
      loginWay(type) {
        uni.getProvider({
          service: 'oauth',
          success: function(res) {
            console.log(res.provider)
            if (~res.provider.indexOf(type)) {
              uni.login({
                provider: type,
                success: function(loginRes) {
                  console.log(JSON.stringify(loginRes));
                }
              })
            }
          },
          fail: function(err){
            console.log(err)
          }
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

  .content {
    position: absolute;
    top: 0;
    left: 0;
    padding: 88upx 60upx 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0);

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .logo {
        margin-bottom: 156upx;
        height: 85upx;
        width: 350upx;

        &>image {
          margin: 0 auto;
          height: 100%;
          width: 100%;
        }
      }

      .form-main {
        width: 100%;

        .ipt {
          height: 104upx;
          padding: 0 40upx;
          display: flex;
          align-items: center;
          color: $color-white;
          border-bottom: 1px solid $color-90;

          &>text {
            font-size: $font-30;
          }

          &>input {
            flex: 1;
            margin: 10upx 30upx;
            font-size: $font-28;
          }

          .del {
            transform: rotate(45deg);
          }
        }

        .btn {
          margin: 53upx 0 51upx;
          height: 98upx;
          width: 100%;
          border-radius: 49upx;
          font-size: $font-30;
          color: $color-white;
          line-height: 98upx;
          text-align: center;
          background: $color-red;
        }

        .other {
          padding: 0 45upx;
          display: flex;
          justify-content: space-between;
          height: 29upx;
          line-height: 29upx;
          font-size: $font-30;
          color: $color-white;

          .forget {
            color: $color-99;
          }
        }

        .login-way {
          margin-top: 295upx;
          height: 146upx;
          width: 100%;
          color: $color-99;

          .title {
            height: 13upx;
            margin-bottom: 55upx;
            text-align: center;
            border-bottom: 1px solid $color-99;

            &>text {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              background: $title-color;
              padding: 0 5upx;
              line-height: 27upx;
              font-size: $font-28;
            }
          }

          .box {
            padding: 0 57upx;
            display: flex;
            justify-content: space-around;

            &>text {
              font-size: $font-76;
              line-height: 76upx;
            }
          }
        }
      }
    }
  }
</style>
