<template>
  <view class="container">
    <image src="../../static/img/login/register_bg.png" mode="" class="content_bg"></image>
    <view class="content-cover">
      <view class="topBar">
        <text class="iconfont" @click="goBack">&#xe61c;</text>
      </view>
      <view class="content border-box">
        <view>
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
        </view>
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
        showDel: false,
        code_word: '获取验证码',
        username: '',
        code: '',
        check_code: '',
        showInfo: false
      }
    },
    onLoad(option) {
      this.type = option.type
      if(option.type === 'register') {
        this.title = '注册'
        return
      }
      if(option.type === 'forget') {
        this.title = '找回密码'
        return
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
        console.log(this.check_code, this.code, this.check_code === this.code)
        if(!this.check_code) {
          uni.showToast({
            title: '请先获取手机验证码',
            icon: 'none'
          })
          return
        }
        if(this.check_code !== this.code) {
          uni.showToast({
            title: '验证码不正确',
            icon: 'none'
          })
          return
        }
        console.log(this.check_code, this.code)
        if(this.check_code === this.code && this.check_code) {
          uni.navigateTo({
            url: 'password?type=' + this.type + '&mobile=' + this.username,
            "animationType": "zoom-fade-out"
          })  
        }
      },
      goLogin() {
        uni.navigateTo({
          url: 'login',
          "animationType": "zoom-fade-out"
        })
      },
      getCode() {
        let value = /^1[3456789]\d{9}$/.test(this.username)
        let that = this
        if (!value){
          uni.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
          })
          return
        }
        
        // console.log(this.username)
        // let num = 1111
        // that.check_code = num.toString()
        // console.log(num.toString())
        
        this.$http({
          url: this.$api.sendcode,
          method: 'POST',
          data: {
            mobile: this.username
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.check_code = res.data.info.code.toString()
              that.code_word = 120
              that.showInfo = true
              setInterval(function() {
                if (that.code_word > 0) {
                  that.code_word--
                }
                if (that.code_word === 0) {
                  that.check_code = ''
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
      justify-content: space-between;
      padding: 65upx 30upx 60upx 60upx;
      background: rgba(0, 0, 0, 0);
      .title{
        margin-bottom: 137upx;
        font-size: $font-54;
        line-height: 54upx;
        color: $color-white;
      }
      .myForm{
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
            margin: 10upx 30upx;
            font-size: $font-28;
          }
          .del{
            transform: rotate(45deg);
          }
          .code{
            width: 140upx;
            height: 36upx;
            font-size: $font-22;
            line-height: 36upx;
            text-align: center;
            border-radius: 18upx;
            background: $color-red;
          }
        }
        .info{
          height: 20upx;
          margin: 40upx 0 186upx;
          font-size: $font-20;
          line-height: 20upx;
          color: $color-red;
        }
        .btn{
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
      .login{
        font-size: $font-30;
        line-height: 29upx;
        text-align: center;
        color: $color-99;
      }
      .clause{
        margin-top: 75upx;
        font-size: $font-22;
        line-height: 28upx;
        text-align: center;
        color: $color-99;
        &>text{
          color: $color-red;
        }
        &>.iconfont{
          font-size: $font-28;
        }
      }
    }
  }
</style>
