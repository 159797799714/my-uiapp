<template>
  <view class="container">
    <view class="topBar">
      <view class="top">
        <text class="iconfont" @click="goBack">&#xe61c;</text>
        <view class="topNav">
          <text v-for="(item, index) in topList" :key="index" :class="{topSelected: index === topIndex}" @click="selectTop(index)">{{ item }}</text>
        </view>
      </view>
    </view>
    <view v-if="topIndex === 0" class="content">
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
      </scroll-view>
    </view>
    <view v-if="topIndex === 1" class="content">
      <view class="main">
        <uni-indexed-list :options="brand" :showSelect="false" @click="bindClick"></uni-indexed-list>
      </view>
    </view>
    <view v-if="topIndex === 2" class="content border-box">
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
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
  export default{
    components: {uniIndexedList},
    data() {
      return{
        topIndex: 0,                       // 顶部导航默认选中的
        topList: ['分类', '品牌', '精选专辑'],  // 顶部导航选项
        list: ['为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆', '为你推荐', '品牌墙', '美容彩妆'],  // 侧边菜单
        navData: 0,
        child: [{
          title: '常用分类',
          arr: ['基础护肤', '包包', '面膜', '平板电脑', '粉底液', '板鞋']
        }, {
          title: '热门分类',
          arr: ['美妆', '空调', '美妆', '空调', '美妆', '空调']
        }],                               // 主要内容
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#fff',
        swiperList: [{}, {}, {}],       // 轮播图
        brand:[{
          "letter": "A",
          "data": [{
              name:"澳门国际机场",
              imgUrl: 'FJEIG'
            }
          ]
        }, {
          "letter": "B",
          "data": [{
              name:"澳门国际机场",
              imgUrl: 'FJEIG'
            }, {
              name:"澳门国际机场",
              imgUrl: 'FJEIG'
            } 
          ]
        }, {
          "letter": "D",
          "data": [{
              name:"澳门国际机场",
              imgUrl: 'FJEIG'
            }
          ]
        }],                               // 品牌
        album: {
          imgUrl: '',
          arr: [{
              imgUrl: '',
              sum: 2095
            }, {
              imgUrl: '',
              sum: 2095
          }]
        }
      }
    },
    methods: {
      clickNav(index) {
        this.navData = index
      },
      selectTop(index) {
        this.topIndex = index
      },
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
        justify-content: space-between;
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
    }
  }
  uni-indexed-list{
    width: 100%;
  }
  .main{
    flex: 1;
    display: flex;
  }
  .culture{
    flex: 1;
    padding: 30upx;
    .swiper{
      width: 100%;
      height: 230upx;
      margin-bottom: 30upx;
      .swiper-item{
        width: 100%;
        height: 230upx;
        background: #ccc;
      }
    }
    .like{
      color: $word-color;
      .title{
        display: flex;
        justify-content: space-between;
        color: $title-color;
        line-height: 87upx;
        &>text{
          font-size: $font-28;
        }
        &>view{
          &>text{
            font-size: $font-26;
            margin-left: 19upx;
          }
        }
      }
      .span{
        margin-bottom: 30upx;
        .banner{
          height: 370upx;
          width: 100%;
          background: #ccc;
        }
        .num{
          line-height: 80upx;
          font-size: 24upx;
        }  
      }
    }
  }
</style>
