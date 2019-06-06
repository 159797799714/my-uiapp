<template>
  <view class="container">
    <view class="top border-box"> 购物车 </view>
    <scroll-view scroll-y="true" class="content border-box">
      <view v-for="(item, index) in list" :key="index" class="store bg-white">
        <radio-group @change="checkboxChange">
          <view class="store-head">
            <!-- <checkbox value="" checked="true" color="#FFCC33"/> -->
            <radio :value="item.storeName" color="#F4433D"/>
            <view class="store-name">
              <text class="iconfont">&#xe60b;</text>
              <text>{{ item.storeName }}</text>
            </view>
          </view>
          <view v-for="(good, num) in item.goodArr" :key="num" class="item">
            <view class="left-box">
              <!-- <checkbox value="" checked="true" color="#FFCC33"/> -->
              <radio value="这是商品value" color="#F4433D"/>
              <view class="img">
                <image src="../../static/img/mine/bg.png" mode="aspectFit"/>
              </view>  
            </view>
            <view class="right-box">
              <view class="good-name">索尼（SONY）WF-SP900真无线防水运动耳机</view>
              <text class="good-info">黑色 官方标配</text>
              <view class="foot">
                <text class="price">￥1099</text>
                <view class="num">
                  <view class="icon">
                    <text class="iconfont">&#xe643;</text>
                  </view>
                  <text>1</text>
                  <view class="icon">
                    <text class="iconfont">&#xe645;</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </radio-group>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          storeName: '优逸影音自营',
          goodArr : [{
            imgUrl: '',
            name: '索尼（SONY）WF-SP900真无线防水运动耳机',
            info: '黑色 官方标配',
            price: 1099,
            num: 1
          }]
        }, {
          storeName: '优逸影音自营',
          goodArr: [{
            imgUrl: '',
            name: '索尼（SONY）WF-SP900真无线防水运动耳机',
            info: '黑色 官方标配',
            price: 1099,
            num: 1
          }, {
            imgUrl: '',
            name: '索尼（SONY）WF-SP900真无线防水运动耳机',
            info: '黑色 官方标配',
            price: 1099,
            num: 1
          }]
        }, {
          storeName: '优逸影音自营',
          goodArr: [{
            imgUrl: '',
            name: '索尼（SONY）WF-SP900真无线防水运动耳机',
            info: '黑色 官方标配',
            price: 1099,
            num: 1
          }, {
            imgUrl: '',
            name: '索尼（SONY）WF-SP900真无线防水运动耳机',
            info: '黑色 官方标配',
            price: 1099,
            num: 1
          }]
        }],
        current: 0
      }
    },
    methods: {
      checkboxChange: function(e) {
        console.log(e)
        // var items = this.items,
        // values = e.detail.value
        // for (var i = 0, lenI = items.length; i < lenI; ++i) {
        //   const item = items[i]
        //   if (values.includes(item.value)) {
        //     this.$set(item, 'checked', true)
        //   } else {
        //     this.$set(item, 'checked', false)
        //   }
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top{
    height: 176upx;
    padding: 120upx 20upx 0 30upx;
    overflow: hidden;
    font-size: $font-44;
    font-weight: $font-bold;
    line-height: 44upx;
  }
  .container{
    background: $color-f5;
  }
  .content {
    margin: 30upx;
    width: calc(100% - 60upx);
    margin-top: 0;
    .store{
      min-height: 292upx;
      padding: 0 20upx 35upx 20upx;
      margin: 30upx 0;
      .store-head{
        display: flex;
        font-size: $font-28;
        line-height: 89upx;
        margin-bottom: 8upx;
        &>checkbox{
          margin-right: 30upx;
          border-radius: 100%;
        }
        .store-name{
          color: $word-color;
          .iconfont{
            margin-right: 18upx;
          }
        }
      }
      .item{
        display: flex;
        margin-bottom: 30upx;
        .left-box{
          display: flex;
          &>radio{
            height: 30upx;
            margin-top: 96upx;
          }
          .img{
            height: 180upx;
            width: 180upx;
            overflow: hidden;
            &>image{
              width: 100%;
              height: 100%;
            }
          }
        }
        .right-box{
          flex: 1;
          margin-left: 30upx;
          .good-name{
            height: 66upx;
            margin-top: -5upx;
            margin-bottom: 24upx;
            font-size: $font-26;
            line-height: 36upx;
            white-space: wrap;
            overflow: hidden;
            word-break:break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .good-info{
            padding: 9upx 15upx;
            font-size: $font-22;
            color: $color-99;
            background: $color-f5;
            border-radius: 20upx;
          }
          .foot{
            margin-top: 27upx;
            height: 40upx;
            display: flex;
            justify-content: space-between;
            font-size: $font-30;
            .price{
              margin-top: 14upx;
              font-weight: $font-bold;
              line-height: 26upx;
            }
            .num{
              display: flex;
              height: 40upx;
              font-size: $font-24;
              text-align: center;
              line-height: 40upx;
              justify-content: flex-end;
              &>text{
                height: 40upx;
                width: 70upx;
                background: $color-f5;
              }
              .icon{
                height: 40upx;
                width:  50upx;
                text-align: center;
                .iconfont{
                  font-size: $font-24;
                }
              }
            }
          }
        }
      }
      radio{
        width: 30upx;
        margin-right: 30upx;
        transform: scale(0.6);
      }
    }
  }
  .iconfont{
    margin-right: 0;
  }
</style>
