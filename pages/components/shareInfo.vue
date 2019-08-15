<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px', top: isHeadShow? '0': '-88px' }">
      <view class="search">
        <text class="iconfont" @click="goBack">&#xe61c;</text>
        <view class="center">
          <image :src="userInfo.file_path" mode="aspectFill"></image>
          <text class="name">{{ userInfo.author }}</text>
        </view>
        <text class="iconfont" @click="goShare">&#xe60f;</text>
      </view>
    </view>
    <scroll-view scroll-y="true" class="content" @scroll="onScroll">
      <!-- <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration" :circular="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view :class="{'swiper-item': true, 'bg_primary': true}">
            <image :src="item.banner_img" mode=""></image>
          </view>
        </swiper-item>
      </swiper> -->
      
      <!-- 歌单推荐 -->
      <!-- <view class="songs padding-30 border-box">
      	<view class="song-share">
          <view class="title">
            <text>歌单推荐</text>(4首)
          </view>
      	  <view>
            全部<text class="iconfont">&#xe644;</text>
          </view>
      	</view>
        <view class="sing">
          <audio :style="{'text-align': 'left'}" :src="current.src" :controls="false">
            <text class="iconfont">&#xe62b;</text>
          </audio>
        </view>
      </view> -->
      <view>
        <image :src="detail.image.file_path" mode="widthFix" style="width: 100%"></image>
      </view>
      <view class="cultureInfo bg-white">
       <view class="cultureTitle font-30">{{ detail.article_title }}</view>
        <!-- <view class="cultureCategory">
        <text v-for="(item, index) in cultureInfo.tags" :key="index">{{ item }}</text>
        </view> 
        <view class="cultureTime">{{ detail.headimg.create_time }}</view> -->
        <view class="cultureWords">
          <!-- <rich-text type="node" :nodes="strings"></rich-text> -->
          <u-parse :content="strings" @preview="preview" @navigate="navigate"/>
        </view>
      </view>
      
      <!-- 商品 -->
      <view v-for="(item, index) in detail.article_goods_info" :key="index" class="good dis-flex flex-x-between border-box bg-white" @click="gogoodDetail(item)">
        <view class="left">
          <image :src="item.image[0].file_path" mode="widthFix"></image>
        </view>
        <view class="right border-box dis-flex flex-dir-column flex-x-between">
          <view class="good-name font-30 twolist-hidden">{{ item.goods_name }}</view>
          <view class="good-info dis-flex flex-x-between font-32">
            <view class="good-price col-m">￥{{item.sku[0].goods_price}}</view>
            <view class="good-btn col-f bg-orange t-center b-r-10">去选购</view>
          </view>
        </view>
      </view>
      
      <!-- 评论 -->
      <view class="comment bg-white">
        <view class="total f-bold font-36">评论({{ detail.comments.num }})</view>
        <view v-for="(item, index) in detail.comments_show" :key="index" v-if="index < 10" :class="{ item: true, 'border-box': true, 'no-border': index === 0 }">
          <view class="writer">
            <view class="writerImg">
              <image :src="item.avatarUrl" mode=""></image>
            </view>
            <view class="writer-center">
              <view class="writer-father">
                <view class="writer-name">{{ item.nickName }}</view>
                <view class="writer-speak">{{ item.content }}<text>{{ item.input_date }}</text></view>
                <view class="zan">
                  <text :class="{iconfont: true, isZan: item.islike === 'yes'}" @click="zanAction(item, index)">&#xe63a;</text>
                  <text>{{ item.likenum }}</text>
                </view>
              </view>
              <view v-for="(li, num) in item.replys" :key="num" v-if="num < 2 " class="writer-child">
                <image class="childImg"></image>
                <view class="childCenter">
                  <view class="writer-name">{{ li.reply_name }}</view>
                  <view class="writer-speak">{{ li.reply_content }}<text>{{ li.reply_input_time }}</text></view>
                </view>
                <view class="zan">
                  <text class="iconfont">&#xe63a;</text>
                  <text>{{ li.likenum }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="speak bg-white border-box">
      <input type="text" v-model="speakVal" placeholder="留下你的精彩评论吧" @confirm="addComment" @input="onInput"/>
      <view>
        <text class="iconfont">&#xe69d;</text>
        <text>{{ detail.comments.num }}</text>
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
        scrollTop: 0,                   // 距滚动距离
        isHeadShow: true,              // 头部作者名
        title: '',
        article_id: '',                               // 文章ID
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#ffffff',
        detail: {},
        userInfo: {},
        cultureInfo: {
          title: '2019深圳奶油田电音节',
          tags: ['深圳奶油田', '深圳'],
          time: '2019-05-16',
          words: '邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队KnifeParty等，一系列世界级百慕大DJ及国际流行巨星齐现阵。一系列世界级百慕大DJ及国际流行巨星齐现阵。除了力为消费者带来前所未有的跟世界音乐巨星接触的机会，作为风暴电音节的主赞助商，随时随地可以去发现、体检、享受电音所带来的无限兴奋和快乐。'
        },
        strings: [],
        // commentList: [{
        //   imgUrl: '',
        //   name: '撒浪嘿',
        //   speak: '终于有机会去一次音乐节，现场嗨爆了感觉人生已经到了高潮，哈哈。',
        //   time: '05-12',
        //   zan: 666,
        //   zan_status: 1,
        //   writerChild: [
        //     {
        //       imgUrl: '',
        //       name: '@看灰机',
        //       speak: '的确，现场太燃了，而且很多漂亮小姐姐。',
        //       time: '05-12',
        //       zan: 999,
        //       zan_status: 1
        //     }
        //   ]
        // }],               // 评论信息
        speakVal: '',     // 我的评论value值
        sumList: {
          zanTotal: 2000,
          starTotal: 1578,
          megTotal: 1959
        }
      }
    },
    // 接受首页传递的参数
    onLoad(option) {
      this.article_id = option.article_id
      this.getDetail(this.article_id)
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
          })
      },
      onScroll(e) {
        let that = this
        if(e.detail.scrollTop > that.scrollTop && that.isHeadShow) {
          that.isHeadShow= false
          // 停留一段时间不滚动，自动出现顶部返回
          setTimeout(function() {
            that.isHeadShow = true
          }, 5000)
        } else if(e.detail.scrollTop < that.scrollTop && !that.isHeadShow){
          that.isHeadShow= true
        }
        that.scrollTop= e.detail.scrollTop
      },
      
      // 获取文章详情
      getDetail(id) {
        this.$http({
          url: this.$api.detailing,
          data: {
            article_id: id
          },
          cb: (err, res) => {
            console.log(res.data.detail)
            let detail = res.data.detail
            this.detail = detail
            this.swiperList = detail.banners
            // 文章标题等
            this.cultureInfo.title = detail.article_title
            
            this.userInfo = {
              file_path: detail.headimg.file_path,
              author: detail.author
            }
            var richtext =  detail.article_content
            const regex = new RegExp('img')
            richtext= richtext.replace(regex, `img style="max-width: 100%;"`)
            
            this.strings = richtext
            
            
            this.cultureInfo.time = detail.update_time
          }
        })
      },
      gogoodDetail(item) {
        console.log(item)
        uni.navigateTo({
          url: './goodDetail?goods_id=' + item.goods_id
        })
      },
      // 评论点赞
      zanAction(item, index) {
        console.log('点赞', item, item.islike, index)
        let url = this.$api.commentunlike
        if(item.islike === 'no') {
          url = this.$api.commentlike
        }
        this.$http({
          url: url,
          data: {
            comment_id: item.id
          },
          cb: (err, res) => {
            if(!err && res) {
              switch(this.detail.comments_show[index].islike) {
                case 'yes':
                  this.detail.comments_show[index].islike = 'no'
                  this.detail.comments_show[index].likenum -= 1
                  uni.showToast({
                  	title: '取消点赞成功',
                    icon: 'none'
                  })
                  break
                case 'no':
                  this.detail.comments_show[index].islike = 'yes'
                  this.detail.comments_show[index].likenum += 1
                  uni.showToast({
                  	title: '点赞成功',
                    icon: 'none'
                  })
                  break
              }
            } else {
              switch(this.detail.comments_show[index].islike) {
                case 'yes':
                  uni.showToast({
                  	title: '取消点赞失败',
                    icon: 'none'
                  })
                  break
                case 'no':
                  uni.showToast({
                  	title: '点赞失败请重试',
                    icon: 'none'
                  })
                  break
              }
            }
          }
        })
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
            console.log("success:" + JSON.stringify(res));
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
          }
        })
      },
      onInput(e) {
        this.speakVal = e.detail.value
      },
      // 发布评论
      addComment(e) {
        console.log(this.speakVal)
        this.$http({
          url: this.$api.addcomments,
          data: {
            article_id: this.article_id,
            comment: e.detail.value
          },
          cb: (err, res) => {
            if(!err && res.code === 1) {
              // 成功后刷新数据
              this.getDetail(this.article_id)
              this.speakVal = ''
              uni.showToast({
              	title: '评论发布成功',
                icon: 'none'
              })
            } else {
              uni.showToast({
              	title: '发布失败请重试',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url("../../components/uni-rich/parse.css");
  .topBar{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
    transition: 500ms;
    .search{
      display: flex;
      width: 100%;
      font-size: $font-38;
      color: $color-white;
      line-height: 88upx;
      align-items: center;
      .center{
        flex: 1;
        display: flex;
        margin: 0 34upx;
        align-items: center;
        &>image{
          height: 60upx;
          width: 60upx;
          margin-right: 27upx;
          border-radius: 100%;
          background: rgba(0, 0, 0, 0.6);
        }
      }
      .iconfont{
        font-size: $font-40;
      }
    }
  }
  .swiper{
    height: 748upx;
    .swiper-item{
      height: 748upx;
      width: 748upx;
      &>image{
        height: 100%;
        width: 100%;
      }
    }  
  }
  .songs{
    height: 207upx;
    .song-share{
      height: 93upx;
      display: flex;
      justify-content: space-between;
      font-size: $font-24;
      color: $word-color;
      line-height: 93upx;
      .title{
        &>text{
          margin-right: 25upx;
          font-size: $font-36;
          font-weight: $font-bold;
          color: $title-color;
        }
      }
    }
    .sing{
      height: 114upx;
      display: flex;
      justify-content: space-between;
    }
  }
  .cultureInfo{
    display: flex;
    flex-direction: column;
    padding: 30upx 30upx 0;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .cultureTitle{
      font-weight: $font-bold;
      line-height: 56upx;
    }
    .cultureCategory{
      height: 40upx;
      line-height: 40upx;
      margin-bottom: 30upx;
      font-size: $font-24;
      overflow: auto;
      white-space: nowrap;
      &>text{
        margin-right: 20upx;
        display: inline-block;
        line-height: 40upx;
        padding-left: 20upx;
        padding-right: 26upx;
        border-radius: 20upx;
        background: $color-f5;
      }
    }
    .cultureTime{
      margin-bottom: 30upx;
      height: 20upx;
      line-height: 20upx;
      color: $control-color;
      font-size: $font-24;
    }
    .cultureWords{
      width: 100%;
      font-size: $font-28;
      word-break:break-all;
      line-height: 40upx;
      color: $word-color;
      image{
        max-width: 500upx;
      }
    }
    
  }
  .good{
    height: 290upx;
    width: 100%;
    padding: 20upx;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    .left{
      width: 250upx;
      height: 100%;
      margin-right: 30upx;
      &>image{
        width: 250upx;
        height: 100%;
      }
    }
    .right{
      flex: 1;
      padding-top: 10upx;
      .good-info{
        line-height: 70upx;
      }
      .good-btn{
        margin-right: 20upx;
        width: 180upx;
        height: 70upx;
      }
    }
  }
  .comment{
    padding: 40upx 40upx 0 35upx;
    margin: 30upx 0 99upx;
    .total{
      line-height: 34upx;
    }
    .item{
      min-height: 150upx;
      padding-top: 30upx;
      padding-bottom: 27upx;
      border-top: 2upx solid $color-f5;
      .writer{
        display: flex;
        .writerImg{
          height: 66upx;
          width: 66upx;
          border-radius: 100%;
          margin-right: 30upx;
          border: 1px solid $color-f5;
          overflow: hidden;
          &>image{
            height: 100%;
            width: 100%;
          }
        }
        .writer-center{
          flex: 1;
          padding-right: 70upx;
          overflow: hidden;
          .writer-father, .writer-child{
            position: relative;
            .zan{
              position: absolute;
              right: -70upx;
              top: 0;
            }
            .isZan{
              position: relative;
              &::before{
                content: '';
                height: 13upx;
                width: 14upx;
                background: $color-red;
                position: absolute;
                bottom: 6upx;
                left: 8upx;
              }
            }
          }
          .writer-name{
            font-size: $font-26;
            line-height: 25upx;
            color: $word-color;
            margin-bottom: 20upx;
          }
          .writer-speak{
            margin-bottom: 40upx;
            font-size: $font-28;
            line-height: 36upx;
            word-break:break-all;
            &>text{
              margin-left: 10upx;
              font-size: $font-24;
              line-height: 36upx;
              color: $word-color;
            }
          }
          .writer-child{
            display: flex;
            min-height: 150upx;
            .childImg{
              height: 44upx;
              width: 44upx;
              margin-right: 30upx;
              background: #ccc;
              border-radius: 100%;
            }
            .childCenter{
              flex: 1;
            }
            
          }
        }
        .zan{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .iconfont{
            font-size: $font-36;
            margin: 0;
            color: $control-color;
          }
          &>text{
            font-size: $font-20;
            line-height: 36upx;
            color: $word-color;
          }
        }
      }
    }
    .no-border{
      border-top: 0;
    }
  }
  .speak{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 99upx;
    margin-top: 1upx;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    padding: 0 30upx;
    border-top: 1px solid $color-f5;
    &>input{
      flex: 1;
      height: 60upx;
      border-radius: 30upx;
      padding: 0 30upx;
      box-sizing: border-box;
      font-size: $font-22;
      background: $color-f5;
    }
    &>view{
      margin: 0 35upx 0;
      height: 60upx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont{
        font-size: $font-36;
        line-height: 36upx;
        color: $word-color;
        margin: 0;
      }
      &>text{
        font-size: $font-20;
        line-height: 34upx;
        color: $word-color;
      }
    }
  }
</style>
