(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{5308:function(t,e,i){"use strict";i.r(e);var n=i("571c"),a=i("ee30");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("f474");var c=i("2877"),s=Object(c["a"])(a["default"],n["a"],n["b"],!1,null,"77b13ea5",null);e["default"]=s.exports},"571c":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"5e85":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n(i("3feb"));function n(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,indicatorActiveColor:"#ffffff",searchInfo:"大家都在搜“森海塞尔”",swiperList:[{},{},{}],tabList:[],selectIndex:0,cultureList:[]}},watch:{selectIndex:function(t){this.getDefault(this.tabList[t].category_id)}},onLoad:function(){this.getCategorylist(),this.getDefault()},methods:{getDefault:function(e){var i=this;this.$http({url:this.$api.articlesbycategoryid,data:{category_id:e||""},cb:function(e,n){if(!e&&1===n.code)return i.cultureList=n.data.list,void(0===n.data.list.length&&t.showToast({title:"当前分类文章为空",icon:"none"}));t.showToast({title:"文章列表获取失败",icon:"none"})}})},getCategorylist:function(){var e=this;this.$http({data:{wxapp_id:10001,token:"b612f5e2a32d553fdaea8eeb06bc2744"},url:this.$api.categorylist,cb:function(i,n){i||1!==n.code?t.showToast({title:"文章分类获取失败",icon:"none"}):e.tabList=n.data.categoryList}})},zanAction:function(e,i){var n=this;console.log(e.article_id,e.islike,i," at pages\\index\\index.vue:117");var a=this.$api.unLike;"no"===e.islike&&(a=this.$api.like),this.$http({url:a,data:{article_id:e.article_id},cb:function(e,a){if(!e&&a)switch(n.cultureList[i].islike){case"yes":t.showToast({title:"取消点赞成功",icon:"none"}),n.cultureList[i].islike="no",n.cultureList[i].like_count-=1;break;case"no":t.showToast({title:"点赞成功",icon:"none"}),n.cultureList[i].islike="yes",n.cultureList[i].like_count+=1;break}else switch(n.cultureList[i].islike){case"yes":t.showToast({title:"取消点赞失败",icon:"none"});break;case"no":t.showToast({title:"点赞失败请重试",icon:"none"});break}}})},selectTab:function(t,e){this.selectIndex=e},goInfo:function(e){t.navigateTo({url:"../components/shareInfo?article_id="+e})},goSearch:function(){t.navigateTo({url:"../components/search?type=0"})}}};e.default=a}).call(this,i("6e42")["default"])},da0c:function(t,e,i){},ee30:function(t,e,i){"use strict";i.r(e);var n=i("5e85"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},f474:function(t,e,i){"use strict";var n=i("da0c"),a=i.n(n);a.a}},[["c4ac","common/runtime","common/vendor"]]]);