<template>
  <view class="container">
    <view class="topBar">
      <!-- :style="{background: 'rgba(0, 0, 0,' + top / 375 + ')'}" -->
      <view class="search">
        <text class="iconfont back" @click="goBack">&#xe61c;</text>
        <view class="nav" :style="{opacity: top / 375}">
          <view v-for="(item, index) in navList" :key="index" :class="{checked: index === navIndex}" @click="navAction(index)">{{ item }}</view>
          <view class="slipe-span" :style="{left: (1 / navList.length / 2 * (navIndex * 2 + 1) ) * 100 + '%'}"></view>
        </view>
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
      <view v-if="showPanic" class="panic border-box">
        <view class="price">
          <text class="newPrice">￥199.00</text>
          <text class="oldPrice">￥700</text>
        </view>
        <view class="time-box">
          <view class="time-info">
            <text class="iconfont">&#xe6b9;</text>距开抢00:10:50.08
          </view>
          <view class="time">今天17:00开抢</view>
        </view>
      </view>
      <view class="head bg-white">
        <view class="title">{{ detail.goods_name }}</view>
        <view class="price font-red">￥{{ detail.sku[0].goods_price }}</view>
        <view v-if="detail.selling_point" class="tags">
          <text class="tag">{{ detail.selling_point }}</text>
        </view>
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
            <text>用户评价</text> ({{ comment_data_count }})
          </view>
          <view class="font-red">
            <text>查看全部</text>
            <text class="iconfont">&#xe644;</text>
          </view>
        </view>
        <view v-for="(item, idnex) in detail.comment_data" :key="index" class="comment-writer">
          <view class="writer-head">
            <view>
              <view>
                <image src="" mode=""></image>
                <text>炒饭</text>
              </view>
              <view class="font-99">
                <text>2018.10.13 13:11</text>
                <text>黑色；官方标配</text>
              </view>
              <view></view>
            </view>
            <text class="iconfont font-99">&#xe63a;</text>
          </view>
          <view class="writer-speak">很喜欢，音质不错，算是物超所值了。</view>
          <view class="writer-speak-img">
            <image src="" mode=""></image>
          </view>
        </view>
      </view>
      
      <!-- <view  class="store bg-white">
        <image src="" mode=""></image>
        <view class="name">{{ store.name }}</view>
        <view class="btn">进店逛逛</view>
      </view> -->
      
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
        <view class="btn buy">立即购买</view>
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
      <view class="white"></view>
      <view class="cover-main bg-white border-box">
        <view class="cover-word border-box padding-30">
          <view class="header">
            <view class="img">
              <image :src="goods.image_path" mode=""></image>
            </view>
            <view class="other">
              <view class="cancel">
                <text class="iconfont" @click="closeNorm">&#xe613;</text>
              </view>
              <view class="price">￥<text>{{ goods.goods_price }}</text></view>
              <view class="storeNum">仅剩{{ goods.stock_num }}件</view>
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
                <text class="iconfont" @click="controlNum('-')">&#xe643;</text>
                <text class="num">{{ goods_num }}</text>
                <text class="iconfont" @click="controlNum('+')">&#xe620;</text>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="alert-btn">
          <view v-if="isCar" class="sure-btn" @click="addCar">确认</view>
          <view v-if="!isCar" class="sure-btn"  @click="addCar">加入购物车</view>
          <view v-if="!isCar" class="sure-btn buy-btn">立即购买</view>  
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  import uParse from  "../../components/uni-rich/parse.vue"
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
        spec_sku_id: '',                      // 选中商品id拼接信息  例子：10028_10253_10256
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
        // },                                      // 店名头像信息
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
        normShow: false,                        // 商品规格弹窗
      }
    },
    // 接受首页传递的参数
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option)
      this.goods_id = option.goods_id
      if(option.panic === 'true') {
        this.showPanic = true
        return
      }
      
      // 获取商品详情
      this.getDetail()
    },
    methods: {
      
      // 获取商品详情
      getDetail() {
        let that = this
        this.$http({
          url: this.$api.goods_detail,
          data: {
            goods_id: this.goods_id
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              console.log(res.data.detail)
              that.detail = res.data.detail
              that.comment_data = that.detail.comment_data
              that.comment_data_count = that.detail.comment_data_count
              that.swiperList = that.detail.image
              that.specData = res.data.specData
              // that.spec_sku_id = that.specData.spec_attr[0].spec_items[0].item_id + '_' + 
              
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
          }
        })
      },
      
      // 商品规格
      selectNorm(shu, li, num) {
        console.log(shu, li , num)
        this.select_arr[shu] = li.item_id
        let arr = []
        let arr2 = []
        
        // 选中的规格id数组
        this.select_arr.map((item, index) => {
          if(index === shu) {
            arr.push(li.item_id)
          } else {
            arr.push(item)
          }
        })
        this.select_arr = arr
        
        // 选中的名称数组
        this.select_name.map((item, index) => {
          if(index === shu) {
            arr2.push(li.spec_value)
          } else {
            arr2.push(item)
          }
        })
        this.select_name = arr2
        
        console.log('选中的规格id', arr, '选中的规格名称',  arr2)
        
        let id = this.select_arr.join('_')
        
        // 图片及价钱和库存
        let obj = this.goods
        this.specData.spec_list.map((item, index) => {
          if(item.spec_sku_id === id) {
            obj.goods_price= item.form.goods_price
            obj.stock_num= item.form.stock_num
            if(item.form.image_path) {
              obj.image_path = item.form.image_path
            }
          }
        })
        this.goods = obj
        
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
      
      // 加入购物车操作
      addCar() {
        console.log(this.goods_id, this.goods_num, this.select_arr.join('_'))  // goods_sku_id
        let that = this
        let data = {
          goods_sku_id: that.select_arr.join('_'),
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
        console.log('点击了收藏')
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
      margin-bottom: 35upx;
      font-size: $font-36;
      line-height: 36upx;
      font-weight: $font-bold;
    }
    .tags{
      display: flex;
      .tag{
        display: inline-block;
        height: 40upx;
        padding: 0 17upx;
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
      height: 896upx;
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
          height: 628upx;
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
    padding: 0 30upx;
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
      height: 332upx;
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
        height: 110upx;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        &>image{
          height: 110upx;
          width: 110upx;
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
</style>
