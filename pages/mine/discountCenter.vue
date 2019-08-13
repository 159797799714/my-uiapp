<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">领券中心</text>
    </view>
    <view class="content border-box">
      <view class="banner">
        <image src="../../static/img/mine/discount/banner.png" mode=""></image>
      </view>
      <view class="tabNav">
        <view v-for="(item, index) in tabList" :key="index" :class="{tab: true, 'border-left': index !== 0, selected: index === tabIndex}" @click="selectTab(index)">
        <text v-if="index === 0" class="iconfont">&#xe6a0;</text>{{ item }}
        </view>
      </view>
      <view class="goods">
        <view class="item">
          <image src="../../static/img/mine/discount/item_bg.png" mode="" class="bg"></image>
          <view class="main">
            <view class="img">
              <image src="" mode=""></image>
            </view>
            <view class="right-box">
              <view class="price-box border-box">
                <view class="price">
                  <text>￥100</text>满299可用
                </view>
                <view>影音299-100券</view>
              </view>
              <view class="time border-box">
                <text>距开抢</text>
                <text class="leave-time">00:28:12</text>
                <text :class="{btn: true, cancel: remind}">提醒我</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return{
        tabList: [
          '神券秒杀', '耳机', '音响', '手机'],
        tabIndex: 0,
        remind: false
        
      }
    },
    computed: {
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
      selectTab(index) {
        this.tabIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    background: $color-f4;
  }
  .topBar{
    height: 368upx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: $font-38;
    line-height: 88upx;
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
    position: absolute;
    top: 216upx;
    height: calc(100% - 216upx);
    width: calc(100% - 60upx);
    margin: 0 30upx;
    background: $color-f4;
    z-index: 5;
    .banner{
      height: 300upx;
      width: 100%;
      &>image{
        height: 300upx;
        width: 690upx;
      }
    }
    .tabNav{
      display: flex;
      justify-content: space-between;
      height: 28upx;
      margin: 39upx 10upx 18upx 0;
      font-size: $font-30;
      line-height: 28upx;
      .tab{
        display: inline-block;
        text-align: center;
      }
      .selected{
        color: $color-red;
        font-weight: $font-bold;
      }
    }
    .goods{
      .item{
        margin-top: 15upx;
        height: 200upx;
        width: 100%;
        display: flex;
        position: relative;
        .bg{
          height: 100%;
          width: 100%;
        }
        .main{
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          .img{
            height: 200upx;
            width: 179upx;
            margin-right: 30upx;
            &>image{
              height: 100%;
              width: 100%;
              background: #ccc;
            }
          }
          .right-box{
            flex: 1;
            display: flex;
            justify-content: space-between;
            .price-box{
              flex: 1;
              padding-top: 50upx;
              font-size: $font-28;
              color: $word-color;
              line-height: 28upx;
              .price{
                margin-bottom: 28upx;
                font-size: $font-24;
                color: $color-99;
                line-height: 44upx;
                &>text{
                  margin-right: 12upx;
                  margin-left: -3upx;
                  font-size: $font-58;
                  color: $color-red;
                  font-weight: $font-bold;
                  line-height: 44upx;
                }
              }
              
            }
            .time{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 180upx;
              text-align: center;
              font-size: $font-24;
              line-height: 24upx;
              color: $color-99;
              .leave-time{
                font-size: $font-30;
                color: $title-color;
                margin: 18upx 0 30upx 0;
              }
              .btn{
                display: block;
                height: 40upx;
                width: 110upx;
                border-radius: 20upx;
                background: $color-yellow;
                color: $color-white;
                text-align: center;
                line-height: 40upx;
              }
              .cancel{
                background: $color-bb;
              }
            }
          }
        }
        
      }
    }
  }
</style>
