(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-register"],{"1ca0":function(t,e,a){"use strict";var o=a("bf67"),n=a.n(o);n.a},4877:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{title:"",type:"",showDel:!1,code_word:"获取验证码",username:"",code:"",check_code:!1,showInfo:!1,showTitle:"请获取手机验证码"}},onLoad:function(t){this.type=t.type,"register"!==t.type?"forget"!==t.type||(this.title="找回密码"):this.title="注册"},methods:{goBack:function(){uni.navigateBack({delta:1})},onInput:function(t){var e=t.detail.value;this.showDel=!!e},goNext:function(){var t=this;console.log(this.check_code,this.code,this.showInfo),this.check_code?4===this.code.length?this.$http({url:this.$api.smscodeyz,data:{mobile:this.username,code:this.code},cb:function(e,a){e||1!==a.code?0===a.code?uni.showToast({title:a.msg,icon:"none"}):uni.showToast({title:"验证码验证失败",icon:"none"}):uni.navigateTo({url:"password?type="+t.type+"&mobile="+t.username})}}):uni.showToast({title:"验证码格式错误",icon:"none"}):uni.showToast({title:this.showTitle,icon:"none"})},goLogin:function(){uni.navigateTo({url:"login"})},getCode:function(){var t=/^1[3456789]\d{9}$/.test(this.username),e=this;t?this.$http({url:this.$api.sendcode,method:"POST",data:{mobile:this.username},cb:function(t,a){t||1!==a.code?uni.showToast({title:"手机验证码获取失败",icon:"none"}):(e.check_code=!0,e.code_word=120,e.showInfo=!0,e.showTitle="验证码过期，请重新获取",setInterval(function(){if(e.code_word>0&&e.code_word--,0===e.code_word)return e.check_code=!1,void(e.showInfo=!1)}.bind(e),1e3))}}):uni.showToast({title:"请输入正确的手机号码",icon:"none"})}}};e.default=o},a13b:function(t,e,a){"use strict";a.r(e);var o=a("a2fa"),n=a("fa57");for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a("1ca0");var c=a("2877"),r=Object(c["a"])(n["default"],o["a"],o["b"],!1,null,"04c68ea0",null);e["default"]=r.exports},a2fa:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"container"},[a("v-uni-image",{staticClass:"content_bg",attrs:{src:"../../static/img/login/register_bg.png",mode:""}}),a("v-uni-view",{staticClass:"content-cover"},[a("v-uni-view",{staticClass:"topBar"},[a("v-uni-text",{staticClass:"iconfont",on:{click:function(e){e=t.$handleEvent(e),t.goBack(e)}}},[t._v("")])],1),a("v-uni-view",{staticClass:"content border-box"},[a("v-uni-view",[a("v-uni-view",{staticClass:"title"},[t._v(t._s(t.title))]),a("v-uni-form",{staticClass:"myForm",on:{submit:function(e){e=t.$handleEvent(e),t.formSubmit(e)},reset:function(e){e=t.$handleEvent(e),t.formReset(e)}}},[a("v-uni-view",{staticClass:"ipt"},[a("v-uni-text",{staticClass:"iconfont"},[t._v("")]),a("v-uni-input",{attrs:{type:"text",placeholder:"请输入您的手机号码",maxlength:"11"},on:{input:function(e){e=t.$handleEvent(e),t.onInput(e)}},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t.showDel?a("v-uni-text",{staticClass:"iconfont del",on:{click:function(e){e=t.$handleEvent(e),t.username=""}}},[t._v("")]):t._e()],1),a("v-uni-view",{staticClass:"ipt"},[a("v-uni-text",{staticClass:"iconfont"},[t._v("")]),a("v-uni-input",{attrs:{type:"text",placeholder:"请输入验证码",maxlength:"4"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t.showInfo?t._e():a("v-uni-text",{staticClass:"code",on:{click:function(e){e=t.$handleEvent(e),t.getCode(e)}}},[t._v("获取验证码")]),t.showInfo?a("v-uni-text",{staticClass:"code"},[t._v(t._s(t.code_word))]):t._e()],1),t.showInfo?t._e():a("v-uni-view",{staticClass:"info"}),t.showInfo?a("v-uni-view",{staticClass:"info"},[t._v("验证码已通过手机短信的形式发送至您的手机，请注意查收")]):t._e(),a("v-uni-view",{staticClass:"btn",attrs:{foroType:"submit"},on:{click:function(e){e=t.$handleEvent(e),t.goNext(e)}}},[t._v("下一步")])],1)],1),"register"===t.type?a("v-uni-view",[a("v-uni-view",{staticClass:"login",on:{click:function(e){e=t.$handleEvent(e),t.goLogin(e)}}},[t._v("已有账号去登录")]),a("v-uni-view",{staticClass:"clause"},[a("v-uni-text",{staticClass:"iconfont"},[t._v("")]),t._v("注册即表示您已同意"),a("v-uni-text",[t._v("《用户协议》")]),t._v("和"),a("v-uni-text",[t._v("《隐私条款》")])],1)],1):t._e()],1)],1)],1)},n=[];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return n})},bf67:function(t,e,a){var o=a("ffc4");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=a("4f06").default;n("7cadffdf",o,!0,{sourceMap:!1,shadowMode:!1})},fa57:function(t,e,a){"use strict";a.r(e);var o=a("4877"),n=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);e["default"]=n.a},ffc4:function(t,e,a){var o=a("b041");e=t.exports=a("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/* 行为相关颜色 */.font-20[data-v-04c68ea0]{font-size:%?20?%!important}.font-22[data-v-04c68ea0]{font-size:%?22?%!important}.font-24[data-v-04c68ea0]{font-size:%?24?%!important}.font-26[data-v-04c68ea0]{font-size:%?26?%!important}.font-28[data-v-04c68ea0]{font-size:%?28?%!important}.font-30[data-v-04c68ea0]{font-size:%?30?%!important}.font-32[data-v-04c68ea0]{font-size:%?32?%!important}.font-34[data-v-04c68ea0]{font-size:%?34?%!important}.font-36[data-v-04c68ea0]{font-size:%?36?%!important}.font-38[data-v-04c68ea0]{font-size:%?38?%!important}.font-40[data-v-04c68ea0]{font-size:%?40?%!important}.font-42[data-v-04c68ea0]{font-size:%?42?%!important}.font-44[data-v-04c68ea0]{font-size:%?44?%!important}.font-46[data-v-04c68ea0]{font-size:%?46?%!important}.font-52[data-v-04c68ea0]{font-size:%?52?%!important}.font-54[data-v-04c68ea0]{font-size:%?54?%!important}.font-56[data-v-04c68ea0]{font-size:%?56?%!important}.font-58[data-v-04c68ea0]{font-size:%?58?%!important}.font-76[data-v-04c68ea0]{font-size:%?76?%!important}.font-84[data-v-04c68ea0]{font-size:%?84?%!important}.font-86[data-v-04c68ea0]{font-size:%?86?%!important}.font-88[data-v-04c68ea0]{font-size:%?88?%!important}.font-160[data-v-04c68ea0]{font-size:%?160?%!important}.f-bold[data-v-04c68ea0]{font-weight:600}uni-form[data-v-04c68ea0],uni-image[data-v-04c68ea0],uni-input[data-v-04c68ea0],uni-text[data-v-04c68ea0],uni-view[data-v-04c68ea0]{margin:0;padding:0}@font-face{font-family:iconfont;src:url('+o(a("e3b1"))+");src:url("+o(a("e3b1"))+'?#iefix) format("embedded-opentype"),url('+o(a("853e"))+') format("woff2"),url('+o(a("64b0"))+') format("woff"),url('+o(a("1f37"))+') format("truetype"),url('+o(a("30cc"))+'#iconfont) format("svg")}.iconfont[data-v-04c68ea0]{font-family:iconfont!important;font-style:normal;margin-right:%?10?%;font-size:%?28?%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.bg_primary[data-v-04c68ea0]{background:#007aff}.bg_success[data-v-04c68ea0]{background:#4cd964}.bg_warning[data-v-04c68ea0]{background:#f0ad4e}.bg_error[data-v-04c68ea0]{background:#dd524d}.bg-white[data-v-04c68ea0]{background:#fff!important}.bg-black[data-v-04c68ea0]{background:#151515!important}.bg-3e[data-v-04c68ea0]{background:#ff3c3e}.bg-3d[data-v-04c68ea0]{background:#f4433d}.bg-13[data-v-04c68ea0]{background:#131313}.border-99[data-v-04c68ea0]{border:1px solid #999}.font-red[data-v-04c68ea0]{color:#f4433d}.col-f[data-v-04c68ea0]{color:#fff!important}.font-99[data-v-04c68ea0]{color:#999}.font-66[data-v-04c68ea0]{color:#666}.col-66[data-v-04c68ea0]{color:#666}.col-3d[data-v-04c68ea0]{color:#f4433d}.font-ff[data-v-04c68ea0]{color:#fff}.font-A3[data-v-04c68ea0]{color:#a3a3a3!important}.font-purple[data-v-04c68ea0]{color:#f0f!important}.dis-block[data-v-04c68ea0]{display:block}.dis-flex[data-v-04c68ea0]{display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important\n  /* flex-wrap: wrap; */}.flex-box[data-v-04c68ea0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flex-dir-row[data-v-04c68ea0]{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;-webkit-flex-direction:row!important;-ms-flex-direction:row!important;flex-direction:row!important}.flex-dir-column[data-v-04c68ea0]{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;-ms-flex-direction:column!important;flex-direction:column!important}.flex-x-center[data-v-04c68ea0]{\n  /* display: flex; */-webkit-box-pack:center!important;-webkit-justify-content:center!important;-ms-flex-pack:center!important;justify-content:center!important}.flex-x-between[data-v-04c68ea0]{-webkit-box-pack:justify!important;-webkit-justify-content:space-between!important;-ms-flex-pack:justify!important;justify-content:space-between!important}.flex-x-around[data-v-04c68ea0]{-webkit-justify-content:space-around!important;-ms-flex-pack:distribute!important;justify-content:space-around!important}.flex-x-end[data-v-04c68ea0]{-webkit-box-pack:end!important;-webkit-justify-content:flex-end!important;-ms-flex-pack:end!important;justify-content:flex-end!important}.flex-y-center[data-v-04c68ea0]{-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important}.flex-y-end[data-v-04c68ea0]{-webkit-box-align:end!important;-webkit-align-items:flex-end!important;-ms-flex-align:end!important;align-items:flex-end!important}.flex-self-end[data-v-04c68ea0]{-webkit-align-self:flex-end!important;-ms-flex-item-align:end!important;align-self:flex-end!important}.p-re[data-v-04c68ea0]{position:relative!important}.p-ab[data-v-04c68ea0]{position:absolute!important}.p-fix[data-v-04c68ea0]{position:fixed!important}.topBar[data-v-04c68ea0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 %?30?%;height:44px;width:calc(100% - %?60?%);font-size:%?28?%;background:#131313;color:#adadad;z-index:5}.my-button[data-v-04c68ea0]{border-radius:%?25?%;text-align:center}.border-box[data-v-04c68ea0]{-webkit-box-sizing:border-box;box-sizing:border-box}.flex-box[data-v-04c68ea0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.t-center[data-v-04c68ea0]{text-align:center}.padding-30[data-v-04c68ea0]{padding-left:%?30?%;padding-right:%?30?%}.null[data-v-04c68ea0]{margin-top:%?80?%}.null>.iconfont[data-v-04c68ea0]{margin-bottom:%?20?%}.big-cover[data-v-04c68ea0]{position:fixed;height:100%;width:100%;top:0;left:0;background:rgba(0,0,0,.6);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;z-index:20}.toTop[data-v-04c68ea0]{-webkit-animation:toTop-data-v-04c68ea0 .8s;animation:toTop-data-v-04c68ea0 .8s;-webkit-transition:5s;-o-transition:5s;transition:5s}.toLeft[data-v-04c68ea0]{-webkit-animation:toLeft-data-v-04c68ea0 .8s;animation:toLeft-data-v-04c68ea0 .8s}.toBig[data-v-04c68ea0]{-webkit-animation:toBig-data-v-04c68ea0 .8s;animation:toBig-data-v-04c68ea0 .8s}@-webkit-keyframes toTop-data-v-04c68ea0{0%{-webkit-transform:translateY(100%);transform:translateY(100%);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@keyframes toTop-data-v-04c68ea0{0%{-webkit-transform:translateY(100%);transform:translateY(100%);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@-webkit-keyframes toLeft-data-v-04c68ea0{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes toLeft-data-v-04c68ea0{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes toBig-data-v-04c68ea0{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes toBig-data-v-04c68ea0{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.selectSpan[data-v-04c68ea0]{position:relative;background:#fef0f0!important}.selectSpan[data-v-04c68ea0]:before{content:"+";position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:%?2?%;bottom:%?-20?%;right:%?-20?%;color:#fff;font-size:%?22?%;height:%?42?%;width:%?42?%;text-align:left;line-height:%?40?%;background:#f2401a;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);z-index:5}.border-red[data-v-04c68ea0]{color:#ff3c3e!important;border-color:#ff3c3e!important}\n/* iPhone X in portrait & landscape */\n/* iPhone X in landscape */\n/* iPhone X in portrait */.container[data-v-04c68ea0]{position:relative;width:100%;height:100%;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.content[data-v-04c68ea0]{position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;background:#f5f5f5;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;color:#131313}.content_bg[data-v-04c68ea0]{height:100%;width:100%}.content-cover[data-v-04c68ea0]{position:absolute;top:0;left:0;height:100%;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background:rgba(0,0,0,0)}.content-cover .topBar[data-v-04c68ea0]{margin-bottom:%?43?%;background:rgba(0,0,0,0);-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.content-cover .topBar>uni-text[data-v-04c68ea0]{font-size:%?42?%;color:#fff}.content-cover .content[data-v-04c68ea0]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:%?65?% %?30?% %?60?% %?60?%;background:rgba(0,0,0,0)}.content-cover .content .title[data-v-04c68ea0]{margin-bottom:%?137?%;font-size:%?54?%;line-height:%?54?%;color:#fff}.content-cover .content .myForm .ipt[data-v-04c68ea0]{height:%?104?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:#fff;border-bottom:1px solid #909090}.content-cover .content .myForm .ipt>uni-text[data-v-04c68ea0]{font-size:%?30?%}.content-cover .content .myForm .ipt>uni-input[data-v-04c68ea0]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;margin:%?10?% %?30?%;font-size:%?28?%}.content-cover .content .myForm .ipt .del[data-v-04c68ea0]{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.content-cover .content .myForm .ipt .code[data-v-04c68ea0]{width:%?140?%;height:%?36?%;font-size:%?22?%;line-height:%?36?%;text-align:center;border-radius:%?18?%;background:#f4433d}.content-cover .content .myForm .info[data-v-04c68ea0]{height:%?20?%;margin:%?40?% 0 %?186?%;font-size:%?20?%;line-height:%?20?%;color:#f4433d}.content-cover .content .myForm .btn[data-v-04c68ea0]{height:%?98?%;width:100%;border-radius:%?49?%;font-size:%?30?%;color:#fff;line-height:%?98?%;text-align:center;background:#f4433d}.content-cover .content .login[data-v-04c68ea0]{font-size:%?30?%;line-height:%?29?%;text-align:center;color:#999}.content-cover .content .clause[data-v-04c68ea0]{margin-top:%?75?%;font-size:%?22?%;line-height:%?28?%;text-align:center;color:#999}.content-cover .content .clause>uni-text[data-v-04c68ea0]{color:#f4433d}.content-cover .content .clause>.iconfont[data-v-04c68ea0]{font-size:%?28?%}',""])}}]);