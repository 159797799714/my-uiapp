<template>
  <view class="container">
    <view class="topBar">
      <view class="search" @click="goSearch">
        <text class="search-icon iconfont">&#xe667;</text>
        <view class="searchVal">{{ searchInfo }}</view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="content-box bg-black">
      <view class="banner-swiper">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true"
          :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view class="swiper-item">
              <image :src="item.imgUrl" mode=""></image>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="main">
        <view class="menuList">
          <view v-for="(item, index) in menuList" :key="index" class="item" @click="goGoods(item.category_id)">
            <image :src="item.icon" mode="aspectFit"></image>
            <view v-if="index !== 7" class="item-title font-A3">{{ item.name }}</view>
          </view>
        </view>
        <view class="group border-box bg-white">
          <view class="group-main border-box">
            <view class="bigTitle">
              <image src="../../static/img/market/pintuan-text.png" mode=""></image>
            </view>
            <view class="smallTitle">拼的越多，越优惠</view>
            <!-- <view class="leaveTime">距结束 <text>02:01:20</text></view> -->
          </view>
          <image src="../../static/img/market/pintuan-icon.png" mode="" />
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
            <view v-for="(item, index) in recommendList" :key="index" class="recommend-item bg-white" @click="goDetail(item)">
              <image :src="item.image[0].file_path" mode=""></image>
              <view class="goods-info padding-15-35">{{ item.goods_name }}</view>
              <view class="old-price padding-15-35">
                <text>￥{{ item.goods_max_price}}</text>
              </view>
              <view class="price font-purple padding-15-35">
                粉丝￥<text class="bigNewPrice">{{ item.goods_min_price }}</text>
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
        swiperList: [{
          imgUrl: "https://market.pd-unixe.com/uploads/20190625200421f6a525590.png",
          goods_id: 10255
        }],
        menuList: [], // 所有商品分类列表
        lightning: {
          title: '秒杀购',
          time: '02:00:00',
          newPrice: 423,
          oldPrice: 1543
        },
        recommendList: []
      }
    },
    onLoad() {
      // 获取所有商品分类
      this.getGoodscategory()
      
      // 获取推荐商品列表
      this.getRecommendgoods()
      
      // 获取一个限时购商品
      this.getLimitGoods()
      
      // 获取一个秒杀商品
      this.getKillGoods()
    },
    methods: {
      // 获取所有商品分类
      getGoodscategory() {
        this.$http({
          url: this.$api.goodscategory,
          cb: (err, res) => {
            if (!err && res.code === 1) {
              this.menuList = res.data.list
            } else if (res.code === 0 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '商品分类列表加载失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 商城页展示一个限时抢购商品
      getLimitGoods() {
        this.$http({
          url: this.$api.getflashsalegoodsbyone,
          cb: (err, res) => {
            console.log('限时购', res)
          }
        })
      },
      // 商城页展示一个秒杀商品
      getKillGoods() {
        this.$http({
          url: this.$api.getseckillgoodsbyone,
          cb: (err, res) => {
            console.log('秒杀购', res)
          }
        })
      },
      // 推荐商品列表
      getRecommendgoods() {
        this.$http({
          url: this.$api.recommendgoods,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              this.recommendList = res.data.list
            } else if(res.code === 0 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '推荐商品列表获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 去商品详情页
      goDetail(item) {
        uni.navigateTo({
          url: '../components/goodDetail?info=' + item.info
          // url: 'goodDetail' 
        })
      },
      // 抢购或者秒杀页
      goPanicBuy(data) {
        switch (data) {
          case 1:
            uni.navigateTo({
              url: 'panicBuy?origin=' + '秒杀'
            })
            break
          case 2:
            uni.navigateTo({
              url: 'panicBuy?origin=' + '限时购'
            })
            break
        }
      },
      // 搜索页
      goSearch() {
        uni.navigateTo({
          url: '../components/search?type=1'
        })
      },
      // 商品分类
      goGoods(id) {
        uni.navigateTo({
          url: '../components/goods?id=' + id
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
    overflow: hidden;
  }

  .content-box {
    position: absolute;
    top: 176upx;
    left: 0;
    height: 100%;
    overflow: hidden;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66upx;
    width: 100%;
    text-align: center;
    color: $control-color;
    background: rgba(248, 248, 248, 0.1);
    border-radius: 4upx;

    .search-icon {
      margin-right: 19upx;
      font-size: $font-28;
    }

    .searchVal {
      line-height: 28upx;
      font-size: $font-28;
    }
  }

  .banner-swiper {
    height: 438upx;
    box-sizing: border-box;
    padding: 38upx 30upx 0 30upx;

    .swiper {
      height: 400upx;
    }

    .swiper-item {
      height: 400upx;
      width: 100%;

      &>image {
        height: 100%;
        width: 100%;
      }
    }
  }

  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    padding: 0 30upx 20upx 30upx;
    display: block;
    box-sizing: border-box;

    .menuList {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-bottom: 25upx;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 164upx;
        width: 112upx;
        margin-top: 39upx;
        margin-right: 81upx;
        &>image {
          height: 112upx;
          width: 100%;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }

        &:nth-child(7n) {
          margin-right: 70upx;
        }
        &:nth-child(8n) {
          justify-content: flex-start;
          &>image{
            margin-top: 40upx;
            height: 59upx;
            width: 95upx;
          }
        }
        .item-title {
          font-size: $font-24;
          text-align: center;
          line-height: 58upx;
        }

        .moreImg {
          height: 53upx;
          width: 101upx;
        }
      }
    }

    .group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 180upx;
      width: 100%;
      padding: 0 40upx 0 26upx;

      .group-main {
        width: 399upx;
        display: flex;
        flex-direction: column;

        .bigTitle {
          height: 34upx;
          &>image {
            height: 34upx;
            width: 399upx;
          }
        }

        .smallTitle {
          margin: 12upx 0 16upx 0;
          height: 29upx;
          font-size: $font-28;
          line-height: 28upx;
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
      &>image{
        height: 149upx;
        width: 190upx;
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
      margin-bottom: 200upx;
      .recommend-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110upx;
        margin-top: 62upx;
        font-size: $font-32;
        font-weight: $font-bold;

        &>image {
          height: 48upx;
          width: 100%;
        }
      }

      .recommend-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .recommend-item {
          height: 524upx;
          width: 328upx;
          margin-bottom: 20upx;

          &>image {
            height: 330upx;
            width: 328upx;
            margin-bottom: 25upx;
          }
          .goods-info {
            height: 69upx;
            font-size: $font-24;
            line-height: 36upx;
            white-space: wrap;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .old-price {
            font-size: $font-26;
            color: $color-99;
            font-weight: normal;
            &>text{
              position: relative;
              &:before {
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
          .price {
            font-size: $font-26;
            font-weight: bold;
            line-height: 34upx;
            .bigNewPrice {
              font-size: $font-34;
            }
          }
          .padding-15-35{
            padding: 0 35upx 0 15upx;
          }
        }
      }

    }
  }
</style>
