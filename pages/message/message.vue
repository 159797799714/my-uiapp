<template>
  <view class="container">
    <view class="topBar">
      <text>消息</text>
    </view>
    <scroll-view scroll-y class="content border-box">
      <view class="head bg-white border-box">
        <view v-for="(item, index) in headList" :key="index">
          <image :src="item.imgUrl" mode=""></image>
          <text>{{ item.info }}</text>
        </view>
      </view>
      <view class="main bg-white">
        <view v-for="(item, index) in commentList" :key="index" class="item" @click="goDetail(item.name)">
          <view class="img">
            <image :src="item.imgUrl" mode=""></image>
          </view>
          <view class="right">
            <view>
              <view class="name">{{ item.name }}</view>
              <view class="time">{{ item.time }}</view>
            </view>
            <view class="mes">{{ item.mes }}</view>
          </view>
        </view>
      </view>
    </scroll-view>  
  </view>
</template>

<script>
  export default{
    data() {
      return {
        headList: [
          {
            imgUrl: '../../static/img/mes/review.png',
            info: '评论和@'
          }, {
            imgUrl: '../../static/img/mes/inform.png',
            info: '交易物流'
          }, {
            imgUrl: '../../static/img/mes/trade.png',
            info: '通知消息'
          }
        ],
        commentList: [
          {
            imgUrl: '',
            name: '啦啦啦啦',
            time: '刚刚',
            mes: '我是谁？我在哪？我要干嘛？'
          }, {
            imgUrl: '',
            name: '哈哈哈哈',
            time: '刚刚',
            mes: '我是谁？我在哪？我要干嘛？'
          }, {
            imgUrl: '',
            name: '嘿嘿嘿嘿',
            time: '刚刚',
            mes: '我是谁？我在哪？我要干嘛？'
          }
        ]
      }
    },
    methods: {
      goDetail(name) {
        uni.navigateTo({
          url: 'chatDetail?title=' + name
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    &>text{
      color: $color-white;
      font-size: $font-38;
    }
  }
  .content{
    padding: 30upx;
    .head{
      height: 220upx;
      padding: 30upx;
      margin-bottom: 30upx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &>view{
        display: flex;
        flex-direction: column;
        align-items: center;
        &>image{
          height: 122upx;
          width: 122upx;
          margin-bottom: 14upx;
        }
        &>text{
          font-size: $font-24;
        }  
      }
    }
    .main{
      padding: 0 20upx;
      .item{
        display: flex;
        height: 88upx;
        padding: 30upx 0upx;
        border-bottom: 1px solid $color-f5;
        .img{
          height: 88upx;
          width: 88upx;
          margin-right: 21upx;
          border-radius: 100%;
          overflow: hidden;
          background: $color-pink;
          &>image{
            height: 100%;
            width: 100%;
          }
        }
        .right{
          flex: 1;
          &>view{
            display: flex;
            justify-content: space-between;
          }
          .name{
            font-size: $font-36;
            line-height: 44upx;
            margin-bottom: 11upx;
          }
          .mes,.time{
            font-size: $font-28;
            line-height: 44upx;
            color: $word-color;
          }
          .mes{
            line-height: 28upx;
          }
        }
      }
    }
  }
</style>
