<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>收货地址</text>
      <text class="iconfont" @click="addAction">&#xe620;</text>
    </view>
    <view class="content padding-30 border-box bg-white">
      <view v-for="(item, index) in addressList" :key="index" class="item" @click="editAction(item)">
        <view class="row1">
          <text class="name">{{ item.name }}</text>
          <text class="tel">{{ item.tel }}</text>
          <text v-if="item.def" class="tag">默认</text>
          <text v-for="(li, num) in item.tags" :key="num" class="tag">{{ li }}</text>
        </view>
        <view class="address">{{ item.location + item.address }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        addressList: [
          {
            name: '锤子',
            tel: '166666666666',
            location: '广东省深圳市南山区',
            address: '高新南九道三行科技大厦11108',
            tags: ['其他'],
            def: true
          }, {
            name: '冬瓜',
            tel: '166666666666',
            location: '广东省深圳市南山区',
            address: '高新南九道三行科技大厦11108',
            tags: ['家'],
            def: false
          }
        ]
      }
    },
    methods: {
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
        uni.navigateTo({
          url: 'addAddress?info=' + JSON.stringify(item)
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
  }
</style>
