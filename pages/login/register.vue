<template>
  <view class="container">
    <image src="../../static/img/login/login_bg.png" mode="" class="content_bg"></image>
    <view class="topBar p-ab dis-block" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont font-52 col-f" @click="goBack">&#xe61c;</text>
    </view>
    <view class="content border-box" :style="{padding: statusBarHeight > 20 ? '55px 52px 0': '44px 52px 0'}">
      
      <view class="main dis-flex flex-dir-column flex-y-center">
        <view class="logo">
          <image src="../../static/img/login/logo.png" mode="widthFix" :style="{width: 517 * windowHeight / 1460 + 'px'}"></image>
        </view>
        <view class="page-title font-50 col-f t-center" :style="{'line-height': statusBarHeight > 20 ? '75px': '65px'}">{{ title }}</view>
        <form @submit="login" @reset="formReset" class="form-main border-box">
          <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe763;</text>
              <input type="text" v-model="username" placeholder="请输入您的手机号码" @input="onInput" maxlength="11" placeholder-style="color: #fff">
              <text v-if="showDel" class="iconfont del" @click="username = ''">&#xe620;</text>
            </view>  
          </view>
          <!-- <view v-if="!showInfo" class="info"></view>
          <view v-if="showInfo" class="info font-20 font-purple">验证码已通过手机短信的形式发送至您的手机，请注意查收</view> -->
          <view class="ipt-main linear-border">
            <view class="ipt border-box">
              <text class="iconfont col-obf">&#xe636;</text>
              <input type="text" class="code-ipt" v-model="code" placeholder="请输入验证码" maxlength="4" placeholder-style="color: #fff">
              <text v-if="!showInfo" class="code col-obf font-24" @click="getCode">获取验证码</text>
              <text v-if="showInfo" class="code col-obf font-24">{{ code_word }}</text>
            </view>
          </view>
          <view class="ipt-main linear-border top-100">
            <view class="ipt dis-block border-box t-center" foroType="submit" @click="goNext">
              <text class="font-40 line-85">下一步</text>
            </view>
          </view>
        </form>
        <view v-if="type === 'register'" class="other">
          <view class="login font-36 col-f t-center" @click="goLogin">已有账号?</view>
          <view class="clause font-24 col-66">
            <text class="iconfont">&#xe722;</text>注册即表示您已同意
            <text class="col-f">《用户协议》</text>和
            <text class="col-f">《隐私条款》</text>
          </view>  
        </view>
        
      </view>
      
      <!-- <view>
        <view class="title">{{ title }}</view>
        <form @submit="formSubmit" @reset="formReset" class="myForm">
          
          <view class="ipt">
            <text class="iconfont">&#xe619;</text>
            <input type="text" v-model="username" placeholder="请输入您的手机号码" @input="onInput" maxlength="11">
            <text v-if="showDel" class="iconfont del" @click="username = ''">&#xe620;</text>
          </view>
          <view class="ipt">
            <text class="iconfont">&#xe636;</text>
            <input type="text" v-model="code" placeholder="请输入验证码" maxlength="4">
            <text v-if="!showInfo" class="code" @click="getCode">获取验证码</text>
            <text v-if="showInfo" class="code">{{ code_word }}</text>
          </view>
          <view v-if="!showInfo" class="info"></view>
          <view v-if="showInfo" class="info">验证码已通过手机短信的形式发送至您的手机，请注意查收</view>
          <view class="btn" foroType="submit" @click="goNext">下一步</view>
        </form>
      </view>
      <view v-if="type === 'register'">
        <view class="login" @click="goLogin">已有账号去登录</view>
        <view class="clause">
          <text class="iconfont">&#xe722;</text>注册即表示您已同意
          <text>《用户协议》</text>和
          <text>《隐私条款》</text>
        </view>  
      </view> -->
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        title: '',
        type: '',
        showDel: false,
        code_word: '获取验证码',
        username: '',
        code: '',
        check_code: false,
        showInfo: false,
        showTitle: '请获取手机验证码'
      }
    },
    onLoad(option) {
      this.type = option.type
      if(option.type === 'register') {
        this.title = '用户注册'
        return
      }
      if(option.type === 'forget') {
        this.title = '找回密码'
        return
      }
    },
    onShow() {
      this.showInfo = false
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
      onInput(e) {
        let value = e.detail.value
        if(value) {
          this.showDel = true
          return
        }
        this.showDel = false
      },
      goNext() {
        console.log(this.check_code, this.code, this.showInfo)
        // if(this.check_code) {
        //   if(this.code.length === 4) {
        //     this.$http({
        //       url: this.$api.smscodeyz,
        //       data: {
        //         mobile: this. username,
        //         code: this.code
        //       },
        //       cb: (err, res) => {
        //         if(!err && res.code === 1) {
        //           uni.navigateTo({
        //             url: 'password?type=' + this.type + '&mobile=' + this.username
        //           })
        //         } else if(res.code === 0) {
        //           uni.showToast({
        //             title: res.msg,
        //             icon: 'none'
        //           })
        //         } else {
        //           uni.showToast({
        //             title: '验证码验证失败',
        //             icon: 'none'
        //           })
        //         }
        //       }
        //     })  
        //   } else {
        //     uni.showToast({
        //       title: '验证码格式错误',
        //       icon: 'none'
        //     })
        //   }  
        // } else {
        //   uni.showToast({
        //     title: this.showTitle,
        //     icon: 'none'
        //   })
        // }
        uni.navigateTo({
          url: 'password?type=' + this.type + '&mobile=' + this.username,
        })
      },
      goLogin() {
        uni.navigateTo({
          url: 'login'
        })
      },
      // 获取手机验证码
      getCode() {
        console.log(this.username)
        let value = /^1[3456789]\d{9}$/.test(this.username)
        let that = this
        if (!value){
          uni.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
          })
          return
        }
        this.$http({
          url: this.$api.sendcode,
          method: 'POST',
          data: {
            mobile: this.username
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.check_code = true
              that.code_word = 120
              that.showInfo = true
              that.showTitle = '验证码过期，请重新获取'
              setInterval(function() {
                if (that.code_word > 0) {
                  that.code_word--
                }
                if (that.code_word === 0) {
                  that.check_code = false
                  that.showInfo = false
                  return
                }
              }.bind(that), 1000)
            } else {
              uni.showToast({
                title: '手机验证码获取失败',
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
  .topBar{
    background: rgba(0, 0, 0, 0);
    &>text{
      line-height: 44px;
    }
  }
  .top-100{
    margin-top: 100upx;
  }
  .content{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    .main {
      flex: 1;
      .logo {
        max-height: 517upx;
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
    .other{
      position: absolute;
      bottom: 50upx;
      .login{
        margin-bottom: 80upx;
      }
      .clause{
        font-size: $font-22;
        line-height: 28upx;
        text-align: center;
        &>text{
          color: $color-red;
        }
      }  
    }
    
  }
</style>
