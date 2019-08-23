<template>
	<view class="container bg-f5">
	<view class="main">
	  <!-- 顶部选项卡 -->
	  <view class="swiper-tab dis-flex flex-y-center flex-x-around font-28 bg-white">
	    <view v-for="(item, index) in tabList" :key="index" :class="{'swiper-tab-item': true, 'on' : tabDefault === index }" @click="selectTab(index)">
	      {{ item }}
	    </view>
	  </view>
    
      <!-- 快递配送：配送地址 -->
      <view v-if="tabDefault === 0" @click="selectAddress" class="flow-delivery bg-white">
        <view class="flow-delivery__detail dis-flex flex-y-center flex-x-between">
          <text class="iconfont iconlogo font-40">&#xe646;</text>
          <view class="detail-content flex-box">
            <view v-if="detail.address.address_id">
              <view class="detail-content__title dis-flex onelist-hidden">
                <text class="font-30">{{ detail.address.name }}</text>
                <text class="detail-content__title-phone font-28">{{ detail.address.phone }}</text>
              </view>
              <view class="detail-content__describe onelist-hidden">
                <text class="col-7">{{detail.address.region.province}} {{detail.address.region.city}} {{detail.address.region.region}} {{detail.address.detail}}</text>
              </view>
            </view>
            <view v-else>
              <view class="detail-content__describe dis-flex">
                <text class="col-6">请选择配送地址</text>
              </view>
            </view>
          </view>
          <text class="iconfont info font-40">&#xe644;</text>
        </view>
      </view>
      	
      <!-- 上门自提：自提门店 -->
      <view v-if="tabDefault === 1" @click="selectExtractPoint" class="flow-delivery bg-white">
        <view class="flow-delivery__detail dis-flex flex-y-center">
          <text class="iconfont iconlogo font-40">&#xe646;</text>
          <view class="detail-content flex-box">
            <view v-if="detail.extract_shop.shop_id">
              <view class="detail-content__title dis-flex">
                <text class="font-30">{{ detail.extract_shop.shop_name }}</text>
              </view>
              <view class="detail-content__describe">
                <text class="col-7">{{detail.extract_shop.region.province}} {{detail.extract_shop.region.city}} {{detail.extract_shop.region.region}} {{detail.extract_shop.address}}</text>
              </view>
            </view>
            <view v-else>
              <view class="detail-content__describe dis-flex">
                <text class="col-6">请选择自提点</text>
              </view>
            </view>
          </view>
          <text class="iconfont info font-40">&#xe644;</text>
        </view>
      </view>
      	
      <!-- 商品列表 -->
      <view class="m-top20 bg-white">
        <view class="checkout_list" v-for="(item, index) in detail.goods_list" :key="index" @click="goDetail(item)">
          <view class="dis-flex flow-shopList">
            <view class="flow-list-left">
              <image mode="scaleToFill" :src="item.image[0].file_path"></image>
            </view>
            <view class="flow-list-right dis-flex flex-dir-column">
              <view class="font-30 col-3 twolist-hidden">{{item.goods_name}}</view>
              <view class="font-26 col-7">{{item.goods_sku.goods_attr}}</view>
              <view class="flow-list-cont dis-flex flex-x-between flex-y-center">
                <text class="flow-cont font-30">￥{{item.goods_price}}</text>
                <text class="small font-26">×{{item.total_num}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="dis-flex flex-x-end font-28 padding-15 font-99">
          <text>共{{ detail.order_total_num }}件商品，合计：</text>
          <text class="flow-money col-m">￥{{ detail.order_total_price }}</text>
        </view>
      </view>
      	
      <!-- 买家留言 -->
      <view class="flow-all-money bg-white m-top20">
        <view class="ipt-wrapper dis-flex flow-all-list">
          <input v-model="remark" placeholder="选填：买家留言（50字以内）" maxlength="50"></input>
        </view>
      </view>
      	
      <!-- 商品金额 -->
      <view class="flow-all-money bg-white m-top20">
        <view class="dis-flex flex-x-between flow-all-list">
          <text class="flex-five">商品总金额：</text>
          <view class="flex-five t-r">
            <text class="col-m">￥{{ detail.order_total_price }}</text>
          </view>
        </view>
        <view class="dis-flex flex-x-between flow-all-list">
          <text class="flex-five">优惠券：</text>
          <view class="flex-five t-r">
            <view class="" catchtap="togglePopupCoupon">
              <view v-if="detail.coupon_list.length > 0">
                <text class="col-m" v-if="selectCoupon.couponId">-￥{{ detail.selectCoupon.reduced_price }}</text>
                <text class="col-m" v-else>有{{ detail.coupon_list.length }}张优惠券可用</text>
                <text class="iconfont icon-xiangyoujiantou user-orderJtou"></text>
              </view>
              <text v-else class="">无优惠券可用</text>
            </view>
          </view>
        </view>
      </view>
        <!-- 配送费用 -->
       <!-- <view v-if="{{ currentDelivery == deliverys.EXPRESS.value }}" class="dis-flex flow-all-list">
          <text class="flex-five">配送费用：</text>
          <view class="flex-five t-r">
            <view v-if="{{address.address_id}}">
              <text class="col-m" v-if="{{intra_region}}">+￥{{express_price}}</text>
              <text v-else>不在配送范围</text>
            </view>
            <view v-else>
              <text class="col-7">请先选择配送地址</text>
            </view>
          </view>
        </view>
      </view> -->
      	
    </view>
	  
	  <!-- 提交订单 -->
	  <view class="flow-fixed-footer dis-flex flex-x-between bg-white m-top10">
      <view class="chackout-left pl-12 font-34 p-left-30">实付款：
        <text class="col-m">￥{{ detail.actual_pay_price > 0 ? detail.actual_pay_price:  detail.order_pay_price }}</text>
      </view>
      <view @click="getOrderInfo" class="submit-btn bg-black col-f t-center">
        <text class="flow-btn font-32">提交订单</text>
      </view>
	  </view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: ['快递配送', '上门自提'],
        tabDefault: 0,                     // 快递或者自提  
        shop_id: 0,                        // 自提门店ID
        option: {},                        // 接受到的参数
        delivery: 10,                      // 快递10 自提20
        detail: {},                        // 订单数据
        remark: '',                        // 买家留言
        cart_ids: '',                      // 购物车进来传入id
        isCart: false,                     // 是否购物车进来
        orderInfo: '',                     // 支付宝订单数据
			};
		},
    onLoad(option) {
      console.log(option)
      if(option.data) {
        this.option= JSON.parse(option.data)
        console.log('data')
        return
      }
      if(option.cart === 'true') {
        console.log('cart')
        this.isCart= true
        this.cart_ids= option.cart_ids
      }
    },
    onShow() {
      // 提交订单
      this.orderBuy()
    },
    watch: {
      tabDefault(val, oldval) {
        if(val === 1) {
          this.delivery= 20
        } else {
          this.delivery= 10
        }
        this.orderBuy()
      }
    },
    methods: {
      selectTab(index) {
        this.tabDefault= index
      },
      // 提交订单
      orderBuy() {
        let that = this
        let data = that.option
        let url= that.$api.orderBuyNow
        data.delivery= that.delivery
        if(that.isCart) {
          url= that.$api.orderCart
          data= {
            cart_ids: that.cart_ids,
            shop_id: that.shop_id,
            delivery:that.delivery
          }
        }
        that.$http({
          url: url,
          data: data,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.detail= res.data
              if(res.data.extract_shop) {
                this.shop_id= res.data.extract_shop.shop_id
              }
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '订单数据生成失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 支付前获取订单信息
      getOrderInfo() {
        let that = this
        let data = that.option
        let url= that.$api.orderBuyNow
        data.delivery= that.delivery
        data.pay_method= 'APP'
        if(that.isCart) {
          url= that.$api.orderCart
          data= {
            cart_ids: that.cart_ids,
            shop_id: that.shop_id,
            delivery: that.delivery,
            pay_method: 'APP'
          }
        }
        that.$http({
          url: url,
          data: data,
          method: 'POST',
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.orderInfo= res.data.payment
              let _this= that
              // 调起微信支付
              uni.getProvider({
                service: 'oauth',
                success: function (res) {
                  console.log(res.provider)
                  if (~res.provider.indexOf('weixin')) {
                    uni.requestPayment({
                      provider: 'wxpay',
                      orderInfo: _this.orderInfo, //微信、支付宝订单数据
                      success: function (res) {
                        console.log('success:' + JSON.stringify(res));
                      },
                      fail: function (err) {
                        console.log('fail:' + JSON.stringify(err));
                      }
                    })
                  }
                }
              })
              
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '支付订单获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
      
      // 选择自提门店
      selectExtractPoint() {
        uni.chooseLocation({
          success: function (res) {
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
            
          }
        });
      },
      // 选择收货地址
      selectAddress() {
        uni.navigateTo({
          url: '../mine/address'
        })
      },
      goDetail(item) {
        uni.navigateTo({
          url: '../components/goodDetail?goods_id=' + this.option.goods_id + '&panic=true' + '&title=' + this.option.title
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.swiper-tab {
  width: 100%;
  text-align: center;
  height: 85upx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.swiper-tab .swiper-tab-item {
  width: 35%;
  height: 100%;
  font-size: 28upx;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2px solid #ffffff00;
}

.swiper-tab .on {
  color: #16171c;
  border-bottom: 2px solid #16171c;
}

.main{
  height: calc(100% - 92upx);
  width: 100%;
  overflow: auto;
}
/* 配送信息 */

.flow-delivery {
  padding: 34upx 30upx;
  background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAAANCAYAAADVGpDCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3Yjk4M2ExYy1jMDhkLTQ1OTktYTI0Ny1kZjNjYzdiYTQ5ZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDQwNkY3RkU5N0NGMTFFNUI3N0M4NTU4MzM2RjlFODIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQwNkY3RkQ5N0NGMTFFNUI3N0M4NTU4MzM2RjlFODIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNzgwZWI1NS03OGFhLTQzOTUtODQ4OC1lOWI5YmVlYTY1ZDciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1OTRiYzUyMy1jMzc3LTExNzgtYTdkZS04NGY3YmM1ZGIxMDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz556PLxAAACBElEQVR42tyaSyhEYRTHP48imlKibDQeSSlkSlEWLCRFsZNH5FE2FqQ8ErIRC9lIkTwXSpMkWWChhEJCSnlkoUZGSsr78f98n43CMFPu/Z/6NZuZ2zn33/+cb869XkmLx8IDEQaGQJbgiytQDSY3MyL+LYnL/HxPXSoHDIJQQq2WQQk4Dbbb/yUB29LJ+6e3B66VB3ZITbUIEqSpCGoJBP1ghtBUD6ARpEtTGSEhXzd+awE9oJzQUPegWdf3QlBPMhgDMYRa7YNisGWkpP5qrBQtVBShUHugUE9hs4fUtwG0utlEjRivoA/Ug1sj3vjffr8FNJEK1auPFHcE9UTq5pdK2PwcoAzMG7mjuRrRYEIfK9jiDJSCBZJ6ynSTsBBqNQ0qgdPISbq6vJCFbJOaagrEk5gqWNczRGiqG1Ah1LLMafRkf5pYIUKtZnMJDXUNasAIST2ZYFioRx9ssQaKwJFZEv5uYmWDXVJTrYBEElP562PfPKGpnkAbSDOTqb6aWAGgW6iHol5kQj2CdtAJngnqkc1hHMQRNr9DPaXWzZj8Z2PZtFCxhEIdaKE2CGqRJ4060AH8CLUaALX6f5VpBZLhI9SaeZXQVHKNLt84SCIxVbhQi5YuQlNd6OVElZlN9TGxrGBUn2PZ4lyoTdIsST0FQj0UDSLUak6ot3gcBLVY3wQYAJoVXxmNERajAAAAAElFTkSuQmCC') bottom left repeat-x;
  background-size: 120upx auto;
}

.detail-content {
  padding: 0 20upx;
}

.detail-content__title {
  margin-bottom: 6upx;
}

.detail-content .detail-content__title-phone {
  margin-left: 10upx;
}

.detail-content .detail-content__describe {
  font-size: 28upx;
}

/* 买家留言 */

.flow-all-money .ipt-wrapper input {
  width: 100%;
  height: 75upx;
}

/* 商品列表 */

.checkout_list {
  padding: 10px 15px 2px 15px;
  background: #fff;
  border-bottom: 1upx solid #eee;
}

.checkout_list .flow-shopList {
  padding: 5upx 0 10upx;
  border-bottom: 1upx solid #eee;
}

.checkout_list .flow-shopList:last-child {
  border-bottom: 0;
}
.flow-list-left>image{
  height: 180upx;
  width: 180upx;
  margin-right: 10upx;
}

.flow-header-left {
  padding-left: 90upx;
}
.flow-list-right{
  flex: 1;
}
.flow-fixed-footer{
  line-height: 92upx;
}
.padding-15{
  padding: 12upx 30upx;
}
.submit-btn{
  height: 100%;
  width: 260upx;
}
.flow-cont{
  color: #FF5C00;
}

.p-left-30{
  padding-left: 30upx;
}
/* 优惠券选择 */

.popup__coupon {
  width: 750upx;
  background: #fff;
  box-sizing: border-box;
  padding: 15px 15px 60px 15px;
}

.popup__coupon .coupon__do_not .control {
  width: 90%;
  height: 62upx;
  margin-bottom: 24upx;
  color: #888;
  border: 1upx solid #e3e3e3;
  border-radius: 10upx;
}

.popup__coupon .coupon__title {
  text-align: center;
  margin-bottom: 20upx;
}

.popup__coupon .coupon-list .coupon-item {
  position: relative;
  overflow: hidden;
  margin-bottom: 22upx;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper {
  display: flex;
  height: 170upx;
  background: #fff;
  border-radius: 8upx;
  color: #fff;
  overflow: hidden;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .coupon-type {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 128upx;
  padding: 3px 0;
  background: #a771ff;
  font-size: 20upx;
  text-align: center;
  color: #fff;
  transform: rotate(45deg);
  transform-origin: 64upx 64upx;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper.color__blue {
  background: linear-gradient(-125deg, #57bdbf, #2f9de2);
}

.popup__coupon .coupon-list .coupon-item .item-wrapper.color__red {
  background: linear-gradient(-128deg, #ff6d6d, #ff3636);
}

.popup__coupon .coupon-list .coupon-item .item-wrapper.color__violet {
  background: linear-gradient(-113deg, #ef86ff, #b66ff5);
}

.popup__coupon .coupon-list .coupon-item .item-wrapper.color__violet .coupon-type {
  background: #55b5ff;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper.color__yellow {
  background: linear-gradient(-141deg, #f7d059, #fdb054);
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .tip {
  position: relative;
  flex: 0 0 32%;
  text-align: center;
  border-radius: 8px 0 0 8px;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .tip .money {
  font-weight: bold;
  font-size: 46upx;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .tip .pay-line {
  font-size: 22upx;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .split-line {
  position: relative;
  flex: 0 0 0;
  border-left: 4upx solid #fff;
  margin: 0 5px 0 3px;
  background: #fff;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .split-line:before,
.popup__coupon .coupon-list .coupon-item .item-wrapper .split-line:after {
  content: '';
  position: absolute;
  width: 12px;
  height: 6px;
  background: #fff;
  left: -7px;
  z-index: 1;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .split-line:before {
  border-radius: 0 0 8px 8px;
  top: 0;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .split-line:after {
  border-radius: 8px 8px 0 0;
  bottom: 0;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .content {
  flex: 1;
  padding: 30upx 20upx;
  border-radius: 8px 0 0 8px;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .content .title {
  font-size: 34upx;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .content .bottom .time {
  font-size: 24upx;
  line-height: 24upx;
}

.popup__coupon .coupon-list .coupon-item .item-wrapper .content .bottom .state {
  height: 46upx;
  width: 122upx;
  line-height: 92upx;
  text-align: center;
  color: #fff;
  font-size: 26upx;
}

</style>
