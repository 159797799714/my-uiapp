(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"2a2e":function(t,a,e){"use strict";e.r(a);var n=e("6178"),o=e("efa0");for(var r in o)"default"!==r&&function(t){e.d(a,t,function(){return o[t]})}(r);e("b33a");var i=e("2877"),c=Object(i["a"])(o["default"],n["a"],n["b"],!1,null,"a8b7c02a",null);a["default"]=c.exports},"5cb6":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{selectData:"全部",dataType:"",tabList:[{name:"全部",dataType:"all"},{name:"待付款",dataType:"payment"},{name:"待收货",dataType:"received"},{name:"待评价",dataType:"comment"},{name:"已完成",dataType:""},{name:"已取消",dataType:""}],scrollLeft:0,dataList:[]}},watch:{selectData:function(t){"已取消"!==t&&"已完成"!==t?"全部"!==t&&"待付款"!==t||(this.scrollLeft=0):this.scrollLeft=69}},onLoad:function(t){this.selectData=t.name,this.dataType=t.dataType,console.log("分享文章详情页接受到的参数",this.selectData,this.dataType," at pages\\order\\order.vue:128"),this.getOrderInfo()},methods:{goBack:function(){t.navigateBack({delta:1})},selectTab:function(t){this.selectData=t.name,this.dataType=t.dataType,this.getOrderInfo()},goDetail:function(a){t.navigateTo({url:"orderDetail?item="+JSON.stringify(a)})},goMarket:function(){t.switchTab({url:"../market/market"})},getOrderInfo:function(){var a=this;a.$http({url:a.$api.orderList,data:{dataType:a.dataType},cb:function(e,n){e||1!==n.code?0===n.code?t.showToast({title:n.msg,icon:"none"}):t.showToast({title:"订单数据加载失败",icon:"none"}):(console.log("成功了加载订单",n.data.list.data," at pages\\order\\order.vue:165"),a.dataList=n.data.list.data)}})}}};a.default=e}).call(this,e("6e42")["default"])},6178:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return o})},b33a:function(t,a,e){"use strict";var n=e("d2bd"),o=e.n(n);o.a},d2bd:function(t,a,e){},efa0:function(t,a,e){"use strict";e.r(a);var n=e("5cb6"),o=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(a,t,function(){return n[t]})}(r);a["default"]=o.a}},[["6d5f","common/runtime","common/vendor"]]]);