(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/goodDetail"],{"3a90":function(o,t,e){"use strict";(function(o,s){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-rich/parse")]).then(e.bind(null,"0aed"))},n={components:{uParse:i},data:function(){return{navList:["商品","评价","详情","推荐"],goods_id:"",navIndex:0,top:0,indicatorDots:!0,autoplay:!0,interval:3e3,duration:2e3,indicatorActiveColor:"#fff",swiperList:[],isShowTop:!0,detail:{},specData:{},select_arr:[],select_name:[],spec_sku_id:"",goods:{},strings:"",goods_num:1,isCar:!1,comment_data:[],comment_data_count:"",showPanic:!1,coverShow:!1,normShow:!1}},onLoad:function(t){console.log(o("分享文章详情页接受到的参数",t," at pages\\components\\goodDetail.vue:255")),this.goods_id=t.goods_id,"true"!==t.panic?this.getDetail():this.showPanic=!0},computed:{statusBarHeight:function(){return this.$store.state.statusBarHeight}},methods:{getDetail:function(){var t=this;this.$http({url:this.$api.goods_detail,data:{goods_id:this.goods_id},cb:function(e,i){if(e||1!==i.code)0===i.code||-1===i.code&&i.msg?s.showToast({title:i.msg,icon:"none"}):s.showToast({title:"商品详情加载失败",icon:"none"});else if(console.log(o(i.data.detail," at pages\\components\\goodDetail.vue:281")),t.detail=i.data.detail,t.comment_data=t.detail.comment_data,t.comment_data_count=t.detail.comment_data_count,t.swiperList=t.detail.image,t.specData=i.data.specData,t.specData){var n={};n.goods_price=t.specData.spec_list[0].form.goods_price,t.specData.spec_list[0].form.image_path?n.image_path=t.specData.spec_list[0].form.image_path:n.image_path=t.swiperList[0].file_path,n.stock_num=t.specData.spec_list[0].form.stock_num,t.goods=n,t.specData.spec_attr.map(function(o,e){t.select_arr.push(o.spec_items[0].item_id),t.select_name.push(o.spec_items[0].spec_value)})}}})},selectNorm:function(t,e,s){console.log(o(t,e,s," at pages\\components\\goodDetail.vue:327")),this.select_arr[t]=e.item_id;var i=[],n=[];this.select_arr.map(function(o,s){s===t?i.push(e.item_id):i.push(o)}),this.select_arr=i,this.select_name.map(function(o,s){s===t?n.push(e.spec_value):n.push(o)}),this.select_name=n,console.log(o("选中的规格id",i,"选中的规格名称",n," at pages\\components\\goodDetail.vue:352"));var a=this.select_arr.join("_"),c=this.goods;this.specData.spec_list.map(function(o,t){o.spec_sku_id===a&&(c.goods_price=o.form.goods_price,c.stock_num=o.form.stock_num,o.form.image_path&&(c.image_path=o.form.image_path))}),this.goods=c},controlNum:function(o){if("+"===o){if(this.goods_num>=this.goods.stock_num)return void s.showToast({title:"库存不足",icon:"none"});this.goods_num+=1}"-"===o&&this.goods_num>1&&(this.goods_num-=1)},outAddcar:function(){this.isCar=!0,this.normShow=!0},addCar:function(){console.log(o(this.goods_id,this.goods_num,this.select_arr.join("_")," at pages\\components\\goodDetail.vue:398"));var t=this,e={goods_sku_id:t.select_arr.join("_"),goods_id:t.goods_id,goods_num:t.goods_num};t.$http({url:t.$api.addcar,method:"POST",data:e,cb:function(o,e){o||1!==e.code?0===e.code||-1===e.code&&e.msg?s.showToast({title:e.msg,icon:"none"}):s.showToast({title:"加入购物车失败",icon:"none"}):(s.showToast({title:"添加成功",icon:"none"}),t.normShow=!1)}})},closeNorm:function(){this.normShow=!1,this.isCar=!1},goBack:function(){s.navigateBack({delta:1})},navAction:function(o){this.navIndex=o},goShare:function(){s.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(t){console.log(o("success:"+JSON.stringify(t)," at pages\\components\\goodDetail.vue:457"))},fail:function(t){console.log(o("fail:"+JSON.stringify(t)," at pages\\components\\goodDetail.vue:460"))}})},keepAction:function(){var t=this;console.log(o("点击了收藏",t.detail.goods_iscollection,t.detail.goods_id," at pages\\components\\goodDetail.vue:467"));var e=t.detail.goods_iscollection,s={type:"add",goods_id:t.detail.goods_id};"yes"===e&&(s.type="cancel"),t.$http({url:t.$api.goodscollection,data:s,cb:function(s,i){console.log(o(i," at pages\\components\\goodDetail.vue:480")),t.$resFilter(s,i)&&(t.detail.goods_iscollection="yes"===e?"no":"yes")}})},scroll:function(o){this.top=o.detail.scrollTop,o.detail.scrollTop>375?this.isShowTop=!1:o.detail.scrollTop<=375&&(this.isShowTop=!0)},lookInfo:function(){this.coverShow=!0},goShopcar:function(){s.switchTab({url:"../shopcar/shopcar"})}}};t.default=n}).call(this,e("0de9")["default"],e("6e42")["default"])},5397:function(o,t,e){"use strict";e.r(t);var s=e("3a90"),i=e.n(s);for(var n in s)"default"!==n&&function(o){e.d(t,o,function(){return s[o]})}(n);t["default"]=i.a},"7e86":function(o,t,e){"use strict";e.r(t);var s=e("8992"),i=e("5397");for(var n in i)"default"!==n&&function(o){e.d(t,o,function(){return i[o]})}(n);e("e024");var a=e("2877"),c=Object(a["a"])(i["default"],s["a"],s["b"],!1,null,"e2040998",null);t["default"]=c.exports},8992:function(o,t,e){"use strict";var s=function(){var o=this,t=o.$createElement;o._self._c;o._isMounted||(o.e0=function(t){o.normShow=!0})},i=[];e.d(t,"a",function(){return s}),e.d(t,"b",function(){return i})},c1c6:function(o,t,e){},e024:function(o,t,e){"use strict";var s=e("c1c6"),i=e.n(s);i.a}},[["46e7","common/runtime","common/vendor"]]]);