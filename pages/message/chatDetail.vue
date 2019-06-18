<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">{{ title }}</text>
    </view>
    <scroll-view scroll-y="true" class="content padding-30 border-box bg-white" @click="wayShow = false">

    </scroll-view>
    <view class="footer" :style="{ height: wayShow ? '200px': '50px'}">
      <view class="foot-head padding-30">
        <text class="iconfont">&#xe62e;</text>
        <view class="ipt">
          <input type="text" value="" />
          <text class="iconfont">&#xe627;</text>
        </view>
        <text class="iconfont way_icon" @click="selectWay ">&#xe609;</text>
      </view>
      <view v-if="wayShow" class="send-way border-box">
        <view class="item" @click="getPhoto">
          <view class="logo">
            <text class="iconfont">&#xe640;</text>
          </view>
          <text>照片</text>
        </view>
        <view class="item" @click="openCrmera">
          <view class="logo">
            <text class="iconfont">&#xe640;</text>
          </view>
          <text>拍照</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        wayShow: false
      }
    },
    onLoad: function(option) {
      this.title = option.title
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      selectWay() {
        this.wayShow = true
      },
      getPhoto() {
        uni.chooseImage({
          count: 6, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: function(res) {
            console.log(JSON.stringify(res.tempFilePaths));
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar {
    display: flex;
    justify-content: space-between;
    font-size: $font-38;
    color: $color-white;

    .iconfont {
      font-size: $font-42;
      font-weight: 500;
    }

    .title {
      flex: 1;
      text-align: center;
    }
  }

  .content {}

  .footer {
    height: 99upx;
    transition: 500ms;

    .foot-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100upx;
      line-height: 100upx;
      background: $color-f5;

      .ipt {
        flex: 1;
        margin: 0 20upx;
        display: flex;
        align-items: center;
        height: 66upx;
        line-height: 66upx;
        background: $color-white;
        border-radius: 33upx;

        &>input {
          flex: 1;
          margin: 0 20upx;
        }
      }

      .iconfont {
        font-size: $font-52;
        color: $word-color;
      }

      .way_icon {
        color: $color-red;
      }
    }

    .send-way {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      height: 300upx;
      width: 100%;
      padding: 10upx 30upx;
      background: $color-f5;
      border-top: 1px solid $color-ee;

      .item {
        height: 180upx;
        width: 120upx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: $font-28;

        .logo {
          height: 120upx;
          width: 100%;
          margin-bottom: 20upx;
          background: $color-white;
          border-radius: 10upx;
          text-align: center;

          &>text {
            line-height: 120upx;
            font-size: $font-54;
          }
        }
      }
    }
  }

  .iconfont {
    margin-right: 0;
  }
</style>
