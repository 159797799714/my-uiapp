(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-components-shareInfo"],{"29f3":function(t,a,e){"use strict";e.r(a);var i=e("496c"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);a["default"]=n.a},"496c":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=n(e("ecae"));function n(t){return t&&t.__esModule?t:{default:t}}var o={components:{uParse:i.default},data:function(){return{current:{poster:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",name:"致爱丽丝",author:"暂无",src:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3"},audioAction:{method:"pause"},title:"",article_id:"",indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,indicatorActiveColor:"#ffffff",swiperList:[],userInfo:{imgUrl:"",userName:"奶油田官方"},cultureInfo:{title:"2019深圳奶油田电音节",tags:["深圳奶油田","深圳"],time:"2019-05-16",words:"邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队KnifeParty等，一系列世界级百慕大DJ及国际流行巨星齐现阵。一系列世界级百慕大DJ及国际流行巨星齐现阵。除了力为消费者带来前所未有的跟世界音乐巨星接触的机会，作为风暴电音节的主赞助商，随时随地可以去发现、体检、享受电音所带来的无限兴奋和快乐。"},strings:[],comments:{},speakVal:"",sumList:{zanTotal:2e3,starTotal:1578,megTotal:1959}}},onLoad:function(t){this.article_id=t.article_id,this.getDetail(this.article_id)},methods:{goBack:function(){uni.navigateBack({delta:1})},getDetail:function(t){var a=this;this.$http({url:this.$api.detailing,data:{article_id:t},cb:function(t,e){console.log(e.data.detail),a.swiperList=e.data.detail.banners,a.comments=e.data.detail.comments,a.cultureInfo.title=e.data.detail.article_title;var i=e.data.detail.article_content,n=new RegExp("img");i=i.replace(n,'img style="max-width: 100%;"'),a.strings=i,a.cultureInfo.time=e.data.detail.update_time}})},zanAction:function(t,a){var e=this,i=this.$api.commentunlike;"no"===t.islike&&(i=this.$api.commentlike),this.$http({url:i,data:{comment_id:t.id},cb:function(t,i){if(!t&&i)switch(e.comments.list[a].islike){case"yes":e.comments.list[a].islike="no",e.comments.list[a].likenum-=1,uni.showToast({title:"取消点赞成功",icon:"none"});break;case"no":e.comments.list[a].islike="yes",e.comments.list[a].likenum+=1,uni.showToast({title:"点赞成功",icon:"none"});break}else switch(e.comments.list[a].islike){case"yes":uni.showToast({title:"取消点赞失败",icon:"none"});break;case"no":uni.showToast({title:"点赞失败请重试",icon:"none"});break}}})},goShare:function(){uni.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},onInput:function(t){this.speakVal=t.detail.value},addComment:function(t){var a=this;console.log(this.speakVal),this.$http({url:this.$api.addcomments,data:{article_id:this.article_id,comment:t.detail.value},cb:function(t,e){t||1!==e.code?uni.showToast({title:"发布失败请重试",icon:"none"}):(a.getDetail(a.article_id),a.speakVal="",uni.showToast({title:"评论发布成功",icon:"none"}))}})}}};a.default=o},"8d58":function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"topBar"},[e("v-uni-view",{staticClass:"search"},[e("v-uni-text",{staticClass:"iconfont",on:{click:function(a){a=t.$handleEvent(a),t.goBack(a)}}},[t._v("")]),e("v-uni-view",{staticClass:"center"},[e("v-uni-image",{attrs:{src:"",mode:""}}),e("v-uni-text",{staticClass:"name"},[t._v(t._s(t.userInfo.userName))])],1),e("v-uni-text",{staticClass:"iconfont",on:{click:function(a){a=t.$handleEvent(a),t.goShare(a)}}},[t._v("")])],1)],1),e("v-uni-scroll-view",{staticClass:"content",attrs:{"scroll-y":"true"}},[e("v-uni-swiper",{staticClass:"swiper",attrs:{"indicator-dots":t.indicatorDots,autoplay:t.autoplay,"indicator-active-color":t.indicatorActiveColor,interval:t.interval,duration:t.duration,circular:!0}},t._l(t.swiperList,function(t,a){return e("v-uni-swiper-item",{key:a},[e("v-uni-view",{class:{"swiper-item":!0,bg_primary:!0}},[e("v-uni-image",{attrs:{src:t.banner_img,mode:""}})],1)],1)}),1),e("v-uni-view",{staticClass:"cultureInfo bg-white"},[e("v-uni-view",{staticClass:"cultureTitle"},[t._v(t._s(t.cultureInfo.title))]),e("v-uni-view",{staticClass:"cultureCategory"},t._l(t.cultureInfo.tags,function(a,i){return e("v-uni-text",{key:i},[t._v(t._s(a))])}),1),e("v-uni-view",{staticClass:"cultureTime"},[t._v(t._s(t.cultureInfo.time))]),e("v-uni-view",{staticClass:"cultureWords"},[e("u-parse",{attrs:{content:t.strings},on:{preview:function(a){a=t.$handleEvent(a),t.preview(a)},navigate:function(a){a=t.$handleEvent(a),t.navigate(a)}}})],1)],1),e("v-uni-view",{staticClass:"comment bg-white"},[e("v-uni-view",{staticClass:"total"},[t._v("评论("+t._s(t.comments.num)+")")]),t._l(t.comments.list,function(a,i){return i<3?e("v-uni-view",{key:i,class:{item:!0,"border-box":!0,"no-border":0===i}},[e("v-uni-view",{staticClass:"writer"},[e("v-uni-view",{staticClass:"writerImg"},[e("v-uni-image",{attrs:{src:a.avatarUrl,mode:""}})],1),e("v-uni-view",{staticClass:"writer-center"},[e("v-uni-view",{staticClass:"writer-father"},[e("v-uni-view",{staticClass:"writer-name"},[t._v(t._s(a.nickName))]),e("v-uni-view",{staticClass:"writer-speak"},[t._v(t._s(a.content)),e("v-uni-text",[t._v(t._s(a.input_date))])],1),e("v-uni-view",{staticClass:"zan"},[e("v-uni-text",{class:{iconfont:!0,isZan:"no"!==a.islike},on:{click:function(e){e=t.$handleEvent(e),t.zanAction(a,i)}}},[t._v("")]),e("v-uni-text",[t._v(t._s(a.likenum))])],1)],1),t._l(a.replys,function(a,i){return i<2?e("v-uni-view",{key:i,staticClass:"writer-child"},[e("v-uni-image",{staticClass:"childImg"}),e("v-uni-view",{staticClass:"childCenter"},[e("v-uni-view",{staticClass:"writer-name"},[t._v(t._s(a.reply_name))]),e("v-uni-view",{staticClass:"writer-speak"},[t._v(t._s(a.reply_content)),e("v-uni-text",[t._v(t._s(a.reply_input_time))])],1)],1),e("v-uni-view",{staticClass:"zan"},[e("v-uni-text",{staticClass:"iconfont"},[t._v("")]),e("v-uni-text",[t._v(t._s(a.likenum))])],1)],1):t._e()})],2)],1)],1):t._e()})],2)],1),e("v-uni-view",{staticClass:"speak bg-white border-box"},[e("v-uni-input",{attrs:{type:"text",placeholder:"留下你的精彩评论吧"},on:{confirm:function(a){a=t.$handleEvent(a),t.addComment(a)},input:function(a){a=t.$handleEvent(a),t.onInput(a)}},model:{value:t.speakVal,callback:function(a){t.speakVal=a},expression:"speakVal"}}),e("v-uni-view",[e("v-uni-text",{staticClass:"iconfont"},[t._v("")]),e("v-uni-text",[t._v(t._s(t.comments.num))])],1)],1)],1)},n=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return n})},"8ffe":function(t,a,e){"use strict";e.r(a);var i=e("8d58"),n=e("29f3");for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);e("d01f");var r=e("2877"),f=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"f0f5a5d4",null);a["default"]=f.exports},b2a5:function(t,a,e){var i=e("b041");a=t.exports=e("2350")(!1),a.push([t.i,"@charset \"UTF-8\";\n/* 行为相关颜色 */\n/**\n * author: Di (微信小程序开发工程师)\n * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)\n *         垂直微信小程序开发交流社区\n *\n * github地址: https://github.com/icindy/wxParse\n *\n * for: 微信小程序富文本解析\n * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184\n */\n/**\r\n * 请在全局下引入该文件，@import '/static/wxParse.css';\r\n */.wxParse[data-v-f0f5a5d4]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%;font-family:Helvetica,PingFangSC,Microsoft Yahei,微软雅黑,Arial,sans-serif;color:#333;line-height:1.5;font-size:1em;text-align:justify/* //左右两端对齐 */}.wxParse uni-view[data-v-f0f5a5d4]{word-break:break-word}.wxParse .p[data-v-f0f5a5d4]{padding-bottom:1em;clear:both\r\n\t/* letter-spacing: 0;//字间距 */}.wxParse .inline[data-v-f0f5a5d4]{display:inline;margin:0;padding:0}.wxParse .div[data-v-f0f5a5d4]{margin:0;padding:0;display:block}.wxParse .h1[data-v-f0f5a5d4]{font-size:2em;line-height:1.2em;margin:.67em 0}.wxParse .h2[data-v-f0f5a5d4]{font-size:1.5em;margin:.83em 0}.wxParse .h3[data-v-f0f5a5d4]{font-size:1.17em;margin:1em 0}.wxParse .h4[data-v-f0f5a5d4]{margin:1.33em 0}.wxParse .h5[data-v-f0f5a5d4]{font-size:.83em;margin:1.67em 0}.wxParse .h6[data-v-f0f5a5d4]{font-size:.83em;margin:1.67em 0}.wxParse .b[data-v-f0f5a5d4],.wxParse .h1[data-v-f0f5a5d4],.wxParse .h2[data-v-f0f5a5d4],.wxParse .h3[data-v-f0f5a5d4],.wxParse .h4[data-v-f0f5a5d4],.wxParse .h5[data-v-f0f5a5d4],.wxParse .h6[data-v-f0f5a5d4],.wxParse .strong[data-v-f0f5a5d4]{font-weight:bolder}.wxParse .address[data-v-f0f5a5d4],.wxParse .cite[data-v-f0f5a5d4],.wxParse .em[data-v-f0f5a5d4],.wxParse .i[data-v-f0f5a5d4],.wxParse .var[data-v-f0f5a5d4]{font-style:italic}.wxParse .code[data-v-f0f5a5d4],.wxParse .kbd[data-v-f0f5a5d4],.wxParse .pre[data-v-f0f5a5d4],.wxParse .samp[data-v-f0f5a5d4],.wxParse .tt[data-v-f0f5a5d4]{font-family:monospace}.wxParse .pre[data-v-f0f5a5d4]{overflow:auto;background:#f5f5f5;padding:%?16?%;white-space:pre;margin:1em %?0?%}.wxParse .code[data-v-f0f5a5d4]{display:inline;background:#f5f5f5}.wxParse .big[data-v-f0f5a5d4]{font-size:1.17em}.wxParse .small[data-v-f0f5a5d4],.wxParse .sub[data-v-f0f5a5d4],.wxParse .sup[data-v-f0f5a5d4]{font-size:.83em}.wxParse .sub[data-v-f0f5a5d4]{vertical-align:sub}.wxParse .sup[data-v-f0f5a5d4]{vertical-align:super}.wxParse .del[data-v-f0f5a5d4],.wxParse .s[data-v-f0f5a5d4],.wxParse .strike[data-v-f0f5a5d4]{text-decoration:line-through}.wxParse .s[data-v-f0f5a5d4],.wxParse .strong[data-v-f0f5a5d4]{display:inline}.wxParse .a[data-v-f0f5a5d4]{color:#00bfff}.wxParse .video[data-v-f0f5a5d4]{text-align:center;margin:%?22?% 0}.wxParse .video-video[data-v-f0f5a5d4]{width:100%}.wxParse .uni-image[data-v-f0f5a5d4]{max-width:100%}.wxParse .img[data-v-f0f5a5d4]{display:block;max-width:100%;margin-bottom:-1em;/* //与p标签底部padding同时修改 */overflow:hidden}.wxParse .blockquote[data-v-f0f5a5d4]{margin:%?10?% 0;padding:%?22?% 0 %?22?% %?22?%;font-family:Courier,Calibri,宋体;background:#f5f5f5;border-left:%?6?% solid #dbdbdb}.wxParse .blockquote .p[data-v-f0f5a5d4]{margin:0}.wxParse .ol[data-v-f0f5a5d4],.wxParse .ul[data-v-f0f5a5d4]{display:block;margin:1em 0;padding-left:2em}.wxParse .ol[data-v-f0f5a5d4]{list-style-type:disc}.wxParse .ol[data-v-f0f5a5d4]{list-style-type:decimal}.wxParse .ol>weixin-parse-template[data-v-f0f5a5d4],.wxParse .ul>weixin-parse-template[data-v-f0f5a5d4]{display:list-item;-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline;text-align:match-parent}.wxParse .ol>.li[data-v-f0f5a5d4],.wxParse .ul>.li[data-v-f0f5a5d4]{display:list-item;-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline;text-align:match-parent}.wxParse .ol .ul[data-v-f0f5a5d4],.wxParse .ul .ul[data-v-f0f5a5d4]{list-style-type:circle}.wxParse .ol .ol .ul[data-v-f0f5a5d4],.wxParse .ol .ul .ul[data-v-f0f5a5d4],.wxParse .ul .ol .ul[data-v-f0f5a5d4],.wxParse .ul .ul .ul[data-v-f0f5a5d4]{list-style-type:square}.wxParse .u[data-v-f0f5a5d4]{text-decoration:underline}.wxParse .hide[data-v-f0f5a5d4]{display:none}.wxParse .del[data-v-f0f5a5d4]{display:inline}.wxParse .figure[data-v-f0f5a5d4]{overflow:hidden}.wxParse .table[data-v-f0f5a5d4]{border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;\r\n\t/* 内边框 */border:1px solid #dadada;width:100%}.wxParse .tbody[data-v-f0f5a5d4]{border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;\r\n\t/* 内边框 */border:1px solid #dadada}.wxParse .tfoot[data-v-f0f5a5d4],.wxParse .th[data-v-f0f5a5d4],.wxParse .thead[data-v-f0f5a5d4]{border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;background:#ececec;font-weight:40}.wxParse .tr[data-v-f0f5a5d4]{border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;\r\n\t/* border: 2px solid #F0AD4E; */overflow:auto}.wxParse .td[data-v-f0f5a5d4],.wxParse .th[data-v-f0f5a5d4]{border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;border:%?2?% solid #dadada;overflow:auto}.wxParse .audio[data-v-f0f5a5d4],.wxParse .uni-audio-default[data-v-f0f5a5d4]{display:block}.font-20[data-v-f0f5a5d4]{font-size:%?20?%!important}.font-22[data-v-f0f5a5d4]{font-size:%?22?%!important}.font-24[data-v-f0f5a5d4]{font-size:%?24?%!important}.font-26[data-v-f0f5a5d4]{font-size:%?26?%!important}.font-28[data-v-f0f5a5d4]{font-size:%?28?%!important}.font-30[data-v-f0f5a5d4]{font-size:%?30?%!important}.font-32[data-v-f0f5a5d4]{font-size:%?32?%!important}.font-34[data-v-f0f5a5d4]{font-size:%?34?%!important}.font-36[data-v-f0f5a5d4]{font-size:%?36?%!important}.font-38[data-v-f0f5a5d4]{font-size:%?38?%!important}.font-40[data-v-f0f5a5d4]{font-size:%?40?%!important}.font-42[data-v-f0f5a5d4]{font-size:%?42?%!important}.font-44[data-v-f0f5a5d4]{font-size:%?44?%!important}.font-46[data-v-f0f5a5d4]{font-size:%?46?%!important}.font-52[data-v-f0f5a5d4]{font-size:%?52?%!important}.font-54[data-v-f0f5a5d4]{font-size:%?54?%!important}.font-56[data-v-f0f5a5d4]{font-size:%?56?%!important}.font-58[data-v-f0f5a5d4]{font-size:%?58?%!important}.font-76[data-v-f0f5a5d4]{font-size:%?76?%!important}.font-84[data-v-f0f5a5d4]{font-size:%?84?%!important}.font-86[data-v-f0f5a5d4]{font-size:%?86?%!important}.font-88[data-v-f0f5a5d4]{font-size:%?88?%!important}.font-160[data-v-f0f5a5d4]{font-size:%?160?%!important}.f-bold[data-v-f0f5a5d4]{font-weight:600}uni-form[data-v-f0f5a5d4],uni-image[data-v-f0f5a5d4],uni-input[data-v-f0f5a5d4],uni-text[data-v-f0f5a5d4],uni-view[data-v-f0f5a5d4]{margin:0;padding:0}@font-face{font-family:iconfont;src:url("+i(e("409a"))+");src:url("+i(e("409a"))+'?#iefix) format("embedded-opentype"),url('+i(e("1624"))+') format("woff2"),url('+i(e("6b8d"))+') format("woff"),url('+i(e("fb7e"))+') format("truetype"),url('+i(e("199e"))+'#iconfont) format("svg")}.iconfont[data-v-f0f5a5d4]{font-family:iconfont!important;font-style:normal;margin-right:%?10?%;font-size:%?28?%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.bg_primary[data-v-f0f5a5d4]{background:#007aff}.bg_success[data-v-f0f5a5d4]{background:#4cd964}.bg_warning[data-v-f0f5a5d4]{background:#f0ad4e}.bg_error[data-v-f0f5a5d4]{background:#dd524d}.bg-white[data-v-f0f5a5d4]{background:#fff!important}.bg-black[data-v-f0f5a5d4]{background:#151515!important}.bg-3e[data-v-f0f5a5d4]{background:#ff3c3e}.bg-3d[data-v-f0f5a5d4]{background:#f4433d}.bg-13[data-v-f0f5a5d4]{background:#131313}.border-99[data-v-f0f5a5d4]{border:1px solid #999}.font-red[data-v-f0f5a5d4]{color:#f4433d}.col-f[data-v-f0f5a5d4]{color:#fff}.font-99[data-v-f0f5a5d4]{color:#999}.font-66[data-v-f0f5a5d4]{color:#666}.col-66[data-v-f0f5a5d4]{color:#666}.col-3d[data-v-f0f5a5d4]{color:#f4433d}.font-ff[data-v-f0f5a5d4]{color:#fff}.font-A3[data-v-f0f5a5d4]{color:#a3a3a3!important}.font-purple[data-v-f0f5a5d4]{color:#f0f!important}.dis-block[data-v-f0f5a5d4]{display:block}.dis-flex[data-v-f0f5a5d4]{display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important\n  /* flex-wrap: wrap; */}.flex-box[data-v-f0f5a5d4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flex-dir-row[data-v-f0f5a5d4]{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;-webkit-flex-direction:row!important;-ms-flex-direction:row!important;flex-direction:row!important}.flex-dir-column[data-v-f0f5a5d4]{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;-ms-flex-direction:column!important;flex-direction:column!important}.flex-x-center[data-v-f0f5a5d4]{\n  /* display: flex; */-webkit-box-pack:center!important;-webkit-justify-content:center!important;-ms-flex-pack:center!important;justify-content:center!important}.flex-x-between[data-v-f0f5a5d4]{-webkit-box-pack:justify!important;-webkit-justify-content:space-between!important;-ms-flex-pack:justify!important;justify-content:space-between!important}.flex-x-around[data-v-f0f5a5d4]{-webkit-justify-content:space-around!important;-ms-flex-pack:distribute!important;justify-content:space-around!important}.flex-x-end[data-v-f0f5a5d4]{-webkit-box-pack:end!important;-webkit-justify-content:flex-end!important;-ms-flex-pack:end!important;justify-content:flex-end!important}.flex-y-center[data-v-f0f5a5d4]{-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important}.flex-y-end[data-v-f0f5a5d4]{-webkit-box-align:end!important;-webkit-align-items:flex-end!important;-ms-flex-align:end!important;align-items:flex-end!important}.flex-self-end[data-v-f0f5a5d4]{-webkit-align-self:flex-end!important;-ms-flex-item-align:end!important;align-self:flex-end!important}.p-re[data-v-f0f5a5d4]{position:relative!important}.p-ab[data-v-f0f5a5d4]{position:absolute!important}.p-fix[data-v-f0f5a5d4]{position:fixed!important}.topBar[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 %?30?%;height:88px;width:100%;padding-top:44px;font-size:%?28?%;background:#131313;color:#adadad;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:5}.my-button[data-v-f0f5a5d4]{border-radius:%?25?%;text-align:center}.border-box[data-v-f0f5a5d4]{-webkit-box-sizing:border-box;box-sizing:border-box}.flex-box[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.t-center[data-v-f0f5a5d4]{text-align:center}.padding-30[data-v-f0f5a5d4]{padding-left:%?30?%;padding-right:%?30?%}.null[data-v-f0f5a5d4]{margin-top:%?80?%}.null>.iconfont[data-v-f0f5a5d4]{margin-bottom:%?20?%}.big-cover[data-v-f0f5a5d4]{position:fixed;height:100%;width:100%;top:0;left:0;background:rgba(0,0,0,.6);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;z-index:20}.toTop[data-v-f0f5a5d4]{-webkit-animation:toTop-data-v-f0f5a5d4 .8s;animation:toTop-data-v-f0f5a5d4 .8s;-webkit-transition:5s;-o-transition:5s;transition:5s}.toLeft[data-v-f0f5a5d4]{-webkit-animation:toLeft-data-v-f0f5a5d4 .8s;animation:toLeft-data-v-f0f5a5d4 .8s}.toBig[data-v-f0f5a5d4]{-webkit-animation:toBig-data-v-f0f5a5d4 .8s;animation:toBig-data-v-f0f5a5d4 .8s}@-webkit-keyframes toTop-data-v-f0f5a5d4{0%{-webkit-transform:translateY(100%);transform:translateY(100%);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@keyframes toTop-data-v-f0f5a5d4{0%{-webkit-transform:translateY(100%);transform:translateY(100%);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@-webkit-keyframes toLeft-data-v-f0f5a5d4{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes toLeft-data-v-f0f5a5d4{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes toBig-data-v-f0f5a5d4{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes toBig-data-v-f0f5a5d4{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.selectSpan[data-v-f0f5a5d4]{position:relative;background:#fef0f0!important}.selectSpan[data-v-f0f5a5d4]:before{content:"+";position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:%?2?%;bottom:%?-20?%;right:%?-20?%;color:#fff;font-size:%?22?%;height:%?42?%;width:%?42?%;text-align:left;line-height:%?40?%;background:#f2401a;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);z-index:5}.border-red[data-v-f0f5a5d4]{color:#ff3c3e!important;border-color:#ff3c3e!important}\n/* iPhone X in portrait & landscape */\n/* iPhone X in landscape */\n/* iPhone X in portrait */.container[data-v-f0f5a5d4]{position:relative;width:100%;height:100%;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.content[data-v-f0f5a5d4]{position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;background:#f5f5f5;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;color:#131313}.topBar[data-v-f0f5a5d4]{position:absolute;top:0;left:0;width:100%;background:rgba(0,0,0,.3);z-index:100}.topBar .search[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;font-size:%?38?%;color:#fff;line-height:%?88?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.topBar .search .center[data-v-f0f5a5d4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:0 %?34?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.topBar .search .center>uni-image[data-v-f0f5a5d4]{height:%?60?%;width:%?60?%;margin-right:%?27?%;background:#ccc}.topBar .search .iconfont[data-v-f0f5a5d4]{font-size:%?40?%}.swiper[data-v-f0f5a5d4]{height:%?748?%}.swiper .swiper-item[data-v-f0f5a5d4]{height:%?748?%;width:%?748?%}.swiper .swiper-item>uni-image[data-v-f0f5a5d4]{height:100%;width:100%}.songs[data-v-f0f5a5d4]{height:%?207?%}.songs .song-share[data-v-f0f5a5d4]{height:%?93?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;font-size:%?24?%;color:#666;line-height:%?93?%}.songs .song-share .title>uni-text[data-v-f0f5a5d4]{margin-right:%?25?%;font-size:%?36?%;font-weight:600;color:#131313}.songs .sing[data-v-f0f5a5d4]{height:%?114?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.cultureInfo[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-bottom:%?30?%;padding:%?60?% %?30?%;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.cultureInfo .cultureTitle[data-v-f0f5a5d4]{margin-bottom:%?21?%;font-size:%?40?%;font-weight:600;line-height:%?56?%}.cultureInfo .cultureCategory[data-v-f0f5a5d4]{height:%?40?%;line-height:%?40?%;margin-bottom:%?30?%;font-size:%?24?%;overflow:auto;white-space:nowrap}.cultureInfo .cultureCategory>uni-text[data-v-f0f5a5d4]{margin-right:%?20?%;display:inline-block;line-height:%?40?%;padding-left:%?20?%;padding-right:%?26?%;border-radius:%?20?%;background:#f5f5f5}.cultureInfo .cultureTime[data-v-f0f5a5d4]{margin-bottom:%?30?%;height:%?20?%;line-height:%?20?%;color:#adadad;font-size:%?24?%}.cultureInfo .cultureWords[data-v-f0f5a5d4]{width:100%;font-size:%?28?%;word-break:break-all;line-height:%?40?%;color:#666}.cultureInfo .cultureWords uni-image[data-v-f0f5a5d4]{max-width:%?500?%}.comment[data-v-f0f5a5d4]{padding:%?40?% %?40?% 0 %?35?%;margin-bottom:%?99?%}.comment .total[data-v-f0f5a5d4]{font-size:%?36?%;line-height:%?34?%}.comment .item[data-v-f0f5a5d4]{min-height:%?150?%;padding-top:%?30?%;padding-bottom:%?27?%;border-top:%?2?% solid #f5f5f5}.comment .item .writer[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.comment .item .writer .writerImg[data-v-f0f5a5d4]{height:%?66?%;width:%?66?%;border-radius:100%;margin-right:%?30?%;border:1px solid #f5f5f5;overflow:hidden}.comment .item .writer .writerImg>uni-image[data-v-f0f5a5d4]{height:100%;width:100%}.comment .item .writer .writer-center[data-v-f0f5a5d4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding-right:%?70?%;overflow:hidden}.comment .item .writer .writer-center .writer-child[data-v-f0f5a5d4],.comment .item .writer .writer-center .writer-father[data-v-f0f5a5d4]{position:relative}.comment .item .writer .writer-center .writer-child .zan[data-v-f0f5a5d4],.comment .item .writer .writer-center .writer-father .zan[data-v-f0f5a5d4]{position:absolute;right:%?-70?%;top:0}.comment .item .writer .writer-center .writer-child .isZan[data-v-f0f5a5d4],.comment .item .writer .writer-center .writer-father .isZan[data-v-f0f5a5d4]{position:relative}.comment .item .writer .writer-center .writer-child .isZan[data-v-f0f5a5d4]:before,.comment .item .writer .writer-center .writer-father .isZan[data-v-f0f5a5d4]:before{content:"";height:%?13?%;width:%?14?%;background:#f4433d;position:absolute;bottom:%?6?%;left:%?8?%}.comment .item .writer .writer-center .writer-name[data-v-f0f5a5d4]{font-size:%?26?%;line-height:%?25?%;color:#666;margin-bottom:%?20?%}.comment .item .writer .writer-center .writer-speak[data-v-f0f5a5d4]{margin-bottom:%?40?%;font-size:%?28?%;line-height:%?36?%;word-break:break-all}.comment .item .writer .writer-center .writer-speak>uni-text[data-v-f0f5a5d4]{margin-left:%?10?%;font-size:%?24?%;line-height:%?36?%;color:#666}.comment .item .writer .writer-center .writer-child[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;min-height:%?150?%}.comment .item .writer .writer-center .writer-child .childImg[data-v-f0f5a5d4]{height:%?44?%;width:%?44?%;margin-right:%?30?%;background:#ccc;border-radius:100%}.comment .item .writer .writer-center .writer-child .childCenter[data-v-f0f5a5d4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.comment .item .writer .zan[data-v-f0f5a5d4]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.comment .item .writer .zan .iconfont[data-v-f0f5a5d4]{font-size:%?36?%;margin:0;color:#adadad}.comment .item .writer .zan>uni-text[data-v-f0f5a5d4]{font-size:%?20?%;line-height:%?36?%;color:#666}.comment .no-border[data-v-f0f5a5d4]{border-top:0}.speak[data-v-f0f5a5d4]{position:fixed;bottom:0;left:0;width:100%;height:%?99?%;margin-top:%?1?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;text-align:left;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:0 %?30?%;border-top:1px solid #f5f5f5}.speak>uni-input[data-v-f0f5a5d4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:%?60?%;border-radius:%?30?%;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?22?%;background:#f5f5f5}.speak>uni-view[data-v-f0f5a5d4]{margin:0 %?35?% 0;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.speak>uni-view .iconfont[data-v-f0f5a5d4]{font-size:%?36?%;line-height:%?36?%;color:#666;margin:0}.speak>uni-view>uni-text[data-v-f0f5a5d4]{font-size:%?20?%;line-height:%?34?%;color:#666}',""])},c02a:function(t,a,e){var i=e("b2a5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("fedb62d4",i,!0,{sourceMap:!1,shadowMode:!1})},d01f:function(t,a,e){"use strict";var i=e("c02a"),n=e.n(i);n.a}}]);