(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/goodDetail"],{"027b":function(o,t,e){"use strict";var s=function(){var o=this,t=o.$createElement;o._self._c;o._isMounted||(o.e0=function(t){o.normShow=!0})},i=[];e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i})},"1cb4":function(o,t,e){"use strict";e.r(t);var s=e("ff62"),i=e.n(s);for(var n in s)"default"!==n&&function(o){e.d(t,o,function(){return s[o]})}(n);t["default"]=i.a},4020:function(o,t,e){},f06c:function(o,t,e){"use strict";var s=e("4020"),i=e.n(s);i.a},fd66:function(o,t,e){"use strict";e.r(t);var s=e("027b"),i=e("1cb4");for(var n in i)"default"!==n&&function(o){e.d(t,o,function(){return i[o]})}(n);e("f06c");var a=e("2877"),c=Object(a["a"])(i["default"],s["a"],s["b"],!1,null,"0c8c0f90",null);t["default"]=c.exports},ff62:function(o,t,e){"use strict";(function(o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-rich/parse")]).then(e.bind(null,"ecae"))},i={components:{uParse:s},data:function(){return{navList:["商品","评价","详情","推荐"],goods_id:"",navIndex:0,top:0,indicatorDots:!0,autoplay:!0,interval:3e3,duration:2e3,indicatorActiveColor:"#fff",swiperList:[],isShowTop:!0,detail:{},specData:{},select_arr:[],select_name:[],spec_sku_id:"",goods:{},strings:"",goods_num:1,isCar:!1,comment_data:[],comment_data_count:"",showPanic:!1,coverShow:!1,normShow:!1}},onLoad:function(o){console.log("分享文章详情页接受到的参数",o," at pages\\components\\goodDetail.vue:255"),this.goods_id=o.goods_id,"true"!==o.panic?this.getDetail():this.showPanic=!0},methods:{getDetail:function(){var t=this;this.$http({url:this.$api.goods_detail,data:{goods_id:this.goods_id},cb:function(e,s){if(e||1!==s.code)0===s.code||-1===s.code&&s.msg?o.showToast({title:s.msg,icon:"none"}):o.showToast({title:"商品详情加载失败",icon:"none"});else if(console.log(s.data.detail," at pages\\components\\goodDetail.vue:277"),t.detail=s.data.detail,t.comment_data=t.detail.comment_data,t.comment_data_count=t.detail.comment_data_count,t.swiperList=t.detail.image,t.specData=s.data.specData,t.specData){var i={};i.goods_price=t.specData.spec_list[0].form.goods_price,t.specData.spec_list[0].form.image_path?i.image_path=t.specData.spec_list[0].form.image_path:i.image_path=t.swiperList[0].file_path,i.stock_num=t.specData.spec_list[0].form.stock_num,t.goods=i,t.specData.spec_attr.map(function(o,e){t.select_arr.push(o.spec_items[0].item_id),t.select_name.push(o.spec_items[0].spec_value)})}}})},selectNorm:function(o,t,e){console.log(o,t,e," at pages\\components\\goodDetail.vue:323"),this.select_arr[o]=t.item_id;var s=[],i=[];this.select_arr.map(function(e,i){i===o?s.push(t.item_id):s.push(e)}),this.select_arr=s,this.select_name.map(function(e,s){s===o?i.push(t.spec_value):i.push(e)}),this.select_name=i,console.log("选中的规格id",s,"选中的规格名称",i," at pages\\components\\goodDetail.vue:348");var n=this.select_arr.join("_"),a=this.goods;this.specData.spec_list.map(function(o,t){o.spec_sku_id===n&&(a.goods_price=o.form.goods_price,a.stock_num=o.form.stock_num,o.form.image_path&&(a.image_path=o.form.image_path))}),this.goods=a},controlNum:function(t){if("+"===t){if(this.goods_num>=this.goods.stock_num)return void o.showToast({title:"库存不足",icon:"none"});this.goods_num+=1}"-"===t&&this.goods_num>1&&(this.goods_num-=1)},outAddcar:function(){this.isCar=!0,this.normShow=!0},addCar:function(){console.log(this.goods_id,this.goods_num,this.select_arr.join("_")," at pages\\components\\goodDetail.vue:394");var t=this,e={goods_sku_id:t.select_arr.join("_"),goods_id:t.goods_id,goods_num:t.goods_num};t.$http({url:t.$api.addcar,method:"POST",data:e,cb:function(e,s){e||1!==s.code?0===s.code||-1===s.code&&s.msg?o.showToast({title:s.msg,icon:"none"}):o.showToast({title:"加入购物车失败",icon:"none"}):(o.showToast({title:"添加成功",icon:"none"}),t.normShow=!1)}})},closeNorm:function(){this.normShow=!1,this.isCar=!1},goBack:function(){o.navigateBack({delta:1})},navAction:function(o){this.navIndex=o},goShare:function(){o.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(o){console.log("success:"+JSON.stringify(o)," at pages\\components\\goodDetail.vue:453")},fail:function(o){console.log("fail:"+JSON.stringify(o)," at pages\\components\\goodDetail.vue:456")}})},keepAction:function(){var o=this;console.log("点击了收藏",o.detail.goods_iscollection,o.detail.goods_id," at pages\\components\\goodDetail.vue:463");var t=o.detail.goods_iscollection,e={type:"add",goods_id:o.detail.goods_id};"yes"===t&&(e.type="cancel"),o.$http({url:o.$api.goodscollection,data:e,cb:function(e,s){console.log(s," at pages\\components\\goodDetail.vue:476"),o.$resFilter(e,s)&&(o.detail.goods_iscollection="yes"===t?"no":"yes")}})},scroll:function(o){this.top=o.detail.scrollTop,o.detail.scrollTop>375?this.isShowTop=!1:o.detail.scrollTop<=375&&(this.isShowTop=!0)},lookInfo:function(){this.coverShow=!0},goShopcar:function(){o.switchTab({url:"../shopcar/shopcar"})}}};t.default=i}).call(this,e("6e42")["default"])}},[["24a9","common/runtime","common/vendor"]]]);