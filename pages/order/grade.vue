<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>发布评价</text>
      <text class="commit">发布</text>
    </view>
  	<view class="content border-box">
      <view class="describe bg-white">
        <view class="good-img">
          <image src="../../static/img/market/3C.png" mode=""></image>
        </view>
        描述相符
        <uni-rate :value="describe" max="5" class="describe-rate" @change="changeNum"></uni-rate>
        <text>{{ describe_word }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import uniRate from "@/components/uni-rate/uni-rate.vue"
  export default{
    components: {uniRate},
    data() {
      return {
        describe: 0,
        describe_word: ''
      }
    },
    watch: {
      describe(val) {
        console.log('data',val)
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      changeNum(val) {
        console.log(val.value)
        switch(val.value) {
          case 1:
            this.describe_word = '差'
            break
          case 2:
            this.describe_word = '不满意'
            break
          case 3:
            this.describe_word = '一般'
            break
          case 4:
            this.describe_word = '满意'
            break
          case 5:
            this.describe_word = '非常满意'
            break
        }
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
    .commit{
      color: $color-slipe-red;
    }
  }
  .content{
    .describe{
      display: flex;
      align-items: center;
      height: 88upx;
      padding: 30upx;
      padding-bottom: 0;
      font-size: $font-30;
      line-height: 88upx;
      .good-img{
        height: 66upx;
        width:66upx;
        margin-right: 30upx;
        &>image{
          height: 100%;
          width: 100%;
        }
      }
      .describe-rate{
        margin-left: 30upx;
        margin-right: 58upx;
      }
    }
  }
</style>
