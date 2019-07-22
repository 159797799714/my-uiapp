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
        
        <!-- 拼团,秒杀，限时购，0元购等活动入口 -->
        <view class="discount dis-flex flex-x-between">
          <view v-for="(item, index) in discount" :key="index" class="pintuan dis-flex flex-dir-column" @click="goPintuan(index)">
            <view class="pintuan-text dis-flex">
              <image :src="item.imgUrl"></image>
              <view v-if="index !== 0 && item.time" class="time font-22 col-f b-15">{{ item.time }}</view>
            </view>
            <view v-if="item.info" class="pintuan-info font-28 col-red">{{ index === 2 ? item.info + '折起': item.info }}</view>
            <view v-if="!item.info && item.min_price" class="price dis-flex font-28 col-red">
              ￥<text class="min-price">{{index === 3 ? '0': item.min_price  }}</text>
              <text class="max-price font-24 col-9 t-dec-line">￥{{ item.max_price }}</text>
            </view>
            <view class="pintuan-icon">
              <image mode="aspectFit" v-if="item.img.length > 0" :src="item.img[0]" />
              <image mode="aspectFit" v-if="item.img.length > 1"  :src="item.img[1]"/>
              
              <!-- 无相关活动 -->
              <view v-if="index !== 0 && !item.time" class="nothing">
                <image mode="aspectFit" src="../../static/img/no_content.png"></image>
                <view class="nothing-info font-28">亲, 没有相关活动</view>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 为您推荐 -->
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
        discount: [
        {
          imgUrl: '../../static/img/market/pintuan-text.png',
          name: '拼团购',
          info: '拼得越多，越优惠',
          img: ['../../static/img/market/pintuan-icon.png']
        }, {
          imgUrl: '../../static/img/market/miaoshagou-text.png',
          name: '秒杀购',
          time: '',
          min_price: '',
          max_price: '',
          img: []
        }, {
          imgUrl: '../../static/img/market/xianshigou-text.png',
          name: '限时购',
          time: '',
          info: '',
          img: []
        }, {
          imgUrl: '../../static/img/market/zero-text.png',
          name: '0元购',
          time: '',
          min_price: '',
          max_price: '',
          img: []
        }],
        recommendList: []
      }
    },
    onLoad() {
      // 获取所有商品分类
      this.getGoodscategory()
      
      // 获取推荐商品列表
      this.getRecommendgoods()
    },
    onShow() {
      // // 获取一个限时购商品
      // this.getLimitGoods()
      // 
      // // 获取一个秒杀商品
      // this.getKillGoods()
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
            if (!err && res.code === 1) {
              console.log('限时', res.data)
              if(res.data.goods) {
                this.lightning[0].oldPrice = res.data.goods.goods_max_price
                this.lightning[0].newPrice = res.data.goods.goods_min_price
                this.lightning[0].newPrice = res.data.goods.goods_min_price
                this.lightning[0].img[0] = res.data.goods.image[0].file_path
                this.lightning[0].img[1] = res.data.goods.image[1].file_path
              }
            } else if (res.code === 0 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '限时抢购商品加载失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 商城页展示一个秒杀商品
      getKillGoods() {
        this.$http({
          url: this.$api.getseckillgoodsbyone,
          cb: (err, res) => {
            if (!err && res.code === 1) {
              console.log('秒杀', res.data)
              if(res.data.goods) {
                this.lightning[1].oldPrice = res.data.goods.goods_max_price
                this.lightning[1].newPrice = res.data.goods.goods_min_price
                this.lightning[1].newPrice = res.data.goods.goods_min_price
                this.lightning[1].img[0] = res.data.goods.image[0].file_path
                this.lightning[1].img[1] = res.data.goods.image[1].file_path
                
                // this.lightning[0].time = res.data.goods.activity_endtime          时间待处理
              } else {
                this.lightning[1] = ''
              }
            } else if (res.code === 0 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '秒杀抢购商品加载失败',
                icon: 'none'
              })
            }
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
          case 0:
            uni.navigateTo({
              url: 'panicBuy?origin=' + '秒杀'
            })
            break
          case 1:
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
    .discount{
      display: flex;
      flex-wrap:wrap;
      margin-bottom:30upx;
  
    }
    /* 拼团 */
    .pintuan {
      width: 340upx;
      height: 240upx;
      background: rgba(249, 250, 252, 1);
      margin-bottom: 10upx;
      padding: 15upx 0 0 26upx;
      box-sizing: border-box;
    }
    
    .pintuan-text {
      font-family: PangMenZhengDao;
    }
    
    .pintuan-text>image{
      width: 123upx;
      height: 31upx;
      margin-right: 14upx;
    }
    .pintuan-text .time {
      line-height: 30upx;
      height: 30upx;
      border-radius: 14upx;
      padding: 0 10upx;
    }
    .pintuan-info{
      line-height: 27upx;
      margin-top: 11upx;
    }
    .pintuan> .price{
      line-height: 27upx;
      margin-top: 11upx;
    }
    .price .min-price{
      min-width: 42upx;
    }
    .pintuan-icon{
      flex: 1;
      padding-right: 30upx;
      margin-top: 10upx;
      box-sizing: border-box;
      overflow: hidden;
    }
    .pintuan-icon image {
      height: 123upx;
      width: 123upx;
      margin-right: 10upx;
    }
    .pintuan-icon .nothing{
      height: 100%;
      width: 100%;
      text-align: center;
    }
    .nothing image{
      height: 100upx;
      width: 130upx;
    }
    
    .pintuan-icon-one{
      text-align: right;
      margin-top: 0;
    }
    .pintuan-icon-one>image{
      height: 140upx;
    }

    .recommend {
      margin-bottom: 200upx;
      .recommend-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110upx;
        // margin-top: 62upx;
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
