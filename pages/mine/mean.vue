<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">优惠券说明</text>
    </view>
    <view class="content">
      <view class="mean">
        1:每个订单仅能使用一张优惠券，不兑换，不找零;
  2:每张优惠券的使用条件请查看对应优惠券的使用说明;
  3:除非该优惠券有特殊说明，否则优惠券仅能抵扣商品金额;
  4:请在有效期内使用优惠券，未使用的优惠券过期后将自动作废;
  5:每个用户仅限使用一张新用户专享券;
  6:优惠券最终解释权归深优逸电子科技有限公司;
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      }
    },
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
    .title{
      flex: 1;
      text-align: center;
    }
  }
  .content{
    .mean{
      padding: 52upx;
      padding-top: 58upx;
      white-space: pre-wrap;
      font-size: $font-28;
      color: $word-color;
      line-height: 54upx;
    }
  }
</style>
