<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">每日签到</text>
    </view>
  	<view class="content border-box">
      <view class="bg padding-30 border-box">
        <view class="header">
          <view class="code-info">
            <view class="code">当前积分
              <text>{{ code }}</text>
            </view>
            <view class="sign-time">
              <text class="iconfont">&#xe89e;</text>当前已连续签到<text class="sum">{{ dayNum }}</text>天
            </view>
          </view>
          <view class="sign">
            <view :class="{'sign-alert': true, hide: infoShow }">+30积分</view>
            <view :class="{btn: true}" @click="signAction">{{ btnValue }}</view>
          </view>
        </view>
        
        <calendar 
          :disable-before="true" 
          @change="change"
          @to-click="toClick"
           ></calendar>  
      </view>
      
    </view>
    
    <!-- 签到成功弹窗 -->
    <view v-if="successAlert" class="big-cover">
      <view class="cover-bg  toBig">
        <image src="../../static/img/mine/sign_bg.png" mode=""></image>
        <view class="cover-main border-box">
          <view class="word">签到成功！</view>
          <view class="info">
            <text class="iconfont">&#xe65f;</text>明日来签到
            <text class="codeChange">+40积分</text>
          </view>
        </view>  
      </view>
      <view class="close">
        <text class="iconfont" @click="successAlert = false">&#xe613;</text>
      </view>
    </view>
  </view>
</template>

<script>
  import calendar from "@/components/uni-calendar/uni-calendar"
  export default{
    components: {
      calendar
    },
    data() {
      return {
        code: 145,
        dayNum: 9,
        btnValue: '签到',
        infoShow: false,
        successAlert: false
      }
    },
    computed: {
      date() {
        let time = new Date()
        return time.getFullYear() + '-' + (time.getMonth() + 1 ) + '-' + time.getDate()
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      signAction() {
        if(this.btnValue === '已签到') {
          return
        }
        this.btnValue = '已签到'
        this.infoShow = true
        this.successAlert = true
        this.dayNum += 1
        let that = this
        let i = 1;
        // 连续加动态效果
        setInterval(function(){
          if(i>30) {
            return
          }
          that.code += 1
          i++
        }, 30)
        
      },
      change(e) {
        console.log('改变了',e);
      },
      toClick(e) {
        console.log('点击了',e);
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
    font-size: $font-28;
    .bg{
      height: 1029upx;
      width: 100%;
      background: $title-color;
      border-radius:0px 0px 0px 127px;
    }
    .header{
      display: flex;
      justify-content: space-between;
      height: 170upx;
      color: $color-8c;
      font-size: $font-26;
      line-height: 25upx;
      .code-info{
        margin: 45upx 0 0 20upx;
        .code{
          height: 65upx;
          line-height: 65upx;
          margin-bottom: 36upx;
          &>text{
            font-size: $font-88;
            color: $color-white;
          }
        }
        .sign-time{
          letter-spacing: 5upx;
          .iconfont{
            margin-right: 23upx;
            &:after{
              content: '';
              display: inline-block;
              margin-left: 15upx;
              margin-top: 5upx;
              height: 23upx;
              width: 2upx;
              background: $color-8c;
            }
          }
          .sum{
            color: $color-white;
          }
        }  
      }
      .sign{
        margin-top: 64upx;
        .sign-alert{
          margin-bottom: 9upx;
          font-size: $font-22;
          line-height: 26upx;
          text-align: right;
          color: $color-yellow;
          visibility: visible;
        }
        .hide{
          opacity: 0;
          animation: myhidden 3s;
        }
        .btn{
          margin-right: 20upx;
          height: 70upx;
          width: 140upx;
          color: $color-white;
          font-size: $font-28;
          line-height: 70upx;
          text-align: center;
          border-radius: 35upx;
          background: $color-3c;
        }
      }
    }
  }
  .big-cover{
    .cover-bg{
      position: relative;
      height: 400upx;
      width: 600upx;
      margin: 414upx auto 66upx;
      border-radius: 10upx;
      overflow: hidden;
      &>image{
        height: 100%;
        width: 100%;
      }
      .cover-main{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        padding-left: 114upx;
        text-align: left;
        .word{
          margin: 136upx 0 24upx;
          font-size: $font-86;
          color: $color-red;
          line-height: 81upx;
        }
        .info{
          font-size: $font-28;
          line-height: 32upx;
          color: $title-color;
          .iconfont{
            display: inline-block;
            height: 30upx;
            width: 30upx;
            line-height: 30upx;
            border-radius: 100%;
            text-align: center;
            font-size: 18upx;
            color: $color-white;
            background: $color-red;
          }
          .codeChange{
            font-size: $font-34;
            font-weight: $font-bold;
          }
        }
      }
    }
    .close{
      text-align: center;
      font-size: $font-40;
      line-height: 40upx;
      color: $color-white;
      font-weight: $font-bold;
    }
  }
  @keyframes myhidden{
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }
</style>
