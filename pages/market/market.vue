<template>
  <view class="container">
    <view class="topBar" @click="pagetoTop" :style="{'padding-top': statusBarHeight + 'px' }">
      <view class="search" @click="goSearch">
        <text class="search-icon iconfont">&#xe667;</text>
        <view class="searchVal">{{ searchInfo }}</view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="content-box bg-black" :scroll-top="scrollTop">
      <view class="banner-swiper">
        <view class="banner-box border-box">
          <banner :swiperList="swiperList"></banner>
        </view>
      </view>
      <view class="main">
        <view class="menuList">
          <view v-for="(item, index) in menuList" :key="index" class="item" @click="goGoods(item.category_id, item.name)">
            <image :src="item.icon" mode="aspectFit"></image>
            <view v-if="index !== 7" class="item-title font-A3">{{ item.name }}</view>
          </view>
        </view>
        
        <!-- 拼团,秒杀购，限时购，0元购等活动入口 -->
        <view class="discount dis-flex flex-x-around">
          <view v-for="(item, index) in discount" :key="index" class="pintuan dis-flex flex-dir-column bg-black" @click="goPintuan(item.name)">
            <view class="pintuan-text dis-flex">
              <image :src="item.imgUrl"></image>
              <text v-if="item.time && index !== 2 && index !== 3 && item.time !== '00:00:00'" class="time font-22 col-f bg-93f">{{ item.time }}</text>
            </view>
            <view v-if="item.info" class="pintuan-info font-28 col-f3c">{{ item.info }}</view>
            <view v-if="!item.info && item.min_price" class="price dis-flex font-28 col-f3c">
              ￥<text class="min-price">{{index === 3 ? '0': item.min_price }}</text>
              <!-- <text class="max-price font-24 font-99 t-dec-line">￥{{ item.max_price }}</text> -->
            </view>
            <view class="pintuan-icon pintuan-icon-one">
              <image mode="aspectFit" v-if="item.img" :src="item.img"/>
              
              <!-- 无相关活动 -->
              <view v-if="!item.time" class="nothing border-box">
                <image mode="aspectFit" src="../../static/img/no_content.png"></image>
                <view class="nothing-info font-28 col-cc">亲, 没有相关活动</view>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 为您推荐 -->
        <view class="recommend">
          <view class="recommend-title">
            <image src="../../static/img/market/foryou.png" mode="widthFix"></image>
          </view>
          <view class="recommend-content">
            <view v-for="(item, index) in recommendList" :key="index" class="recommend-item bg-black" @click="goDetail(item)">
              <image :src="item.image[0].file_path" mode=""></image>
              <view class="goods-info padding-15-35 col-cc">{{ item.goods_name }}</view>
              <view class="price font-purple padding-15-35">
                粉丝价￥<text class="bigNewPrice">{{ item.goods_min_price }}</text>
              </view>
              <view class="old-price padding-15-35 col-99">
                <text class="t-dec-line">￥{{ item.goods_max_price * 100 / 100 }}</text>
                <text class="integral font-16">积分:122</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import banner from "../components/banner.vue";
  import { countDown } from "../../common/util.js";
  export default {
    components: {
      banner
    },
    data() {
      return {
        searchInfo: '大家都在搜“森海塞尔”',
        scrollTop: 0,
        swiperList: [],
        menuList: [], // 所有商品分类列表
        discount: [{
          imgUrl: '../../static/img/market/xianshigou-text.png',
          name: '限时购',
          time: '',
          min_price: '',
          max_price: '',
          info: '',
          img: ''
        }, {
          imgUrl: '../../static/img/market/miaoshagou-text.png',
          name: '秒杀购',
          time: '',
          min_price: '',
          max_price: '',
          img: ''
        }, {
          imgUrl: '../../static/img/market/pintuan-text.png',
          name: '拼团购',
          info: '',
          time: '',
          min_price: '',
          max_price: '',
          img: ''
        }, {
          imgUrl: '../../static/img/market/zero-text.png',
          name: '0元购',
          time: '',
          min_price: '',
          max_price: '',
          img: ''
        }],
        recommendList: []
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad() {
      // 轮播图
      this.getSwiperList()
      
      // 获取所有商品分类
      this.getGoodscategory()
      
      // 获取推荐商品列表
      this.getRecommendgoods()
    },
    onShow() {
      // 获取一个限时购商品
      this.getLimitGoods()
      // 零元购
      this.getZero()
      // 获取一个秒杀购商品
      this.getKillGoods()
    },
    methods: {
      
      pagetoTop() {
        console.log('点击了')
        this.scrollTop = 50
      },
      // 轮播图
      getSwiperList() {
        this.$http({
          url: this.$api.goods_gethomebanners,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log('首页轮播图数据', res.data)
              
              // 替换轮播图图片路径数据
              this.swiperList = res.data.list
            } else {
              uni.showToast({
              	title: '轮播图图片加载失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
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
        let that = this
        this.$http({
          url: this.$api.getflashsalegoodsbyone,
          cb: (err, res) => {
            if (!err && res.code === 1) {
              console.log('限时', res.data)
              if(res.data.goods) {
                let goods= res.data.goods
                that.discount[2].min_price= goods.sku[0].goods_price
                that.discount[2].max_price= goods.sku[0].line_price
                that.discount[2].img= goods.headimg.file_path
                that.discount[2].info= goods.homepage_activity_subtitle
                countDown(goods.category.activity_endtime, function(skilltime) {
                  that.discount[2].time = skilltime
                })
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
      // 商城页展示一个秒杀购商品
      getKillGoods() {
        let that = this
        that.$http({
          url: that.$api.getseckillgoodsbyone,
          cb: (err, res) => {
            if (!err && res.code === 1) {
              console.log('秒杀购', res.data)
              if(res.data.goods) {
                let goods= res.data.goods
                that.discount[1].min_price= goods.sku[0].goods_price
                that.discount[1].max_price= goods.sku[0].line_price
                that.discount[1].img= goods.headimg.file_path
                that.discount[1].info= goods.homepage_activity_subtitle
                countDown(goods.category.activity_endtime, function(skilltime) {
                  that.discount[1].time = skilltime
                })
              }
              if(res.data.sharing_goods) {
                let sharing = res.data.sharing_goods
                that.discount[0].img = sharing.image_url
                that.discount[0].info = sharing.sharing_home_subtitle
                countDown(sharing.sharing_homa_activity_time, function(time) {
                  that.discount[0].time = time
                })  
              }
            } else if (res.code === 0 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '秒杀购抢购商品加载失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
      // 零元购
      getZero() {
        let that = this
        this.$http({
          url: this.$api.getluckydrawgoodsbyone,
          cb: (err, res) => {
            if (!err && res.code === 1) {
              console.log('零元购', res.data)
              if(res.data.goods) {
                let goods= res.data.goods
                that.discount[3].min_price= goods.sku[0].goods_price
                that.discount[3].max_price= goods.sku[0].line_price
                that.discount[3].img= goods.headimg.file_path
                that.discount[3].info= goods.homepage_activity_subtitle
                countDown(goods.category.activity_endtime, function(skilltime) {
                  that.discount[3].time = skilltime
                })
              }
            } else if (res.code === 0 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '零元抽奖商品加载失败',
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
        console.log(item)
        uni.navigateTo({
          url: '../components/goodDetail?goods_id=' + item.goods_id
          // url: 'goodDetail' 
        })
      },
      // 抢购或者秒杀购,零元购，拼团等
      goPintuan(name) {
        switch(name) {
          case '拼团购':
            uni.showToast({
              title: '拼团暂未开放',
              icon: 'none'
            })
            break
          case '秒杀购':
            uni.navigateTo({
              url: 'panicBuy?origin=' + '秒杀购'
            })
            break
          case '限时购':
            uni.navigateTo({
              url: 'panicBuy?origin=' + '限时购'
            })
            break
          case '0元购':
            uni.showToast({
              title: '零元购暂未开放',
              icon: 'none'
            })
            break
            // uni.navigateTo({
            //   url: 'zerodraw'
            // })
            // break
        }
      },
      // 搜索页
      goSearch() {
        uni.navigateTo({
          url: '../components/search?type=1'
        })
      },
      // 商品分类
      goGoods(id, name) {
        if(name !== 'MORE') {
          uni.navigateTo({
            url: '../components/goods?id=' + id + '&name=' + name
          })
          return
        }
        uni.navigateTo({
          url: '../moreList/moreList'
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
  }
  .banner-box{
    width: 100%;
    height: 100%;
    
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
      padding-top: 4upx;
      flex-wrap:wrap;
      background: linear-gradient(to right,#00BFFF, #9933FF, #ff33cc);
    }
    /* 拼团 */
    .pintuan {
      margin-bottom: 6upx;
      padding: 15upx 0 0 26upx;
      width: 339upx;
      height: 240upx;
      box-sizing: border-box;
    }
    
    .pintuan-text {
      font-family: PangMenZhengDao;
    }
    
    .pintuan-text>image{
      width: 123upx;
      height: 31upx;
      margin-right: 26upx;
      background-color: #000000;
    }
    .pintuan-text .time {
      line-height: 30upx;
      height: 30upx;
      border-radius: 14upx;
      padding: 0 10upx;
      letter-spacing: 1upx;
    }
    .pintuan-info{
      line-height: 27upx;
      margin: 10upx 0;
      letter-spacing: 2upx;
    }
    .pintuan> .price{
      line-height: 27upx;
      margin: 10upx 0;
    }
    .price .min-price{
      min-width: 42upx;
      margin-right: 10upx;
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
      width: 100%;
    }
    .pintuan-icon .nothing{
      padding-top: 10upx;
      height: 100%;
      width: 100%;
      text-align: center;
    }
    .nothing image{
      height: 100upx;
      width: 130upx;
    }
    
    .pintuan-icon-one{
      text-align: center;
      margin-top: 0;
    }
    .pintuan-icon-one>image{
      height: 140upx;
    }

    .recommend {
      margin-bottom: 20upx;
      .recommend-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 130upx;
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
          width: 330upx;
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
            .integral{
              margin-left: 13upx;
            }
          }
          .price {
            font-size: $font-26;
            line-height: 38upx;
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
