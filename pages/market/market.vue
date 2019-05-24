<template>
  <view class="container">
    <scroll-view scroll-y="true" class="content">
      <view class="search">
        <text class="search-icon iconfont">&#xe667;</text>
        <view class="searchVal">{{ searchInfo }}</view>
      </view>
      <view class="banner-swiper">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view :class="{'swiper-item': true, 'bg_primary': true}"></view>
          </swiper-item>
        </swiper>
      </view>
      <view class="menuList">
        <view v-for="(item, index) in menuList" :key="index" class="item">
          <image :src="item.imgUrl" mode="aspectFit"></image>
          <view class="item-title">{{ item.title }}</view>
        </view>
        <view class="item">
          <image src="../../static/img/market/more.png" mode="aspectFit" class="moreImg"></image>
        </view>
      </view>
      <view class="lightning" @click="goPanicBuy(1)">
        <view class="leftbox">
          <view class="leftbox-one">
            <image src="../../static/img/market/lightning.png" mode="aspectFit"></image>
            <text class="one-title">{{ lightning.title }}</text>
            <text class="one-time">距开场 {{ lightning.time }}</text>
          </view>
          <view class="price">
            <text class="new-price">￥{{ lightning.newPrice }}</text>
            <text class="old-price">￥{{ lightning.oldPrice }}</text>
          </view>
        </view>
        <view class="right-img">
          <image src="" mode=""></image>
        </view>
      </view>
      <view class="lightning limit" @click="goPanicBuy(2)">
        <view class="leftbox">
          <view class="leftbox-one">
            <image src="../../static/img/market/limit.png" mode="aspectFit"></image>
            <text class="one-title">{{ lightning.title }}</text>
            <text class="one-time">距开场 {{ lightning.time }}</text>
          </view>
          <view class="price">
            <text class="new-price">￥{{ lightning.newPrice }}</text>
            <text class="old-price">￥{{ lightning.oldPrice }}</text>
          </view>
        </view>
        <view class="right-img">
          <image src="" mode=""></image>
        </view>
      </view>
      <view class="recommend">
        <view class="recommend-title">为你推荐</view>
        <view class="recommend-content">
          <view v-for="(item, index) in recommendList" :key="index" class="recommend-item" @tap="goDetail(item)">
            <image src="" mode=""></image>
            <view class="goods-info">{{ item.info }}</view>
            <view class="goods-price">
              <text class="price">￥{{ item.price }}</text>
              <text>...</text>
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
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#fff',
        searchInfo: '大家都在搜“森海塞尔”',
        swiperList: [{}, {}, {}],
        menuList: [
          {
            imgUrl: '../../static/img/market/movie.png',
            title: '影音'
          }, {
            imgUrl: '../../static/img/market/child.png',
            title: '衍生'
          }, {
            imgUrl: '../../static/img/market/play.png',
            title: '玩物'
          }, {
            imgUrl: '../../static/img/market/popular.png',
            title: '潮品'
          }, {
            imgUrl: '../../static/img/market/makeup.png',
            title: '美妆'
          }, {
            imgUrl: '../../static/img/market/game.png',
            title: '游戏'
          }, {
            imgUrl: '../../static/img/market/life.png',
            title: '生活'
          }
        ],
        lightning: {
          title: '秒杀购',
          time: '02:00:00',
          newPrice: 423,
          oldPrice: 1543
        },
        recommendList: [
          {
            imgUrl: '',
            info: '索尼MDR-XB550AP头戴式立体声免提通话耳机',
            price: 1612
          }, {
            imgUrl: '',
            info: '放假哦按拱结构感觉泛泛而谈哈哈',
            price: 1612
          }, {
            imgUrl: '',
            info: '结果符合退热贴通过提高人体',
            price: 1612
          }
        ]
      }
    },
    methods: {
      goDetail(item) {
        uni.navigateTo({
          url: 'goodDetail?info=' + item.info
        })
      },
      goPanicBuy(data) {
        switch(data) {
          case 1: {
            uni.navigateTo({
              url: 'panicBuy?origin=' + '秒杀'
            })
            break
          }
          case 2: {
            uni.navigateTo({
              url: 'panicBuy?origin=' + '限时购'
            })
            break
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg-lightning: #F9FAFD;
  .content {
    padding: 20upx 30upx;
    box-sizing: border-box;
    background: $color-white;
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80upx;
      margin-bottom: 30upx;
      text-align: center;
      border-bottom: 1px solid $title-color;
      .search-icon {
        height: 26upx;
        width: 26upx;
        margin-right: 22upx;
        font-size: $font-28;
      }
      .searchVal {
        line-height: 28upx;
        font-size: $font-28;
      }
    }
    .banner-swiper {
      height: 400upx;
      box-sizing: border-box;
      .swiper {
        height: 400upx;
      }
      .swiper-item {
        height: 400upx;
        width: 100%;
      }
    }
    .menuList{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 140upx;
        width: 100upx;
        margin-top: 36upx;
        margin-right: 94upx;
        &:nth-child(4n) {
          margin-right: 0;
        }
        &:nth-child(7n) {
          margin-right: 67upx;
        }
        &>image{
          height: 108upx;
          width: 100%;
        }
        .item-title{
          font-size: $font-26;
          text-align: center;
          font-size: $font-26;
          line-height: 40upx;
          line-height: 40upx;
        }
        .moreImg{
          height: 122upx;
          width: 122upx;
        }
      }
    }
    .lightning{
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      overflow: hidden;
      height: 180upx;
      padding: 20upx 22upx;
      box-sizing: border-box;
      background: $bg-lightning;
      margin-bottom: 10upx;
      margin-top: 40upx;
      .leftbox{
        height: 39upx;
        line-height: 39upx;
        .leftbox-one{
          display: flex;
          &>image{
            height: 39upx;
            width: 39upx;
            margin-right: 13upx;
          }
          .one-title{
            margin-right: 22upx;
            font-size: $font-46;
            font-weight: $font-bold;
          }
          .one-time{
            height: 36upx;
            width: 226upx;
            padding: 0 18upx;
            box-sizing: border-box;
            font-size: $font-22;
            line-height: 36upx;
            background: $color-black;
            color: $color-white;
            border-radius: 18upx;
          }
        }
        .price{
          height: 32upx;
          margin-top: 30upx;
          .new-price{
            margin-right: 20upx;
            font-size: $font-42;
            font-weight: $font-bold;
            color: $color-red;
          }
          .old-price{
            font-size: $font-30;
            color: $control-color;
            overflow: hidden;
            &::before{
              content: '———';
              text-align: center;
              color: $control-color;
              height: 2upx;
              position: absolute;
            }
          }
        }
      }
      .right-img{
        height: 100%;
        width: 150upx;
        background: #ccc;
        &>image{
          height: 100%;
          width: 150upx;
        }
      }
    }
    .limit{
      margin: 0;
    }
    .recommend{
      .recommend-title{
        font-size: $font-32;
        font-weight: $font-bold;
        text-align: center;
        line-height: 110upx;
      }
      .recommend-content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .recommend-item{
          height: 592upx;
          width: 329upx;
          margin-bottom: 25upx;
          &>image{
            height: 420upx;
            width: 330upx;
            margin-bottom: 27upx;
            background: $bg-lightning;
          }
          .goods-info{
            height: 69upx;
            font-size: $font-28;
            line-height: 30upx;
            white-space: wrap;
            overflow: hidden;
            word-break:break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-price{
            margin-top: 21upx;
            display: flex;
            justify-content: space-between;
            line-height: 54upx;
            font-size: $font-26;
          }
        }
      }
      
    }
  }
</style>
