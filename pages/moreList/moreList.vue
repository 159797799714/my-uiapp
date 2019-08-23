<template>
  <view class="container">
    <view class="topBar col-f font-38" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont font-42" @click="goBack">&#xe61c;</text>
      <text class="title flex-box t-center">更多分类</text>
    </view>
    <view class="content">
      <scroll-view scroll-y="true" class="left-nav">
        <view v-for="(item, index) in list" :key="index" :class="{navLi: true, selectedLi: category_id === item.category_id}" @click="clickNav(item)">{{ item.name }}</view>
      </scroll-view>
      <scroll-view scroll-y="true" class="main bg-white border-box">
        <view v-for="(li, num) in itemList" :key="num" class="list-item flex-three" @click="goMoreGood(li.category_id)">
          <view class="item-img border-box t-center">
            <image :src="li.image.file_path" mode="widthFix"></image>
          </view>
          <view class="item-name font-26 t-center">{{ li.name }}</view>
        </view>
        
        <!-- <view class="banner"></view>
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
        </view> -->
      </scroll-view>
    </view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return{
        topIndex: 0,                                       // 顶部导航默认选中的
        topList: ['分类'],                                 // 顶部导航选项
        list: [],                                         // 侧边菜单
        category_id: '',                                  // 侧边栏选中分类ID
        itemList: [],                                     // 选中分类的子分类列表
        
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
        brand: 3,   // 品牌
        
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad() {
      // 获取分类列表
      this.getCategoryIndex()
    },
    methods: {
      // 获取分类列表
      getCategoryIndex() {
        let that= this
        that.$http({
          url: that.$api.categoryIndex,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.list= res.data.list
              that.category_id= res.data.list[0].category_id
              that.itemList= res.data.list[0].child
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '加载失败，请退出重试',
                icon: 'none'
              })
            }
          }
        })
      },
      goMoreGood(id) {
        uni.navigateTo({
          url: './moreGoods?category_id=' + id
        })
      },
      
      // 选择侧边栏
      clickNav(item) {
        this.category_id = item.category_id
        this.itemList = item.child
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
  .title{
    display: block;
    width: 100%;
    text-align: center;
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
        font-size: $font-30;
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
    .list-item{
      .item-img{
        padding: 13rpx 10rpx 4rpx 10rpx;
        overflow: hidden;
      }
      .item-img>image{
        height: 150upx;
        width: 100%;
      }
      .item-name{
        padding: 0 15rpx 30rpx 15rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
