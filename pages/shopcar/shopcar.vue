<template>
  <view class="container">
    <view class="content border-box">
      <!-- <view v-for="(item, index) in list" :key="index" class="store"> -->
      <view class="store bg-white">
        <checkbox-group @change="checkboxChange">
          <view class="store-head">
            <checkbox value="" checked="true" color="#FFCC33"/>
            <view class="store-name">
              <text class="iconfont">&#xe60b;</text>
              <text>优逸影音自营</text>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <checkbox value="" checked="true" color="#FFCC33"/>
              <view class="img">
                <!-- <image src="../../static/img/mine/bg.png" mode=""></image> -->
              </view>  
            </view>
            <view class="right">
              <view class="good-name">索尼（SONY）WF-SP900真无线防水运动耳机</view>
              <view class="good-info">黑色 官方标配</view>
              <view class="foot">
                <text class="price">￥1099</text>
                <view class="num">1</view>
              </view>
            </view>
          </view>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

// 自定义颜色
<!-- <checkbox-group>
  <label>
    <checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />选中
  </label>
  <label>
    <checkbox value="cb" color="#FFCC33" style="transform:scale(0.7)" />未选中
  </label>
</checkbox-group> -->

// 多选改变触发
<!-- <checkbox-group @change="checkboxChange">
  <label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
    <view>
      <checkbox :value="item.value" :checked="item.checked" />
    </view>
    <view>{{item.name}}</view>
  </label>
</checkbox-group> -->


<script>
  export default {
    data() {
      return {
        list: [{
          '0': [{
            imgUrl: '',
            name: '索尼（SONY）WF-SP900真无线防水运动耳机',
            info: '黑色 官方标配',
            price: 1099,
            num: 1
          }]
        }, {
          '0': [{
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
        }]
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
  .content {
    padding: 30upx;
    .store{
      min-height: 327upx;
      padding: 0 20upx;
      .store-head{
        display: flex;
        font-size: $font-28;
        line-height: 89upx;
        &>checkbox{
          margin-right: 30upx;
          border-radius: 100%;
        }
        .store-name{
          .iconfont{
            margin-right: 18upx;
          }
        }
        .item{
          .left{
            .img{
              height: 180upx;
              width: 180upx;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>
