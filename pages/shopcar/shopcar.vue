<template>
  <view class="container">
    <view class="topBar bg-13 col-f font-38 t-left flex-x-between" :style="{'padding-top': statusBarHeight + 'px'}">
      <text @click="isEdit = !isEdit">购物车</text>
      <text class="font-30" @click="isEdit = !isEdit">{{ isEdit? '完成': '编辑' }}</text>
    </view>
    <scroll-view v-if="list[0].goodArr.length > 0" scroll-y="true" class="content border-box">
      <view v-for="(item, index) in list" :key="index" class="store bg-white">
        <!-- <view class="store"> -->

        <!-- <view class="store-head">
          <view @click="selAllRadio">
            <radio  value="all" :checked="all_checked" color="#F4433D" />
          </view>
          <view class="store-name">
            <text class="iconfont">&#xe60b;</text>
            <text>{{ item.storeName }}</text>
          </view>
        </view> -->
        <view v-for="(good, num) in item.goodArr" :key="num" :class="{item: true, 'b-top': num !== 0}">
          <view class="left-box">
            <view class="radio-btn dis-flex flex-y-center" @click="checkboxChange(good.goods_sku_id, num, index)">
              <!-- <checkbox value="" checked="true" color="#FFCC33"/> -->
              <label class="radio">
                <radio :value="good.goods_sku_id" :checked="good.checked" color="#F4433D" />
              </label>
            </view>
            <view class="img" @click="goDetail(good.goods_id)">
              <image :src="good.goods_image" mode="aspectFit" />
            </view>
          </view>
          <view class="right-box">
            <view class="good-name" @click="goDetail(good.goods_id, good.goods_type)">{{ good.goods_name }}</view>
            <text :class="{'good-info': true, 'v-hidden': !good.goods_sku.goods_attr }" @click="goDetail(good.goods_id, good.goods_type)">{{ good.goods_sku.goods_attr }}</text>
            <view class="foot">
              <text class="price">￥{{ good.goods_price }}</text>
              <view class="num">
                <view class="icon">
                  <text v-if="good.goods_type === 0" :class="{'iconfont': true, 'col-ee': good.goods_type !== 0}" @click="controlNum(good, num, 'cut')">&#xe643;</text>
                </view>
                <text>{{ good.total_num }}</text>
                <view class="icon">
                  <text v-if="good.goods_type === 0" :class="{'iconfont': true, 'col-ee': good.goods_type !== 0}" @click="controlNum(good, num, 'add')">&#xe645;</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-if="checked_sum > 0 && list[0].goodArr.length > 0 || isEdit" class="settle dis-flex flex-x-between p-fix border-box t-center bg-white">
      <view class="all_radio_btn font-26" @click="selAllRadio">
        <radio value="all" :checked="all_checked" color="#F4433D" />全选
      </view>
      <view v-if="!isEdit" class="all col-3d font-36">
        <text class="font-26 col-66">总计：</text>￥{{ total_price }}
      </view>
      <view v-if="!isEdit" class="settle-btn font-30 col-f bg-3d" @click="toSureOrder">去计算({{ checked_sum }})</view>
      <view v-if="isEdit" class="settle-btn font-30 col-f bg-13" @click="delGood">删除</view>
    </view>
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
        list: [{
          storeName: '优逸smilehome自营',
          goodArr: []
        }],
        total_price: 0,         // 总计算钱数
        checked_sum: 0,         // 选中商品数量
        all_checked: false,     // 全部选中
        goodId: [],             // item.goods_id + '_' + item.goods_sku_id
        isEdit: false,          // 是否处于编辑状态
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad() {
      // //  获取购物车数据
      // this.getList()
    },
    onShow() {
      this.checked_sum = 0
      //  获取购物车数据
      
      this.getList()
      if(this.all_checked) {
        this.selAllRadio()
      }
    },
    methods: {
      // 获取购物车列表
      getList() {
        let that = this
        that.$http({
          url: that.$api.shopcarList,
          cb: (err, res) => {
            let list =  res.data.goods_list
            list.map((item, index) => {
              console.log(item)
              item.checked = false
            })
            console.log(list)
            this.list[0].goodArr = list
          }
        })
      },
      // 去结算
      toSureOrder() {
        uni.navigateTo({
          url: '../order/submitOrder?cart=true&cart_ids=' + this.goodId.join(',')
        })
      },
      // 勾选商品
      checkboxChange(id, num, index) {
        // console.log(id, num, index)
        let checked = this.list[index].goodArr[num].checked
        // console.log(this.list[index].goodArr[num].checked)
        this.list[index].goodArr[num].checked = !checked
        // 计算总金额
        this.computePrice()
      },
      
      delGood() {
        let that = this
        uni.showModal({
          content: '确认删除所选商品？',
          success(res) {
            if (res.confirm) {
              that.$http({
                url: that.$api.delcar,
                data: {
                  goods_sku_id: that.goodId.join(',')
                },
                cb: (err, res) => {
                  if(!err && res.code === 1) {
                    uni.showToast({
                      title: '删除成功',
                      icon: 'none'
                    })
                    // 重新获取列表
                    that.getList()
                  } else {
                    uni.showToast({
                      title: '删除失败请重试',
                      icon: 'none'
                    })
                  }
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      
      // 计算总金额
      computePrice() {
        let that = this
        let list =  this.list[0].goodArr
        that.total_price = 0
        that.checked_sum = 0
        that.goodId = []
        list.map((item, index) => {
          // console.log(item.checked, item.total_num, that.checked_sum, that.total_price)
          if(item.checked) {
            that.checked_sum += Number(item.total_num)
            that.total_price += Number(item.goods_price) * Number(item.total_num)
            that.goodId.push(item.goods_id + '_' + item.goods_sku_id)
          }
        })
      },
      
      // 选中所有商品
      selAllRadio() {
        let that = this
        if(that.all_checked) {
          that.list[0].goodArr.map((item, index) => {
            item.checked = false
          })
        } else {
          that.list[0].goodArr.map((item, index) => {
            item.checked = true
          })
        }
        this.all_checked = !this.all_checked
        
        // 计算总金额
        this.computePrice()
        
      },
      
      // 加减购物车物品数量
      controlNum(good, index, type) {
        let that = this
        let url = that.$api.addcar
        let num = that.list[0].goodArr[index].total_num
        let data = {
          goods_id: good.goods_id,
          goods_sku_id: good.goods_sku_id
        }
        
        // 减少数量
        if (type === 'cut' && num > 1) {
          url = that.$api.subcar
          that.$http({
            url: url,
            methods: 'POST',
            data: data,
            cb: (err, res) => {
              if (!err && res.code === 1) {
                that.list[0].goodArr[index].total_num -= 1
                
                // 计算总金额
                this.computePrice()
                return
              }
            }
          })
        }
        
        // 增加数量
        if (type === 'add') {
          data.goods_num = 1
          that.$http({
            url: url,
            methods: 'POST',
            data: data,
            cb: (err, res) => {
              if (!err && res.code === 1) {
                that.list[0].goodArr[index].total_num = that.list[0].goodArr[index].total_num - 0 + 1
                
                // 计算总金额
                this.computePrice()
                return
              } else if (res.code === 0) {
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
      goDetail(goods_id, type) {
        if(type === 0) {
          uni.navigateTo({
            url: '../components/goodDetail?goods_id=' + goods_id
          })  
        } else if(type === 1) {
          uni.navigateTo({
            url: '../components/goodDetail?goods_id=' + goods_id + '&panic=true&title=' + '秒杀购' 
          })
        } else if(type === 2) {
          uni.navigateTo({
            url: '../components/goodDetail?goods_id=' + goods_id + '&panic=true&title=' + '限时购' 
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    height: 176upx;
    padding: 120upx 20upx 0 30upx;
    overflow: hidden;
    font-size: $font-44;
    line-height: 44upx;
  }

  .container {
    background: $color-f5;
  }

  .content {
    padding: 0 30upx;

    .store {
      // min-height: 292upx;
      padding: 20rpx 20upx 35upx 20upx;
      margin: 30upx 0 60rpx;

      .store-head {
        display: flex;
        font-size: $font-28;
        line-height: 89upx;
        margin-bottom: 8upx;

        &>checkbox {
          margin-right: 30upx;
          border-radius: 100%;
        }

        .store-name {
          color: $word-color;

          .iconfont {
            margin-right: 18upx;
          }
        }
      }
      
      .item {
        display: flex;
        margin-bottom: 30upx;
        padding-top: 20px;

        .left-box {
          display: flex;
          &>radio {
            height: 30upx;
            margin-top: 96upx;
          }
          .img {
            height: 180upx;
            width: 180upx;
            overflow: hidden;

            &>image {
              width: 100%;
              height: 100%;
            }
          }
        }

        .right-box {
          flex: 1;
          margin-left: 30upx;

          .good-name {
            height: 66upx;
            margin-top: -5upx;
            font-size: $font-26;
            line-height: 36upx;
            white-space: wrap;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .good-info {
            padding: 9upx 15upx;
            font-size: $font-22;
            color: $color-99;
            background: $color-f5;
            border-radius: 20upx;
          }

          .foot {
            margin-top: 27upx;
            height: 40upx;
            display: flex;
            justify-content: space-between;
            font-size: $font-30;

            .price {
              margin-top: 14upx;
              font-weight: $font-bold;
              line-height: 26upx;
            }

            .num {
              display: flex;
              height: 40upx;
              font-size: $font-24;
              text-align: center;
              line-height: 40upx;
              justify-content: flex-end;

              &>text {
                height: 40upx;
                width: 70upx;
                background: $color-f5;
              }

              .icon {
                height: 40upx;
                width: 50upx;
                text-align: center;

                .iconfont {
                  font-size: $font-24;
                }
              }
            }
          }
        }
      }
    }
  }
  
  .settle {
    height: 98upx;
    width: 100%;
    bottom: 0;
    left: 0;
    padding-left: 50upx;
    line-height: 98upx;
  
    .settle-btn {
      width: 300upx;
    }
  }
  .blank {
    margin: auto;

    .iconfont {
      margin-bottom: 20upx;
    }

    .shopping {
      margin-top: 200upx;
      padding: 10upx 30upx;
      line-height: 30upx;
      border: 1px solid $color-99;
    }
  }
   radio {
    width: 30upx;
    margin-right: 30upx;
    transform: scale(0.6);
  }
  .iconfont {
    margin-right: 0;
  }
</style>
