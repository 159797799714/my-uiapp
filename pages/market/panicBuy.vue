<template>
  <view class="container">
    <view class="content">
      <view class="tabs">
        <view v-for="(item, index) in timeList" :key="index" :class="{'tab-item': true, selected: selectIndex === index}" @click="selectTime(item, index)">
          <text class="day">{{ item.day }}</text>
          <text class="hour">{{ item.hour }}</text>
          <text class="status">{{ item.status_text }}</text>
        </view>
      </view>
      <scroll-view scroll-y="true" class="main">
        <swiper class="swiper bg-white" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-active-color="indicatorActiveColor">
          <swiper-item>
            <view class="swiper-item bg_primary"></view>
          </swiper-item>
          <swiper-item>
            <view class="swiper-item bg_warning"></view>
          </swiper-item>
          <swiper-item>
            <view class="swiper-item bg_primary"></view>
          </swiper-item>
        </swiper>
        <view class="leave-time">{{ title === '秒杀'?'秒杀': '抢购' }}，距离下场开始时间 <text>45:15:11</text></view>
        <view v-for="(item, index) in goodList" :key="index" class="item bg-white">
          <view class="goodImg">
            <view v-if="item.code === 0" class="imgCover">
              <text>售完</text>
             </view>
            <image src="" mode=""></image>
          </view>
          <view class="goodInfo">
            <view class="goodName">{{ item.title }}</view>
            <view class="leaver">
              <text class="text">仅剩余{{ item.leaver_sum }}件</text>
              <view class="peogress-box">
                <progress :percent="item.percent" activeColor="#FF3C3E" stroke-width="15" backgroundColor="#FCD1D1" class="progress"/>
              </view>
            </view>
            <view class="discount">
              <text>{{ item.discount }}</text>
            </view>
            <view class="price">
              <text class="newPrice">￥{{ item.newPrice }}</text>
              <text class="oldPrice">￥{{ item.oldPrice }}</text>
              <text :class="{buy: true, 'bg-white': true, 'my-button': true, none: item.code === 0}">{{ item.code === 0 ? '已售完':'立即秒杀' }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',                         // 顶部标题
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#ffffff',   // 以上轮播图信息
        timeList: [
          { 
            id: 1,
            day: '05-01',
            hour: '20:00',
            status_text: '已开抢',
            status: 1
          }, {
            id: 2,
            day: '05-01',
            hour: '20:00',
            status_text: '已开抢',
            status: 1
          }, {
            id: 3,
            day: '05-01',
            hour: '20:00',
            status_text: '已开抢',
            status: 1
          }, {
            id: 4,
            day: '05-01',
            hour: '20:00',
            status_text: '即将开抢',
            status: 2
          }, {
            id: 5,
            day: '05-01',
            hour: '20:00',
            status_text: '即将开抢',
            status: 2
          }
        ],                              // 时间
        selectIndex: 2,                 // 选中的时间
        goodList: [
          {
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低音耳机Sony/索尼 MDR-ZX310头戴式监听重低音耳机',
            leaver_sum: 40,
            total: 100,
            discount: '4.6折',
            newPrice: 300,
            oldPrice: 4000,
            code: 1,
            percent: 40
          }, {
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低音耳机Sony/索尼 MDR-ZX310头戴式监听重低音耳机',
            leaver_sum: 0,
            total: 200,
            discount: '4.6折',
            newPrice: 300,
            oldPrice: 4000,
            code: 0,
            percent: 0
          }, {
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低音耳机Sony/索尼 MDR-ZX310头戴式监听重低音耳机',
            leaver_sum: 40,
            total: 100,
            discount: '4.6折',
            newPrice: 300,
            oldPrice: 4000,
            code: 1,
            percent: 40
          }, {
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低音耳机Sony/索尼 MDR-ZX310头戴式监听重低音耳机',
            leaver_sum: 40,
            total: 100,
            discount: '4.6折',
            newPrice: 300,
            oldPrice: 4000,
            code: 1,
            percent: 40
          }, {
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低音耳机Sony/索尼 MDR-ZX310头戴式监听重低音耳机',
            leaver_sum: 40,
            total: 100,
            discount: '4.6折',
            newPrice: 300,
            oldPrice: 4000,
            code: 1,
            percent: 40
          }
        ]
      }
    },
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option.origin)
      this.title = option.origin
      uni.setNavigationBarTitle({
        title: option.origin
      })
    },
    methods: {
      selectTime(item, index) {
        this.selectIndex = index
      }
    },
  }
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: column;
}
.tabs{
  height: 130upx;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  z-index: 2;
  .tab-item{
    height: 130upx;
    width: 150upx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-99;
    background: $title-color;
    .day{
      font-size: $font-24;
      line-height: 36upx;
    }
    .hour{
      font-size: $font-36;
      line-height: 45upx;
    }
    .status{
      font-size: $font-24;
      line-height: 23upx;
    }
  }
  .selected{
    background: $color-red;
    color: $color-white;
  }
}
.main{
  flex: 1;
  overflow: hidden;
  padding: 30upx;
  box-sizing: border-box;
  .swiper{
    height: 330upx;
    .swiper-item{
      height: 330upx;
    }
  }
  .leave-time{
    height: 62upx;
    line-height: 62upx;
    text-align: center;
    font-size: $font-24;
    color: $word-color;
    &>text{
      color: $title-color;
      margin-left: 10upx;
    }
  }
}
.item{
    display: flex;
    padding: 10upx;
    margin-bottom: 15upx;
    .goodImg{
      position: relative;
      height: 260upx;
      width: 260upx;
      margin-right: 11upx;
      background: #ccc;
      &>image{
        height: 100%;
        width: 100%;
      }
      .imgCover{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0, 0.3);
        text-align: center;
        &>text{
          display: block;
          height: 84upx;
          width: 84upx;
          margin: 0 auto;
          margin-top: 50%;
          transform: translateY(-50%);
          border-radius: 100%;
          font-size: 37upx;
          line-height: 84upx;
          color: $color-white;
          border: 1px solid $color-white;
          background: rgba(255,255,255, 0.3);
        }
      }
    }
    .goodInfo{
      flex: 1;
      .goodName{
        height: 75upx;
        font-size: $font-30;
        line-height: 40upx;
        white-space: wrap;
        overflow: hidden;
        word-break:break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .leaver{
        position: relative;
        margin: 30upx 0;
        // padding: 0 30upx;
        height: 30upx;
        font-size: $font-22;
        line-height: 30upx;
        color: $color-white;
        background: $color-pink;
        border-radius: 15upx;
        overflow: hidden;
        .progress{
          height: 30upx;
          border-radius: 15upx;
        }
        .text{
          position: absolute;
          top: 0;
          left: 30upx;
          border-radius: 15upx;
        }
      }
      .discount{
        display: flex;
        padding: 0 7upx;
        &>text{
          padding: 5upx 11upx;
          margin-bottom: 8upx;
          border: 1px solid $title-color;
          color: $title-color;
          font-size: $font-20;
          line-height: $font-20;
        }  
      }
      .price{
        height: 50upx;
        position: relative;
        display: flex;
        align-items: flex-end;
        .newPrice{
          margin-right: 14upx;
          font-size: $font-28;
          line-height: 36upx;
          color: $color-slipe-red;
          font-weight: $font-bold;
        }
        .oldPrice{
          font-size: $font-22;
          line-height: 36upx;
          color: $word-color;
          &::before{
            content: '———';
            text-align: center;
            color: $control-color;
            height: 2upx;
            position: absolute;
            margin: auto;
          }
        }
        .buy{
          display: inline-block;
          position: absolute;
          top: -2upx;
          right: 0;
          height: 48upx;
          width: 140upx;
          border: 1px solid $color-slipe-red;
          color: $color-slipe-red;
          font-size: $font-24;
          line-height: 48upx;
        }
        .none{
          border-color: $word-color;
          color: $word-color;
        }
      }
    }
  }
</style>
