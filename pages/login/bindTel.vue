<template>
  <view class="container">
    <image src="../../static/img/login/login_bg.png" mode="" class="content_bg"></image>
    <view class="content-cover">
      <view class="topBar dis-block font-52 col-f t-left" :style="{'padding-top': statusBarHeight + 'px' }">
        <text class="iconfont" @click="goBack">&#xe61c;</text>
      </view>
      <view class="content border-box">
        <view>
          <view class="title">绑定手机号码</view>
          <form @submit="formSubmit" @reset="formReset" class="myForm">
            
            
            <view class="ipt-main linear-border">
              <view class="ipt border-box">
                <text class="iconfont col-obf">&#xe763;</text>
                <input type="text" v-model="mobile" placeholder="请输入您的手机号码" @input="onInput" maxlength="11" placeholder-style="color: #fff">
                <text v-if="showDel" class="iconfont del" @click="username = ''">&#xe620;</text>
              </view>  
            </view>
            
            <view class="ipt-main linear-border">
              <view class="ipt border-box">
                <text class="iconfont col-obf">&#xe636;</text>
                <input type="text" class="code-ipt" v-model="code" placeholder="请输入验证码" maxlength="4" placeholder-style="color: #fff">
                <text v-if="!showInfo" class="code col-obf font-24" @click="getCode">获取验证码</text>
                <text v-if="showInfo" class="code col-obf font-24">{{ code_word }}</text>
              </view>
            </view>
            
            <view class="ipt-main linear-border">
              <view class="ipt border-box">
                <text class="iconfont col-obf">&#xe64c;</text>
                <input v-if="ishide" type="password" v-model="password" placeholder="请输入（6-16字母数字）密码" maxlength="16" placeholder-style="color: #fff">
                <input v-if="!ishide" type="text" v-model="password" placeholder="请输入（6-16字母数字）密码" maxlength="16" placeholder-style="color: #fff">
                <text class="iconfont" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>  
              </view>
            </view>
            
            <!-- <view class="ipt">
              <text class="iconfont">&#xe619;</text>
              <input type="text" v-model="mobile" placeholder="请输入您的手机号码" @input="onInput" maxlength="11">
              <text v-if="showDel" class="iconfont del" @click="mobile = ''">&#xe620;</text>
            </view>
            <view class="ipt">
              <text class="iconfont">&#xe636;</text>
              <input type="text" v-model="code" placeholder="请输入验证码" maxlength="4" @input="onInputCode">
              <text v-if="!showInfo" class="code" @click="getCode">获取验证码</text>
              <text v-if="showInfo" class="code">{{ code_word }}</text>
            </view>
            <view class="ipt">
              <text class="iconfont">&#xe64c;</text>
              <input v-if="ishide" type="password" v-model="password" placeholder="请输入新的密码（6-16为字母数字）" maxlength="16">
              <input v-if="!ishide" type="text" v-model="password" placeholder="请输入新的密码（6-16为字母数字）" maxlength="16">
              <text class="iconfont" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>
            </view> -->
            <view v-if="!showInfo" class="info"></view>
            <view v-if="showInfo" class="info font-purple">验证码已通过手机短信的形式发送至您的手机，请注意查收</view>
            <view class="ipt-main linear-border top-100">
              <view class="ipt dis-block border-box t-center" foroType="submit" @click="sureAction">
                <text class="font-40 line-85">确认</text>
              </view>
            </view>
            <!-- <view class="btn" foroType="submit" @click="sureAction">确认</view> -->
          </form>
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
        token: '',
        showDel: false,
        code_word: '获取验证码',
        mobile: '',
        code: '',
        password: '',
        showInfo: false,             // 验证码发送状态
        ishide: false,              // 密码的显示或隐藏
        check_code: false,          // 验证码是否正确
      }
    },
    // onLoad(option) {
    //   console.log(option.token)
    //   this.token = option.token
    // },
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
      // 验证码输入
      onInputCode(e) {
        let that = this
        let code = e.detail.value
        if(code.length === 4 && this.showInfo) {
          this.$http({
            url: this.$api.smscodeyz,
            method: 'POST',
            data: {
              mobile: this.mobile,
              code: this.code
            },
            cb: (err, res) => {
              if(!err && res.code === 1) {
                that.check_code = true
              }else if (res.code === 0 && res.msg){
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              } if(err) {
                uni.showToast({
                  title: '手机验证码校验失败',
                  icon: 'none'
                })
              }
            }
          })
        }
      },
      // 手机号码输入
      onInput(e) {
        let value = e.detail.value
        if(value) {
          this.showDel = true
          return
        }
        this.showDel = false
      },
      sureAction() {
        let code_mobile = uni.getStorageSync('code_mobile');
        let that = this
        console.log(code_mobile, that.mobile, code_mobile === that.mobile)
        if(!that.showInfo) {
          uni.showToast({
            title: '请先获取手机验证码',
            icon: 'none'
          })
          return
        }
        if(!that.code || that.code.length !== 4) {
          uni.showToast({
            title: '验证码格式错误',
            icon: 'none'
          })
          return
        }
        if(!that.password) {
          uni.showToast({
            title: '请输入密码',
            icon: 'none'
          })
          return
        }
        if(code_mobile !== that.mobile) {
          uni.showToast({
            title: '手机号码与已获取验证码的手机号不一致',
            icon: 'none'
          })
          return
        }
        if(!that.check_code) {
          uni.showToast({
            title: '验证码错误',
            icon: 'none'
          })
          return
        }
        // 绑定手机
        let data = {
          mobile: that.mobile,
          password: that.password
        }
        console.log(JSON.stringify(data))
        that.$http({
          url: that.$api.otherregister,
          method: 'POST',
          data: data,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              uni.showToast({
                title: '绑定手机号成功',
                icon: 'none'
              })
              console.log(JSON.stringify(res))
              let userinfo = {
                mobile: res.data.info.mobile,
                token: res.data.info.token
              }
              
              // 存储token信息
              that.$store.commit('login', userinfo)
              uni.setStorage({
                key: 'userinfo',
                data: userinfo,
                success: function () {
                  uni.switchTab({
                    url: '../index/index'
                  })
                }
              })
            } else if (res.code === 0 && res.msg){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } if(err) {
              uni.showToast({
                title: '绑定手机号失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
      // 获取验证码
      getCode() {
        uni.setStorageSync('code_mobile', this.mobile);
        let value = /^1[3456789]\d{9}$/.test(this.mobile)
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
            mobile: this.mobile
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.code_word = 120
              that.showInfo = true
              setInterval(function() {
                if (that.code_word > 0) {
                  that.code_word--
                }
                if (that.code_word === 0) {
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
      line-height: 88upx;
      background: rgba(0, 0, 0, 0);
      .iconfont{
        font-size: $font-42;
        font-weight: 500;
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
