<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text class="title">关于我们</text>
    </view>
  	<view class="content padding-30 border-box bg-white">
      计算机数据库的开发；计算机系统集成；经营电子商务；文化交流活动策划；从事广告业务；市场营销策划；对科技企业或其他企业及项目进行投资；经济信息咨询；智能交通产品的研发及销售；股权投资；无线电及外部设备、网络游戏、多媒体产品的技术开发及无线数据产品的技术开发与销售；无线接入设备、GSM与CDMA无线直放站设备的研发与销售。（以上均不含法律、法规、国务院规定审批的项目，审批的项目需取得相关部门的许可后方可经营）
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        form: {
          password1: '',
          password2: ''
        }
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
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
    .title{
      flex: 1;
      text-align: center;
    }
  }
  .content{
    padding-top: 37upx;
    font-size: $font-28;
    line-height: 46upx;
  }
</style>
