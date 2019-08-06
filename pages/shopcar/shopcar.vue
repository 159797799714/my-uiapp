<template>
  <!-- <view class="container">
    <view class="top border-box"> 购物车 </view>
    <scroll-view scroll-y="true" class="content border-box">
      <view v-for="(item, index) in list" :key="index" class="store bg-white">
        <radio-group @change="checkboxChange">
          <view class="store-head">
            <checkbox value="" checked="true" color="#FFCC33"/>
            <radio :value="item.storeName" color="#F4433D"/>
            <view class="store-name">
              <text class="iconfont">&#xe60b;</text>
              <text v-if="storeName">{{ item.storeName }}</text>
            </view>
          </view>
          <view v-for="(good, num) in item.goodArr" :key="num" class="item" @click="goDetail(good.name)">
            <view class="left-box">
              <checkbox value="" checked="true" color="#FFCC33"/>
              <radio value="这是商品value" color="#F4433D"/>
              <view class="img">
                <image src="../../static/img/mine/bg.png" mode="aspectFit"/>
              </view>  
            </view>
            <view class="right-box">
              <view class="good-name">{{ good.name }}</view>
              <text class="good-info">{{ good.info }}</text>
              <view class="foot">
                <text class="price">￥{{ good.price }}</text>
                <view class="num">
                  <view class="icon" @click="controlNum('cut', index, num)">
                    <text class="iconfont">&#xe643;</text>
                  </view>
                  <text>{{ good.num }}</text>
                  <view class="icon" @click="controlNum('add', index, num)">
                    <text class="iconfont">&#xe645;</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </radio-group>
      </view>
    </scroll-view>
  </view> -->
  <view class="container">
    <view class="top border-box bg-13 col-f t-center"> 购物车 </view>
    <scroll-view v-if="list[0].goodArr.length > 0" scroll-y="true" class="content border-box">
      <view v-for="(item, index) in list" :key="index" class="store bg-white">
      <!-- <view class="store"> -->
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
              <view class="img" @click="goDetail(good.goods_id)">
                <image :src="good.goods_image" mode="aspectFit"/>
              </view>  
            </view>
            <view class="right-box">
              <view class="good-name" @click="goDetail(good.goods_id)">{{ good.goods_name }}</view>
              <text class="good-info" @click="goDetail(good.goods_id)">黑色 官方标配</text>
              <view class="foot">
                <text class="price">￥{{ good.goods_price }}</text>
                <view class="num">
                  <view class="icon" @click="controlNum(good, num, 'cut')">
                    <text class="iconfont">&#xe643;</text>
                  </view>
                  <text>{{ good.total_num }}</text>
                  <view class="icon" @click="controlNum(good, num, 'add')">
                    <text class="iconfont">&#xe645;</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="settle dis-flex flex-x-between p-fix border-box t-center">
            <radio value="这是商品value" color="#F4433D"/>
            <view class="all col-3d font-36">
              <text class="font-26 col-66">总计：</text>￥1099.00
            </view>
            <view class="settle-btn font-30 col-f bg-3d">去计算(1)</view>
          </view>
        </radio-group>
      </view>
    </scroll-view>
    <!-- 购物车为空 -->
    <view v-if="list[0].goodArr.length < 1" class="blank font-99">
      <text class="iconfont font-160">&#xe715;</text>
      <view class="font-36 font-99 t-center">空空如也~</view>
      <view class="shopping my-button font-30" @click="goShopping">去购物</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // list: [{
        //   storeName: '优逸影音自营',
        //   goodArr : [{
        //     imgUrl: '',
        //     name: '索尼（SONY）WF-SP900真无线防水运动耳机',
        //     info: '黑色 官方标配',
        //     price: 1099,
        //     num: 1
        //   }]
        // }, {
        //   storeName: '优逸影音自营',
        //   goodArr: [{
        //     imgUrl: '',
        //     name: '索尼（SONY）WF-SP900真无线防水运动耳机',
        //     info: '黑色 官方标配',
        //     price: 399,
        //     num: 2
        //   }, {
        //     imgUrl: '',
        //     name: '索尼（SONY）WF-SP900真无线防水运动耳机',
        //     info: '黑色 官方标配',
        //     price: 99,
        //     num: 4
        //   }]
        // }, {
        //   storeName: '优逸影音自营',
        //   goodArr: [{
        //     imgUrl: '',
        //     name: '索尼（SONY）WF-SP900真无线防水运动耳机',
        //     info: '黑色 官方标配',
        //     price: 1099,
        //     num: 1
        //   }, {
        //     imgUrl: '',
        //     name: '索尼（SONY）WF-SP900真无线防水运动耳机',
        //     info: '黑色 官方标配',
        //     price: 5299,
        //     num: 3
        //   }]
        // }],
        list: [{
          storeName: '优逸smilehome自营',
          goodArr : []
        }],
        current: 0
      }
    },
    onLoad() {
      // //  获取购物车数据
      // this.getList()
    },
    onShow() {
      //  获取购物车数据
      this.getList()
    },
    methods: {
      // 获取购物车列表
      getList() {
        let that = this
        that.$http({
          url: that.$api.shopcarList,
          cb: (err, res) => {
            console.log(res.data.goods_list)
            this.list[0].goodArr = res.data.goods_list
          }
        })
      },
      // 选择
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
      },
      // 加减购物车物品数量
      controlNum(good, index, type) {
        console.log(good, index, type)
        let that = this
        let url = that.$api.addcar
        let num = that.list[0].goodArr[index].total_num
        let data = {
          goods_id: good.goods_id,
          goods_sku_id: good.goods_sku_id
        }
        // 减少数量
        if(type === 'cut' && num > 1) {
          console.log('进来了减少', type, num)
          url = that.$api.subcar
          that.$http({
            url: url,
            methods: 'POST',
            data: data,
            cb: (err, res)=> {
              if(!err && res.code === 1) {
                that.list[0].goodArr[index].total_num -= 1
                return
              }
            }
          })
        }
        // 增加数量
        if(type === 'add') {
          console.log('进来了增加')
          data.goods_num = 1
          that.$http({
            url: url,
            methods: 'POST',
            data: data,
            cb: (err, res)=> {
              if(!err && res.code === 1) {
                that.list[0].goodArr[index].total_num += 1
              } else if(res.code === 0) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            }
          })
          return
        }
      },
      
      goShopping() {
        uni.switchTab({
          url: '../market/market'
        })
      },
      goDetail(goods_id) {
        uni.navigateTo({
          url: '../components/goodDetail?goods_id=' + goods_id
        })
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
    line-height: 44upx;
  }
  .container{
    background: $color-f5;
  }
  .content {
    padding: 0 30upx 0;
    .store{
      min-height: 292upx;
      padding: 0 20upx 35upx 20upx;
      margin-bottom: 30upx;
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
    .settle{
      height: 98upx;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-left: 50upx;
      line-height: 98upx;
      .settle-btn{
        width: 300upx;
      }
    }
  }
  .iconfont{
    margin-right: 0;
  }
  .blank{
    margin: auto;
    .iconfont{
      margin-bottom: 20upx;
    }
    .shopping{
      margin-top: 200upx;
      padding: 10upx 30upx;
      line-height: 30upx;
      border: 1px solid $color-99;
    }
  }
</style>
