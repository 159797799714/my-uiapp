(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine"],{"6c6f":function(t,e,n){"use strict";var i=n("f156"),a=n.n(i);a.a},"6dcc":function(t,e,n){"use strict";n.r(e);var i=n("f354"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"82a7":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},c454:function(t,e,n){"use strict";n.r(e);var i=n("82a7"),a=n("6dcc");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("6c6f");var s=n("2877"),c=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,"5c82bde1",null);e["default"]=c.exports},f156:function(t,e,n){},f354:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{userinfo:{avatarUrl:"",nickName:"",mobile:""},topicList:[{num:1e3,name:"关注"},{num:222,name:"收藏"},{num:1e3,name:"点赞"},{num:222,name:"粉丝"}],menuList:[{imgUrl:"../../static/img/mine/mine1.png",name:"待付款",dataType:"payment"},{imgUrl:"../../static/img/mine/mine2.png",name:"待收货",dataType:"received"},{imgUrl:"../../static/img/mine/mine3.png",name:"待评价",dataType:"comment"},{imgUrl:"../../static/img/mine/mine4.png",name:"退换/售后",dataType:""},{imgUrl:"../../static/img/mine/mine5.png",name:"每日签到",dataType:""},{imgUrl:"../../static/img/mine/mine6.png",name:"我的分享",dataType:""},{imgUrl:"../../static/img/mine/mine7.png",name:"我的消息",dataType:""},{imgUrl:"../../static/img/mine/mine8.png",name:"客服小蜜",dataType:""}],distributeList:[{iconName:"&#xe6f7;",name:"每日签到",dataType:""},{iconName:"&#xe657;",name:"我的积分",dataType:""},{iconName:"&#xe691;",name:"优惠券",dataType:""},{iconName:"&#xe67c;",name:"我的钱包",dataType:""}],tabIndex:0,tabList:["点赞","收藏"],shareList:[],goodList:[],sweixin:null}},computed:{statusBarHeight:function(){return this.$store.state.statusBarHeight}},onLoad:function(){},onShow:function(){this.getuserinfo(),this.getArticle()},watch:{tabIndex:function(t){0!==t?this.getKeepGood():this.getArticle()}},methods:{goPersonal:function(){t.navigateTo({url:"personal?userinfo="+JSON.stringify(this.userinfo)})},getuserinfo:function(){var e=this;this.$http({url:this.$api.getuserinfo,cb:function(n,i){n||1!==i.code?0===i.code?t.showToast({title:i.msg,icon:"none"}):t.showToast({title:"个人用户信息获取失败",icon:"none"}):e.userinfo=i.data.info}})},selectTab:function(t){this.tabIndex=t},getArticle:function(){var e=this;this.$http({url:this.$api.mylikearticles,method:"POST",cb:function(n,i){n||1!==i.code?0===i.code?t.showToast({title:i.msg,icon:"none"}):t.showToast({title:"点赞文章获取失败",icon:"none"}):e.shareList=i.data.myarticles.data}})},getKeepGood:function(){var e=this;this.$http({url:this.$api.mycollection,method:"POST",cb:function(i,a){i||1!==a.code?0===a.code?t.showToast({title:a.msg,icon:"none"}):t.showToast({title:"收藏商品列表获取失败",icon:"none"}):(console.log(n("成功了收藏",a.data.mygoods.data," at pages\\mine\\mine.vue:331")),e.goodList=a.data.mygoods.data)}})},goChild:function(e){switch(e){case 0:t.navigateTo({url:"discount"});break;case 1:t.navigateTo({url:"sign"});break;case 2:t.navigateTo({url:"looks"});break;case 3:t.navigateTo({url:"bonus/bonusCenter"});break}},goShareDetail:function(e){t.navigateTo({url:"../components/shareInfo?article_id="+e})},goOrder:function(e,n){t.navigateTo({url:"../order/order?name="+e+"&dataType="+n})},goSetting:function(){t.navigateTo({url:"setting?userinfo="+JSON.stringify(this.userinfo)})},clickZan:function(e,n){var i=this,a=this.$api.unLike;this.$http({url:a,data:{article_id:e.article_id},cb:function(e,a){e||1!==a.code?0===a.code?t.showToast({title:a.msg,icon:"none"}):t.showToast({title:"取消点赞失败",icon:"none"}):(t.showToast({title:"取消点赞成功",icon:"none"}),i.shareList.splice(n,1))}})}}};e.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])}},[["2aa5","common/runtime","common/vendor"]]]);