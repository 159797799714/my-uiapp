<template>
  <view class="container">
    <image src="../../static/img/login/login_bg.png" mode="" class="content_bg"></image>
    <view class="content-cover">
      <view class="topBar p-ab" :style="{'padding-top': statusBarHeight + 'px' }">
        <text class="iconfont font-52 col-f" @click="goBack">&#xe61c;</text>
      </view>
      <view class="main dis-flex flex-dir-column flex-y-center" :style="{padding: statusBarHeight > 20 ? '55px 52px 0': '44px 52px 0'}">
        <view class="logo">
          <image src="../../static/img/login/logo.png" mode="widthFix" :style="{width: 517 * windowHeight / 1460 + 'px'}"></image>
        </view>
        <view class="page-title font-50 col-f t-center" :style="{'line-height': statusBarHeight > 20 ? '75px': '65px'}">{{ title }}</view>
        <form @submit="login" @reset="formReset" class="form-main border-box">
          
          <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe64c;</text>
              <input v-if="ishide" type="password" v-model="password" placeholder="请输入密码" maxlength="16" placeholder-style="color: #fff">
              <input v-if="!ishide" type="text" v-model="password" placeholder="请输入密码" maxlength="16" placeholder-style="color: #fff">
              <text class="iconfont" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>  
            </view>
          </view>
          
          <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe64c;</text>
              <input v-if="ishide" type="password" v-model="password2" placeholder="请输入密码" maxlength="16" placeholder-style="color: #fff">
              <input v-if="!ishide" type="text" v-model="password2" placeholder="请输入密码" maxlength="16" placeholder-style="color: #fff">
              <text class="iconfont" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>  
            </view>
          </view>
          
          <view class="ipt-main linear-border top-100">
            <view class="ipt dis-block border-box t-center" foroType="submit" @click="sureAction">
              <text class="font-40 line-85">{{ btnValue }}</text>
            </view>
          </view>
        </form>
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
        mobile: '',
        password: '',
        password2: '',
        code: '',
        btnValue: '',
        ishide: false
      }
    },
    onLoad(option) {
      that.type = option.type
      this.mobile = option.mobile
      console.log('password接收到的参数', option)
      if(option.type === 'register') {
        this.title = '设置密码'
        this.btnValue = '注册'
        return
      }
      if(option.type === 'forget') {
        this.title = '重置密码'   
        this.btnValue = '保存并登录'
        return
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
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      sureAction() {
        let that = this
        console.log('fjafjf')
        if(!that.password) {
          uni.showToast({
            title: '密码不能为空',
            icon: 'none'
          })
          return
        }
        if(that.password !== that.password2) {
          uni.showToast({
            title: '两次密码输入不一致',
            icon: 'none'
          })
          return
        }
        
        switch(that.type) {
          case 'forget':
            that.$http({
              url: that.$api.resetpassword,
              method: 'POST',
              data: {
                mobile: that.mobile,
                newpassword: that.password
              },
              cb: (err, res) => {
                if(!err && res.code === 1) {
                  that.$store.commit('login', {
                    mobile: res.data.mobile,
                    token: res.data.token
                  })
                  uni.showToast({
                    title: '重置密码成功即将自动登录',
                    icon: 'none'
                  })
                  setTimeout(function() {
                    uni.switchTab({
                      url: '../index/index'
                    })  
                  }, 1000)
                  
                } else if(res.code === 0 && res.msg) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                  return
                } else {
                  uni.showToast({
                    title: '重置密码失败',
                    icon: 'none'
                  })
                  return
                }
              }
            })
            break
          case 'register':
            that.$http({
              url: that.$api.register,
              method: 'POST',
              data: {
                mobile: that.mobile,
                password: that.password
              },
              cb: (err, res) => {
                if(!err && res.code === 1) {
                  uni.showToast({
                    title: '注册成功',
                    icon: 'none'
                  })
                  uni.switchTab({
                    url: './login'
                  })
                } else if(res.code === 0) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                } else {
                  uni.showToast({
                    title: '注册失败',
                    icon: 'none'
                  })
                }
              }
            })
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content_bg {
    height: 100%;
    width: 100%;
  }
  .top-100{
    margin-top: 100upx;
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
    }
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
      .page-title{
        line-height: 150upx;
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
