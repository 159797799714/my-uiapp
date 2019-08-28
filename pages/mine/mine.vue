<template>
  <view class="container">
    <scroll-view scroll-y="true" class="content bg-33">
      <view class="head-main bg-black" :style="{'padding-top': statusBarHeight + 27 + 'px'}">
        <view class="user dis-flex flex-x-between">
          <image :src="userinfo.avatarUrl"></image>
          <view class="person dis-flex flex-dir-column flex-x-end col-f" @click="goPersonal">
            <view class="name font-36">{{ userinfo.nickName ? userinfo.nickName : '未设置昵称' }}</view>
            <view class="sign font-22">这家伙很懒什么都没有留下</view>
          </view>
          <text class="iconfont font-34" @click="goSetting">&#xe676;</text>
        </view>
        <view class="topic dis-flex flex-x-around">
          <view v-for="(item, index) in topicList" :key="index" class="topic-item t-center font-25 font-99">
            <view class="topic-num">{{ item.num }}</view>
            <view class="topic-name">{{ item.name }}</view>
          </view>
        </view>
      </view>
      <view class="linear-border"></view>
      <view class="order bg-black">
        <view class="myorder font-28">
          <text class="col-cc">我的订单</text>
          <view class="col-66" @click="goOrder('全部', 'all')">
            <text>全部订单</text>
            <text class="iconfont">&#xe644;</text>
          </view>
        </view>
      </view>
      <view class="menu border-box dis-flex flex-x-between flex-wrap bg-black">
        <view v-for="(item, index) in menuList" :key="index" v-if="index < 4" class="menu-item dis-flex flex-dir-column flex-y-center" @click="goOrder(item.name, item.dataType)">
          <image :src="item.imgUrl"></image>
          <view class="menu-name col-cc font-26">{{ item.name }}</view>
        </view>
        <view v-for="(item, index) in menuList" :key="index" v-if="index >= 4" class="menu-item dis-flex flex-dir-column flex-y-center" @click="goOthers(item.name)">
          <image :src="item.imgUrl"></image>
          <view class="menu-name col-cc font-26">{{ item.name }}</view>
        </view>
      </view>
      <view class="distribute bg-black">
        <view class="menu-title">我的分销</view>
        <view class="dis-flex flex-x-between">
          <view v-for="(item, index) in distributeList" :key="index" class="row-item dis-flex flex-dir-column flex-y-center">
            <text v-if="index === 0" class="font-76 col-gold iconfont">&#xe6f7;</text>
            <text v-if="index === 1" class="font-76 col-gold iconfont">&#xe660;</text>
            <text v-if="index === 2" class="font-76 col-gold iconfont">&#xe691;</text>
            <text v-if="index === 3" class="font-76 col-gold iconfont">&#xe67c;</text>
            <view class="item-name col-cc font-26">{{ item.name }}</view>
          </view>  
        </view>
      </view>
      
      <view class="distribute bg-black">
        <view class="menu-title">我的福利</view>
        <view class="dis-flex flex-x-between">
          <view v-for="(item, index) in distributeList" :key="index" class="row-item dis-flex flex-dir-column flex-y-center">
            <text v-if="index === 0" class="font-76 col-gold iconfont">&#xe64a;</text>
            <text v-if="index === 1" class="font-76 col-gold iconfont">&#xe614;</text>
            <text v-if="index === 2" class="font-76 col-gold iconfont">&#xe631;</text>
            <text v-if="index === 3" class="font-76 col-gold iconfont">&#xe724;</text>
            <view class="item-name col-cc font-26">{{ item.name }}</view>
          </view>  
        </view>
      </view>
      
      <view class="distribute bg-black">
        <view class="menu-title">我的服务</view>
        <view class="dis-flex flex-x-between">
          <view v-for="(item, index) in distributeList" :key="index" class="row-item dis-flex flex-dir-column flex-y-center">
            <text v-if="index === 0" class="font-76 col-gold iconfont">&#xe7e4;</text>
            <text v-if="index === 1" class="font-76 col-gold iconfont">&#xe60a;</text>
            <text v-if="index === 2" class="font-76 col-gold iconfont">&#xe602;</text>
            <text v-if="index === 3" class="font-76 col-gold iconfont">&#xe693;</text>
            <view class="item-name col-cc font-26">{{ item.name }}</view>
          </view>  
        </view>
      </view>
      <!-- <view class="goods bg-black">
        <view class="goodsTab">
          <view v-for="(item, index) in tabList" :key="index" :class="{ tabItem: true, after: index === tabIndex }" @click="selectTab(index)">{{ item }}</view>
        </view> -->
        
        <!-- 点赞 -->
        <!-- <view v-if="tabIndex === 0" class="goods-content">
          <view v-for="(item, index) in shareList" :key="index" class="item">
            <view class="img"  @click="goShareDetail(item.article_id)">
              <image :src="item.image.file_path" mode="aspectFill"></image>
            </view>
            <view class="title border-box" @click="goShareDetail(item.article_id)">{{ item.article_title }}</view>
            <view class="info border-box">
              <view class="user">
                <view class="userImg">
                  <image :src="item.headimg.file_path" mode="aspectFill"></image>
                </view>
                <view class="userName">{{ item.author }}</view> 
              </view>
              <view class="zan">
                <text :class="{iconfont: true, isZan: true}" @click="clickZan(item, index)">&#xe63a;</text>
                <text>{{ item.like_count }}</text>
              </view>
            </view>
          </view>
        </view> -->
        
         <!-- 收藏 -->
        <!-- <view v-if="tabIndex === 1" class="goods-content">
          <view v-for="(item, index) in goodList" :key="index" class="good-item">
            <view class="good-img"></view>
            <view class="good-info border-box">
              <view class="good-name">{{ item.goods_name }}</view>
              <view class="good-remark">
                <text>{{ item.selling_point }}</text>
              </view>
              <view class="good-price">
                <text>￥{{ item.goods_min_price }}</text>
                <text class="iconfont">&#xe719;</text>
              </view>
            </view>
          </view>
        </view>
      </view> -->
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userinfo: {
          avatarUrl: '',
          nickName: '',
          mobile: '',
        },
        topicList: [{
          num: 1000,
          name: '关注'
        }, {
          num: 222,
          name: '收藏'
        }, {
          num: 1000,
          name: '点赞'
        }, {
          num: 222,
          name: '粉丝'
        }],
        menuList: [
          {
            imgUrl: '../../static/img/mine/mine1.png',
            name: '待付款',
            dataType: 'payment'
          }, {
            imgUrl: '../../static/img/mine/mine2.png',
            name: '待收货',
            dataType: 'received'
          }, {
            imgUrl: '../../static/img/mine/mine3.png',
            name: '待评价',
            dataType: 'comment'
          }, {
            imgUrl: '../../static/img/mine/mine4.png',
            name: '退换/售后',
            dataType: ''
          }, {
            imgUrl: '../../static/img/mine/mine5.png',
            name: '每日签到',
            dataType: ''
          }, {
            imgUrl: '../../static/img/mine/mine6.png',
            name: '我的积分',
            dataType: ''
          }, {
            imgUrl: '../../static/img/mine/mine7.png',
            name: '优惠券',
            dataType: ''
          }, {
            imgUrl: '../../static/img/mine/mine8.png',
            name: '我的钱包',
            dataType: ''
          }
        ],                        // 我的订单第一行
        distributeList: [
          {
            iconName: '&#xe6f7;',
            name: '每日签到',
            dataType: ''
          }, {
            iconName: '&#xe657;',
            name: '我的积分',
            dataType: ''
          }, {
            iconName: '&#xe691;',
            name: '优惠券',
            dataType: ''
          }, {
            iconName: '&#xe67c;',
            name: '我的钱包',
            dataType: ''
          }
        ],                        // 我的订单第二行
        tabIndex: 0,              // 默认选中点赞
        tabList: ['点赞', '收藏'], // tab
        shareList: [],            // 收藏文章列表
        goodList: [],
        sweixin: null,            // 跳转小程序
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad() {
      // 获取当前显示webview
      // this.getPlus()
    },
    onShow() {
      // 获取个人信息
      this.getuserinfo()
      // 获取点赞文章
      this.getArticle()
    },
    watch: {
      tabIndex(val) {
        // 点赞文章列表
        if(val === 0) {
          this.getArticle()
          return
        }
        // 获取收藏商品
        this.getKeepGood()
      }
    },
    methods: {
      
      // getPlus() {
      //     //获取当前显示的webview
      //     var pages = getCurrentPages()
      //     var page = pages[pages.length - 1]
      //     var currentWebview = page.$getAppWebview()
      //     //调用H5+APP的扩展API
      //     var shares=null;
      //     let that = this
      //     var pusher = plus.share.getServices(function(s){
      //       shares={};
      //       for(var i in s){
      //         var t=s[i];
      //         shares[t.id]=t;
      //       }
      //       that.sweixin=shares['weixin'];
      //     }, function(e){
      //       console.log("获取分享服务列表失败："+e.message);
      //     });
      //     //放入当前的webview
      //     currentWebview.append(pusher);
      //   },
      // checkWeChat() {
      //   //调用微信小程序
      //   this.sweixin.launchMiniProgram({
      //     id:'gh_d5318ceadc5f' //要跳转小程序的原始ID
      //   })
      // },
      
      
      // 进入个人信息页面
      goPersonal() {
        uni.navigateTo({
          url: 'personal?userinfo=' + JSON.stringify(this.userinfo)
        })
      },
      // 获取个人用户信息
      getuserinfo() {
        this.$http({
          url: this.$api.getuserinfo,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              this.userinfo = res.data.info
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '个人用户信息获取失败',
                icon: 'none'
              })
            }
          }
          
        })
      },
      
      // 点赞或者收藏
      selectTab(index) {
        this.tabIndex = index
      },
      
      // 获取点赞文章列表
      getArticle() {
        this.$http({
          url: this.$api.mylikearticles,
          method: 'POST',
          cb: (err, res) => {
            if(!err && res.code === 1) {
              this.shareList = res.data.myarticles.data
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '点赞文章获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      
      // 获取收藏的商品列表
      getKeepGood() {
        this.$http({
          url: this.$api.mycollection,
          method: 'POST',
          cb: (err, res) => {
            if(!err && res.code === 1) {
              
              console.log('成功了收藏', res.data.mygoods.data)
              this.goodList = res.data.mygoods.data
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '收藏商品列表获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      goChild(index) {
        switch(index) {
          case 0:
            uni.navigateTo({
              url: 'discount'
            })
            break
          case 1:
            uni.navigateTo({
              url: 'sign'
            })
            break
          case 2:
            uni.navigateTo({
              url: 'looks'
            })
            break
          case 3:
            uni.navigateTo({
              url: 'bonus/bonusCenter'
            })
            break
        }
      },
      // 分享详情页
      goShareDetail(id) {
        uni.navigateTo({
          url: '../components/shareInfo?article_id=' + id
        })
      },
      // 订单页
      goOrder(name, type) {
        uni.navigateTo({
          url: '../order/order?name=' + name + '&dataType=' + type
        })
      },
      goSetting() {
        uni.navigateTo({
          url: 'setting?userinfo=' + JSON.stringify(this.userinfo)
        })
      },
      
      // 点赞文章点赞
      clickZan(item, index) {
        let that = this
        let url = this.$api.unLike
        this.$http({
          url: url,
          data: {
            article_id: item.article_id
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              uni.showToast({
                title: '取消点赞成功',
                icon: 'none'
              })
              that.shareList.splice(index, 1)
            } else if(res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
                uni.showToast({
                  title: '取消点赞失败',
                  icon: 'none'
                })
              }
            }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .iconfont{
    margin-right: 0;
  }
  .content{
    display: flex;
    flex-direction: column;
    color: $title-color;
    .head-main{
      height: 268upx;
      width: 100%;
      color: $color-white;
      background: rgba(0, 0, 0, 0.8);
      .navigator{
        position: relative;
        height: 90upx;
        padding: 0 30upx;
        margin-bottom: 33upx;
        line-height: 90upx;
        text-align: center;
        font-size: $font-36;
        display: flex;
        .title{
          flex: 1;
          &>text{
            display: block;
            position: absolute;
            right: 30upx;
            top: 0;
            font-size: $font-38;
          }
        }
        
      }
      .user{
        margin-bottom: 23upx;
        padding: 0 67upx;
        height: 114upx;
        &>image{
          height: 114upx;
          width: 114upx;
          margin-right: 37upx;
          border-radius: 100%;
          border: 2px solid $color-cc;
        }
        .person{
          flex: 1;
          font-size: $font-22;
          color: $color-99;
          letter-spacing: 1upx;
          .name{
            margin-bottom: 10upx;
            font-size: $font-36;
            line-height: 36upx;
            color: $color-white;
          }
          .uenum{
            line-height: 54upx;
            margin-bottom: 5upx;
          }
        }
      }
    }
    .topic{
      padding: 0 67upx;
      height: 84upx;
      .topic-item{
        padding: 26upx 0 13upx;
        flex: 1;
      }
      
    }
    .linear-border{
      height: 6upx;
      width: 100%;
    }
    .order{
      width: 100%;
      padding: 0 30upx;
      box-sizing: border-box;
      .myorder{
        display: flex;
        justify-content: space-between;
        height: 75upx;
        padding-left: 38upx;
        line-height: 75upx;
        &>view>text{
          margin-left: 15upx;
        }
      }
    }
    .menu{
      padding: 0 40upx;
      height: 410upx;
      overflow: hidden;
      .menu-item{
        width: 164upx;
        &>image{
          height: 86upx;
          width: 86upx;
          margin: 46upx 0 15upx;
        }
        .menu-name{
          margin-bottom: 23upx;
          line-height: 24upx;
        }
      }
    }
    .distribute{
      margin-top: 20upx;
      padding: 37upx 40upx;
    }
    .row-item{
      width: 164upx;
      &>image{
        height: 65upx;
        width: 81upx;
        margin-bottom: 20upx;
      }
    }
    .menu-title{
      margin-bottom: 30upx;
      padding: 0 38upx;
      font-size: $font-28;
      color: $color-cc;
      line-height: 28upx;
    }
    
    
    
    
    // 注释的收藏和点赞
    
    .goods{
      padding: 33upx 30upx;
      .goodsTab{
        height: 70upx;
        padding: 0 150upx;
        margin-bottom: 20upx;
        display: flex;
        font-size: $font-34;
        font-weight: $font-bold;
        line-height: 70upx;
        border-bottom: 2px solid $color-f5;
        .tabItem{
          flex: 1;
          position: relative;
          text-align: center;
        }
        .after{
          &::before{
            display: block;
            position: absolute;
            bottom: 0;
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
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
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
      }
    }
  }
</style>
