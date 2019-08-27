<template>
  <view class="container bg-black">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px'}">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>我的订单</text>
      <text class="iconfont">&#xe667;</text>
    </view>
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="scroll-tab">
      <view class="tabNav border-box col-99">
        <view v-for="(item, index) in tabList" :key="index" :class="{tab: true, selected: item.name === selectData}" @click="selectTab(item)">{{ item.name }}</view>
      </view> 
    </scroll-view>
  	<scroll-view v-if="dataList.length > 0" scroll-y="true" class="content border-box bg-33">
      <view v-for="(item, index) in dataList" :key="index" class="item padding-30 border-box bg-black">
        <view class="head">
          <view class="store">
            <view class="icon">
              <text class="iconfont">&#xe60b;</text>
            </view>优逸smilehome
            <text class="iconfont jiantou">&#xe644;</text>
          </view>
          <view class="status col-93f">{{ item.state_text }}</view>
        </view>
        <view v-for="(li, num) in item.goods" :key="num" class="center">
           <!-- @click="goDetail(item)" -->
          <view class="img">
            <image :src="li.image.file_path" mode=""></image>
          </view>
          <view class="info dis-flex flex-dir-column flex-x-between">
            <view>
              <view class="title col-99 dis-flex flex-x-between">
                <text class="name">{{ li.goods_name }}</text>
                <text>￥{{ li.total_pay_price * 100 / 100 }}元</text>
              </view>
              <view>
                <text v-if="li.goods_attr" class="remark bg-99 col-13">{{ li.goods_attr }}</text>
              </view>  
            </view>
            <view v-if="num === item.goods.length - 1" class="sum dis-flex flex-x-end">
              <view class="num col-99">共计:<text>{{ item.goods.length }}件</text></view>
              <view class="money col-99">合计￥<text>{{ item.total_price * 100 / 100 }}元</text></view>
            </view>
          </view>
        </view>
        <!-- <view class="sum">
          <view class="num col-99">共计： <text>{{ item.goods.length }}件</text></view>
          <view class="money col-99">实付金额：<text>{{ item.total_price }}元</text></view>
        </view> -->
        <!-- <view class="control">
          <text>删除订单</text>
        </view> -->
        <view v-if="item.order_status.value !== 20" class="control">
          <text v-if="item.pay_status.value === 10" class="border-93f" @click="cancelOrder(item.order_id)">取消订单</text>
          <text v-if="item.order_status.value !== 21 && item.pay_status.value === 20 && item.delivery_status.value === 10" class="border-93f" @click="cancelOrder(item.order_id)">申请取消</text>
          <text v-if="item.order_status.value === 21" class="border-93f">取消申请中</text>
          <text v-if="item.pay_status.value === 10" class="border-f3f col-f3f">立即付款</text>
          
          <!-- <text v-if="item.state_text !== '待付款'" class="border-93f">删除订单</text> -->
          <text v-if="item.delivery_status.value === 20 && item.receipt_status.value === 10" class="border-93f">查看物流</text>
          
          <text v-if="item.order_status.value === 30 && item.is_comment === 0" class="border-f3f col-f3f">评价</text>
          <text v-if="item.delivery_status.value === 20 && item.receipt_status.value === 10" class="border-f3f col-f3f">确认收货</text>
        </view>
      </view>
    </scroll-view>
    <!-- 页面数据为空时 -->
    <view v-if="dataList.length < 1" class="nothing">
      <view class="img">
        <image src="../../static/img/order/null.png" mode=""/>
      </view>
      <view class="big-info">暂无订单</view>
      <view class="small-info" @click="goMarket">“快去商城看看有没有你喜欢的优物吧～”</view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        selectData: '全部',
        dataType: '',
        tabList: [{
            name: '全部',
            dataType: 'all'
          }, {
            name: '待付款',
            dataType: 'payment'
          },{
            name: '待发货',
            dataType: 'delivery'
          }, {
            name: '待收货',
            dataType: 'received'
          }, {
            name: '待评价',
            dataType: 'comment'
          }
        ],
        scrollLeft: 0,
        // dataList: [{
        //   store: '苹果官方旗舰店',
        //   sum: '2',
        //   status: '已取消',
        //   price: 300,
        //   arr: [{
        //     imgUrl: '',
        //     title: 'Sony/索尼 MDR-ZX310头戴式监听重低耳耳',
        //     info: '黑色 官方标配'
        //   }]
        // }, {
        //   store: '香蕉官方旗舰店',
        //   sum: '2',
        //   status: '已完成',
        //   price: 200,
        //   arr: [{
        //     imgUrl: '',
        //     title: 'Sony/索尼 MDR-ZX310头戴式监听重低耳耳',
        //     info: '黑色 官方标配'
        //   }, {
        //     imgUrl: '',
        //     title: 'Sony/索尼 超级头盔',
        //     info: '黑色 官方标配'
        //   }]
        // }]
        dataList: []
      }
    },
    watch: {
      // 监听选中的订单类别，改变位置
      // selectData(val) {
      //   if (val === '已取消' || val === '已完成') {
      //     this.scrollLeft = 69
      //     return
      //   }
      //   if (val === '全部' || val === '待付款') {
      //     this.scrollLeft = 0
      //     return
      //   }
      // }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad(option) {
      this.selectData = option.name
      this.dataType = option.dataType
      console.log('分享文章详情页接受到的参数',this.selectData, this.dataType)
      this.getOrderInfo()
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 选择订单分类
      selectTab(item) {
        this.selectData = item.name
        this.dataType = item.dataType
        this.getOrderInfo()
      },
      goDetail(item) {
        uni.navigateTo({
          url: 'orderDetail?item=' + JSON.stringify(item)
        })
      },
      // 去商城
      goMarket() {
        uni.switchTab({
          url: '../market/market'
        })
      },
      // 获取订单数据
      getOrderInfo() {
        let that = this
        that.$http({
          url: that.$api.orderList,
          data: {
            dataType: that.dataType
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log('成功了加载订单', res.data.list.data)
              that.dataList = res.data.list.data
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
      },
      cancelOrder(orderId) {
        let that = this
        uni.showModal({
          title: '温馨提示',
          content: '确定取消此订单？',
          success: function (res) {
            if (res.confirm) {
              that.$http({
                url: that.$api.cancelOrder,
                data: {
                  order_id: orderId
                },
                method: 'POST',
                cb: (err, res) => {
                  if(!err && res.code === 1) {
                    uni.showToast({
                      title: '订单取消成功',
                      icon: 'none'
                    })
                    
                    // 重新获取数据
                    that.getOrderInfo()
                    
                  } else if(res.code === 0) {
                    uni.showToast({
                      title: res.msg,
                      icon: 'none'
                    })
                  } else {
                    uni.showToast({
                      title: '订单取消失败',
                      icon: 'none'
                    })
                  }
                }
              })
            } else if (res.cancel) {
              return
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
    border-bottom: 2px solid $color-33;
  }
  .tabNav{
    height: 70upx;
    width: calc(100% + 10upx);
    padding: 0 30upx;
    margin-bottom: 20upx;
    line-height: 70upx;
    .tab{
      display: inline-block;
      position: relative;
      width: 138upx;
      text-align: center;
      font-size: $font-28;
      line-height: 70upx;
    }
    .selected{
      font-size: $font-34;
      color: $color-white;
      &:after{
        content: '';
        position: absolute;
        display: block;
        height: 4upx;
        width: 65upx;
        background: $color-purple;
        left: 50%;
        bottom: 4upx;
        transform: translateX(-50%);
        border-radius: 2upx;
      }
    }
  }
  .content{
    // padding-bottom: 30upx;
    .item{
      margin-bottom: 30upx;
      padding: 30upx;
      min-height: 430upx;
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
            background: $color-purple;
            color: $color-white;
          }
          .jiantou{
            margin-left: 35upx;
          }
        }
        .icon{
          margin-right: 20upx;
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
            margin-bottom: 10upx;
            .name{
              width: 270upx;
              line-height: 40upx;
              overflow: hidden;
              white-space: wrap;
              text-overflow: ellipsis;
              word-break:break-all;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .remark{
            display: inline-block;
            height: 40upx;
            padding: 0 15upx;
            line-height: 40upx;
            border-radius: 20upx;
            font-size: $font-22;
            background: $color-f5;
          }
        }
      }
      .sum{
        height: 27upx;
        line-height: 27upx;
        .money{
          margin-left: 10upx;
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
          margin-left: 36upx;
          border-radius: 25upx;
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
