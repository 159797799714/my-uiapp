<template>
  <view class="container">
    <scroll-view scroll-y="true" class="content">
      <view class="header">
        <image src="../../static/img/mine/bg.png" class="head-bg"></image>
        <view class="head-main">
          <view class="navigator">
            <view class="title">
              我的
              <text class="iconfont">&#xe676;</text>
            </view>
          </view>
          <view class="user">
            <image src="../../static/img/mine/bg.png" mode=""></image>
            <view>
              <view class="name">不知道先生</view>
              <view class="uenum">UE号：7784759567</view>
              <view class="sign">这家伙很懒什么都没有留下</view>
            </view>
          </view>
        </view>
      </view>
      <view class="order bg-white">
        <view class="myorder">
          <text>我的订单</text>
          <view>
            <text>全部订单</text>
            <text class="iconfont">&#xe644;</text>
          </view>
        </view>
        <view class="row1">
          <view v-for="(item, index) in menuList1" :key="index">
            <image :src="item.imgUrl" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
        </view>
        <view class="row2">
          <view v-for="(item, index) in menuList2" :key="index">
            <image :src="item.imgUrl" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
      <view class="goods bg-white">
        <view class="goodsTab">
          <view v-for="(item, index) in tabList" :key="index" :class="{ tabItem: true, after: index === tabIndex }" @click="selectTab(index)">{{ item }}</view>
        </view>
        <view class="goods-content">
          <view v-for="(item, index) in goodList" :key="index" class="good-item">
            <view class="good-img"></view>
            <view class="good-info border-box">
              <view class="good-name">{{ item.name }}</view>
              <view class="good-remark">
                <text v-for="(li, index) in item.remark" :key="index">{{ li }}</text>
              </view>
              <view class="good-price">
                <text>￥{{ item.price }}</text>
                <text class="iconfont">&#xe719;</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        menuList1: [
          {
            imgUrl: '../../static/img/mine/staypay.png',
            name: '待付款'
          }, {
            imgUrl: '../../static/img/mine/stayreceive.png',
            name: '待收货'
          }, {
            imgUrl: '../../static/img/mine/stayassess.png',
            name: '待评价'
          }, {
            imgUrl: '../../static/img/mine/success.png',
            name: '已完成'
          }, {
            imgUrl: '../../static/img/mine/cancel.png',
            name: '已取消'
          }
        ],                        // 我的订单第一行
        menuList2: [
          {
            imgUrl: '../../static/img/mine/discount.png',
            name: '优惠券'
          }, {
            imgUrl: '../../static/img/mine/sign.png',
            name: '我的签到'
          }, {
            imgUrl: '../../static/img/mine/recording.png',
            name: '最近浏览'
          }, {
            imgUrl: '../../static/img/mine/share.png',
            name: '我的推广'
          }
        ],                        // 我的订单第二行
        tabIndex: 0,              // 默认选中点赞
        tabList: ['点赞', '收藏'], // tab
        goodList: [
          {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }, {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }, {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }, {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }
        ]
      }
    },
    methods: {
      selectTab(index) {
        this.tabIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    display: flex;
    flex-direction: column;
    color: $title-color;
    .header, .head-bg{
      height: 378upx;
      width: 100%;
    }
    .header{
      position: relative;
    }
    .head-main{
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 88upx;
      height: 310upx;
      width: 100%;
      color: $color-white;
      background: rgba(0, 0, 0, 0.8);
      .navigator{
        position: relative;
        height: 90upx;
        padding: 0 30upx;
        margin-bottom: 33upx;
        line-height: 90upx;
        text-align: center;
        font-size: $font-36;
        display: flex;
        .title{
          flex: 1;
          &>text{
            display: block;
            position: absolute;
            right: 30upx;
            top: 0;
            font-size: $font-38;
          }
        }
        
      }
      .user{
        display: flex;
        padding: 0 67upx;
        &>image{
          height: 114upx;
          width: 114upx;
          margin-right: 37upx;
          border-radius: 100%;
        }
        &>view{
          flex: 1;
          font-size: $font-22;
          color: $color-99;
          .name{
            font-size: $font-36;
            line-height: 36upx;
            color: $color-white;
          }
          .uenum{
            line-height: 54upx;
            margin-bottom: 5upx;
          }
        }
      }
    }
    .order{
      position: absolute;
      width: 100%;
      height: 436upx;
      padding: 0 30upx 0 30upx;
      box-shadow:0upx 0upx 24upx 0upx rgba(190,190,190,0.27);
      border-radius:10upx 10upx 0upx 0upx;
      box-sizing: border-box;
      .myorder{
        display: flex;
        justify-content: space-between;
        height: 75upx;
        padding-left: 30upx;
        line-height: 75upx;
        font-size: $font-28;
        border-bottom: 2px solid $color-f5;
        &>text{
          font-weight: $font-bold;
        }
        &>view>text{
          margin-left: 15upx;
          color: $word-color;
        }
      }
      .row1, .row2{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $font-24;
        line-height: $font-24;
        &>view{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .row1{
        padding: 28upx;
        border-bottom: 2px solid $color-f5;
        &>view>image{
          height: 84upx;
          width: 84upx;
          margin-bottom: 14upx;
        }
      }
      .row2{
        padding: 28upx 62upx;
        &>view>image{
          height: 81upx;
          width: 81upx;
          margin-bottom: 14upx;
        }
      }
    }
    .goods{
      margin-top: 436upx;
      padding: 33upx 30upx;
      .goodsTab{
        height: 70upx;
        padding: 0 150upx;
        margin-bottom: 20upx;
        display: flex;
        font-size: $font-34;
        font-weight: $font-bold;
        line-height: 70upx;
        border-bottom: 2px solid $color-f5;
        .tabItem{
          flex: 1;
          position: relative;
          text-align: center;
        }
        .after{
          &::before{
            display: block;
            position: absolute;
            bottom: 0;
            margin-left: 50%;
            transform: translateX(-50%);
            content: '';
            height: 4upx;
            width: 34upx;
            background: $color-red;
          }
        }
      }
      .goods-content{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .good-item{
          display: flex;
          flex-direction: column;
          height: 524upx;
          width: 330upx;
          margin-top: 20upx;
          border: 1px solid $color-ee;
          .good-img{
            height: 330upx;
            width: 330upx;
            margin-bottom: 30upx;
            background: $color-ee;
          }
          .good-info{
            flex: 1;
            padding: 7upx 18upx;
            .good-name{
              height: 28upx;
              line-height: 28upx;
              font-size: $font-28;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .good-remark{
              font-size: $font-20;
              line-height: 64upx;
              color: $word-color;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &>text{
                margin: 0 16upx;
              }
            }
            .good-price{
              display: flex;
              justify-content: space-between;
              font-size: $font-26;
              font-weight: $font-bold;
              line-height: 54upx;
              .iconfont{
                color: $word-color;
              }
            }
          }
          
        }
      }
    }
  }
</style>
