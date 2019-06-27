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
          <input :type="ishide ? 'password': 'text'" v-model="password" placeholder="请输入新的密码（6-16为字母数字）" maxlength="16">
          <text class="iconfont del" @click="ishide = !ishide">{{ ishide? '&#xe6e1;' : '&#xe6cc;'}}</text>
        </view>
        <view class="btn" foroType="submit" @click="sureAction">{{ btnValue }}</view>
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
        code: '',
        btnValue: '',
        ishide: false
      }
    },
    onLoad(option) {
      this.type = option.type
      this.mobile = option.mobile
      console.log('接收到的参数', option)
      if(option.type === 'register') {
        this.title = '设置密码'
        this.btnValue = '注册并登录'
        return
      }
      if(option.type === 'forget') {
        this.title = '重置密码'   
        this.btnValue = '保存并登录'
        return
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      sureAction() {
        switch(this.type) {
          case 'forget':
            this.$http({
              url: this.$api.resetpassword,
              method: 'POST',
              data: {
                mobile: this.mobile,
                newpassword: this.password
              },
              cb: (err, res) => {
                if(!err && res.code === 1) {
                  this.$store.commit('login', {
                    mobile: this.mobile,
                    token: res.data.token
                  })
                  uni.showToast({
                    title: '重置密码成功',
                    icon: 'none'
                  })
                  
                  uni.switchTab({
                    url: '../index/index'
                  })
                  return
                } else if(res.code === 0) {
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
            this.$http({
              url: this.$api.register,
              method: 'POST',
              data: {
                mobile: this.mobile,
                password: this.password
              },
              cb: (err, res) => {
                if(!err && res.code === 1) {
                  uni.showToast({
                    title: '注册成功',
                    icon: 'none'
                  })
                  uni.switchTab({
                    url: '../index/index'
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
