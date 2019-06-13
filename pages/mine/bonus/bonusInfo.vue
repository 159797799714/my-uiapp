<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">{{ title }}</text>
    </view>
  	<scroll-view scroll-y="true" class="content">
      <view class="bg border-box">
        <view>
          <view class="leave">16842.00</view>
          <view class="word">佣金账户/元</view>
        </view>
        <text>提现</text>
      </view>
      <view class="title">
        <text class="iconfont">&#xe692;</text>
        <text>{{ small_title }}</text>
      </view>
      <view class="box bg-white">
        <view v-for="(item, index) in dataList" :key="index" class="item border-box bg-white">
          <view>
            <view class="name">{{ item.name }}</view>
            <view class="leave-num">余额:{{ item.leave_num }}</view>
          </view>
          <view class="right">
            <view class="time">{{ item.time }}</view>
            <view class="vary">+{{ item.vary }}</view>
          </view>
        </view>  
      </view>
    </scroll-view>
      
  </view>
</template>

<script>
  export default{
    data() {
      return {
        receive: {},
        title: '佣金明细',
        small_title: '出入明细',
        dataList: [{
          name: '超级无敌大汽车',
          leave_num: '1954.00',
          time: '2010-11-11',
          vary: '1000.00'
        }, {
          name: '牛皮',
          leave_num: '1954.00',
          time: '2010-11-11',
          vary: '888.00'
        }, {
          name: '超级无敌大汽车',
          leave_num: '1954.00',
          time: '2010-11-11',
          vary: '1000.00'
        }, {
          name: '牛皮',
          leave_num: '1954.00',
          time: '2010-11-11',
          vary: '888.00'
        }, {
          name: '超级无敌大汽车',
          leave_num: '1954.00',
          time: '2010-11-11',
          vary: '1000.00'
        }, {
          name: '牛皮',
          leave_num: '1954.00',
          time: '2010-11-11',
          vary: '888.00'
        }]
      }
    },
    onLoad(option) {
      if(option.origin === '2') {
        this.title = '佣金提现明细'
        this.small_title = '提现明细'
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
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
    .bg{
      display: flex;
      height: 312upx;
      width: 100%;
      padding: 67upx 50upx 0 48upx;
      background: $title-color;
      border-radius: 0 0 190upx 0;
      &>view{
        flex: 1;
        .leave{
          font-size: $font-76;
          color: $color-white;
          line-height: 57upx;
          margin-bottom: 35upx;
        }
        .word{
          font-size: $font-28;
          color: $color-99;
        }  
      }
      &>text{
        display: block;
        width: 163upx;
        height: 88upx;
        margin-top: 11upx;
        font-size: $font-30;
        text-align: center;
        line-height: 88upx;
        color: $color-white;
        border-radius: 44upx;
        background: $color-3c;
      }
    }
    .title{
      height: 98upx;
      padding: 0 50upx;
      font-size: $font-30;
      color: $color-99;
      line-height: 98upx;
      &>.iconfont{
        margin-right: 15upx;
      }
    }
    .box{
      height: calc(100% - 421upx);
      width: 100%;
      overflow: auto;
    }
    .item{
      height: 150upx;
      margin: 0 50upx;
      width: calc(100% - 100upx);
      display: flex;
      justify-content: space-between;
      &>view{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .right{
        text-align: right;
      }
      .name{
        font-size: $font-30;
        line-height: 28upx;
        margin-bottom: 19upx;
        font-weight: $font-bold;
      }
      .leave-num{
        font-size: $font-26;
        line-height: 25upx;
        color: $word-color;
      }
      .time{
        font-size: $font-24;
        color: $color-99;
        line-height: 19upx;
        margin-bottom: 15upx;
      }
      .vary{
        font-size: $font-38;
        line-height: 29upx;
        color: $color-red;
        font-weight: $font-bold;
      }
    }
  }
  
</style>
