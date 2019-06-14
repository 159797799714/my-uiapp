<template>
  <view class="container">
    <view v-if="isShowTop" class="topBar">
      <view class="search">
        <text class="iconfont back" @click="goBack">&#xe61c;</text>
        <view class="conduct">
          <text class="iconfont share" @click="goShare">&#xe60f;</text>
          <text class="iconfont" @click="keepAction">&#xe637;</text>
        </view>
      </view>
    </view>
    <scroll-view scroll-y="true" @scroll="scroll" class="content">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration" :circular="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view :class="{'swiper-item': true, 'bg_primary': true}"></view>
        </swiper-item>
      </swiper>
      <view v-if="showPanic" class="panic border-box">
        <view class="price">
          <text class="newPrice">￥199.00</text>
          <text class="oldPrice">￥700</text>
        </view>
        <view class="time-box">
          <view class="time-info">
            <text class="iconfont">&#xe6b9;</text>距开抢00:10:50.08
          </view>
          <view class="time">今天17:00开抢</view>
        </view>
      </view>
      <view class="head bg-white">
        <view class="title">{{ data.title }}</view>
        <view class="price font-red">￥{{ data.price }}</view>
        <view class="tags">
          <text v-for="(item, index) in data.textList" :key="index" class="tag">{{ item }}</text>
        </view>
      </view>
      <view class="sale-info row bg-white">
        <view class="row-name">促销信息</view>
        <view class="row-info">
          <text>满送</text>
          <text>满999元送4000毫安的充电宝满999元送4000毫安的充电宝...</text>
        </view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="row bg-white">
        <view class="row-name">选择颜色</view>
        <view class="row-info">已选：“黑色”“官方标配”</view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="row bg-white">
        <view class="row-name">商品规格</view>
        <view class="row-info">颜色 适用设备</view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="row bg-white">
        <view class="row-name">服务说明</view>
        <view class="row-info">7天无理由退货，7天保价</view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="user-comment bg-white">
        <view class="comment-head">
          <view>
            <text>用户评价</text> (3085)
          </view>
          <view class="font-red">
            <text>查看全部</text>
            <text class="iconfont">&#xe644;</text>
          </view>
        </view>
        <view class="comment-writer">
          <view class="writer-head">
            <view>
              <view>
                <image src="" mode=""></image>
                <text>炒饭</text>
              </view>
              <view class="font-99">
                <text>2018.10.13 13:11</text>
                <text>黑色；官方标配</text>
              </view>
              <view></view>
            </view>
            <text class="iconfont font-99">&#xe63a;</text>
          </view>
          <view class="writer-speak">很喜欢，音质不错，算是物超所值了。</view>
          <view class="writer-speak-img">
            <image src="" mode=""></image>
          </view>
        </view>
      </view>
      <view class="store bg-white">
        <image src="" mode=""></image>
        <view class="name">{{ store.name }}</view>
        <view class="btn">进店逛逛</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        indicatorDots: true,                  // 指示点显隐
        autoplay: true,                       // 自动轮播
        interval: 2000,                       // 自动轮播时间 
        duration: 500,                        // 轮播过渡时间
        indicatorActiveColor: '#fff',         // 轮播图指示点选中颜色
        swiperList:[{}, {}, {}],              // 轮播元素数组
        isShowTop: true,                      // 顶部
        data: {
          price: 1099,
          textList: ['包邮', '自营'],
          title: '',                             
        },                                     // 商品价格等
        store: {
          name: 'SONY官方自营店',
          imgUrl: ''   
        },                                      // 店名头像信息
        showPanic: false
      }
    },
    // 接受首页传递的参数
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option)
      this.data.title = option.info
      if(option.panic === 'true') {
        this.showPanic = true
        return
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
          })
      },
      goShare() {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 0,
          href: "http://uniapp.dcloud.io/",
          title: "uni-app分享",
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
          success: function (res) {
            console.log("success:" + JSON.stringify(res));
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
          }
        })
      },
      keepAction() {
        console.log('点击了收藏')
      },
      scroll(e) {
        if (e.detail.scrollTop > 260) {
          this.isShowTop = false
          return
        }
        if (e.detail.scrollTop <= 260) {
          this.isShowTop = true
          return
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .topBar{
    background: rgba(255, 255, 255, 0.01);
    position: absolute;
    top: 0;
    left: 0;
  }
  .search{
    display: flex;
    width: 100%;
    line-height: 100%;
    font-size: $font-40;
    color: $title-color;
    justify-content: space-between;
    .conduct{
      .share{
        margin-right: 55upx;
      }
    }
    .iconfont{
      color:$title-color;
      font-size: 40upx;
    }
    .back{
      font-weight: $font-bold;
    }
  }
  .swiper{
    height: 750upx;
    .swiper-item{
      height: 750upx;
      width: 750upx;
    }  
  }
  .panic{
    height: 130upx;
    padding: 35upx 20upx 0;
    display: flex;
    color: $color-white;
    justify-content: space-between;
    background: $color-yellow;
    .price{
      .newPrice{
        margin-right: 20upx;
        font-size: $font-56;
        line-height: 56upx;
        font-weight: $font-bold;
      }
      .oldPrice{
        position: relative;
        font-size: $font-26;
        line-height: 26upx;
        width: 350upx;
        &:before{
          position: absolute;
          content: '';
          top: 50%;
          transform: translateY(-50%);
          height: 1upx;
          width: 100%;
          background: $color-white;
        }
      }
    }
    .time-box{
      height: 62upx;
      font-size: $font-22;
      text-align: center;
      padding-left: 30upx;
      box-sizing: border-box;
      border-left: 1px solid $color-white;
      .time-info{
        font-size: $font-20;
        line-height: 20upx;
        margin-bottom: 11upx;
        &>.iconfont{
          border-radius: 100%;
          background: $color-white;
          color: $color-yellow;
        }
      }
      .time{
        height: 30upx;
        line-height: 30upx;
        width: 220upx;
        background: rgba(225, 225, 225, 0.3);
        border-radius: 15upx;
        text-align: center;
      }
    }
  }
  .head{
    height: 234upx;
    padding: 30upx 44upx 20upx 32upx;
    box-sizing: border-box;
    .title{
      margin-bottom: 29upx;
      white-space: nowrap;
      overflow: hidden;
      word-break:break-all;
      text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 2;
      // -webkit-box-orient: vertical;
      font-size: $font-32;
      line-height: 32upx;
    }
    .price{
      margin-bottom: 35upx;
      font-size: $font-36;
      line-height: 36upx;
      font-weight: $font-bold;
    }
    .tags{
      display: flex;
      .tag{
        display: inline-block;
        height: 40upx;
        padding: 0 17upx;
        margin-right: 10upx;
        border-radius: 20upx;
        line-height: 40upx;
        font-size: $font-24;
        background:rgba(244,67,61,0.08);
        color: $color-red;
        &:nth-child(2n-1){
          background:rgba(244,160,61,0.08);
          color: $color-orange
        }
      }
    }
  }
  .row{
    height: 104upx;
    padding: 0 30upx;
    border-bottom: 1upx solid $color-f5;
    display: flex;
    align-items: center;
    .row-name{
      font-size: $font-28;
      color: $color-99;
      margin-right: 44upx;
    }
    .row-info{
      flex: 1;
      font-size: $font-26;
      padding-right: 70upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .sale-info{
    height: 114upx;
    margin: 20upx 0;
  }
  .user-comment{
    margin-top: 20upx;
    margin-bottom: 20upx;
    padding: 0 30upx;
    .comment-head{
      height: 94upx;
      font-size: $font-28;
      margin-bottom: 20upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1upx solid $color-f5;
      &>view>text{
        margin-right: 18upx;
      }
      .font-red>.iconfont{
        margin-left: 18upx;
      }
    }
    .comment-writer{
      height: 332upx;
      .writer-head{
        height: 78upx;
        margin-top: 30upx;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        &>view>view{
          font-size: $font-26;
          line-height: 44upx;
          margin-bottom: 13upx;
          display: flex;
          &>image{
            height: 44upx;
            width: 44upx;
            border-radius: 100%;
            margin-right: 16upx;
            background: #ccc;
          }
        }
        &>view{
          .font-99{
            font-size: $font-22;
            line-height: 21upx;
          }
        }
      }
      .writer-speak{
        font-size: $font-28;
        line-height: 50upx;
        margin-top: 7upx;
      }
      .writer-speak-img{
        height: 110upx;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        &>image{
          height: 110upx;
          width: 110upx;
          margin-right: 10upx;
          background: #ccc;
        }
      }
    }
  }
  .store{
    height: 150upx;
    padding: 0 30upx;
    display: flex;
    align-items: center;
    &>image{
      height: 100upx;
      width: 100upx;
      margin-right: 54upx;
      border-radius: 100%;
      background: #ccc;
    }
    .name{
      flex: 1;
      font-size: $font-32;
    }
    .btn{
      height: 50upx;
      width: 140upx;
      border: 1upx solid $title-color;
      text-align: center;
      font-size: $font-24;
      line-height: 50upx;
      border-radius: 25upx;
    }
  }
</style>
