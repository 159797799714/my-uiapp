<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>我的订单</text>
      <text class="iconfont del">&#xe667;</text>
    </view>
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="scroll-tab">
      <view class="tabNav border-box">
        <view v-for="(item, index) in tabList" :key="index" :class="{tab: true, selected: item === selectData}" @click="selectTab(item)">{{ item }}</view>
      </view> 
    </scroll-view>
  	<scroll-view v-if="dataList" scroll-y="true" class="content padding-30 border-box">
      <view v-for="(item, index) in dataList" :key="index" class="item border-box bg-white">
        <view class="head">
          <view class="store">
            <view>
              <text class="iconfont">&#xe60b;</text>
            </view>{{ item.store }}
            <text class="iconfont jiantou">&#xe644;</text>
          </view>
          <view class="status">{{ item.status }}</view>
        </view>
        <view v-for="(li, num) in item.arr" :key="num" class="center" @click="goDetail(item)">
          <view class="img">
            <image src="../../static/img/mine/bg.png" mode=""></image>
          </view>
          <view class="info">
            <view class="title">{{ li.title }}</view>
            <view class="remark">{{ li.info }}</view>
          </view>
        </view>
        <view class="sum">
          <view class="num">共计： <text>{{ item.arr.length }}件</text></view>
          <view class="money">实付金额：<text>{{ item.price }}元</text></view>
        </view>
        <view class="control">
          <text>删除订单</text>
        </view>
      </view>
    </scroll-view>
    <!-- 页面数据为空时 -->
    <view v-if="!dataList" class="nothing">
      <view class="img">
        <image src="../../static/img/order/null.png" mode=""/>
      </view>
      <view class="big-info">暂无订单</view>
      <view class="small-info">“快去商城看看有没有你喜欢的优物吧～”</view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        selectData: '全部',
        dataType: '',
        tabList: ['全部', '待付款', '待收货', '待评价', '已完成', '已取消'],
        scrollLeft: 0,
        dataList: [{
          store: '苹果官方旗舰店',
          sum: '2',
          status: '已取消',
          price: 300,
          arr: [{
            imgUrl: '',
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低耳耳',
            info: '黑色 官方标配'
          }]
        }, {
          store: '香蕉官方旗舰店',
          sum: '2',
          status: '已完成',
          price: 200,
          arr: [{
            imgUrl: '',
            title: 'Sony/索尼 MDR-ZX310头戴式监听重低耳耳',
            info: '黑色 官方标配'
          }, {
            imgUrl: '',
            title: 'Sony/索尼 超级头盔',
            info: '黑色 官方标配'
          }]
        }]
        // dataList: ''        dataList初始值需要为空字符串
      }
    },
    watch: {
      // 监听选中的订单类别，改变位置
      selectData(val) {
        if (val === '已取消' || val === '已完成') {
          this.scrollLeft = 69
          return
        }
        if (val === '全部' || val === '待付款') {
          this.scrollLeft = 0
          return
        }
      }
    },
    onLoad(option) {
      this.selectData = option.name
      this.dataType = option.dataType
      console.log('分享文章详情页接受到的参数',option.datatype)
      this.getOrderInfo()
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      selectTab(item) {
        this.selectData = item
      },
      goDetail(item) {
        uni.navigateTo({
          url: 'orderDetail?item=' + JSON.stringify(item)
        })
      },
      
      // 获取订单数据
      getOrderInfo() {
        this.$http({
          url: this.$api.orderList,
          data: {
            dataType: this.dataType
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              
              console.log('成功了加载订单', res.data)
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '订单数据加载失败',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    display: flex;
    justify-content: space-between;
    font-size: $font-38;
    color: $color-white;
    .iconfont{
      font-size: $font-42;
      font-weight: 500;
    }
    .del{
      transform: rotate(45deg);
    }
  }
  .scroll-tab{
    padding: 10upx 10upx 18upx 0;
    width: calc(100% - 10upx);
    background: $title-color;
    overflow: hidden;
  }
  .tabNav{
    height: 70upx;
    width: calc(100% + 148upx);
    padding: 0 30upx;
    line-height: 70upx;
    .tab{
      display: inline-block;
      position: relative;
      width: 138upx;
      text-align: center;
      font-size: $font-28;
      line-height: 70upx;
      color: $color-white;
    }
    .selected{
      font-size: $font-34;
      font-weight: $font-bold;
      &:after{
        content: '';
        position: absolute;
        display: block;
        height: 4upx;
        width: 34upx;
        background: $color-red;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        border-radius: 2upx;
      }
    }
  }
  .content{
    // padding-bottom: 30upx;
    .item{
      margin-top: 30upx;
      padding: 30upx;
      min-height: 480upx;
      width: 100%;
      font-size: $font-28;
      .head{
        height: 44upx;
        margin-bottom: 40upx;
        line-height: 44upx;
        display: flex;
        justify-content: space-between;
        .store{
          color: $word-color;
          &>view{
            display: inline-block;
            margin-right: 8upx;
            height: 44upx;
            width: 44upx;
            text-align: center;
            border-radius: 100%;
            background: $color-red;
            color: $color-white;
          }
          .jiantou{
            margin-left: 35upx;
          }
        }
        .status{
          color: $title-color;
        }
      }
      .center{
        height: 180upx;
        display: flex;
        margin-bottom: 40upx;
        .img{
          height: 180upx;
          width: 180upx;
          margin-right: 30upx;
          &>image{
            height: 100%;
            width: 100%;
          }
        }
        .info{
          flex: 1;
          .title{
            width: 100%;
            margin-top: -6upx;
            margin-bottom: 30upx;
            line-height: 40upx;
            white-space: wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break:break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .remark{
            display: inline-block;
            height: 40upx;
            padding: 0 15upx;
            line-height: 40upx;
            border-radius: 20upx;
            font-size: $font-22;
            color: $color-99;
            background: $color-f5;
          }
        }
      }
      .sum{
        margin-top: 10upx;
        margin-bottom: 30upx;
        display: flex;
        justify-content: space-between;
        height: 27upx;
        line-height: 27upx;
        color: $color-99;
        &>view{
          &>text{
            color: $title-color;
          }
        }
      }
      .control{
        height: 50upx;
        margin-bottom: 10upx;
        line-height: 50upx;
        font-size: $font-24;
        color: $color-99;
        text-align: right;
        &>text{
          height: 50upx;
          display: inline-block;
          padding: 0 23upx;
          border-radius: 25upx;
          border: 1px solid $color-99;
        }
      }
    }
  }
  .nothing{
    margin: 162upx auto 0;
    text-align: center;
    .img{
      margin: auto;
      width: 300upx;
      height: 226upx;
      &>image{
        height: 100%;
        width: 100%;
      }
    }
    .big-info{
      margin-top: 86upx;
      margin-bottom: 19upx;
      text-align: center;
      font-size: $font-30;
      line-height: 30upx;
      font-weight: $font-bold;
      color: $word-color;
    }
    .small-info{
      font-size: $font-26;
      color: $color-99;
    }
  }
  .iconfont{
    margin-right: 0;
  }
</style>
