<template>
  <view class="container">
    <scroll-view scroll-y="true" class="content bg-white">
      <view class="banner-swiper">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration" :circular="true">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view :class="{'swiper-item': true, 'bg_primary': true}"></view>
          </swiper-item>
        </swiper>
      </view>
      <view class="TabNav">
        <view v-for="(item, index) in tabList" :key="index" :class="{item: true, selected: index === selectIndex }" @click="selectTab(item, index)">{{ item }}</view>
      </view>
      <view v-for="(item, index) in cultureList" :key="index" class="culture bg-white" @click="goInfo(item)">
        <image src="" mode=""></image>
        <view class="item-words">
          <view class="title">{{ item.title }}</view>
          <view class="info">{{ item.info }}</view>
          <view class="control">
            <view class="look">
              <text class="search-icon iconfont">&#xe6cc;</text>
              <text>{{ item.looksum }}</text>
            </view>
            <view class="zan">
              <text class="search-icon iconfont">&#xe63a;</text>
              <text>{{ item.zansum }}</text>
            </view>
          </view>  
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import service from '../../service.js';
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#ffffff',
        searchInfo: '大家都在搜“森海塞尔”',
        swiperList: [{}, {}, {}],
        tabList: ['发现', '电音', '潮品', '美妆', '游戏'],
        selectIndex: 0,
        cultureList: [
          {
            imgUrl: '',
            title: '2019深圳啦啦啦',
            info: '邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队Knife Party等和GaretMcGrillen改组成的双人电子音乐制作团队Knife Party等......',
            looksum: 4000,
            zansum: 3000
          }, {
            imgUrl: '',
            title: '2019深圳奶油田电音节',
            info: '邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队Knife Party等和GaretMcGrillen改组成的双人电子音乐制作团队Knife Party等......',
            looksum: 4000,
            zansum: 3000
          }, {
            imgUrl: '',
            title: '2019深圳奶油田电音节',
            info: '邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队Knife Party等和GaretMcGrillen改组成的双人电子音乐制作团队Knife Party等......',
            looksum: 4000,
            zansum: 3000
          }
        ]
      }
    },
    methods: {
      // 选择分类
      selectTab(item, index) {
        this.selectIndex = index
        let view = uni.createSelectorQuery().select(".item")
        view.fields({
          size: true,
          scrollOffset: true
        }, data => {
          console.log("得到节点信息" + JSON.stringify(data))
        }).exec()
      }, 
      goInfo(item) {
        uni.navigateTo({
          url: 'shareInfo?title=' + item.title
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 20upx 30upx;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
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
      height: 390upx;
      margin-bottom: 50upx;
      box-sizing: border-box;
      .swiper {
        height: 390upx;
      }
      .swiper-item {
        height: 390upx;
        width: 100%;
      }
    }
    .TabNav{
      display: flex;
      position: relative;
      .item{
        flex: 1;
        font-size: $font-32;
        font-weight: $font-bold;
        line-height: 60upx;
        text-align: center;
      }
      .slipe-span{
        position: absolute;
        left: 0;
        top: 27upx;
        height: 6upx;
        width: 78upx;
        background: $slipe-bg;
      }
      .selected{
        font-size: $font-40;
        &::before{
          content: '——';
          color: $color-slipe-red;
          height: 6upx;
          position: absolute;
        }
      }
    }
    .culture{
      height: 630upx;
      width: 100%;
      margin-top: 30upx;
      background: $color-white;
      &>image{
        height: 388upx;
        width: 100%;
        background: #ccc;
      }
      .item-words{
        padding: 0 21upx;
        .title{
          line-height: 94upx;
          font-size: $font-36;
          font-weight: $font-bold;
        }
        .info{
          height: 62upx;
          width: 100%;
          white-space: wrap;
          overflow: hidden;
          word-break:break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: $font-24;
          color: $word-color;
        }  
      }
      .control{
        display: flex;
        justify-content: flex-end;
        font-size: $font-24;
        line-height: 86upx;
        color: $control-color;
        .look{
          height: 29upx;
        }
        .zan{
          height: 29upx;
          margin-left: 12upx;
        }
      }
    }
  }
</style>
