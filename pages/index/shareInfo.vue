<template>
  <view class="container">
    <scroll-view scroll-y="true" class="content">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-active-color="indicatorActiveColor" :interval="interval" :duration="duration" :circular="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view :class="{'swiper-item': true, 'bg_primary': true}"></view>
        </swiper-item>
      </swiper>
      <view class="userInfo">
        <image src="" mode=""></image>
        <text class="userName">{{ userInfo.userName }}</text>
      </view>
      <view class="cultureInfo bg-white">
        <!-- <view class="cultureTitle">{{ cultureInfo.title }}</view> -->
        <view class="cultureTitle">{{ title }}</view>
        <view class="cultureCategory">
          <text v-for="(item, index) in cultureInfo.tags" :key="index">{{ item }}</text>
        </view>
        <view class="cultureTime">{{ cultureInfo.time }}</view>
        <scroll-view scroll-y="true" class="cultureWords">{{ cultureInfo.words }}</scroll-view>
      </view>
      <view class="comment bg-white">
        <view class="total">评论({{ total }})</view>
        <view v-for="(item, index) in commentList" :key="index" :class="{ item: true, 'no-border': index === 0 }">
          <view class="writer">
            <image class="writerImg"></image>
            <view class="writer-center">
              <view class="writer-father">
                <view class="writer-name">{{ item.name }}</view>
                <view class="writer-speak">{{ item.speak }}<text>{{ item.time }}</text></view>
                <view class="zan">
                  <text class="iconfont">&#xe63a;</text>
                  <text>{{ item.zan }}</text>
                </view>
              </view>
              <view v-for="(item, index) in item.writerChild" :key="index" v-if="index < 2 " class="writer-child">
                <image class="childImg"></image>
                <view class="childCenter">
                  <view class="writer-name">{{ item.name }}</view>
                  <view class="writer-speak">{{ item.speak }}<text>{{ item.time }}</text></view>
                </view>
                <view class="zan">
                  <text class="iconfont">&#xe63a;</text>
                  <text>{{ item.zan }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="speak bg-white">
      <input type="text" :value="speakVal" placeholder="留下你的精彩评论吧"/>
      <view>
        <text class="iconfont">&#xe63a;</text>
        <text>{{ sumList.zanTotal }}</text>
      </view>
      <view>
        <text class="iconfont">&#xe637;</text>
        <text>{{ sumList.starTotal }}</text>
      </view>
      <view>
        <text class="iconfont">&#xe6cc;</text>
        <text>{{ sumList.megTotal }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        indicatorActiveColor: '#ffffff',
        swiperList: [{}, {}, {}],
        userInfo: {
          imgUrl: '',
          userName: '奶油田官方'
        },
        cultureInfo: {
          title: '2019深圳奶油田电音节',
          tags: ['深圳奶油田', '深圳'],
          time: '2019-05-16',
          words: '邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队KnifeParty等，一系列世界级百慕大DJ及国际流行巨星齐现阵。一系列世界级百慕大DJ及国际流行巨星齐现阵。除了力为消费者带来前所未有的跟世界音乐巨星接触的机会，作为风暴电音节的主赞助商，随时随地可以去发现、体检、享受电音所带来的无限兴奋和快乐。'
        },
        total: 1212,        // 评论总数
        commentList: [
          {
            imgUrl: '',
            name: '撒浪嘿',
            speak: '终于有机会去一次音乐节，现场嗨爆了感觉人生已经到了高潮，哈哈。',
            time: '05-12',
            zan: 666,
            zan_status: 1,
            writerChild: [
              {
                imgUrl: '',
                name: '@看灰机',
                speak: '的确，现场太燃了，而且很多漂亮小姐姐。',
                time: '05-12',
                zan: 999,
                zan_status: 1
              }
            ]
          }, {
            imgUrl: '',
            name: '撒浪嘿',
            speak: '终于有机会去一次音乐节，现场嗨爆了感觉人生已经到了高潮，哈哈。',
            time: '05-12',
            zan: 666,
            zan_status: 1
          }, {
            imgUrl: '',
            name: '撒浪嘿',
            speak: '终于有机会去一次音乐节，现场嗨爆了感觉人生已经到了高潮，哈哈。',
            time: '05-12',
            zan: 666,
            zan_status: 1,
            writerChild: [
              {
                imgUrl: '',
                name: '@看灰机',
                speak: '的确，现场太燃了，而且很多漂亮小姐姐。',
                time: '05-12',
                zan: 999,
                zan_status: 1
              }
            ]
          }
        ],               // 评论信息
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
      console.log('分享文章详情页接受到的参数',option)
      this.title = option.title
    }
  }
</script>

<style lang="scss" scoped>
  .swiper{
    height: 750upx;
    .swiper-item{
      height: 750upx;
      width: 750upx;
    }  
  }
  .userInfo{
    display: flex;
    height: 120upx;
    padding: 0 30upx;
    align-items: center;
    &>image{
      margin-right: 20upx;
      height: 66upx;
      width: 66upx;
      border-radius: 100%;
      background: #ccc;
    }
    .userName{
      font-size: $font-30;
    }
  }
  .cultureInfo{
    display: flex;
    flex-direction: column;
    max-height: 640upx;
    margin-bottom: 30upx;
    padding: 60upx 30upx;
    box-sizing: border-box;
    overflow: hidden;
    .cultureTitle{
      margin-bottom: 30upx;
      font-size: $font-40;
      font-weight: $font-bold;
      line-height: 38upx;
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
      max-height: 323upx;
      font-size: $font-28;
      word-break:break-all;
      line-height: 40upx;
      color: $word-color;
    }
  }
  .comment{
    padding: 40upx 40upx 0 35upx;
    .total{
      font-size: $font-36;
      line-height: 34upx;
    }
    .item{
      min-height: 150upx;
      padding-top: 30upx;
      padding-bottom: 27upx;
      border-top: 2px solid $color-f5;
      .writer{
        display: flex;
        .writerImg{
          height: 66upx;
          width: 66upx;
          border-radius: 100%;
          margin-right: 30upx;
          background: #ccc;
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
    // position: fixed;
    // bottom: 0;
    // left: 0;
    height: 99upx;
    margin-top: 1upx;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    padding: 0 30upx;
    border-top: 1px solid $color-f5;
    &>input{
      height: 60upx;
      width: 360upx;
      border-radius: 30upx;
      padding: 0 30upx;
      box-sizing: border-box;
      font-size: $font-22;
      background: $color-f5;
    }
    &>view{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont{
        font-size: $font-36;
        color: $word-color;
        margin: 0;
      }
      &>text{
        font-size: $font-20;
        line-height: 36upx;
        color: $word-color;
      }
    }
  }
</style>
