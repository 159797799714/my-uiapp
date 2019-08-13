<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px'}">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">订单详情</text>
    </view>
  	<scroll-view scroll-y="true" class="content">
      <view class="top border-box">
        <view class="status">已完成</view>
        <view class="order-num">订单编号：345271883874464
          <text class="iconfont" @click="copyAction('345271883874464')">&#xe739;</text>
        </view>
      </view>
      <view class="post border-box bg-white">
        <text class="iconfont car">&#xe65b;</text>
        <view class="post-info">
          <view class="info">【深圳市】快件已被签收，如有问题请联系快递员：蔡建彬【17756506677】</view>
          <view class="post-time">2019-05-22  09:10:34</view>
        </view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="user-info border-box bg-white">
        <text class="iconfont">&#xe646;</text>
        <view>
          <view class="addressee">雷先生<text>182 5581 8887</text></view>
          <view class="address"><text>家</text>广东省深圳市南山区三行科技大厦1120室</view>
        </view>
      </view>
      <view class="item border-box bg-white">
        <view class="head">
          <view class="store">
            <view>
              <text class="iconfont">&#xe60b;</text>
            </view>{{ receive.store }}
            <text class="iconfont jiantou">&#xe644;</text>
          </view>
        </view>
        <view v-for="(receive, index) in receive.arr" :key="index" class="center">
          <view class="img">
            <image src="../../static/img/mine/bg.png" mode=""></image>
          </view>
          <view class="info">
            <view class="title">{{ receive.title }}</view>
            <view class="remark">{{ receive.info }}</view>
          </view>
          <view class="sum">
            <view class="cost">￥ 300</view>
            <view class="count">X 1</view>
          </view>
        </view>
      </view>
      <view class="price bg-white">
        <view class="row small">
          <text>商品总价</text>
          <text>￥300.00</text>
        </view>
        <view class="row small">
          <text>运费(快递)</text>
          <text>￥0.00</text>
        </view>
        <view class="row big">
          <text>订单总价</text>
          <text>￥300</text>
        </view>
        <view class="row big really">
          <text>实付款</text>
          <text>￥300</text>
        </view>
        <view class="contact">联系卖家
          <text class="iconfont">&#xe740;</text>
        </view>
      </view>
    </scroll-view>
    <view class="control bg-white border-box">
      <text>查看物流</text>
      <text class="border-red" @click="goGrade">评价</text>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        receive: {}
      }
    },
    onLoad(option) {
      if(option.item) {
        this.receive = JSON.parse(option.item)
      }
      console.log('分享文章详情页接受到的参数',JSON.parse(option.item))
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
      copyAction(num) {
        uni.setClipboardData({
          data: num,
          success: function () {
            uni.showToast({
              title: '复制成功'
            })
          }
        })
      },
      goGrade() {
        uni.navigateTo({
          url: 'grade'
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
  .top{
    padding: 30upx 60upx;
    height: 150upx;
    width: 100%;
    color: $color-white;
    font-size: $font-22;
    background: $title-color;
    .status{
      font-size: $font-38;
      margin-bottom: 27upx;
      line-height: 38upx;
      font-weight: $font-bold;
    }
    .order-num{
      line-height: 21upx;
      &>text{
        margin-left: 20upx;
      }
    }
  }
  .post{
    padding: 30upx 60upx;
    padding-bottom: 0;
    margin-bottom: 1upx;
    height: 181upx;
    width: 100%;
    display: flex;
    .car{
      margin-right: 33upx;
      margin-top: 12upx;
      font-size: 46upx;
      font-weight: $font-bold;
    }
    .post-info{
      flex: 1;
      font-size: $font-28;
      &>.info{
        margin-top: -7upx;
        margin-bottom: 14upx;
        color: $color-red;
        line-height: 42upx;
        white-space: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break:break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .post-time{
        color: $color-99;
      }
    }
    &>text{
      display: block;
      margin-top: 45upx;
    }
  }
  .user-info{
    height: 136upx;
    padding: 30upx 60upx;
    display: flex;
    &>.iconfont{
      font-size: 46upx;
      margin-right: 33upx;
    }
    .addressee{
      margin-bottom: 17upx;
      font-size: 32upx;
      line-height: 30upx;
      font-weight: $font-bold;
      &>text{
        margin-left: 25upx;
        font-size: $font-28;
      }
    }
    .address{
      font-size: $font-24;
      line-height: 30upx;
      &>text{
        margin-right: 18upx;
        display: inline-block;
        padding: 0 14upx;
        line-height: 30upx;
        border-radius: 15upx;
        color: $color-white;
        background: $color-yellow;
      }
    }
  }
  .item{
    margin-top: 30upx;
    padding: 30upx;
    min-height: 316upx;
    width: 100%;
    font-size: $font-28;
    .head{
      height: 44upx;
      margin-bottom: 10upx;
      line-height: 44upx;
      display: flex;
      justify-content: space-between;
      .store{
        color: $word-color;
        &>view{
          display: inline-block;
          margin-right: 8upx;
          height: 44upx;
          width: 44upx;
          text-align: center;
          border-radius: 100%;
          background: $color-red;
          color: $color-white;
        }
        .jiantou{
          margin-left: 35upx;
        }
      }
      .status{
        color: $title-color;
      }
    }
    .center{
      height: 180upx;
      display: flex;
      margin-top: 30upx;
      .img{
        height: 180upx;
        width: 180upx;
        margin-right: 30upx;
        &>image{
          height: 100%;
          width: 100%;
        }
      }
      .info{
        flex: 1;
        .title{
          width: 100%;
          margin-top: -6upx;
          margin-bottom: 30upx;
          line-height: 40upx;
          white-space: wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break:break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .remark{
          display: inline-block;
          height: 40upx;
          padding: 0 15upx;
          line-height: 40upx;
          border-radius: 20upx;
          font-size: $font-22;
          color: $color-99;
          background: $color-f5;
        }
      }
    }
    .sum{
      margin-right: 65upx;
      text-align: right;
      .cost{
        font-size: $font-28;
        line-height: 22upx;
      }
      .count{
        font-size: $font-24;
        line-height: 67upx;
        color: $color-99;
      }
    }
  }
  .price{
    margin: 30upx 0;
    padding: 0 60upx;
    padding-top: 18upx;
    .row{
      display: flex;
      justify-content: space-between;
      font-size: $font-30;
      line-height: 44upx;
    }
    .small{
      font-size: $font-24;
      color: $word-color;
      line-height: 48upx;
    }
    .big{
      padding-bottom: 21upx;
      border-bottom: 1px solid $color-f5;
    }
    .really{
      margin-top: 23upx;
    }
    .contact{
      height: 90upx;
      text-align: center;
      font-size: $font-30;
      line-height: 90upx;
      color: $color-99;
      &>text{
        margin-left: 20upx;
        font-size: $font-42;
        color: $title-color;
      }
    }
  }
  .control{
    height: 99upx;
    line-height: 99upx;
    padding: 0 60upx;
    text-align: right;
    &>text{
      display: inline-block;
      height: 50upx;
      width: 140upx;
      text-align: center;
      border-radius: 25upx;
      margin-left: 36upx;
      font-size: $font-26;
      line-height: 50upx;
      border: 1px solid $word-color;
      color: $word-color;
    }
  }
  .iconfont{
    margin-right: 0;
  }
</style>
