<template>
  <view class="container">
    <view class="topBar">
      <view class="search" @click="goSearch">
        <text class="search-icon iconfont">&#xe667;</text>
        <view class="searchVal">{{ searchInfo }}</view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="content bg-black">
      <view class="banner-swiper bg-black">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration" :circular="true">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view class="swiper-item" @click="goDetail(item)">
              <image :src="item.image.file_path" mode=""></image>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="TabNav bg-black font-ff f-bold">
        <view v-for="(item, index) in tabList" :key="index" :class="{item: true, selected: index === selectIndex }" @click="selectTab(item, index)">{{ item.name }}</view>
      </view>
      <view v-if="cultureList.length > 0" v-for="(item, index) in cultureList" :key="index" class="culture bg-black">
        <image :src="item.image.file_path" mode="" @click="goInfo(item.article_id)"></image>
        <view class="item-words">
          <view v-if="item.article_title" class="title font-ff" @click="goInfo(item.article_id)">{{ item.article_title }}</view>
          <view v-if="item.subtitle" class="info font-A3" @click="goInfo(item.article_id)">{{ item.subtitle }}</view>
          <view class="control">
            <view class="look">
              <text>{{ item.show_views }}</text>
            </view>
            <view class="zan">
              <text :class="{'search-icon': true, iconfont: true, isZan: item.islike !== 'no'}" @click="zanAction(item, index)">&#xe63a;</text>
              <text>{{ item.like_count }}</text>
            </view>
          </view>  
        </view>
      </view>
      <view v-if="cultureList.length < 1" class="null dis-flex flex-dir-column  flex-y-center">
        <view class="iconfont font-88 col-f">&#xe698;</view>
        <view class="col-f font-32">亲，暂无相关文章哦！</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import service from '../../service.js';
  export default {
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 2000,
        indicatorActiveColor: '#ffffff',
        searchInfo: '大家都在搜“森海塞尔”',
        swiperList: [{
          imgUrl:"https://market.pd-unixe.com/uploads/201906111745582db721897.png"
        }, {
          imgUrl:"https://market.pd-unixe.com/uploads/2019061117455884a819697.jpg"
        }, {
          imgUrl:"https://market.pd-unixe.com/uploads/20190611174558d5c576479.png"
        }, {
          imgUrl:"https://market.pd-unixe.com/uploads/201906111745539eac11543.png"
        }],
        tabList: [],
        selectIndex: 0,
        cultureList: []
      }
    },
    watch: {
      selectIndex(val) {
        this.getDefault(this.tabList[val].category_id)
      }
    },
    onLoad() {
      this.getCategorylist()
      this.getDefault()
      this.getBanner()  
    },
    methods: {
      goDetail(item) {
        console.log(item.activity_link)
        let goods = item.activity_link.indexOf('goods_id=')
        let article = item.activity_link.indexOf('article_id=')
        if(goods !== -1) {
          uni.navigateTo({
            url: '../components/goodDetail?goods_id=' + item.activity_link.slice(9)
            // url: 'goodDetail' 
          })
        }
        if(article !== -1) {
          uni.navigateTo({
            url: '../components/shareInfo?article_id=' + item.activity_link.slice(11)
          })
        }
      },
      // 获取文章
      getDefault(id) {
        this.$http({
          url: this.$api.articlesbycategoryid,
          data: {
            'category_id': id? id: ''
          },
          cb: (err, res) => {
            if (!err && res.code === 1) {
              this.cultureList = res.data.list
              // if (res.data.list.length === 0) {
              //   uni.showToast({
              //   	title: '当前分类文章为空',
              //     icon: 'none'
              //   })
              // }
              return
            } else {
              uni.showToast({
              	title: '文章列表获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 获取文章分类
      getCategorylist() {
        this.$http({
          data: {
            'wxapp_id': 10001,
            token: 'b612f5e2a32d553fdaea8eeb06bc2744',  
          },
          url: this.$api.categorylist,
          cb: (err, res) => {
            if (!err && res.code === 1) { 
              this.tabList = res.data.categoryList
              return
            } else {
              uni.showToast({
              	title: '文章分类获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 点赞
      zanAction(item, index) {
        console.log(item.article_id, item.islike, index)
        let url = this.$api.unLike
        if(item.islike === 'no') {
          url = this.$api.like
        }
        this.$http({
          url: url,
          data: {
            article_id: item.article_id
          },
          cb: (err, res) => {
            if(!err && res) {
              switch(this.cultureList[index].islike) {
                case 'yes':
                  uni.showToast({
                    title: '取消点赞成功',
                    icon: 'none'
                  })
                  this.cultureList[index].islike = 'no'
                  this.cultureList[index].like_count -= 1
                  break
                case 'no':
                  uni.showToast({
                    title: '点赞成功',
                    icon: 'none'
                  })
                  this.cultureList[index].islike = 'yes'
                  this.cultureList[index].like_count += 1
                  break
              }
            } else {
              switch(this.cultureList[index].islike) {
                case 'yes':
                  uni.showToast({
                  	title: '取消点赞失败',
                    icon: 'none'
                  })
                  break
                case 'no':
                  uni.showToast({
                  	title: '点赞失败请重试',
                    icon: 'none'
                  })
                  break
              }
            }
          }
        })
      },
      // 首页轮播图图片
      getBanner() {
        this.$http({
          url: this.$api.index_gethomebanners,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log(res.data)
              
              // 替换轮播图图片路径数据
              this.swiperList = res.data.list
            } else {
              uni.showToast({
              	title: '轮播图图片加载失败',
                icon: 'none'
              })
            }
            // console.log(res.data.items[0].data[0].imgUrl)
          }
        })
      },
      // 选择分类
      selectTab(item, index) {
        this.selectIndex = index
      }, 
      // 文章详情页
      goInfo(item) {
        uni.navigateTo({
          url: '../components/shareInfo?article_id=' + item
        })
      },
      // 搜索页
      goSearch() {
        uni.navigateTo({
          url: '../components/search?type=0'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    background: $color-f5;
    color: $color-black;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66upx;
    width: 100%;
    text-align: center;
    color: $control-color;
    background: rgba(248,248,248,0.1);
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
  .content {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
    .banner-swiper {
      padding: 30upx 30upx 0 30upx;
      height: 390upx;
      .swiper {
        height: 390upx;
      }
      .swiper-item {
        height: 390upx;
        width: 100%;
        &>image{
          height: 100%;
          width: 100%;
        }
      }
    }
    .TabNav{
      padding: 0 30upx;
      padding-top: 50upx;
      display: flex;
      position: relative;
      .item{
        flex: 1;
        font-size: $font-32;
        line-height: 60upx;
        text-align: center;
        position: relative;
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
          content: '';
          display: block;
          height: 6upx;
          width: 78upx;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          background: $color-slipe-red;
          opacity: 0.8;
        }
      }
    }
    .culture{
      margin: 30upx 30upx 0 30upx;
      padding-bottom: 30upx;
      width: calc(100% - 60upx);
      &>image{
        margin-bottom: 15upx;
        height: 388upx;
        width: 100%;
      }
      .item-words{
        padding: 0 21upx;
        .title{
          padding: 0;
          margin-top: -6upx;
          margin-bottom: 17upx;
          max-height: 90upx;
          line-height: 48upx;
          font-size: $font-32;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .info{
          margin-top: -6upx;
          height: 62upx;
          width: 100%;
          white-space: wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break:break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: $font-24;
          line-height: 36upx;
          color: $word-color;
        }  
      }
      .control{
        display: flex;
        justify-content: flex-end;
        font-size: $font-24;
        line-height: 25upx;
        color: $control-color;
        .look{
          height: 29upx;
        }
        .zan{
          height: 29upx;
          margin-left: 12upx;
        }
        .isZan{
          position: relative;
          &::before{
            content: '';
            height: 11upx;
            width: 12upx;
            position: absolute;
            bottom: 6upx;
            left: 8upx;
            background: $color-red;
          }
        }
      }
    }
  }
</style>
