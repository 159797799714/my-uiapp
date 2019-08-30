<template>
  <view class="container">
    <image src="../../static/img/login/login_bg.png" mode="" class="content_bg"></image>
    <view class="content border-box" :style="{padding: statusBarHeight > 20 ? '55px 52px 0': '44px 52px 0'}">
      <view class="main dis-flex flex-dir-column flex-y-center">
        <view class="logo">
          <image src="../../static/img/login/logo.png" mode="widthFix" :style="{width: 517 * windowHeight / 1460 + 'px'}"></image>
        </view>
        <view class="page-title font-50 col-f t-center" :style="{'line-height': statusBarHeight > 20 ? '75px': '65px'}">用户登录</view>
        <form @submit="login" @reset="formReset" class="form-main border-box">
          <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe763;</text>
              <input type="text" v-model="mobile" placeholder="请输入您的手机号码" @input="onInput" maxlength="11" placeholder-style="color: #fff">
              <text v-if="showDel" class="iconfont del" @click="mobile = ''">&#xe620;</text>
            </view>  
          </view>
          
          <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe64c;</text>
              <input v-if="ishide" type="password" v-model="password" placeholder="请输入密码" maxlength="16" placeholder-style="color: #fff">
              <input v-if="!ishide" type="text" v-model="password" placeholder="请输入密码" maxlength="16" placeholder-style="color: #fff">
              <text class="iconfont" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>  
            </view>
          </view>
          
          <!-- <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe636;</text>
              <input type="text" class="code-ipt" v-model="code" placeholder="请输入验证码" maxlength="4" placeholder-style="color: #fff">
              <text v-if="!showInfo" class="code col-obf font-24" @click="getCode">获取验证码</text>
              <text v-if="showInfo" class="code">{{ code_word }}</text>
            </view>
          </view> -->
          
          <view class="ipt-main linear-border">
            <view class="ipt dis-block border-box t-center" foroType="submit" @click="goLogin">
              <text class="font-40 line-85">登录</text>
            </view>
          </view>
          
          <view v-if="statusBarHeight > 0" class="login-way border-box" :style="{ 'padding-top': statusBarHeight - 10 + 'px' }">
            <!-- <view class="title">
              <text>第三方登录</text>
            </view> -->
            <view class="box">
              <image src="../../static/img/login/weixin.png" @click="loginWay('weixin')" mode="aspectFit"></image>
              <image src="../../static/img/login/qq.png" @click="loginWay('qq')" mode="aspectFit"></image>
              <image src="../../static/img/login/sinaweibo.png" @click="loginWay('sinaweibo')" mode="aspectFit"></image>
            </view>
          </view>
          <view class="other">
            <text @click="clickAction('register')">注册账号</text>
            <text class="forget col-f" @click="clickAction('forget')">忘记密码？</text>
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
    computed: {
      windowHeight() {
        return this.$store.state.windowHeight
      },
      statusBarHeight() {
        return this.$store.state.statusBarHeight
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
          url: 'register?type=' + type
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
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0);

    .main {
      flex: 1;
      .logo {
        overflow: hidden;
        &>image {
          margin: 0 auto;
          height: 100%;
          width: 100%;
        }
      }
      .form-main {
        width: 100%;
        .ipt-main{
          margin-bottom: 47upx;
          padding: 2upx;
          border-radius: 10upx;
        }
        .ipt {
          height: 85upx;
          padding: 0 40upx;
          display: flex;
          align-items: center;
          color: $color-white;
          border-radius: 10upx;
          background: rgba(0, 0, 0, 0.9);
          &>text {
            font-size: $font-30;
          }

          &>input {
            flex: 1;
            margin: 10upx 30upx;
            font-size: $font-28;
          }
          .code-ipt{
            position: relative;
            margin-right: 40upx;
            &:after{
              content: '';
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              height: 30upx;
              width: 1px;
              background: $color-white;
            }
          }
          .line-85{
            line-height: 85upx;
          }
          .del {
            transform: rotate(45deg);
          }
        }

        .btn {
          margin: 53upx 0 51upx;
          height: 98upx;
          width: 100%;
          font-size: $font-30;
          color: $color-white;
          line-height: 98upx;
          text-align: center;
          background: $color-red;
          border-radius: 49upx;
          padding: 5upx;
        }

        .other {
          position: absolute;
          bottom: 80upx;
          width: calc(100% - 212upx);
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
            padding: 0 42upx;
            display: flex;
            justify-content: space-between;

            &>image {
              max-width: 70upx;
              height: 74upx;
            }
          }
        }
      }
    }
  }
</style>
