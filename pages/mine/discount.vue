<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>我的优惠券</text>
      <text class="iconfont" @click="goMean">&#xe611;</text>
    </view>
    <view class="tabBar">
      <view v-for="(item, index) in tabsList" :key="index" :class="{tab: true, selected: tabData === index}" @click="selectTab(index)">{{ item }}</view>
    </view>
  	<view class="content">
      <view class="main">
        <view class="item">
          <image :src="'../../static/img/mine/discount/' + imgName + '.png'" mode=""></image>
          <view class="item-main">
            <view class="item-left">
              <view class="big">
              	<text>￥</text>22
              </view>
              <view class="small">无金额门槛</view>
            </view>
            <view class="item-right border-box">
             <view class="title">
              	<text :class="{'color-99': tabData !== 0}">「现金券」</text>索尼耳机无门槛22元券
              </view>
              <view class="time">2019.04.11-2019.05.20</view>
              <view :style="{ visibility: btnShow }" class="btn">立即使用</view>
              <view class="detail">
                <text :class="{'color-99': tabData !== 0}">详细信息</text>
                <text class="iconfont">&#xe792;</text>
              </view>
            </view>
          </view>
          <view class="item-detail bg-white">
            限品类：仅限购买工厂店商品
          </view>
        </view>
      </view>
      
      <!--  为空时显示 -->
      
      <view v-if="false" class="null">
        <image src="../../static/img/mine/discount/null.png" mode=""></image>
        <view class="word">{{ discount.word }}</view>
        <view class="info">“{{ discount.info }}”</view>
      </view>
    </view>
    <view class="footer" @click="goDiscountCenter">
      <text class="iconfont">&#xe692;</text>去领券中心逛逛
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        tabsList: ['未使用', '已使用', '已过期'],
        tabData: 0,
        discount: {
          word: '还没有优惠券哦',
          info: '快去领券中心领优惠券吧~'
        },
        imgName: 'usable',
        btnShow: 'visible'
      }
    },
    watch: {
      tabData(val) {
        if (val !== 0) {
          this.imgName = 'unusable'
          this.btnShow = 'hidden'
          return
        }
        this.imgName = 'usable'
        this.btnShow = 'visible'
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      goMean() {
        uni.navigateTo({
          url: 'mean'
        })
      },
      selectTab(index) {
        this.tabData = index
      },
      goDiscountCenter() {
        uni.navigateTo({
          url: 'discountCenter'
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
  }
  .tabBar{
    display: flex;
    padding: 0 52upx;
    margin-bottom: 10upx;
    height: 112upx;
    justify-content: space-between;
    color: $color-99;
    font-size: $font-32;
    line-height: 112upx;
    background: $title-color;
    .tab{
      
    }
    .selected{
      position: relative;
      color: $color-white;
      &:before{
        content: '';
        position: absolute;
        bottom: 20upx;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 4upx;
        width: 34upx;
        background: $color-red;
      }
    }
  }
  .content{
    background: $color-white;
    font-size: $font-22;
    .item{
      position: relative;
      height: 240upx;
      margin: 30upx;
      &>image{
        height: 240upx;
        width: 228upx;
      }
      .item-main{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        .item-left{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 240upx;
          width: 228upx;
          text-align: center;
          color: $color-white;
          .big{
            font-size: $font-84;
            font-weight: $font-bold;
            line-height: 62upx;
            &>text{
              font-size: $font-36;
            }
          }
          .small{
            margin-top: 24upx;
            font-size: $font-24;
            line-height: 24upx;
          }
        }
        .item-right{
          flex: 1;
          padding-left: 30upx;
          padding-right: 20upx;
          box-shadow:0px 6px 16px 2px rgba(0, 0, 0, 0.03);
          .title{
            font-size: $font-26;
            line-height: 69upx;
            margin-top: 4upx;
            font-weight: $font-bold;
            color: $title-color;
            &>text{
              color: $color-red;
            }
          }
          .time{
            margin-bottom: 30upx;
            font-size: $font-22;
            line-height: 17upx;
            color: $color-99;
          }
          .btn{
            display: inline-block;
            height: 42upx;
            padding: 0 19upx;
            margin-bottom: 22upx;
            text-align: center;
            line-height: 42upx;
            font-size: $font-22;
            color: $color-red;
            border-radius: 21upx;
            background: $color-pink-bg;
          }
          .detail{
            display: flex;
            justify-content: space-between;
            height: 55upx;
            line-height: 55upx;
            border-top: 1px dashed $color-dd;
            .iconfont{
              font-size: 10upx;
            }
          }
        }
      }
      .item-detail{
        padding: 0 30upx;
        line-height: 76upx;
        color: $word-color;
        box-shadow:0px 6px 16px 2px rgba(0, 0, 0, 0.03);
      }
      .color-99{
        color: $color-99!important;
      }
    }
  }
  .footer{
    margin: 27upx 50upx;
    height: 98upx;
    width: calc(100% - 100upx);
    text-align: center;
    line-height: 98upx;
    color: $color-white;
    font-size: $font-30;
    background: $title-color;
    border-radius: 49upx;
    &> .iconfont{
      margin-right: 17upx;
    }
  }
  .null{
    margin-top: 184upx;
    text-align: center;
    letter-spacing: 5upx;
    &>image{
      height: 420upx;
      width:524upx;
    }
    .word{
      font-size: $font-30;
      line-height: 53upx;
      color: $word-color;
      font-weight: bold;
    }
    .info{
      font-size: $font-26;
      line-height: 40upx;
      color: $color-99;
    }
  }
</style>
