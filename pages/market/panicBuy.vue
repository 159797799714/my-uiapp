<template>
  <view class="container">
    <view class="topBar dis-flex flex-x-between col-blue" @click="pagetoTop" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont font-40 f-bold" @click="goBack">&#xe61c;</text>
      <text class="iconfont font-40" @click="goShare">&#xe60f;</text>
    </view>
    <view class="content">
      <view class="tabs">
        <view v-for="(item, index) in timeList" :key="index" :class="{'tab-item bg-black': true, selected: selectIndex === index}" @click="selectTime(item, index)">
          <text class="day">{{ item.activity_date }}</text>
          <text class="hour">{{ item.activity_time }}</text>
          <text class="status">{{ item.status }}</text>
        </view>
      </view>
      <scroll-view scroll-y="true" class="main bg-black">
        <view v-if="swiperList.length > 0" class="banner">
          <banner :swiperList="swiperList"></banner>
        </view>
        <!-- <view class="leave-time">{{ title === '秒杀购'?'秒杀购': '抢购' }}，距离下场开始时间 <text>45:15:11</text></view> -->
        <view v-for="(item, index) in goodList.data" :key="index" class="item">
          <view class="goodImg" @click="goDetail(item)">
            <view v-if="item.surplus_inventory < 1" class="imgCover">
              <text>售完</text>
            </view>
            <image :src="item.image[0].file_path" mode=""></image>
          </view>
          <view class="goodInfo">
            <view class="goodName font-99" @click="goDetail(item)">{{ item.goods_name }}</view>
            <view class="word font-20 col-f3c">历史新低</view>
            <view class="price">
              <view class="newPrice font-28 col-f3c">￥<text class="font-36">{{ item.goods_min_price }}</text></view>
              <text class="oldPrice t-dec-line">￥{{ item.goods_max_price }}</text>
            </view>
            <view class="leaver" @click="goDetail(item)">
              <text class="text">仅剩余{{ item.surplus_inventory }}件</text>
              <view class="peogress-box">
                <progress :percent="item.surplus_inventory / item.total_inventory * 100" activeColor="#FF33CC" stroke-width="15" backgroundColor="#666666" class="progress"/>
              </view>
            </view>
            <view class="price">
              <text v-if="item.surplus_inventory > 0 && item.isbuy === 'allow'" :class="{'buy bg-black col-f': true, 'my-button': true}" @click="goBuy(item)">立即抢购</text>
              <text v-if="item.surplus_inventory < 1" :class="{buy: true,'my-button': true, none: true}">已售完</text>
              <text v-if="goodList.header_info.status === '已结束'" :class="{buy: true,'my-button': true, none: true}">已结束</text>
              <!-- <form @submit="setRemind" report-submi="true"> -->
                <!-- <button v-if="goodList.header_info.status === '即将开始'" :class="{buy: true, 'bg-white': true, 'my-button': true}" formType="submit">{{ item.isremind == 'no' ? '提醒我' : '取消提醒' }}</button> -->
                <text v-if="goodList.header_info.status === '即将开始'" :class="{buy: true, 'bg-white': true, 'my-button': true}" @click="setRemind(item, index)">{{ item.isremind == 'no' ? '提醒我' : '取消提醒' }}</text>
              <!-- </form> -->
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import banner from "../components/banner.vue";
  export default {
    components: {
      banner
    },
    data() {
      return {
        title: '',                         // 顶部标题
        swiperList: [],   // 轮播图
        timeList: [],                      // 时间
        selectIndex: 0,                    // 选中的时间
        goodList: {},                      // 商品列表
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option.origin)
      this.title = option.origin
      uni.setNavigationBarTitle({
        title: option.origin
      })
    },
    onShow() {
      // 获取秒杀购或者限时购活动列表
      this.getSeckillCategorys()
    },
    watch: {
      selectIndex(val, oldval) {
        // 点击顶部时间动态获取秒杀购商品
        this.getgoodsbycategoryid(this.timeList[val].category_id)
      }
    },
    methods: {
      // 获取秒杀购活动列表
      getSeckillCategorys() {
        let that = this
        let url = that.$api.seckill_categorys
        if(that.title === '限时购') {
          url = that.$api.flashsale_categorys
        }
        that.$http({
          url: url,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              that.timeList = res.data.list
              
              if(that.selectIndex !== 0) {
                 // 如果已经有选中的活动就通过该活动ID获取秒杀购商品
                 that.getgoodsbycategoryid(that.timeList[that.selectIndex].category_id) 
              } else {
                // 第一次进入自动通过第一个活动ID获取秒杀购商品
                that.getgoodsbycategoryid(that.timeList[0].category_id) 
              }
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '秒杀购活动列表加载失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 通过秒杀购活动ID获取秒杀购商品列表
      getgoodsbycategoryid(id) {
        let that = this
        let url = that.$api.seckill_goodsbycategoryid
        if(that.title === '限时购') {
          url = that.$api.flashsale_goodsbycategoryid
        }
        that.$http({
          url: url,
          data: {
            category_id: id
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log(that.title, res.data.list)
              that.swiperList= res.data.list.banners
              that.goodList = res.data.list
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: that.title + '商品列表加载失败',
                icon: 'none'
              })
            }
          }
        })
      },
      goBuy(item) {
        console.log(item)
        uni.navigateTo({
          url: '../components/goodDetail?goods_id=' + item.goods_id + '&panic=true' + '&title=' + this.title
        })
      },
      // 抢购提醒
      setRemind(item, index) {
        let that = this
        console.log(item, index)
        console.log(that.goodList.data[index].isremind)
        
        let url= that.$api.seckill_remind
        if(that.title === '限时购') {
          console.log('111')
          url= that.$api.flashsale_remind
          if(item.remind === 'yes') {
            console.log('222')
            url= that.$api.flashsale_cancelremind
          }  
        } else if(that.title === '秒杀购' && item.remind === 'yes') {
          console.lol('444')
          url = that.$api.seckill_cancelremind
        }
        console.log(url)
        that.$http({
          url: url,
          data: {
            good_id: item.goods_id,
            activity_category_id: item.activity_category_id,
            formId: 'app'
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log(res.data, that.goodList.data[index].isremind)
              that.goodList.data[index].isremind = that.goodList.data[index].isremind === 'no'? 'yes': 'no'
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '设置失败',
                icon: 'none'
              })
            }
          }
        })
      },
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 选择活动
      selectTime(item, index) {
        this.selectIndex = index
      },
      // 去购买或者进入详情页
      goDetail(item) {
        console.log('点击了商品', item)
        // uni.navigateTo({
        //   url: '../components/goodDetail?info=' + info + '&panic=true'
        // })
      }
    },
  }
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: column;
}
.tabs{
  height: 130upx;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding-top: 4upx;
  background: linear-gradient(to right,#00BFFF, #9933FF, #ff33cc);
  z-index: 2;
  .tab-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $color-99;
    .day{
      font-size: $font-24;
      line-height: 36upx;
    }
    .hour{
      font-size: $font-36;
      line-height: 45upx;
    }
    .status{
      font-size: $font-24;
      line-height: 23upx;
    }
  }
  .selected{
    background: $color-red;
    color: $color-white;
  }
}
.main{
  flex: 1;
  overflow: hidden;
  padding: 30upx;
  box-sizing: border-box;
  .banner{
    height: 330upx;
    margin-bottom: 50upx;
  }
  .leave-time{
    height: 62upx;
    line-height: 62upx;
    text-align: center;
    font-size: $font-24;
    color: $word-color;
    &>text{
      color: $title-color;
      margin-left: 10upx;
    }
  }
}
.item{
    display: flex;
    padding: 20upx;
    margin-bottom: 30upx;
    .goodImg{
      position: relative;
      height: 260upx;
      width: 260upx;
      margin-right: 11upx;
      background: #ccc;
      &>image{
        height: 100%;
        width: 100%;
      }
      .imgCover{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0, 0.5);
        text-align: center;
        &>text{
          display: block;
          height: 84upx;
          width: 84upx;
          margin: 0 auto;
          margin-top: 50%;
          transform: translateY(-50%);
          border-radius: 100%;
          font-size: 37upx;
          line-height: 84upx;
          color: $color-white;
          border: 1px solid $color-white;
          background: rgba(255,255,255, 0.3);
        }
      }
    }
    .goodInfo{
      flex: 1;
      .goodName{
        height: 75upx;
        font-size: $font-28;
        line-height: 40upx;
        white-space: wrap;
        overflow: hidden;
        word-break:break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .word{
        line-height: 45upx;
      }
      .leaver{
        position: relative;
        margin: 17upx 0;
        height: 30upx;
        font-size: $font-22;
        line-height: 30upx;
        border-radius: 15upx;
        overflow: hidden;
        .progress{
          height: 30upx;
          border-radius: 15upx;
        }
        .text{
          position: absolute;
          top: 0;
          left: 30upx;
          border-radius: 15upx;
        }
      }
      .price{
        position: relative;
        display: flex;
        align-items: flex-end;
        .newPrice{
          margin-right: 14upx;
          line-height: 36upx;
        }
        .oldPrice{
          font-size: $font-22;
          line-height: 36upx;
          color: $word-color;
          text-overflow: hidden;
          white-space: nowrap;
        }
        .buy{
          display: inline-block;
          position: absolute;
          top: -2upx;
          right: 0;
          height: 32upx;
          width: 120upx;
          color: $color-slipe-red;
          border: 1px solid $color-purple;
          font-size: $font-24;
          line-height: 32upx;
        }
        .none{
          border-color: $color-99;
          background: $color-99;
          color: $color-white;
        }
      }
    }
  }
</style>
