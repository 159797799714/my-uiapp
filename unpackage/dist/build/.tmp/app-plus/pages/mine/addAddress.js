(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/addAddress"],{"1d69":function(e,n,o){"use strict";var t=function(){var e=this,n=e.$createElement;e._self._c},a=[];o.d(n,"a",function(){return t}),o.d(n,"b",function(){return a})},2329:function(e,n,o){"use strict";o.r(n);var t=o("1d69"),a=o("5243");for(var s in a)"default"!==s&&function(e){o.d(n,e,function(){return a[e]})}(s);o("58b7");var c=o("2877"),d=Object(c["a"])(a["default"],t["a"],t["b"],!1,null,"e023fe38",null);n["default"]=d.exports},5243:function(e,n,o){"use strict";o.r(n);var t=o("c2f5"),a=o.n(t);for(var s in t)"default"!==s&&function(e){o.d(n,e,function(){return t[e]})}(s);n["default"]=a.a},"58b7":function(e,n,o){"use strict";var t=o("a882"),a=o.n(t);a.a},a882:function(e,n,o){},c2f5:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{info:{name:"",tel:"",location:"",address:"",tags:["家","公司","学校","其他"],def:!1}}},onLoad:function(e){e.info&&(this.info=JSON.parse(e.info))},methods:{goBack:function(){e.navigateBack({delta:1})},getLocation:function(){var n=this;e.chooseLocation({success:function(e){n.info.location=e.address,console.log("位置名称："+e.name," at pages\\mine\\addAddress.vue:79"),console.log("详细地址："+e.address," at pages\\mine\\addAddress.vue:80"),console.log("纬度："+e.latitude," at pages\\mine\\addAddress.vue:81"),console.log("经度："+e.longitude," at pages\\mine\\addAddress.vue:82")}})},delAction:function(){e.showModal({content:"确认删除？",success:function(e){e.confirm?console.log(e.confirm," at pages\\mine\\addAddress.vue:92"):e.cancel&&console.log("用户点击取消"," at pages\\mine\\addAddress.vue:94")}})},switchChange:function(e){console.log("switch1 发生 change 事件，携带值为",e.target.value," at pages\\mine\\addAddress.vue:100")}}};n.default=o}).call(this,o("6e42")["default"])}},[["b8c3","common/runtime","common/vendor"]]]);