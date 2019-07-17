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
            <input type="text" v-model="mobile" placeholder="请输入您的手机号码" @input="onInput" maxlength="11">
            <text v-if="showDel" class="iconfont del" @click="mobile = ''">&#xe620;</text>
          </view>
          <view class="ipt border-box">
            <text class="iconfont">&#xe64c;</text>
            <input :type="ishide ? 'password': 'text'" v-model="password" placeholder="请输入密码" maxlength="16">
            <text class="iconfont" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>
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
        mobile: '',
        password: '',
        showDel: false,
        ishide: false,
        userInfo: {
          openid: '',
          type: '',
          nickname: '',
          avatarurl: ''
        }
      }
    },
    onLoad(option) {
      if(option) {
        console.log(option.old)
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
        let value = /^1[3456789]\d{9}$/.test(this.mobile)
        if(value) {
          if(!this.password) {
            uni.showToast({
              title: '请输入密码',
              icon: 'none'
            })
            return
          }
          this.$http({
            url: this.$api.login,
            data: {
              mobile: this.mobile,
              password: this.password
            },
            cb: (err, res) => {
              if(!err && res.code === 1) {
                // console.log(res.data.userinfo.token)
                
                
                
                let userinfo = {
                  mobile: res.data.userinfo.mobile,
                  token: res.data.userinfo.token
                }
                this.$store.commit('login', userinfo)
                
                uni.setStorageSync('userinfo', userinfo)
                uni.switchTab({
                  url: '../index/index'
                })  
                
                // uni.setStorage({
                //   key: 'userinfo',
                //   data: userinfo,
                //   success: function () {
                //     uni.switchTab({
                //       url: '../index/index'
                //     })  
                //   }
                // })
              } else if(res.code === 0 && res.msg) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              } else {
                uni.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          uni.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
          })
        }
      },
      
      // 点击第三方登录
      loginWay(type) {
        let that = this
        that.userInfo.type = type === 'weixin' ? 'weixin': ( type === 'qq' ? 'qq' : 'sinaweibo' )
        uni.getProvider({
          service: 'oauth',
          success: function(res) {
            if (~res.provider.indexOf(type)) {
              uni.login({
                provider: type,
                success: function(loginRes) {
                  console.log('第三方登录获取到的信息', JSON.stringify(loginRes))
                  
                  if(type === 'sinaweibo') {
                    that.userInfo.openid = loginRes.authResult.uid
                  } else {
                    that.userInfo.openid = loginRes.authResult.openid
                  }
                  
                  uni.getUserInfo({
                    provider: type,
                    success: function (infoRes) {
                      console.log('头像', infoRes.userInfo.avatarUrl, '用户名', infoRes.userInfo.nickname);
                      that.userInfo.avatarurl = infoRes.userInfo.avatarUrl ? infoRes.userInfo.avatarUrl: ''
                      that.userInfo.nickname = infoRes.userInfo.nickname? infoRes.userInfo.nickname: ''
                      
                      // 正式登录
                      that.getInfo()
                    }
                  })
                }
              })
            }
          },
          fail: function(err){
            uni.showToast({
              title: '授权登录失败',
              icon: 'none'
            })
          }
        })
      },
      // 第三方登录获取绑定是否手机号等信息
      getInfo() {
        console.log('111', JSON.stringify(this.userInfo))
        this.$http({
          url: this.$api.otherlogin,
          method: 'POST',
          data: this.userInfo,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              // 绑定了手机
              if(res.data.userinfo.mobile) {
                let userinfo = {
                  mobile: res.data.userinfo.mobile,
                  token: res.data.userinfo.token
                }
                let data = JSON.stringify(userinfo)
                // 存储token信息
                this.$store.commit('login', userinfo)
                uni.setStorage({
                  key: 'userinfo',
                  data: data,
                  success: function () {
                    uni.switchTab({
                      url: '../index/index'
                    })
                  }
                })
                return
              }
              
              // 没绑定手机
              this.$store.commit('setToken', res.data.userinfo.token)
              
              uni.showToast({
                title: '请绑定您的手机号码',
                icon: 'none'
              })
              uni.navigateTo({
                url: 'bindTel'
              })
              
            } else if (res.code === 0 && res.msg){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } if(err) {
              uni.showToast({
                title: '获取用户绑定信息失败',
                icon: 'none'
              })
            }
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
