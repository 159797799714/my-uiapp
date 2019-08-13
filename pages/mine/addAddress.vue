<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text>编辑收货人</text>
      <text class="iconfont del" @click="delAction">&#xe620;</text>
    </view>
    <view class="content padding-30 border-box bg-white">
      <view class="row">
        <text class="name">收货人</text>
        <view class="center">
          <input type="text" class="ipt" :value="info.name" />
        </view>
      </view>
      <view class="row">
        <text class="name">手机号码</text>
        <view class="center">
          <input type="text" class="ipt" :value="info.tel" />
        </view>
      </view>
      <view class="row">
        <text class="name">所在地区</text>
        <view class="center">
          <input type="text" class="ipt" :value="info.location" />
        </view>
        <text class="iconfont location" @click="getLocation">&#xe646;</text>
      </view>
      <view class="row">
        <text class="name">详细地址</text>
        <view class="center">
          <input type="text" class="ipt" :value="info.address" />
        </view>
      </view>
      <view class="row">
        <text class="name">标签</text>
        <view class="center">
          <text v-for="(item, index) in info.tags" :key="index" class="tag">{{ item }}</text>
        </view>
      </view>
      <view class="def">
        <text>设为默认地址</text>
        <switch checked style="transform:scale(0.7)" @change="switchChange" color="#F4433D"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        info: {
          name: '',
          tel: '',
          location: '',
          address: '',
          tags: ['家', '公司', '学校', '其他'],
          def: false
        }
      }
    },
    onLoad(option) {
      if(option.info) {
        this.info = JSON.parse(option.info)
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
      // 打开地图选择地址并获取位置
      getLocation() {
        let that = this
        uni.chooseLocation({
          success: function (res) {
            that.info.location = res.address
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
          }
        })
      },
      delAction() {
        uni.showModal({
          // title: '温馨提示',
          content: '确认删除？',
          success(res) {
            if (res.confirm) {
              console.log(res.confirm)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      switchChange(e) {
        console.log('switch1 发生 change 事件，携带值为', e.target.value)
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
    .del{
      transform: rotate(45deg);
    }
  }
  .content{
    padding-top: 30upx;
    font-size: $font-28;
    .row{
      display: flex;
      height: 104upx;
      line-height: 104upx;
      border-bottom: 1px solid $color-f5;
      .name{
        display: inline-block;
        width: 120upx;
        margin-right: 50upx;
        color: $color-99;
        text-align: left;
      }
      .center{
        flex: 1;
        .ipt{
          height: 100%;
          width: 100%;
        }
        .tag{
          margin-right: 23upx;
          display: inline-block;
          height: 40upx;
          width: 92upx;
          text-align: center;
          line-height: 40upx;
          border-radius: 20upx;
          border: 1px solid $color-99;
          color: $word-color;
        }
      }
      .location{
        font-size: $font-38;
      }
    }
    .def{
      display: flex;
      justify-content: space-between;
      height: 104upx;
      line-height: 104upx;
      color: $word-color;
      border-bottom: 1px solid $color-f5;
    }
  }
</style>
