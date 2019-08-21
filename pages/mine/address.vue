<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text @click="addAction">收货地址</text>
      <text class="iconfont" @click="addAction">&#xe620;</text>
    </view>
    <view class="content padding-30 border-box bg-white">
      <view v-for="(item, index) in addressList" :key="index" class="item" @click="editAction(item)">
        <view class="row1">
          <text class="name">{{ item.name }}</text>
          <text class="tel">{{ item.phone }}</text>
          <text v-if="item.address_id === default_id" class="tag">默认</text>
          <text v-for="(li, num) in item.tags" :key="num" class="tag">{{ li }}</text>
        </view>
        <view class="address">{{ item.region.city + item.region.province + item.region.region + item.detail }}</view>
      </view>
      <view v-if="addressList.length < 1" class="blank font-99 t-center">
        <text class="iconfont font-160">&#xe715;</text>
        <view class="font-36 font-99 t-center">暂无收货地址~</view>
      </view>
    </view>
    <view class="addBtn bg-black col-f t-center font-30" @click="addAction">添加新地址</view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        default_id: '',           // 默认收货地址ID
        addressList: [
          // {
          //   name: '羊羊羊',
          //   phone: '15555555555',
          //   region: '',
          //   detail: '',
          //   def: false
          // }, {
          //   name: '',
          //   phone: '',
          //   region: '',
          //   detail: '',
          //   def: false
          // }
        ]
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad() {
      // // 获取地址列表
      // this.getAddress();
    },
    onShow() {
      // 获取地址列表
      this.getAddress();
    },
    methods: {
      // 获取收货地址列表
      getAddress() {
        let that= this
        that.$http({
          url: that.$api.addresslist,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              this.addressList= res.data.list
              this.default_id= res.data.default_id
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '收货地址获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      }, 
      addAction() {
        uni.navigateTo({
          url: 'addAddress'
        })
      },
      editAction(item) {
        let isDefault= this.default_id === item.address_id
        uni.navigateTo({
          url: 'addAddress?id=' + item.address_id + '&isDefault=' + isDefault
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
  }
  .content{
    .item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 148upx;
      font-size: $font-24;
      border-bottom: 1px solid $color-f5;
      .row1{
        height: 32upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 32upx;
      }
      .name{
        font-size: $font-30;
      }
      .tel{
        margin-left: 52upx;
        color: $word-color;
        font-size: $font-30;
      }
      .tag{
        margin-left: 23upx;
        display: inline-block;
        height: 30upx;
        width: 72upx;
        border-radius: 15upx;
        line-height: 30upx;
        text-align: center;
        color: $color-white;
        background:  $color-red;
      }
      .address{
        margin-top: 24upx;
        line-height: 24upx;
        color: $word-color;
      }
    }
    .blank{
      margin: auto;
      width: 300upx;
      height: 400upx;
    }
    
  }
  .addBtn{
    height: 100upx;
    line-height: 100upx;
  }
</style>
