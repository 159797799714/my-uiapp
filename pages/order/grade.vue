<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px'}">
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
      <view class="idea border-box bg-white">
        <textarea value="" placeholder="商品满足您的期待么，说说您看法吧" placeholder-style="color: #bbb" />
        <view class="more">
          <view class="photo">
            <text class="iconfont">&#xe640;</text>
            <text>添加照片</text>
          </view>
          <view class="video">
            <text class="iconfont">&#xe61f;</text>
            <text>添加视频</text>
          </view>
        </view>
        <view class="anonymity">
          <view>
            <view class="check"></view>
            <text>匿名</text>
          </view>
          <text>您的评价可以帮助其他小伙哦</text>
        </view>
      </view>
      <view class="title padding-30">
        <text class="iconfont">&#xe60b;</text>商户评分
      </view>
      <view class="service bg-white padding-30">
        <text>服务态度</text>
        <uni-rate :value="describe" max="5" class="describe-rate" @change="changeNum"></uni-rate>
      </view>
      <view class="post bg-white padding-30">
        <text>物流服务</text>
        <uni-rate :value="describe" max="5" class="describe-rate" @change="changeNum"></uni-rate>
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
      margin-bottom: 30upx;
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
      &>text{
        color: $color-bb;
      }
    }
    .idea{
      padding: 30upx;
      height: 495upx;
      &>textarea{
        height: 197upx;
        width: 100%;
        font-size: $font-28;
        
      }
      .more{
        display: flex;
        .photo,.video{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 120upx;
          width: 120upx;
          margin-right: 30upx;
          font-size: $font-22;
          color: $color-bb;
          text-align: center;
          vertical-align: center;
          border: 1px dashed $color-99;
          border-radius: 10upx;
          &>.iconfont{
            font-size: $font-40;
          }
        }
      }
      .anonymity{
        height: 104upx;
        margin-top: 42upx;
        display: flex;
        justify-content: space-between;
        line-height: 104upx;
        font-size: $font-28;
        border-top: 1px solid $color-f5;
        &>view{
          display: flex;
          align-items: center;
        }
        .check{
          display: inline-block;
          position: relative;
          height: 44upx;
          width:44upx;
          margin-right: 28upx;
          border-radius: 100%;
          border: 1px solid $title-color;
        }
        &>text{
          font-size: $font-22;
          color: $color-bb;
        }
      }
    }
    .title{
      display: flex;
      align-items: center;
      height: 104pux;
      font-size: $font-30;
      line-height: 104upx;
      &>text{
        font-size: $font-44;
        line-height: 104upx;
        margin-right: 50upx;
      }
    }
    .service,.post{
      height: 86upx;
      line-height: 86upx;
      display: flex;
      align-items: center;
      font-size: $font-30;
      &>text{
        margin-right: 28upx;
      }
    }
  }
</style>
