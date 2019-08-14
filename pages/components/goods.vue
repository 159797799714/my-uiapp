<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <view class="search border-box">
        <text class="search-icon iconfont">&#xe667;</text>
        <input class="ipt" :placeholder="searchInfo" confirm-type="search" v-model="inputValue" @input="clearInput" @confirm="searchAction"/>
        <icon type="clear" v-if="showClearIcon" size="14" @click="clearIcon"/>
      </view>
      <text v-if="tabIndex === 1" class="iconfont" @click="changeStyle">&#xe60e;</text>
    </view>
    <view class="content bg-white border-box">
      
      <!-- 分享或者商城 -->
      <view class="tabs">
        <text v-for="(item, index) in tabList" :key="index" :class="{selectTab: index === tabIndex}" @click="selectTab(index)">{{ item }}</text>
      </view>
      
     <!-- 综合等分类 -->
      <view class="filter">
        <view v-for="(item, index) in shareTag" :key="index" :class="{selectFilter: index === filterIndex}" @click="selectFilter(index)">{{ item.tag_name }}
          <text v-if="item.tag_name === '价格'" class="iconfont">&#xe60c;</text>
          <text v-if="index === 4" class="iconfont">&#xe610;</text>
        </view>
      </view>
      <!-- 品牌及分类 -->
      <view v-if="tabIndex === 1" class="filter-tags bg-white padding-30">
        <view v-for="(item, index) in filter" :key="index" :class="{'filter-tag': true, selectFilter: filterTag_Index === index.toString()}" @click="selectFilterTag(index)">{{ item }}
          <text :class="{iconfont: true, clicked: filterTag_Index === index.toString()}">&#xe792;</text>
        </view>
      </view>
      <view :class="{'filter-cover': true, 'filter-cover-0': !(filterTag_Index !== '' && tabIndex === 1)}" >
        <view class="cover-main bg-white">
          <view class="list padding-30 border-box">
            <view v-for="(item, index) in filterCoverList.list" :class="{'selectSpan': item.category_id === goodsFormData.brand_id || item.category_id === goodsFormData.category_id}" :key="index" @click="selectClass(item)">{{ item.name }}</view>
          </view>
          <view class="foot">
            <view @click="resetSearch">重置</view>
            <view class="sure" @click="filterTag_Index = ''">完成({{ filterCoverList.sum }}物品)</view>
          </view>
        </view>
        <view class="white" @click="filterTag_Index = ''"/>
      </view>
      
      <scroll-view  scroll-y="true" class="culture">
        <!-- 分享 -->
        <view v-if="tabIndex === 0" class="main bg-white border-box">
          <view v-for="(item, index) in shareList" :key="index" class="item">
            <view class="img"  @click="goShareDetail(item.article_id)">
              <image :src="item.image.file_path" mode="aspectFill"></image>
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
                <text :class="{iconfont: true, isZan: item.islike === 'yes'}" @click="clickZan(item, index)">&#xe63a;</text>
                <text>{{ item.like_count }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 商品 -->
        <view v-if="tabIndex === 1" :class="{main: style === 0, 'bg-white': true, 'border-box': true, row: style === 1}">
          <view v-for="(item, index) in goodList" :key="index" class="good-item"  @click="goDetail(item)">
            <view class="good-img">
              <image :src="item.image[0].file_path" mode=""></image>
            </view>
            <view class="good-info border-box">
              <view class="good-name">{{ item.goods_name }}</view>
              <view class="good-remark">
                <text>{{ item.selling_point }}</text>
              </view>
              <view class="good-price">
                <view>
                  <text>粉丝价￥</text>
                  <text class="bigText">{{ item.sku[0].goods_price * 100 % 100 === 0 ? item.sku[0].goods_price * 100 / 100 : item.sku[0].goods_price }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 筛选 -->
    <view v-if="filterIndex === 4 && filter_alert" class="big-cover toLeft">
      <view class="white" @click="filter_alert = false"></view>
      <view class="big-cover-main bg-white border-box padding-30">
        <scroll-view scroll-y="true" class="box">
          <view class="price">
            <view class="title">价格区间(元)</view>
            <view class="ipt">
              <input type="text" class="lower" v-model="goodsFormData.min_price" placeholder="最低价" placeholder-style="color: #999"/>
              <input type="text" v-model="goodsFormData.max_price" placeholder="最高价" placeholder-style="color: #999"/>
            </view>
          </view>
          <view  v-for="(item, index) in captionList" :key="index" class="list-span">
            <view class="title caption" @click="setCategory(index)">
              <text>{{ item.title }}</text>
              <text :class="{iconfont: true, rotate: selectArr.indexOf(index) !== -1}">&#xe792;</text>
            </view>
            <view v-if="selectArr.indexOf(index) !== -1 " class="tag-span">
              <view v-for="(li, num) in item.arr" :key="num" :class="{tag: true, 'border-box': true, selectSpan: li.category_id === goodsFormData.brand_id && index === 0 || li.category_id === goodsFormData.category_id && index === 1 || li.type === goodsFormData.promotions_type && index === 2}" @click="selTag(index, num, li)">{{ li.name }}</view>
            </view>
          </view>
        </scroll-view>
        <view class="foot">
          <view @click="resetSearch">重置</view>
          <view class="sure" @click="sureSearch">完成({{ filterCoverList.sum }}物品)</view>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default{
    data() {
      return {
        style: 0,                    // 商品块默认0上图下文，1为左图右文
        searchInfo: '',              // 输入框placeholdeer
        inputValue: '',              //  输入框value值
        showClearIcon: false,        // 输入框清空
        tabIndex: '',                // 默认选中分享
        filterIndex: 0,              // 默认选中综合
        tabList: ['分享', '商城'],
        shareTag: [{tag_name:'综合'}, {tag_name:'销量'}, {tag_name:'上架'}, {tag_name:'价格'}, {tag_name:'筛选'}],   // 标签默认这个是商品标签
        filter: ['品牌', '分类'],
        filterTag_Index: '',            //默认选中品牌
        filter_alert: true,             // 筛选遮罩层显示
        shareList: [],
        filterCoverList: {
          list: ['铁三角', '索尼', '铁三角', '索尼', '铁三角'],
          sum: 4999
        },
        classList: [],
        filterArr: [],
        goodList: [],                                  // 商城数据
        byid: false,                                   // 从商城进入，用于判断是否加载二级品牌分类
        captionList: [
          {
            title: '品牌',
            arr: []
          }, {
            title: '分类',
            arr: []
          }, {
            title: '促销',
            arr: []
          }
        ],                                   // 筛选侧边栏数据
        selectArr: [],                       // 筛选侧边栏展开的数组index
        brand_id: '',                        // 选中的品牌ID
        category_id: '',                     // 一级分类ID
        goodsFormData: {
          category_id: '',
          search: '',
          sortType: 'all',
          sortPrice: '',
          listRows: '',
          brand_id: '',
          promotions_type: '',
          min_price: '',
          max_price: ''
        },                                   // 商品默认请求参数
        shareFormData: {
          search: '',
          tags_id: ''
        }
      }
    },
    watch: {
      tabIndex(val, oldval) {
        if(oldval !== '') {
          this.filterIndex = 0
          if(val === 0) {
            this.getCultureTag()
            this.searchAction()
            return
          }
          if(val === 1) {
            this.shareTag = [{tag_name:'综合'}, {tag_name:'销量'}, {tag_name:'上架'}, {tag_name:'价格'}, {tag_name:'筛选'}],
            this.searchAction()
            return
          }  
        }
      },
      filterIndex(val, oldVal) {
        if(val === 4) {
          this.filter_alert = true
        }
      },
      inputValue(val, oldval) {
        this.shareFormData.search = val
        this.goodsFormData.search = val
      }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    onLoad(option) {
      console.log('分享文章详情页接受到的参数',option)
      if(option.class) {
        console.log('class', option.class)
        this.searchInfo = option.class
        this.tabIndex = Number(option.type)
        // 搜索关键词
        this.goodsFormData.search = this.searchInfo
        if(this.tabIndex === 0) {
          this.getCultureTag()
        }
      }
      if(option.id) {
        console.log('id', option.id, option.name)
        this.category_id = option.id
        this.tabIndex = 1
        this.byid = true
      }
      // 获取文章标签
      this.searchAction()
      
      // 获取品牌和分类
      this.getClassList()
    },
    methods: {
      // 选中分享文章标签
      getCultureTag() {
        this.$http({
          url: this.$api.activitytags,
          cb: (err, res) => {
            console.log(res.data.tags[0].tag_id)
            this.shareTag = res.data.tags
            this.shareFormData.tags_id = res.data.tags[0].tag_id.toString()
          }
        })
      },
      
      // 搜索商品或者文章 this.tabIndex =  0 为分享 1为商品 
      searchAction() {
        let that = this
        let url = that.$api.goodlists
        let data = that.goodsFormData
        if( that.tabIndex === 0 ) {         // 选中分享时
          url= that.$api.articlesbysearch     
          data = that.shareFormData
        } if(!that.byid && that.tabIndex === 1) {
          url= that.$api.goodlists     // 关键字搜索
        }
        that.$http({
          url: url,
          data: data,
          cb: (err, res) => {
            if(!err && res.code === 1) {
              // 成功后刷新数据
              if(res.data.list.length === 0 || undefined) {
                uni.showToast({
                	title: '未搜索到相关数据',
                  icon: 'none'
                })
              }
              switch (that.tabIndex) {
                case 0:
                  that.shareList = res.data.list
                  break
                case 1:
                  that.goodList = res.data.list.data
                  that.filterCoverList.sum = res.data.list.total
                  break
              }
            } else {
              uni.showToast({
              	title: '搜索失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 切换商品排列样式
      changeStyle() {
        if(this.style === 0) {
          this.style = 1
          return
        }
        this.style = 0
      },
      // 返回
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      clearIcon() {
      	this.inputValue = ''
      	this.showClearIcon = false
      },
      // 分享详情页
      goShareDetail(id) {
        uni.navigateTo({
          url: '../components/shareInfo?article_id=' + id
        })
      },
      
      // 清除搜索框
      clearInput(event) {
      	if (event.target.value.length > 0) {
      		this.showClearIcon = true
          return
      	} else {
      		this.showClearIcon = false
      	}
      },
      // 选择外层品牌分类
      selectClass(item) {
        let that = this
        if(that.filterTag_Index === '0') {
          that.goodsFormData.brand_id = that.goodsFormData.brand_id && that.goodsFormData.brand_id === item.category_id? '': item.category_id
        } else if(that.filterTag_Index === '1'){
          that.goodsFormData.category_id = that.goodsFormData.category_id && that.goodsFormData.category_id === item.category_id? '': item.category_id
        }
        this.searchAction()
      },
      // 重置品牌和分类
      resetSearch() {
        let that = this
        that.goodsFormData.category_id = ''
        that.goodsFormData.brand_id = ''
        that.goodsFormData.promotions_type = ''
        that.filterTag_Index = ''
        that.filter_alert = false
        that.selectArr = []
        this.searchAction()
      },
      // 分享商城tab点击
      selectTab(index) {
        this.tabIndex = index
      },
      
      // 价格等分类点击
      selectFilter(index) {
        let that = this
        that.filterIndex = index
        if(that.tabIndex === 0) {
          console.log('进来了', that.shareTag[index].tag_id)
          that.shareFormData.tags_id= that.shareTag[index].tag_id
          that.searchAction()
          return
        }
        // 商城下面的标签分类
        if(that.tabIndex === 1) {
          switch(index) {
            case 0:
              that.goodsFormData.sortType = 'all'
              that.searchAction()
              break
            case 1:
              that.goodsFormData.sortType = 'sales'
              that.searchAction()
              break
            case 2:
              that.goodsFormData.sortType = 'shelves'
              that.searchAction()
              break
            case 3:
              that.goodsFormData.sortType = 'price'
              that.goodsFormData.sortPrice = !that.goodsFormData.sortPrice
              that.searchAction()
              break
            case 4:
              // 促销活动
              that.$http({
                url: that.$api.promotions,
                cb: (err, res) => {
                  // console.log(res.data.promotions)
                  that.classList.push(res.data.promotions)
                  that.captionList[2].arr = res.data.promotions
                  if(that.goodsFormData.brand_id) {
                    that.selectArr.push(0)
                  }
                  if(that.goodsFormData.category_id) {
                    that.selectArr.push(1)
                  }
                  if(that.goodsFormData.promotions_type) {
                    that.selectArr.push(2)
                  }
                }
              })
              that.filter_alert = true
              break
          }
          return
        }
      },
      // 获取品牌,分类信息
      getClassList() {
        let that = this
        let data = {}
        let url = that.$api.getbrands
        let url2 = that.$api.goodscategory
        // 品牌
        if(that.byid) {
          data = {
            category_id: this.category_id
          }
          url = that.$api.getbrandsbycategoryid
          url2 = that.$api.goodscategorybysecond
        }
        that.$http({
          url: url,
          data: data,
          cb: (err, res) => {
            that.classList.push(res.data.list)
            that.captionList[0].arr= res.data.list
            // 分类
            that.$http({
              url: url2,
              data: data,
              cb: (err, result) => {
                console.log(result.data.list)
                that.captionList[1].arr= result.data.list
                that.classList.push(result.data.list)
              }
            })    
          }
        })
      },
      
      //直接点击外面的分类品牌
      selectFilterTag(info) {
        let index = info.toString()
        this.filterCoverList.list= this.classList[index]
        if(index === this.filterTag_Index && this.filterTag_Index !== '') {
          this.filterTag_Index = ''
          return
        }
        if (index !== this.filterTag_Index || this.filterTag_Index === '') {
          this.filterTag_Index = index
        }
      },
      // 点击筛选侧边栏中的品牌，活动等分类
      setCategory(index) {
        if(this.selectArr.indexOf(index) === -1) {
          this.selectArr.push(index)
          console.log(this.selectArr)
          return
        }
        this.selectArr.splice(this.selectArr.indexOf(index), 1)
      },
      
      // 筛选侧边弹窗选择分类里面的子选项
      selTag(index, num, item) {
        let that = this
        console.log('选择了', index, num, item)
        if(index === 0) {
          that.goodsFormData.brand_id = item.category_id === that.goodsFormData.brand_id && that.goodsFormData.brand_id? '': item.category_id
        } else if(index === 1) {
          that.goodsFormData.category_id= item.category_id === that.goodsFormData.category_id && that.goodsFormData.category_id? '': item.category_id
        } else if(index === 2) {
          that.goodsFormData.promotions_type = item.type === that.goodsFormData.promotions_type && that.goodsFormData.promotions_type? '': item.type
        }
        this.searchAction()
      },
      sureSearch() {
        this.searchAction()
        this.filter_alert = false
      },
      clickZan(item, index) {
        console.log(item.article_id, item.islike, index)
        let url = this.$api.unLike
        if(item.islike === 'no') {
          url = this.$api.like
        }
        this.$http({
          url: url,
          data: {
            article_id: item.article_id
          },
          cb: (err, res) => {
            if(!err && res) {
              switch(this.shareList[index].islike) {
                case 'yes':
                  uni.showToast({
                    title: '取消点赞成功',
                    icon: 'none'
                  })
                  this.shareList[index].islike = 'no'
                  this.shareList[index].like_count -= 1
                  break
                case 'no':
                  uni.showToast({
                    title: '点赞成功',
                    icon: 'none'
                  })
                  this.shareList[index].islike = 'yes'
                  this.shareList[index].like_count += 1
                  break
              }
            } else {
              switch(this.shareList[index].islike) {
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
      goDetail(item) {
        console.log('接收到信息', item.goods_id)
        uni.navigateTo({
          url: '../components/goodDetail?goods_id=' + item.goods_id
        })
      }
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
    justify-content: space-around;
    height: 92upx;
    padding: 0 10upx;
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
    font-weight: $font-bold;
    .iconfont{
      font-weight: 400;
    }
  }
  .filter-tags{
    height: 50upx;
    padding-bottom: 10upx;
    display: flex;
    .filter-tag{
      width: 120upx;
      margin-right: 22upx;
      text-align: center;
      font-size: $font-22;
      line-height: 50upx;
      background: $color-ee;
      border-radius: 25upx;
      .iconfont{
        font-size: $font-20;
      }
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
    top: 284upx;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    transition: 500ms;
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
        max-height: 460upx;
        overflow: auto;
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
    }
    .white{
      flex: 1;
    }
  }
  .filter-cover-0{
    height: 0!important;
    overflow: hidden!important;
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
  .culture{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  //商品样式1
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
      .good-img{
        height: 330upx;
        width: 330upx;
        margin-bottom: 30upx;
        &>image{
          width: 100%;
          height: 100%;
        }
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
          .bigText{
            font-size: $font-36;
          }
        }
      }
    }
  }
  // 样式2
  .row{
    padding: 0 30upx;
    .good-item{
      height: 220upx;
      width: 100%;
      margin-bottom: 20upx;
      box-sizing: border-box;
      display: flex;
      .good-img{
        height: 220upx;
        width: 220upx;
        margin-right: 30upx;
        &>image{
          height: 100%;
          width: 100%;
        }
      }
      .good-info{
        flex: 1;
        overflow: hidden;
        .good-name{
          height: 78upx;
          line-height: 42upx;
          margin-top: 14upx;
          font-size: $font-28;
          white-space: wrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .good-remark{
          font-size: $font-20;
          line-height: 59upx;
          color: $word-color;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &>text{
            margin-right: 29upx;
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
          .bigText{
            font-size: $font-34;
          }
        }
      }
    }
  }
  .big-cover{
    display: flex;
    flex-direction: row;
    height: 100%;
    .white{
      flex: 1;
    }
    .big-cover-main{
      width: 524upx;
      height: 100%;
      display: flex;
      flex-direction: column;
      .box{
        flex: 1;
        overflow: hidden;
      }
      .title{
        font-size: $font-26;
        line-height: 85upx;
      }
      .price{
        height: 159upx;
        margin: 80upx 5upx 0 5upx;
        padding-bottom: 30upx;
        .ipt{
          height: 74upx;
          display: flex;
          justify-content: space-between;
          position: relative;
          &::after{
            content: '';
            position: absolute;
            height: 2upx;
            width: 30upx;
            top: 50%;
            left: 50%;
            right: 0;
            bottom: 0;
            transform: translate(-50%);
            background: $color-ee;
          }
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
      .caption{
        display: flex;
        justify-content: space-between;
        border-top: 2px solid $color-f5;
        .iconfont{
          transition: 500ms;
        }
        .rotate{
          transform: rotate(180deg);
        }
      }
      .tag-span{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        min-height: 10upx;
        font-size: $font-26;
        .tag{
          width: 216upx;
          height: 88upx;
          padding: 0 20upx;
          margin-bottom: 20upx;
          line-height: 88upx;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          background: $color-ee;
        }
      }
      .foot{
        width: calc(100% + 60upx);
        margin-left: -30upx;
      }
    }
  }
</style>
