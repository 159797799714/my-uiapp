<template>
  <view class="container">
    <scroll-view scroll-y="true">
      <view class="banner-swiper">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true"
          :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view :class="{'swiper-item': true, 'bg_primary': true}"></view>
          </swiper-item>
        </swiper>
      </view>
      <view class="main">
        <view class="menuList">
          <view v-for="(item, index) in menuList" :key="index" class="item" @click="goGoods(item.title)">
            <image :src="item.imgUrl" mode="aspectFit"></image>
            <view class="item-title">{{ item.title }}</view>
          </view>
          <view class="item">
            <image src="../../static/img/market/more.png" mode="aspectFit" class="moreImg" @click="goMore"></image>
          </view>
        </view>
        <view class="group border-box">
          <image src="../../static/img/market/bg.png" mode="" />
          <view class="group-main border-box">
            <view class="bigTitle">呼朋唤友来<text>拼团吧！</text></view>
            <view class="smallTitle">拼的越多，越优惠</view>
            <view class="leaveTime">距结束 <text>02:01:20</text></view>
          </view>
        </view>
        <view class="activity">
          <view class="lightning" @click="goPanicBuy(1)">
            <view class="activity-title">
              <text class="title">{{ lightning.title }}</text>
              <text class="time">{{ lightning.time }}</text>
            </view>
            <view class="price">
              <text class="new-price">￥{{ lightning.newPrice }}</text>
              <text class="old-price">￥{{ lightning.oldPrice }}</text>
            </view>
            <view class="img">
              <image src="" mode=""></image>
            </view>
          </view>
          <view class="lightning limit" @click="goPanicBuy(2)">
            <view class="activity-title">
              <text class="title">限时购</text>
              <text class="time">{{ lightning.time }}</text>
            </view>
            <view class="price">
              <text class="new-price">￥{{ lightning.newPrice }}</text>
              <text class="old-price">￥{{ lightning.oldPrice }}</text>
            </view>
            <view class="img">
              <image src="" mode=""></image>
            </view>
          </view>
        </view>
        <view class="recommend">
          <view class="recommend-title">
            <image src="../../static/img/market/foryou.png" mode=""></image>
          </view>
          <view class="recommend-content">
            <view v-for="(item, index) in recommendList" :key="index" class="recommend-item" @click="goDetail(item)">
              <image src="" mode=""></image>
              <view class="goods-info">{{ item.info }}</view>
              <view class="goods-price">
                <view class="price">￥{{ item.price }} <text v-if="item.oldPrice" class="old-price">￥{{ item.oldPrice }}</text></view>
                <text>...</text>
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
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#fff',
        searchInfo: '大家都在搜“森海塞尔”',
        swiperList: [{}, {}, {}],
        menuList: [{
          imgUrl: '../../static/img/market/movie.png',
          title: '影音'
        }, {
          imgUrl: '../../static/img/market/child.png',
          title: '衍生'
        }, {
          imgUrl: '../../static/img/market/play.png',
          title: '3C'
        }, {
          imgUrl: '../../static/img/market/popular.png',
          title: '潮品'
        }, {
          imgUrl: '../../static/img/market/makeup.png',
          title: '美妆'
        }, {
          imgUrl: '../../static/img/market/game.png',
          title: '玩物'

        }, {
          imgUrl: '../../static/img/market/life.png',
          title: '生活'
        }],
        lightning: {
          title: '秒杀购',
          time: '02:00:00',
          newPrice: 423,
          oldPrice: 1543
        },
        recommendList: [{
          imgUrl: '',
          info: '索尼MDR-XB550AP头戴式立体声免提通话耳机',
          price: 1612,
          oldPrice: 1700
        }, {
          imgUrl: '',
          info: '放假哦按拱结构感觉泛泛而谈哈哈',
          price: 1612
        }, {
          imgUrl: '',
          info: '结果符合退热贴通过提高人体',
          price: 1612
        }, {
          imgUrl: '',
          info: '结果符合退热贴通过提高人体',
          price: 1612
        }, {
          imgUrl: '',
          info: '放假哦按拱结构感觉泛泛而谈哈哈',
          price: 1612
        }, {
          imgUrl: '',
          info: '结果符合退热贴通过提高人体',
          price: 1612
        }, {
          imgUrl: '',
          info: '结果符合退热贴通过提高人体',
          price: 1612
        }]
      }
    },
    methods: {
      goDetail(item) {
        uni.navigateTo({
          url: '../components/goodDetail?info=' + item.info
          // url: 'goodDetail' 
        })
      },
      goPanicBuy(data) {
        switch (data) {
          case 1:
            {
              uni.navigateTo({
                url: 'panicBuy?origin=' + '秒杀'
              })
              break
            }
          case 2:
            {
              uni.navigateTo({
                url: 'panicBuy?origin=' + '限时购'
              })
              break
            }
        }
      },
      goGoods(item) {
        uni.navigateTo({
          url: '../components/goods?class=' + item
        })
      },
      // 点击更多
      goMore() {
        uni.navigateTo({
          url: "../moreList/moreList"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg-lightning: #F9FAFD;
  .container {
    overflow: auto;
  }
  .banner-swiper {
    height: 676upx;
    box-sizing: border-box;
    .swiper {
      height: 676upx;
    }
    .swiper-item {
      height: 676upx;
      width: 100%;
    }
  }
  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: #F5F5F5;
    flex-direction: column;
    padding: 20upx 30upx;
    display: block;
    box-sizing: border-box;
    background: $color-white;
    .menuList {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      color: $word-color;
      margin-bottom: 40upx;
      .item {
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
        &>image {
          height: 108upx;
          width: 100%;
        }
        .item-title {
          font-size: $font-26;
          text-align: center;
          font-size: $font-26;
          line-height: 40upx;
          line-height: 40upx;
        }
        .moreImg {
          height: 122upx;
          width: 122upx;
        }
      }
    }
    .group {
      position: relative;
      height: 180upx;
      width: 100%;
    
      &>image {
        height: 100%;
        width: 100%;
      }
    
      .group-main {
        padding: 35upx 20upx 20upx 40upx;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    
        .bigTitle {
          height: 31upx;
          font-size: $font-42;
          line-height: 31upx;
          font-family: PangMenZhengDao;
          font-weight: bold;
    
          &>text {
            color: $color-red;
          }
        }
    
        .smallTitle {
          height: 64upx;
          font-size: $font-28;
          line-height: 64upx;
          color: $word-color;
        }
    
        .leaveTime {
          width: 180upx;
          height: 36upx;
          line-height: 36upx;
          padding: 0 10upx;
          font-size: $font-20;
          border-radius: 18upx;
          background: $color-ee;
        }
      }
    }
    .activity {
      display: flex;
      height: 240upx;
      justify-content: space-between;
      margin-top: 10upx;
      .lightning {
        height: 100%;
        width: 340upx;
        padding: 25upx;
        box-sizing: border-box;
        background: $color-f4;
        .activity-title {
          display: flex;
          .title {
            margin-right: 14upx;
            font-size: $font-42;
            line-height: 31upx;
            font-weight: $font-bold;
          }
          .time {
            padding: 0 10upx;
            line-height: 41upx;
            font-size: $font-22;
            background: $color-black;
            color: $color-white;
            border-radius: 18upx;
          }
        }
        .price {
          height: 62upx;
          line-height: 62upx;
          .new-price {
            margin-right: 13upx;
            font-size: $font-28;
            font-weight: $font-bold;
            color: $color-red;
          }
          .old-price {
            font-size: $font-24;
            color: $control-color;
            overflow: hidden;
            position: relative;
            &::before {
              content: '';
              text-align: center;
              width: 100%;
              background: $control-color;
              height: 2upx;
              position: absolute;
              margin: 0 auto;
              top: 50%;
              bottom: 0;
              transform: translateY(-50%);
            }
          }
        }
        .img {
          height: 100upx;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          &>image {
            margin-right: 10upx;
            height: 100%;
            width: 100upx;
            background: #ccc;
          }
        }
      }
    }
    .recommend {
      .recommend-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110upx;
        margin-top: 62upx;
        font-size: $font-32;
        font-weight: $font-bold;

        &>image {
          height: 31upx;
          width: 230upx;
        }
      }

      .recommend-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .recommend-item {
          height: 592upx;
          width: 329upx;
          margin-bottom: 25upx;

          &>image {
            height: 420upx;
            width: 330upx;
            margin-bottom: 27upx;
            background: $bg-lightning;
          }

          .goods-info {
            height: 69upx;
            font-size: $font-28;
            line-height: 30upx;
            white-space: wrap;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .goods-price {
            margin-top: 21upx;
            display: flex;
            justify-content: space-between;
            line-height: 54upx;
            font-size: $font-34;
            font-weight: bold;
            .old-price{
              margin-left: 8upx;
              font-size: $font-26;
              color: $color-99;
              position: relative;
              font-weight: normal;
              &::before {
                content: '';
                text-align: center;
                width: 100%;
                background: $control-color;
                height: 2upx;
                position: absolute;
                margin: 0 auto;
                top: 50%;
                bottom: 0;
                transform: translateY(-50%);
              }
            }
          }
        }
      }

    }
  }
</style>
