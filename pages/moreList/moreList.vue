<template>
  <view class="container">
    <!-- <view class="topBar">
      <view class="top">
        <text class="iconfont" @click="goBack">&#xe61c;</text>
        <view class="topNav">
          <text v-for="(item, index) in topList" :key="index" :class="{topSelected: index === topIndex}" @click="selectTop(index)">{{ item }}</text>
        </view>
      </view>
    </view> -->
    <view class="content">
      <scroll-view scroll-y="true" class="left-nav">
        <view v-for="(item, index) in list" :key="index" :class="{navLi: true, selectedLi: navData === index}" @click="clickNav(index)">{{ item }}</view>
      </scroll-view>
      <scroll-view scroll-y="true" class="main bg-white border-box">
        <view class="banner"></view>
        <view v-for="(data, index) in child" :key="index" class="item-box border-box">
          <view class="title">{{ data.title }}</view>
          <view class="flex-box">
            <view v-for="(li, index) in data.arr" :key="index" class="item">
              <view class="img">
                <image src="" mode=""></image>
              </view>
              <text>{{ li }}</text>
            </view>
          </view>
        </view>
        <view class="brand">
          <view class="title">品牌</view>
          <view v-for="(item, index) in brand" :key="index" class="brand-item">
            <view class="logo"></view>
            <view class="brand-name">阿迪达斯</view>
          </view>
          <view class="more">
            <text class="iconfont">&#xe792;</text>
          </view>
        </view>
        <view class="chosen">
          <view class="title">
            <text>精选专辑</text>
            <view>
              <text>换一换</text>
              <text class="iconfont">&#xe6a7;</text>
            </view>
          </view>
          <view v-for="(item, index) in brand" :key="index" class="span">
            <view class="span-img"></view>
            <view class="span-content">
              <view class="span-title">春秋搭配必备指南</view>
              <view class="span-info">
                <text>16件商品</text>
                <text class="iconfont">&#xe707;2.5W人购买</text>
              </view>
            </view>   
          </view>
          <view class="more">
            查看更多<text class="iconfont">&#xe604;</text>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 索引列表组件 -->
    <!-- <view v-if="topIndex === 1" class="content">
      <view class="main">
        <uni-indexed-list :options="brand" :showSelect="false" @click="bindClick"></uni-indexed-list>
      </view>
    </view> -->
    
    <!-- <view class="content border-box">
      <scroll-view scroll-y="true" class="culture">
         <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true"
           :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration">
           <swiper-item v-for="(item, index) in swiperList" :key="index">
             <view :class="{'swiper-item': true, 'bg_primary': true}"></view>
           </swiper-item>
         </swiper>
         <view class="like">
           <view class="title">
            <text>猜你喜欢</text>
            <view>
              <text>换一换</text>
              <text class="iconfont">&#xe6a7;</text>
            </view>
            </view>
            <view v-for="(item, index) in album.arr" :key="index" class="span">
              <view class="banner"></view>
              <view class="num">
                <text class="iconfont"></text>
                <text>{{ item.sum }}人购买</text>
              </view>   
            </view>
         </view>
      </scroll-view> -->
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return{
        topIndex: 0,                          // 顶部导航默认选中的
        topList: ['分类'],  // 顶部导航选项
        list: ['为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆'],  // 侧边菜单
        navData: 0,
        child: [{
          title: '常用分类',
          arr: ['基础护肤', '包包', '面膜', '平板电脑', '粉底液', '板鞋']
        }, {
          title: '热门分类',
          arr: ['美妆', '空调', '美妆', '空调', '美妆', '空调']
        }],                                  // 主要内容
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#fff',
        swiperList: [{}, {}, {}],           // 轮播图  
        album: {
          imgUrl: '',
          arr: [{
              imgUrl: '',
              sum: 2095
            }, {
              imgUrl: '',
              sum: 2095
          }]
        },
        brand: 3   // 品牌
      }
    },
    methods: {
      clickNav(index) {
        this.navData = index
      },
      // selectTop(index) {
      //   this.topIndex = index
      // },
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      bindClick(info) {
        console.log(info)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    .top{
      display: flex;
      width: 100%;
      font-size: $font-30;
      color: $color-white;
      line-height: 88upx;
      align-items: center;
      justify-content: space-between;
      .iconfont{
        font-size: $font-40;
      }
      .topNav{
        width: 540upx;
        padding: 0 13upx;
        color: $color-99;
        display: flex;
        justify-content: center;
      }
      .topSelected{
        color: $color-white;
        font-weight: bold;
      }
    }
  }
  .content{
    flex-direction: row;
    height: calc(100vh - 176upx);
    .left-nav{
      width: 180upx;
      .navLi{
        text-align: center;
        position: relative;
        height: 110upx;
        width: 100%;
        font-size: $font-26;
        line-height: 110upx;
      }
      .selectedLi{
        background: $color-white;
        font-weight: bold;
        color: $title-color;
        font-size: $font-28;
        &::before{
          content: '';
          height: 28upx;
          width: 8upx;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          background: $title-color;
        }
      }
    }
    .main{
      flex: 1;
      padding: 29upx 30upx 20upx 20upx;
      background: $color-white;
      .banner{
        height: 240upx;
        width: 100%;
        background: #ccc;
      }
      .item-box{
        height: 540upx;
        width: 520upx;
        margin-bottom: 40upx;
        padding: 20upx;
        font-size: $font-26;
        font-weight: bold;
        line-height: 25upx;
        .title{
          margin-bottom: 26upx;
          color: $word-color;
        }
        .flex-box{
          .item{
            text-align: center;
            margin-bottom: 40upx;
            .img{
              height: 150upx;
              width: 140upx;
              margin-bottom: 20upx;
              background: #ccc;
              &>image{
                height: 100%;
                width: 100%;
              }
            }
          }
        }
      }
      .title{
        display: flex;
        justify-content: space-between;
        color: $word-color;
        font-size: $font-28;
        line-height: 64upx;
        font-weight: $font-bold;
        &>text{
          font-size: $font-28;
        }
        &>view{
          font-weight: normal;
          &>text{
            font-size: $font-26;
            margin-left: 9upx;
          }
        }
      }
      .brand{
        padding: 20upx;
        margin-bottom: 30upx;
        box-shadow:0upx 4upx 25upx 3upx rgba(0, 0, 0, 0.03);
        .brand-item{
          display: flex;
          height: 100upx;
          width: 100%;
          padding: 15upx 0;
          border-bottom: 1px solid $color-f5;
          .logo{
            height: 100upx;
            width: 100upx;
            margin-right: 40upx;
            background: $color-f5;
            &>image{
              height: 100%;
              width: 100%;
            }
          }
          .brand-name{
            flex: 1;
            overflow: hidden;
            box-sizing: border-box;
            font-size: $font-28;
            color: $color-black;
            line-height: 100upx;
          }
        }
        .more{
          height: 120upx;
          width: 100%;
          text-align: center;
          line-height: 120upx;
          &>text{
            display: inline-block;
            height: 40upx;
            width: 40upx;
            color: $color-white;
            line-height: 40upx;
            border-radius: 100%;
            background: $color-ee;
          }
        }
      }
      .chosen{
        padding: 20upx;
        box-shadow:0upx 4upx 25upx 3upx rgba(0, 0, 0, 0.03);
        .span{
          display: flex;
          height: 100upx;
          width: 100%;
          padding: 15upx 0;
          line-height: 100upx;
          border-bottom: 1px solid $color-f5;
          .span-img{
            height: 100upx;
            width: 100upx;
            margin-right: 30upx;
            background: $color-f5;
          }
          .span-content{
            flex: 1;
            font-size: $font-28;
            .span-title{
              font-weight: $font-bold;
              color: $color-black;
              line-height: 58upx;
            }
            .span-info{
              line-height: 26upx;
              color: $word-color;
              &>text{
                margin-right: 28upx;
                font-size: $font-22;
              }
            }
          }
        }
        .more{
          height: 90upx;
          line-height: 90upx;
          text-align: center;
          font-size: $font-26;
          color: $color-99;
          &>text{
            color: $color-white;
            background: $color-ee;
          }
        }
      }
    }
  }
</style>
