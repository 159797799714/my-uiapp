<template>
  <view class="container">
    <scroll-view scroll-y="true" class="content">
      <view class="header">
        <image src="../../static/img/mine/bg.png" class="head-bg"></image>
        <view class="head-main">
          <view class="navigator">
            <view class="title">
              我的
              <text class="iconfont" @click="goSetting">&#xe676;</text>
            </view>
          </view>
          <view class="user">
            <image :src="userinfo.avatarUrl" mode=""></image>
            <view @click="goPersonal">
              <view class="name">{{ userinfo.nickName ? userinfo.nickName : '未设置昵称' }}</view>
              <view class="uenum">UE号：{{ userinfo.mobile ? userinfo.mobile : '未绑定手机号' }}</view>
              <view class="sign">这家伙很懒什么都没有留下</view>
            </view>
          </view>
        </view>
      </view>
      <view class="order bg-white">
        <view class="myorder" @click="goOrder('全部', 'all')">
          <text>我的订单</text>
          <view>
            <text>全部订单</text>
            <text class="iconfont">&#xe644;</text>
          </view>
        </view>
        <view class="row1">
          <view v-for="(item, index) in menuList1" :key="index" @click="goOrder(item.name, item.dataType)">
            <image :src="item.imgUrl" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
        </view>
        
        <!--  优惠券菜单等 -->
        <view class="row2">
          <view v-for="(item, index) in menuList2" :key="index" @click="goChild(index)">
            <image :src="item.imgUrl" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
      <view class="goods bg-white">
        <view class="goodsTab">
          <view v-for="(item, index) in tabList" :key="index" :class="{ tabItem: true, after: index === tabIndex }" @click="selectTab(index)">{{ item }}</view>
        </view>
        
        <!-- 收藏 -->
        <view v-if="tabIndex === 0" class="goods-content">
          <view v-for="(item, index) in shareList" :key="index" class="item">
            <view class="img"  @click="goShareDetail(item.article_id)">
              <image :src="item.image.file_path" mode=""></image>
            </view>
            <view class="title border-box" @click="goShareDetail(item.article_id)">{{ item.article_title }}</view>
            <view class="info border-box">
              <view class="user">
                <view class="userImg">
                  <image :src="item.headimg.file_path" mode=""></image>
                </view>
                <view class="userName">{{ item.author }}</view> 
              </view>
              <view class="zan">
                <text :class="{iconfont: true, isZan: true}" @click="clickZan(item, index)">&#xe63a;</text>
                <text>{{ item.like_count }}</text>
              </view>
            </view>
          </view>
        </view>
        
         <!-- 点赞 -->
        <view v-if="tabIndex === 1" class="goods-content">
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
      </view>
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
        menuList1: [
          {
            imgUrl: '../../static/img/mine/staypay.png',
            name: '待付款',
            dataType: 'payment'
          }, {
            imgUrl: '../../static/img/mine/stayreceive.png',
            name: '待收货',
            dataType: 'received'
          }, {
            imgUrl: '../../static/img/mine/stayassess.png',
            name: '待评价',
            dataType: 'comment'
          }, {
            imgUrl: '../../static/img/mine/success.png',
            name: '已完成',
            dataType: ''
          }, {
            imgUrl: '../../static/img/mine/cancel.png',
            name: '已取消',
            dataType: ''
          }
        ],                        // 我的订单第一行
        menuList2: [
          {
            imgUrl: '../../static/img/mine/discount.png',
            name: '优惠券'
          }, {
            imgUrl: '../../static/img/mine/sign.png',
            name: '我的签到'
          }, {
            imgUrl: '../../static/img/mine/recording.png',
            name: '最近浏览'
          }, {
            imgUrl: '../../static/img/mine/share.png',
            name: '我的推广'
          }
        ],                        // 我的订单第二行
        tabIndex: 0,              // 默认选中点赞
        tabList: ['点赞', '收藏'], // tab
        shareList: [],            // 收藏文章列表
        goodList: []
      }
    },
    onLoad() {
      
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
  .content{
    display: flex;
    flex-direction: column;
    color: $title-color;
    .header, .head-bg{
      height: 378upx;
      width: 100%;
    }
    .header{
      position: relative;
    }
    .head-main{
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 88upx;
      height: 310upx;
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
        display: flex;
        padding: 0 67upx;
        &>image{
          height: 114upx;
          width: 114upx;
          margin-right: 37upx;
          border-radius: 100%;
        }
        &>view{
          flex: 1;
          font-size: $font-22;
          color: $color-99;
          .name{
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
    .order{
      position: absolute;
      width: 100%;
      height: 436upx;
      padding: 0 30upx 0 30upx;
      box-shadow:0upx 0upx 24upx 0upx rgba(190,190,190,0.27);
      border-radius:10upx 10upx 0upx 0upx;
      box-sizing: border-box;
      .myorder{
        display: flex;
        justify-content: space-between;
        height: 75upx;
        padding-left: 30upx;
        line-height: 75upx;
        font-size: $font-28;
        border-bottom: 2px solid $color-f5;
        &>text{
          font-weight: $font-bold;
        }
        &>view>text{
          margin-left: 15upx;
          color: $word-color;
        }
      }
      .row1, .row2{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $font-24;
        line-height: $font-24;
        &>view{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .row1{
        padding: 28upx;
        border-bottom: 2px solid $color-f5;
        &>view>image{
          height: 84upx;
          width: 84upx;
          margin-bottom: 14upx;
        }
      }
      .row2{
        padding: 28upx 62upx;
        &>view>image{
          height: 81upx;
          width: 81upx;
          margin-bottom: 14upx;
        }
      }
    }
    .goods{
      margin-top: 436upx;
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
