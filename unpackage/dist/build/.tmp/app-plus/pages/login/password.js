(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/password"],{1840:function(t,e,o){},"1cd9":function(t,e,o){"use strict";var i=o("1840"),n=o.n(i);n.a},"2ecb":function(t,e,o){"use strict";o.r(e);var i=o("832d"),n=o("942c");for(var s in n)"default"!==s&&function(t){o.d(e,t,function(){return n[t]})}(s);o("1cd9");var a=o("2877"),r=Object(a["a"])(n["default"],i["a"],i["b"],!1,null,"3a40aae2",null);e["default"]=r.exports},"822a":function(t,e,o){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{title:"",type:"",showInfo:!1,code_word:"获取验证码",mobile:"",password:"",code:"",btnValue:"",ishide:!1}},onLoad:function(e){return this.type=e.type,this.mobile=e.mobile,console.log(t("接收到的参数",e," at pages\\login\\password.vue:40")),"register"===e.type?(this.title="设置密码",void(this.btnValue="注册并登录")):"forget"===e.type?(this.title="重置密码",void(this.btnValue="保存并登录")):void 0},methods:{goBack:function(){o.navigateBack({delta:1})},sureAction:function(){var t=this;switch(this.type){case"forget":this.$http({url:this.$api.resetpassword,method:"POST",data:{mobile:this.mobile,newpassword:this.password},cb:function(e,i){return e||1!==i.code?0===i.code&&i.msg?void o.showToast({title:i.msg,icon:"none"}):void o.showToast({title:"重置密码失败",icon:"none"}):(t.$store.commit("login",{mobile:t.mobile,token:i.data.token}),o.showToast({title:"重置密码成功",icon:"none"}),void o.switchTab({url:"../index/index"}))}});break;case"register":this.$http({url:this.$api.register,method:"POST",data:{mobile:this.mobile,password:this.password},cb:function(t,e){t||1!==e.code?0===e.code?o.showToast({title:e.msg,icon:"none"}):o.showToast({title:"注册失败",icon:"none"}):(o.showToast({title:"注册成功",icon:"none"}),o.switchTab({url:"../index/index"}))}});break}}}};e.default=i}).call(this,o("0de9")["default"],o("6e42")["default"])},"832d":function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.ishide=!t.ishide})},n=[];o.d(e,"a",function(){return i}),o.d(e,"b",function(){return n})},"942c":function(t,e,o){"use strict";o.r(e);var i=o("822a"),n=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(e,t,function(){return i[t]})}(s);e["default"]=n.a}},[["544e","common/runtime","common/vendor"]]]);