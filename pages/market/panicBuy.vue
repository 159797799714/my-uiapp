<template>
  <view class="container">
    <view class="content">
      <view class="tabs bg-white">
        <view v-for="(item, index) in timeList" :key="index" :class="{'tab-item': true, selected: selectIndex === index}" @click="selectTime(item, index)">
          <text class="day">{{ item.day }}</text>
          <text class="hour">{{ item.hour }}</text>
          <text class="status">{{ item.status_text }}</text>
        </view>
      </view>
      <view class="main">
        <swiper class="swiper bg-white" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
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
      </view>
      <view class="item">
        <view class="goodImg"></view>
        <view class="goodInfo">
          <view class="goodName"></view>
          <view class="leaver"></view>
          <view><text>4.6折</text></view>
          <view class="price">
            <text class="newPrice"></text>
            <text class="oldPrice"></text>
            
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#ffffff',
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
        ],
        selectIndex: 2
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
</style>
