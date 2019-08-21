<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <!-- :style="{background: 'rgba(0, 0, 0,' + top / 375 + ')'}" -->
      <view class="search">
        <text class="iconfont back" @click="goBack">&#xe61c;</text>
        <text class="col-f">商品详情</text>
        <!-- 顶部锚点 -->
        <!-- <view class="nav" :style="{opacity: top / 375}">
          <view v-for="(item, index) in navList" :key="index" :class="{checked: index === navIndex}" @click="navAction(index)">{{ item }}</view>
          <view class="slipe-span" :style="{left: (1 / navList.length / 2 * (navIndex * 2 + 1) ) * 100 + '%'}"></view>
        </view> -->
        <view class="conduct">
          <text class="iconfont share" @click="goShare">&#xe60f;</text>
          <text class="iconfont" @click="keepAction">&#xe637;</text>
        </view>
      </view>
    </view>
    <scroll-view scroll-y="true" @scroll="scroll" class="content">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration" :circular="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view :class="{'swiper-item': true }">
            <image :src="item.file_path" mode=""></image>
          </view>
        </swiper-item>
      </swiper>
      
      <!-- 限时购，秒杀购显示时间 -->
      <view v-if="showPanic" :class="{'panic border-box': true, 'bg-3d': title === '限时购'}">
        <view class="price">
          <text class="newPrice">￥{{ detail.sku[0].goods_price }}</text>
          <text class="oldPrice">￥{{ detail.sku[0].line_price }}</text>
        </view>
        <view class="time-box">
          <view class="time-info">
            <text :class="{iconfont: true, 'col-3d': title === '限时购'}">&#xe6b9;</text>{{ activityStart ? '距结束' : '距开始'}} {{ countDownTime }}
          </view>
          <view v-if="!activityStart" class="time">今天开抢</view>
          <view v-if="activityStart" class="time over-hidden p-re">
            <text class="p-ab num font-20 t-center">已抢：{{ percent }}%</text>
            <progress :percent="percent" :activeColor="activeColor" stroke-width="15" backgroundColor="#FCD1D1" class="progress"/>
          </view>
        </view>
      </view>
      
      <view class="head bg-white">
        <view class="title">{{ detail.goods_name }}</view>
        <view v-if="!showPanic" class="price font-red">￥{{ detail.sku[0].goods_price }}</view>
        <view v-if="detail.selling_point" class="tags">
          <text class="tag">{{ detail.selling_point }}</text>
        </view>
        <text class="font-28">销量：{{ detail.goods_sales }}</text>
      </view>
      <view v-if="detail.promotion_info" class="sale-info row bg-white" @click="lookInfo">
        <view class="row-name">促销信息</view>
        <view class="row-info">
          <!-- <text class="info">满送</text> -->
          <text>{{ detail.promotion_info }}</text>
        </view>
        <!-- <text class="iconfont">&#xe644;</text> -->
      </view>
      <view v-if="specData.spec_attr" class="row bg-white">
        <view class="row-name">选择颜色</view>
        <view class="row-info">已选：
          <text v-for="(item, index) in select_name" :key="index">{{ item }}</text>
        </view>
      </view>
      <view v-if="specData.spec_attr" class="row bg-white" @click="normShow = true">
        <view class="row-name">商品规格</view>
        <view class="row-info">
          <text v-for="(item, index) in specData.spec_attr" :key="index">{{ item.group_name }}</text></view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="row bg-white">
        <view class="row-name">服务说明</view>
        <view class="row-info">7天无理由退货，7天保价</view>
        <text class="iconfont">&#xe644;</text>
      </view>
      <view class="user-comment bg-white">
        <view class="comment-head">
          <view>
            <text>用户评价</text> ({{ comment_data_count ? comment_data_count  : '0' }})
          </view>
          <view class="font-red">
            <text>查看全部</text>
            <text class="iconfont">&#xe644;</text>
          </view>
        </view>
        <view v-for="(item, index) in detail.comment_data" :key="index" class="comment-writer">
          <view class="writer-head">
            <view>
              <view>
                <image :src="item.user.avatarUrl" mode=""></image>
                <text>{{ item.user.nickName }}</text>
              </view>
              <view class="font-99 pad-left-60">
                <text>{{ item.create_time }}</text>
                <text></text>
              </view>
            </view>
          </view>
          <view class="writer-speak pad-left-60">{{ item.content }}</view>
          <view v-if="false" class="writer-speak-img pad-left-60">
            <image src="" mode=""></image>
          </view>
          <view class="dis-flex flex-x-between font-99 pad-left-60">
            <text class="font-24">黑色；官方标配</text>
            <text class="iconfont font-99">&#xe63a;</text>
          </view>
        </view>
      </view>
      
      <!-- <view  class="store bg-white">
        <image src="" mode=""></image>
        <view class="name">{{ store.name }}</view>
        <view class="btn">进店逛逛</view>
      </view> -->
      
      <view class="goods-title t-center font-24 ">宝贝详情</view>
      <view class="good-detail">
        <u-parse :content="detail.content" @preview="preview" @navigate="navigate"/>
      </view>
      
    </scroll-view>
    <view class="bottom-bar bg-white">
      <view class="link-menu border-box">
        <view>
        	<text class="iconfont">&#xe60b;</text>
          <text>店铺</text>
        </view>
        <view>
        	<text class="iconfont">&#xe656;</text>
          <text>客服</text>
        </view>
        <view @click="goShopcar">
        	<text class="iconfont">&#xe707;</text>
          <text>购物车</text>
        </view>
      </view>
      <view class="btn-menu">
        <view class="btn" @click="outAddcar">加入购物车</view>
        <view class="btn buy" @click="buyNow">立即购买</view>
      </view>
    </view>
    
    <!-- 促销信息弹窗 -->
    <!-- <view v-if="coverShow" class="big-cover toTop">
      <view class="white" @click="coverShow = false"></view>
      <view class="cover-main bg-white border-box">
        <view class="cover-word padding-30">
          <view class="title" >促销信息</view>
          <view v-for="(item, index) in sale_info" :key="index" class="item">
            <text :class="{'red-bg': item.type === 2}">{{ item.title }}</text>
            <view class="item-info">{{ item.info }}
              <view v-if="item.time" class="item-time">{{ item.time }}</view>
            </view>
          </view>
        </view>
        <view class="sure-btn" @click="coverShow = false">关闭</view>
      </view>
    </view> -->
    
    <!-- 商品规格选择弹窗 -->
    <view v-if="normShow" class="big-cover toTop border-box">
      <view class="white" @click="normShow= false"></view>
      <view class="cover-main bg-white border-box">
        <view class="cover-word border-box padding-30">
          <view class="header">
            <view class="img">
              <image :src="goods.image_path? goods.image_path: detail.image[0].file_path"></image>
            </view>
            <view class="other">
              <view class="cancel">
                <text class="iconfont" @click="closeNorm">&#xe613;</text>
              </view>
              <view class="price">￥<text>{{ goods.goods_price? goods.goods_price : detail.sku[0].goods_price }}</text></view>
              <view class="storeNum">仅剩{{ goods.stock_num? goods.stock_num: detail.sku[0].stock_num }}件</view>
            </view>
          </view>
          <scroll-view scroll-y="true" class="norm">
            <view class="norm-item" v-for="(item, index) in specData.spec_attr" :key="index">
              <view class="norm-title">{{ item.group_name }}</view>
              <view class="norm-bar">
                <text v-for="(li, num) in item.spec_items" :key="num" :class="{selected: select_arr[index] === li.item_id }" @click="selectNorm(index, li, num)">{{ li.spec_value }}</text>
              </view>
            </view>
            <view class="control-num">
              <text>购买数量</text>
              <view class="sum">
                <text v-if="!showPanic" class="iconfont" @click="controlNum('-')">&#xe643;</text>
                <text class="num">{{ goods_num }}</text>
                <text v-if="!showPanic" class="iconfont" @click="controlNum('+')">&#xe620;</text>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="alert-btn">
          <view v-if="isCar" class="sure-btn" @click="addCar">确认</view>
          <view v-if="!isCar" class="sure-btn"  @click="addCar">加入购物车</view>
          <view v-if="!isCar" class="sure-btn buy-btn" @click="toBuy">立即购买</view>  
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  import uParse from  "../../components/uni-rich/parse.vue";
  import { countDown } from "../../common/util.js";
  export default {
    components: {
      uParse
    },
    data() {
      return {
        navList: ['商品', '评价', '详情', '推荐'],   // 顶部导航栏
        goods_id: '',                         // 商品ID
        navIndex: 0,                          // 顶部初始索引值
        top: 0,                               // 滚动距离顶部距离
        indicatorDots: true,                  // 指示点显隐
        autoplay: true,                       // 自动轮播
        interval: 3000,                       // 自动轮播时间 
        duration: 2000,                       // 轮播过渡时间
        indicatorActiveColor: '#fff',         // 轮播图指示点选中颜色
        swiperList:[],                        // 轮播元素数组
        isShowTop: true,                      // 顶部
        detail: {},                           // 商品详情信息
        specData: {},                         // 商品规格
        select_arr: [],                       // 选中商品id数组
        select_name: [],                      // 选中的规格名称
        spec_sku_id: 0,                       // 选中商品id拼接信息  例子：10028_10253_10256
        goods: {},                            // 选中规格商品价格
        strings: '',                          // 商品详情信息
        goods_num: 1,                         // 购买商品数量
        isCar: false,                         // 是否点击加入购物车
        comment_data: [],                     // 评论内容
        comment_data_count: '',               // 评论总数量
        
        // data: {
        //   price: 1099,
        //   textList: ['包邮', '自营'],
        //   title: '',                             
        // },                                     // 商品价格等
        // store: {
        //   name: 'SONY官方自营店',
        //   imgUrl: ''   
        // },                                   // 店名头像信息
        showPanic: false,                       // 顶部分享显示与隐藏
        coverShow: false,                       // 全局遮罩层显隐
        // sale_info: [{
        //   title: '满送',
        //   info: '满999元送4000毫安的充电宝,购买后送200积分',
        //   type: 1
        // }, {
        //   title: '促销',
        //   info: '满1548元，省150元',
        //   time: '2019.06.12-2019.06.15',
        //   type: 2
        // }],
        activeColor: '',                       // 进度条剩余的颜色
        normShow: false,                        // 商品规格弹窗
        title: '',                              // 传过来的秒杀购或者限时购
        percent: 0,                             // 已经被抢的比例
        activityStart: '',                      // 活动是否开始
        countDownTime: '',                      // 距离结束时间
        
      }
    },
    // 接受传递的参数
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option)
      this.goods_id = option.goods_id
      if(option.panic === 'true') {
        this.showPanic = true
        this.title = option.title
        this.activeColor= option.title === '秒杀购'? '#F4433D' : '#F4A03D'
      }
      // 获取商品详情
      this.getDetail()
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    methods: {
      // 获取商品详情
      getDetail() {
        let that = this
        let url = that.$api.goods_detail
        // 入口区分接口地址
        if(that.showPanic) {
          if(that.title === '限时购') {
            url= that.$api.flashsale_detail
          } else if(that.title === '秒杀购') {
            url= that.$api.seckill_detail
          }
        }
        // 请求
        that.$http({
          url: url,
          data: {
            goods_id: that.goods_id
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log(res.data.detail)
              that.detail = res.data.detail
              that.comment_data = that.detail.comment_data
              that.comment_data_count = that.detail.comment_data_count
              that.swiperList = that.detail.image
              that.specData = res.data.specData
              
              let data = res.data.detail
              that.percent = Math.ceil((data.total_inventory - data.surplus_inventory)/data.total_inventory * 100)
              if(data.activity_starttime) {
                if(new Date(data.activity_starttime) > new Date()) {
                  data.activityStart = false
                  countDown(data.activity_endtime,function(nowTime) {
                    that.countDownTime= nowTime
                  })
                }else {
                  that.activityStart = true
                  countDown(data.activity_endtime,function(nowTime) {
                    that.countDownTime= nowTime
                  })
                }  
              }
              
              
              if(that.specData) {
                let obj = {}
                obj.goods_price = that.specData.spec_list[0].form.goods_price
                // 第一个规格第一个商品没图片默认是轮播图第一张
                if(that.specData.spec_list[0].form.image_path) {
                  obj.image_path = that.specData.spec_list[0].form.image_path
                } else {
                  obj.image_path = that.swiperList[0].file_path
                }
                obj.stock_num = that.specData.spec_list[0].form.stock_num
                
                that.goods = obj
                 // 默认选中的规格，以及规格名称
                that.specData.spec_attr.map((item, index) => {
                  that.select_arr.push(item.spec_items[0].item_id)
                  that.select_name.push(item.spec_items[0].spec_value)
                })  
              }
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '商品详情加载失败',
                icon: 'none'
              })
            }
          },
        })  
        
      },
      
      // 商品规格
      selectNorm(shu, li, num) {
        let that = this
        console.log(shu, li , num)
        that.select_arr[shu] = li.item_id
        let arr = []
        let arr2 = []
        
        // 选中的规格id数组
        that.select_arr.map((item, index) => {
          if(index === shu) {
            arr.push(li.item_id)
          } else {
            arr.push(item)
          }
        })
        that.select_arr = arr
        
        // 选中的名称数组
        that.select_name.map((item, index) => {
          if(index === shu) {
            arr2.push(li.spec_value)
          } else {
            arr2.push(item)
          }
        })
        that.select_name = arr2
        
        console.log('选中的规格id', arr, '选中的规格名称',  arr2)
        
        let id = that.select_arr.join('_')
        
        // 图片及价钱和库存
        let obj = that.goods
        that.specData.spec_list.map((item, index) => {
          if(item.spec_sku_id === id) {
            obj.goods_price= item.form.goods_price
            obj.stock_num= item.form.stock_num
            if(item.form.image_path) {
              obj.image_path = item.form.image_path
            }
          }
        })
        that.goods = obj
        
      },
      // 设置商品数量
      controlNum(type) {
        if(type === '+') {
          if(this.goods_num >= this.goods.stock_num) {
            uni.showToast({
              title: '库存不足',
              icon: 'none'
            })
            return
          }
          this.goods_num += 1
        }
        if(type === '-') {
          if(this.goods_num > 1) {
            this.goods_num -= 1
            return
          }
        }
      },
     
      //点击外面加入购物车
      outAddcar() {
        this.isCar = true
        this.normShow = true
      },
      // 立即购买
      buyNow() {
        this.normShow = true
      },
      // 弹窗立即购买
      toBuy() {
        let that = this
        that.$http({
          url: that.$api.buyNowinventory,
          data: {
            goods_id: that.goods_id,
            goods_num: that.goods_num,
            goods_sku_id: that.spec_sku_id
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log('库存充足')
              let data= {
                goods_id: that.goods_id,
                goods_num: that.goods_num,
                goods_sku_id: that.spec_sku_id,
                panic: that.showPanic,
                title: that.title
              }
              uni.navigateTo({
                url: '../order/submitOrder?data=' + JSON.stringify(data)
              })
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '检测库存失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
      // 加入购物车操作
      addCar() {
        let that = this
        let data = {
          goods_sku_id: that.select_arr.length > 0? that.select_arr.join('_'): 0,
          goods_id: that.goods_id,
          goods_num: that.goods_num
        }
        that.$http({
          url: that.$api.addcar,
          method: 'POST',
          data: data,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              uni.showToast({
                title: '添加成功',
                icon: 'none'
              })
              that.normShow = false
            } else if(res.code === 0 || res.code === -1 && res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '加入购物车失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
      // 关闭商品规格弹窗
      closeNorm() {
        this.normShow = false
        this.isCar = false
      },
      
      // 返回
      goBack() {
        uni.navigateBack({
          delta: 1
          })
      },
      navAction(index) {
        this.navIndex = index
      },
      // 分享
      goShare() {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 0,
          href: "http://uniapp.dcloud.io/",
          title: "uni-app分享",
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
          success: function (res) {
            console.log('success:' + JSON.stringify(res));
          },
          fail: function (err) {
            console.log('fail:' + JSON.stringify(err));
          }
        })
      },
      // 收藏
      keepAction() {
        let that = this
        console.log('点击了收藏', that.detail.goods_iscollection, that.detail.goods_id)
        let iscollection = that.detail.goods_iscollection
        let data = {
          type: 'add',
          goods_id: that.detail.goods_id
        }
        if(iscollection === 'yes') {
          data.type = 'cancel'
        }
        that.$http({
          url: that.$api.goodscollection,
          data: data,
          cb: (err, res) => {
            console.log(res)
            if(that.$resFilter(err, res)) {
              that.detail.goods_iscollection = iscollection === 'yes' ? 'no': 'yes'
            }
          }
        })
      },
      // 页面滚动
      scroll(e) {
        this.top = e.detail.scrollTop
        if (e.detail.scrollTop > 375) {
          this.isShowTop = false
          return
        }
        if (e.detail.scrollTop <= 375) {
          this.isShowTop = true
          return
        }
      },
      // 点击促销信息
      lookInfo() {
        this.coverShow = true
      },
      goShopcar() {
        uni.switchTab({
          url: '../shopcar/shopcar'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .topBar{
    background: $title-color;
  }
  .search{
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 88upx;
    height: 88upx;
    font-size: $font-28;
    color: $control-color;
    justify-content: space-between;
    .conduct{
      .share{
        margin: 0 55upx 0 30upx;
      }
    }
    .nav{
      flex: 1;
      display: flex;
      position: relative;
      &>view{
        flex: 1;
        text-align: center;
      }
      .checked{
        color: $color-white;
      }
      .slipe-span{
        position: absolute;
        bottom: 12upx;
        height: 4upx;
        width: 34upx;
        background: $color-red;
        border-radius: 2upx;
        transition: 500ms;
        transform: translateX(-17upx);
      }
    }
    .iconfont{
      height: 40upx;
      line-height: 40upx;
      color:$color-white;
      font-size: $font-40;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 100%;
    }
    .back{
      margin-right: 73upx;
      font-weight: $font-bold;
    }
  }
  .swiper{
    height: 750upx;
    .swiper-item{
      height: 750upx;
      width: 750upx;
      &>image{
        height: 100%;
        width: 100%;
      }
    }  
  }
  .panic{
    height: 130upx;
    padding: 35upx 20upx 0;
    display: flex;
    color: $color-white;
    justify-content: space-between;
    background: $color-yellow;
    .price{
      .newPrice{
        margin-right: 20upx;
        font-size: $font-56;
        line-height: 56upx;
        font-weight: $font-bold;
      }
      .oldPrice{
        position: relative;
        font-size: $font-26;
        line-height: 26upx;
        width: 350upx;
        &:before{
          position: absolute;
          content: '';
          top: 50%;
          transform: translateY(-50%);
          height: 1upx;
          width: 100%;
          background: $color-white;
        }
      }
    }
    .time-box{
      height: 62upx;
      font-size: $font-22;
      text-align: center;
      padding-left: 30upx;
      box-sizing: border-box;
      border-left: 1px solid $color-white;
      .time-info{
        font-size: $font-20;
        line-height: 20upx;
        margin-bottom: 11upx;
        &>.iconfont{
          border-radius: 100%;
          background: $color-white;
          color: $color-yellow;
        }
      }
      .time{
        height: 30upx;
        line-height: 30upx;
        width: 220upx;
        background: rgba(225, 225, 225, 0.3);
        border-radius: 15upx;
        text-align: center;
        .num{
          left: 0;
          top: 0;
          width: 220upx;
          line-height: 30upx;
        }
      }
    }
  }
  .head{
    max-height: 234upx;
    padding: 30upx 44upx 20upx 32upx;
    box-sizing: border-box;
    margin-bottom: 20upx;
    .title{
      margin-bottom: 29upx;
      white-space: nowrap;
      overflow: hidden;
      word-break:break-all;
      text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 2;
      // -webkit-box-orient: vertical;
      font-size: $font-32;
      line-height: 32upx;
    }
    .price{
      margin-bottom: 15upx;
      font-size: $font-36;
      line-height: 36upx;
      font-weight: $font-bold;
    }
    .tags{
      display: flex;
      .tag{
        display: inline-block;
        height: 40upx;
        margin-right: 10upx;
        border-radius: 20upx;
        line-height: 40upx;
        font-size: $font-24;
        background:rgba(244,67,61,0.08);
        color: $color-red;
        &:nth-child(2n-1){
          background:rgba(244,160,61,0.08);
          color: $color-orange
        }
      }
    }
  }
  .row{
    height: 104upx;
    padding: 0 30upx;
    border-bottom: 1upx solid $color-f5;
    display: flex;
    align-items: center;
    .row-name{
      font-size: $font-28;
      color: $color-99;
      margin-right: 44upx;
    }
    .row-info{
      flex: 1;
      font-size: $font-26;
      padding-right: 70upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &>.info{
        padding: 0 14upx;
        background: $title-color;
        color: $color-white;
        line-height: 30upx;
        border-radius: 15upx;
        margin-right: 20upx;
      }
      &>text{
        margin-right: 10upx;
      }
    }
  }
  .big-cover{
    &.toBottom{
      animation: toBottom 2s;
    }
    .white{
      flex: 1;
    }
    .cover-main{
      max-height: 896upx;
      padding-top: 9upx;
      display: flex;
      flex-direction: column;
      .cover-word{
        flex: 1;
        display: flex;
        flex-direction: column;
        
        // 促销信息
        .title{
          font-size: $font-34;
          line-height: 110upx;
          text-align: center;
          font-weight: $font-bold;
        }
        .item{
          display: flex;
          margin-bottom: 28upx;
          line-height: 30upx;
          font-size: $font-26;
          &>text{
            padding: 0 14upx;
            height: 30upx;
            margin-right: 20upx;
            font-size: $font-20;
            color:$color-white;
            background: $title-color;
            border-radius: 15upx;
            flex-wrap: nowrap;
          }
          .red-bg{
            background: $color-red;
          }
          .item-info{
            flex: 1;
            flex-wrap: wrap;
          }
          .item-time{
            margin-top: 15upx;
            font-size: $font-24;
            color: $color-99;
            line-height: 19upx;
          }
        }
        
        // 商品规格
        .header{
          margin: 31upx 0 50upx;
          height: 180upx;
          display: flex;
          .other{
            flex: 1;
            .cancel{
              margin-bottom: 72upx;
              text-align: right;
              font-size: 24upx;
              color: $word-color;
            }
            &>.price{
              margin-bottom: 22upx;
              font-size: $font-32;
              color: $title-color;
              line-height: 31upx;
              &>text{
                font-size: $font-40;
                height: 31upx;
              }
            }
            .storeNum{
              font-size: $font-24;
              color: $color-99;
              line-height: 23upx;
            }
          }
          .img{
            height: 180upx;
            width: 180upx;
            margin-right: 18upx;
            border: 1px solid #ccc;
            &>image{
              height: 100%;
              width: 100%;
            }
          }
        }
        .norm{
          max-height: 628upx;
          width: 100%;
          overflow: hidden;
          .norm-item{
            width: calc(100% + 10upx);
            .norm-title{
              margin-bottom: 24upx;
              font-size: $font-24;
              color: $word-color;
              line-height: 23upx;
            }
            .norm-bar{
              margin-bottom: 20upx;
              display: flex;
              flex-wrap: wrap;
              &>text{
                padding: 0 25upx;
                margin: 0 39upx 20upx 0;
                height: 50upx;
                font-size: $font-26;
                line-height: 50upx;
                border-radius: 25upx;
                background: $color-f5; 
                border: 2upx solid $color-f5;
              }
            }
            .selected{
              border: 2upx solid $color-red!important;
              color: $color-red;
            }
          }
        }
        .control-num{
          display: flex;
          justify-content: space-between;
          height: 45upx;
          padding: 50upx 0;
          margin-top: 10upx;
          border-top: 2upx solid $color-f5;
          &>text{
            font-size: $font-24;
            color: $word-color;
            line-height: 45upx;
          }
          &>view{
            height: 45upx;
            display: flex;
            align-items: center;
            color: $title-color;
            .num{
              padding: 0 35upx;
              margin: 0 19upx;
              font-size: $font-30;
              line-height: 45upx;
              background: $color-f5;
            }
            &>text{
              font-size: $font-24;
            }
          }
        }
      }
      .alert-btn{
        height: 98upx;
        display: flex;
        .sure-btn{
          flex: 1;
          background: $title-color;
          text-align: center;
          font-size: $font-30;
          line-height: 98upx;
          color: $color-white;
        }
        .buy-btn{
          background: $color-red;
        }
      }
      
    }  
  }
  .sale-info{
    height: 114upx;
    margin-bottom: 20upx;
  }
  .user-comment{
    margin-top: 20upx;
    margin-bottom: 20upx;
    padding: 0 30upx 20upx;
    .comment-head{
      height: 94upx;
      font-size: $font-28;
      margin-bottom: 20upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1upx solid $color-f5;
      &>view>text{
        margin-right: 18upx;
      }
      .font-red>.iconfont{
        margin-left: 18upx;
      }
    }
    .comment-writer{
      max-height: 430upx;
      .writer-head{
        height: 78upx;
        margin-top: 30upx;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        &>view>view{
          font-size: $font-26;
          line-height: 44upx;
          margin-bottom: 13upx;
          display: flex;
          &>image{
            height: 44upx;
            width: 44upx;
            border-radius: 100%;
            margin-right: 16upx;
            background: #ccc;
          }
        }
        &>view{
          .font-99{
            font-size: $font-22;
            line-height: 21upx;
          }
        }
      }
      .writer-speak{
        font-size: $font-28;
        line-height: 50upx;
        margin-top: 7upx;
      }
      .writer-speak-img{
        height: 203upx;
        margin-bottom: 30upx;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        &>image{
          height: 203upx;
          width: 203upx;
          margin-right: 10upx;
          background: #ccc;
        }
      }
    }
  }
  .store{
    height: 150upx;
    padding: 0 30upx;
    display: flex;
    align-items: center;
    &>image{
      height: 100upx;
      width: 100upx;
      margin-right: 54upx;
      border-radius: 100%;
      background: #ccc;
    }
    .name{
      flex: 1;
      font-size: $font-32;
    }
    .btn{
      height: 50upx;
      width: 140upx;
      border: 1upx solid $title-color;
      text-align: center;
      font-size: $font-24;
      line-height: 50upx;
      border-radius: 25upx;
    }
  }
  .goods-title{
    position: relative;
    line-height: 80upx;
    width: 380upx;
    margin: 0 auto;
    &:before{
      content: '';
      height: 2upx;
      width: 120upx;
      position:absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      left: 0;
      background: rgba(153, 153, 153, 0.3);
    }
    &:after{
      content: '';
      height: 2upx;
      width: 120upx;
      position:absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      right: 0;
      background: rgba(153, 153, 153, 0.3);
    }
  }
  .bottom-bar{
    height: 98upx;
    line-height: 98upx;
    display: flex;
    .link-menu{
      padding-right: 18upx;
      width: 306upx;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &>view{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: $font-20;
        color: $word-color;
        line-height: 19upx;
        .iconfont{
          font-size: 32upx;
          line-height: 32upx;
          margin-bottom: 12upx;
        }
      }
    }
    .btn-menu{
      flex: 1;
      .btn{
        display: inline-block;
        width: 50%;
        height: 100%;
        line-height: 98upx;
        text-align: center;
        font-size: $font-26;
        color: $color-white;
        background: $title-color;
      }
      .buy{
        background: $color-red;
      }
    }
  }
  .pad-left-60{
    padding-left: 60upx;
  }
</style>
