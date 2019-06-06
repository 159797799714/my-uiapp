<template>
  <view class="container">
    <view class="tabs">
      <view :class="{tab: true, selected: tabIndex === index}" v-for="(item, index) in tabList" :key="index" @click="selectTab(index)">{{ item }}</view>
    </view>
    <scroll-view scroll-y="true" class="content">
      <!-- 商品 -->
      <view v-if="tabIndex === 1" class="goods-content bg-white">
        <view v-for="(item, index) in goodList" :key="index" class="good-item" @click="goDetail(item)">
          <view class="good-img"></view>
          <view class="good-info border-box">
            <view class="good-name">{{ item.name }}</view>
            <view class="good-remark">
              <text v-for="(li, index) in item.remark" :key="index">{{ li }}</text>
            </view>
            <view class="good-price">
              <text>￥{{ item.price }}</text>
              <text class="iconfont">&#xe719;</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 分享 -->
      <view v-if="tabIndex === 0" class="goods-content bg-white">
        <view v-for="(item, index) in shareList" :key="index" class="item" @click="goShareDetail(item)">
          <view class="img">
            <image src="" mode=""></image>
          </view>
          <view class="title border-box">{{ item.title }}</view>
          <view class="info border-box">
            <view class="user">
              <view class="userImg">
                <image src="" mode=""></image>
              </view>
              <view class="userName">{{ item.authorName }}</view> 
            </view>
            <view class="zan">
              <text :class="{iconfont: true, isZan: item.zan_status}" @click="clickZan(index)">&#xe63a;</text>
              <text>{{ item.zan_num }}</text>
            </view>
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
        tabList: ['分享', '商品'],
        tabIndex: 0,
        goodList: [
          {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }, {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }, {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }, {
            imgUrl: '',
            name: 'Huawei/华为FreeLaceHuawei/华为FreeLace',
            remark: ['入耳式', '蓝牙:4.2版本', '立体声'],
            price: 499
          }
        ],
        shareList: [
          {
            imgUrl: '',
            title: '丛林音乐节，万人狂欢！！2019门票疯狂开售',
            authorImg: '',
            authorName: '奶油田官方',
            zan_status: true,
            zan_num: 300
          }, {
            imgUrl: '',
            title: '丛林音乐节，万人狂欢！！2019门票疯狂开售',
            authorImg: '',
            authorName: '奶油田官方',
            zan_status: false,
            zan_num: 300
          }, {
            imgUrl: '',
            title: '丛林音乐节，万人狂欢！！2019门票疯狂开售',
            authorImg: '',
            authorName: '奶油田官方',
            zan_status: false,
            zan_num: 300
          }, {
            imgUrl: '',
            title: '丛林音乐节，万人狂欢！！2019门票疯狂开售',
            authorImg: '',
            authorName: '奶油田官方',
            zan_status: false,
            zan_num: 300
          }
        ],
      }
    },
    methods: {
      selectTab(index) {
        this.tabIndex = index
      },
      goShareDetail(item) {
        uni.navigateTo({
          url: '../components/shareInfo?title=' + item.authorName
        })
      },
      goDetail(item) {
        uni.navigateTo({
          url: '../components/goodDetail?info=' + item.name
        })
      },
      clickZan(index) {
        if (!this.shareList[index].zan_status) {
          this.shareList[index].zan_num += 1
          this.shareList[index].zan_status = !this.shareList[index].zan_status
          return
        }
        if (this.shareList[index].zan_status) {
          this.shareList[index].zan_num -= 1
          this.shareList[index].zan_status = !this.shareList[index].zan_status
          return
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .tabs{
    height: 134upx;
    padding: 0 150upx;
    font-size: $font-36;
    line-height: 134upx;
    display: flex;
    .tab{
      flex: 1;
      position: relative;
      text-align: center;
      color: $word-color;
      font-weight: $font-bold;
    }
    .selected{
      color: $title-color;
      &::before{
        display: block;
        position: absolute;
        bottom: 28upx;
        margin-left: 50%;
        transform: translateX(-50%);
        content: '';
        height: 4upx;
        width: 34upx;
        background: $color-red;
      }
    }
  }
  .goods-content{
    padding: 0 30upx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .good-item{
      display: flex;
      flex-direction: column;
      height: 524upx;
      width: 330upx;
      margin-bottom: 20upx;
      border: 1px solid $color-ee;
      .good-img{
        height: 330upx;
        width: 330upx;
        margin-bottom: 30upx;
        background: $color-f5;
      }
      .good-info{
        flex: 1;
        padding: 7upx 18upx;
        .good-name{
          height: 28upx;
          line-height: 28upx;
          font-size: $font-28;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .good-remark{
          font-size: $font-20;
          line-height: 64upx;
          color: $word-color;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &>text{
            margin-right: 32upx;
          }
        }
        .good-price{
          display: flex;
          justify-content: space-between;
          font-size: $font-26;
          font-weight: $font-bold;
          line-height: 54upx;
          .iconfont{
            color: $word-color;
          }
        }
      }
    }
    // 商品
    .item{
      height: 524upx;
      width: 330upx;
      margin-bottom: 20upx;
      border: 1px solid $color-ee;
      .img{
        height: 330upx;
        width: 100%;
        margin-bottom: 18upx;
        &>image{
          height: 100%;
          width: 100%;
          background: #ccc;
        }
      }
      .title{
        height: 67upx;
        font-size: $font-24;
        line-height: 36upx;
        margin-bottom: 24upx;
        padding: 0 20upx;
        overflow: hidden;
        white-space: wrap;
        text-overflow: ellipsis;
        word-break:break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .info{
        display: flex;
        justify-content: space-between;
        height: 40upx;
        width: 100%;
        padding: 0 20upx;
        line-height: 40upx;
        .user{
          display: flex;
          .userImg{ 
            height: 40upx;
            width: 40upx;
            margin-right: 10upx;
            border-radius: 100%;
            overflow: hidden;
            &>image{
              height: 100%;
              width: 100%;
              background: #ccc;
            }
          }
          .userName{
            font-size: $font-24;
            font-weight: bold;
          }
        }
        .zan{
          display: flex;
          color: $control-color;
          font-size: $font-24;
          .iconfont{
            font-size: $font-34;
          }
          .isZan{
            position: relative;
            color: $title-color;
            &::before{
              content: '';
              height: 13upx;
              width: 14upx;
              background: $color-red;
              position: absolute;
              bottom: 10upx;
              left: 8upx;
            }
          }
        }
      }
    }
  }
</style>
