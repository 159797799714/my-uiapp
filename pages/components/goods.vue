<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <view class="search border-box">
        <text class="search-icon iconfont">&#xe667;</text>
        <input class="ipt" :placeholder="searchInfo" confirm-type="search" :value="inputClearValue" @input="clearInput"/>
        <icon type="clear" v-if="showClearIcon" size="14" @click="clearIcon"/>
      </view>
      <text class="iconfont" @click="goBack">&#xe60e;</text>
    </view>
    <view class="content bg-white border-box">
      <view class="tabs">
        <text v-for="(item, index) in tabList" :key="index" :class="{selectTab: index === tabIndex}" @click="selectTab(index)">{{ item }}</text>
      </view>
      <view class="filter">
        <view v-for="(item, index) in shareTag" :key="index" :class="{selectFilter: index === filterIndex}" @click="selectFilter(index)">{{ item }}<text v-if="index === 4" class="iconfont">&#xe610;</text></view>
      </view>
      <scroll-view scroll-y="true" class="culture">
        <view v-if="tabIndex === 0" class="main bg-white border-box">
          <view v-for="(item, index) in shareList" :key="index" class="item">
            <view class="img">
              <image src="" mode=""></image>
            </view>
            <view class="title border-box">{{ item.title }}</view>
            <view class="info border-box">
              <view class="user">
                <view class="userImg">
                  <image src="" mode=""></image>
                </view>
                <view class="userName">{{ item.name }}</view> 
              </view>
              <view class="zan">
                <text :class="{iconfont: true, isZan: item.zan_status}" @click="clickZan(index)">&#xe63a;</text>
                <text>{{ item.zan_num }}</text>
              </view>
            </view>
          </view>
        </view>
        <view v-if="tabIndex === 1" class="main bg-white border-box">
          <view v-for="(item, index) in goodList" :key="index" class="good-item"  @click="goDetail(item)">
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
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        searchInfo: '',              // 输入框placeholdeer
        inputClearValue: '',        //  输入框value值
        showClearIcon: false,       // 输入框清空
        tabIndex: 0,                // 默认选中分享
        filterIndex: 0,             // 默认选中综合
        tabList: ['分享', '商城'],
        shareTag: ['综合', '最热', '最新', '官方', '筛选'],
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
        ],                                  // 商城数据
      }
    },
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option.class)
      this.searchInfo = option.class
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
      clearInput(event) {
        console.log(event.target.value)
      	this.inputClearValue = event.target.value
      	if (event.target.value.length > 0) {
      		this.showClearIcon = true
      	} else {
      		this.showClearIcon = false
      	}
      },
      selectTab(index) {
        this.tabIndex = index
      },
      selectFilter(index) {
        this.filterIndex = index
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
      goDetail(item) {
        uni.navigateTo({
          url: '../components/goodDetail?info=' + item.name
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .topBar{
    .search{
      height: 72upx;
      flex: 1;
      margin: 0 37upx;
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
    }
  }
  .tabs{
    display: flex;
    justify-content: space-around;
    height: 122upx;
    padding: 0 150upx;
    font-size: $font-34;
    line-height: 122upx;
    font-weight: 500;
    color: $control-color;
    background: $title-color;
  }
  .selectTab{
    color: $color-white;
    position: relative;
    &::after{
      content: '';
      height: 4upx;
      width: 34upx;
      background: $color-red;
      position: absolute;
      bottom: 20upx;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  .filter{
    display: flex;
    justify-content: space-between;
    height: 92upx;
    padding: 0 50upx;
    margin-bottom: 10upx;
    font-size: $font-26;
    color: $word-color;
    line-height: 92upx;
    .iconfont{
      margin-left: 14upx;
    }
    .selectFilter{
      color: $color-red;
    }
  }
  .culture{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .main{
    padding: 0 30upx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
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
    .good-item{
      display: flex;
      flex-direction: column;
      height: 524upx;
      width: 330upx;
      margin-top: 20upx;
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
            margin: 0 16upx;
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
  }
</style>
