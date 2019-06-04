<template>
  <view class="container">
    <view class="topBar">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <view class="search border-box">
        <text class="search-icon iconfont">&#xe667;</text>
        <input class="ipt" :placeholder="searchInfo" confirm-type="search" :value="inputClearValue" @input="clearInput"/>
        <icon type="clear" v-if="showClearIcon" size="14" @click="clearIcon"/>
      </view>
      <text v-if="tabIndex === 1" class="iconfont" @click="goBack">&#xe60e;</text>
    </view>
    <view class="content bg-white border-box">
      <view class="tabs">
        <text v-for="(item, index) in tabList" :key="index" :class="{selectTab: index === tabIndex}" @click="selectTab(index)">{{ item }}</text>
      </view>
      <view class="filter">
        <view v-for="(item, index) in shareTag" :key="index" :class="{selectFilter: index === filterIndex}" @click="selectFilter(index)">{{ item }}
          <text v-if="item === '价格'" class="iconfont">&#xe60c;</text>
          <text v-if="index === 4" class="iconfont">&#xe610;</text>
        </view>
      </view>
      <view v-if="tabIndex === 1" class="filter-tags bg-white padding-30">
        <view v-for="(item, index) in filter" :key="index" :class="{'filter-tag': true, selectFilter: filterTag_Index === index.toString()}" @click="selectFilterTag(index)">{{ item }}
          <text :class="{iconfont: true, clicked: filterTag_Index === index.toString()}">&#xe792;</text>
        </view>
      </view>
      <view v-if="filterTag_Index !== '' && tabIndex === 1" class="filter-cover">
        <view class="cover-main bg-white">
          <view class="list padding-30 border-box">
            <view v-for="(item, index) in filterCoverList.list" :key="index">{{ item }}</view>
          </view>
          <view class="foot">
            <view>重置</view>
            <view class="sure">完成({{ filterCoverList.sum }}物品)</view>
          </view>
        </view>
        <view class="white" @click="filterTag_Index = ''"/>
      </view>
      <scroll-view scroll-y="true" class="culture">
        <!-- 分享 -->
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
        <!-- 商品 -->
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
    <!-- 筛选 -->
    <view v-if="filterIndex === 4 && filter_alert" class="big-cover">
      <view class="white" @click="filter_alert = false"></view>
      <scroll-view scroll-y="true" class="big-cover-main bg-white border-box">
        <view class="price">
          <view class="title">价格区间(元)</view>
          <view class="ipt">
            <input type="text" value="" placeholder="最低价" placeholder-style="color: #999"/>
            <input type="text" value="" placeholder="最高价" placeholder-style="color: #999"/>
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
        filter: ['品牌', '分类'],
        filterTag_Index: '',            //默认选中品牌
        filter_alert: true,             // 筛选遮罩层显示
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
        filterCoverList: {
          list: ['铁三角', '索尼', '铁三角', '索尼', '铁三角'],
          sum: 4999
        },
        filterArr: [],
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
    watch: {
      tabIndex(val, oldval) {
        if(val === 0) {
          this.shareTag = ['综合', '最热', '最新', '官方', '筛选']
          return
        }
        if(val === 1) {
          this.shareTag = ['综合', '销量', '上架', '价格', '筛选']
          return
        }
      },
      filterIndex(val, oldVal) {
        if(val === 4) {
          this.filter_alert = true
        }
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
          return
      	} else {
      		this.showClearIcon = false
      	}
      },
      // 分享商城tab点击
      selectTab(index) {
        this.tabIndex = index
      },
      // 价格等分类点击
      selectFilter(index) {
        if(!this.filter_alert && index === 4) {
          this.filter_alert = true
        }
        this.filterIndex = index
      },
      selectFilterTag(info) {
        let index = info.toString()
        if(index === this.filterTag_Index && this.filterTag_Index !== '') {
          this.filterTag_Index = ''
          return
        }
        if (index !== this.filterTag_Index || this.filterTag_Index === '') {
          this.filterTag_Index = index
        }
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
    
  }
  .selectFilter{
    color: $color-red;
  }
  .filter-tags{
    height: 50upx;
    padding-bottom: 30upx;
    display: flex;
    .filter-tag{
      width: 120upx;
      margin-right: 22upx;
      text-align: center;
      font-size: $font-22;
      line-height: 50upx;
      background: $color-ee;
      border-radius: 25upx;
    }
    .iconfont{
      margin-left: 10upx;
      transition: 1s;
    }
    .clicked{
      display: inline-block;
      transform: rotate(180deg);
    }
  }
  .filter-cover{
    display: flex;
    flex-direction: column;
    height: calc(100% - 274upx);
    width: 100%;
    position: absolute;
    top: 304upx;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    .cover-main{
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 236upx;
      max-height: 90%;
      .list{
        flex: 1;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        &>view{
          height: 88upx;
          width: 216upx;
          margin-right: 20upx;
          margin-bottom: 20upx;
          font-size: $font-26;
          line-height: 88upx;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          background: $color-ee;
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
      .foot{
        height: 98upx;
        display: flex;
        font-size: $font-30;
        color: $word-color;
        text-align: center;
        line-height: 98upx;
        border-top: 1px solid $color-f5;
        &>view{
          flex: 1;
        }
        .sure{
          color: $color-white;
          background: $color-orange;
        }
      }
    }
    .white{
      flex: 1;
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
  .big-cover{
    flex-direction: row;
    .white{
      flex: 1;
    }
    .big-cover-main{
      width: 524upx;
      overflow: hidden;
      .price{
        height: 159upx;
        margin: 80upx 35upx 0 35upx;
        padding-bottom: 30upx;
        border-bottom: 2px solid $color-f5;
        .title{
          font-size: $font-26;
          line-height: 85upx;
        }
        .ipt{
          height: 74upx;
          display: flex;
          justify-content: space-between;
          &>input{
            width: 190upx;
            height: 74upx;
            font-size: $font-26;
            text-align: center;
            border-radius: 37upx;
            background: $color-ee;
          }
        }
      }
    }
  }
</style>
