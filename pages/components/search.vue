<template>
  <view class="container">
    <view class="topBar">
      <view class="search border-box">
        <text class="search-icon iconfont">&#xe667;</text>
        <input class="ipt" :placeholder="'大家都在搜' + searchInfo" confirm-type="search" :value="inputClearValue" @input="clearInput" @confirm="searchAction"/>
        <icon type="clear" v-if="showClearIcon" size="14" @click="clearIcon"/>
      </view>
      <text @click="goBack">取消</text>
    </view>
    <sroll-view class="content bg-white border-box">
      <view class="history">
        <view class="title">
          <text>搜索记录</text>
          <text class="iconfont" @click="delHistory">&#xe60d;</text>
        </view>
        <view class="tags">
          <text v-for="(item, index) in history" :key="index" class="tag" @click="goGood(item)">{{ item }}</text>
        </view>
      </view>
      <view class="hot">
        <view class="title">
          <text>热门搜索</text>
        </view>
        <view class="tags">
          <text v-for="(item, index) in hot" :key="index" class="tag">{{ item }}</text>
        </view>
      </view>
    </sroll-view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        title: '搜索页',
        inputClearValue: '',
        showClearIcon: false,
        searchInfo: '森海塞尔',
        history: ['耳机', '蓝牙音箱', '耳机', '蓝牙音箱', '耳机', '蓝', '耳机耳机耳机', '蓝牙音箱'],
        hot: ['耳机', '蓝牙音箱', '耳机', '蓝牙音箱'],
        type: ''
      }
    },
    onLoad(option) {
      this.type = option.type
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      clearIcon() {
      	this.inputClearValue = ''
      	this.showClearIcon = false
      },
      goGood(item) {
        uni.navigateTo({
          url: 'goods?class=' + item + '&type=' + this.type
        })
      },
      clearInput(event) {
        console.log(event.target.value)
      	this.inputClearValue = event.target.value
      	if (event.target.value.length > 0) {
      		this.showClearIcon = true
      	} else {
      		this.showClearIcon = false
      	}
      },
      searchAction(e) {
        uni.navigateTo({
          url: 'goods?class=' + e.detail.value + '&type=' + this.type
        })
      },
      delHistory() {
        let that = this
        uni.showModal({
          title: '温馨提示',
          content: '确认删除所有搜索记录？',
          success(res) {
            if (res.confirm) {
              that.history = []
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    justify-content: flex-start;
    .search{
      height: 72upx;
      width: 540upx;
      padding: 0 23upx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $control-color;
      background: rgba(248,248,248,0.1);
      border-radius: 10upx;
      .ipt{
        flex: 1;
      }
      .search-icon{
        margin-right: 21upx;
      }
      
    }
    &>text{
      font-size: $font-38;
      margin-left: 37upx;
    }
  }
  .content{
    padding: 30upx;
    .history,.hot{
      font-size: $font-28;
      margin-bottom: 13upx;
    }
    .title{
      display: flex;
      justify-content: space-between;
      line-height: 88upx;
      font-weight: $font-bold;
      .iconfont{
        color: $control-color;
        font-weight: 400;
      }
    }
    .tags{
      display: flex;
      flex-wrap: wrap;
      .tag{
        display: inline-block;
        padding: 20upx;
        color:$word-color;
        border-radius: 10upx;
        background: $color-f5;
        margin-right: 30upx;
        margin-bottom: 19upx;
      }
    }
  }
  
</style>
