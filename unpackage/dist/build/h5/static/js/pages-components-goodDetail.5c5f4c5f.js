(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-components-goodDetail"],{"1cb4":function(t,i,e){"use strict";e.r(i);var a=e("9393"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);i["default"]=n.a},"457a":function(t,i,e){"use strict";var a=e("b3f9"),n=e.n(a);n.a},"6a30":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"container"},[t.isShowTop?e("v-uni-view",{staticClass:"topBar"},[e("v-uni-view",{staticClass:"search"},[e("v-uni-text",{staticClass:"iconfont back",on:{click:function(i){i=t.$handleEvent(i),t.goBack(i)}}},[t._v("")]),e("v-uni-view",{staticClass:"conduct"},[e("v-uni-text",{staticClass:"iconfont share",on:{click:function(i){i=t.$handleEvent(i),t.goShare(i)}}},[t._v("")]),e("v-uni-text",{staticClass:"iconfont",on:{click:function(i){i=t.$handleEvent(i),t.keepAction(i)}}},[t._v("")])],1)],1)],1):t._e(),e("v-uni-scroll-view",{staticClass:"content",attrs:{"scroll-y":"true"},on:{scroll:function(i){i=t.$handleEvent(i),t.scroll(i)}}},[e("v-uni-swiper",{staticClass:"swiper",attrs:{"indicator-dots":t.indicatorDots,autoplay:t.autoplay,"indicator-active-color":t.indicatorActiveColor,interval:t.interval,duration:t.duration,circular:!0}},t._l(t.swiperList,function(t,i){return e("v-uni-swiper-item",{key:i},[e("v-uni-view",{class:{"swiper-item":!0,bg_primary:!0}})],1)}),1),t.showPanic?e("v-uni-view",{staticClass:"panic border-box"},[e("v-uni-view",{staticClass:"price"},[e("v-uni-text",{staticClass:"newPrice"},[t._v("￥199.00")]),e("v-uni-text",{staticClass:"oldPrice"},[t._v("￥700")])],1),e("v-uni-view",{staticClass:"time-box"},[e("v-uni-view",{staticClass:"time-info"},[e("v-uni-text",{staticClass:"iconfont"},[t._v("")]),t._v("距开抢00:10:50.08")],1),e("v-uni-view",{staticClass:"time"},[t._v("今天17:00开抢")])],1)],1):t._e(),e("v-uni-view",{staticClass:"head bg-white"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(t.data.title))]),e("v-uni-view",{staticClass:"price font-red"},[t._v("￥"+t._s(t.data.price))]),e("v-uni-view",{staticClass:"tags"},t._l(t.data.textList,function(i,a){return e("v-uni-text",{key:a,staticClass:"tag"},[t._v(t._s(i))])}),1)],1),e("v-uni-view",{staticClass:"sale-info row bg-white"},[e("v-uni-view",{staticClass:"row-name"},[t._v("促销信息")]),e("v-uni-view",{staticClass:"row-info"},[e("v-uni-text",[t._v("满送")]),e("v-uni-text",[t._v("满999元送4000毫安的充电宝满999元送4000毫安的充电宝...")])],1),e("v-uni-text",{staticClass:"iconfont"},[t._v("")])],1),e("v-uni-view",{staticClass:"row bg-white"},[e("v-uni-view",{staticClass:"row-name"},[t._v("选择颜色")]),e("v-uni-view",{staticClass:"row-info"},[t._v("已选：“黑色”“官方标配”")]),e("v-uni-text",{staticClass:"iconfont"},[t._v("")])],1),e("v-uni-view",{staticClass:"row bg-white"},[e("v-uni-view",{staticClass:"row-name"},[t._v("商品规格")]),e("v-uni-view",{staticClass:"row-info"},[t._v("颜色 适用设备")]),e("v-uni-text",{staticClass:"iconfont"},[t._v("")])],1),e("v-uni-view",{staticClass:"row bg-white"},[e("v-uni-view",{staticClass:"row-name"},[t._v("服务说明")]),e("v-uni-view",{staticClass:"row-info"},[t._v("7天无理由退货，7天保价")]),e("v-uni-text",{staticClass:"iconfont"},[t._v("")])],1),e("v-uni-view",{staticClass:"user-comment bg-white"},[e("v-uni-view",{staticClass:"comment-head"},[e("v-uni-view",[e("v-uni-text",[t._v("用户评价")]),t._v("(3085)")],1),e("v-uni-view",{staticClass:"font-red"},[e("v-uni-text",[t._v("查看全部")]),e("v-uni-text",{staticClass:"iconfont"},[t._v("")])],1)],1),e("v-uni-view",{staticClass:"comment-writer"},[e("v-uni-view",{staticClass:"writer-head"},[e("v-uni-view",[e("v-uni-view",[e("v-uni-image",{attrs:{src:"",mode:""}}),e("v-uni-text",[t._v("炒饭")])],1),e("v-uni-view",{staticClass:"font-99"},[e("v-uni-text",[t._v("2018.10.13 13:11")]),e("v-uni-text",[t._v("黑色；官方标配")])],1),e("v-uni-view")],1),e("v-uni-text",{staticClass:"iconfont font-99"},[t._v("")])],1),e("v-uni-view",{staticClass:"writer-speak"},[t._v("很喜欢，音质不错，算是物超所值了。")]),e("v-uni-view",{staticClass:"writer-speak-img"},[e("v-uni-image",{attrs:{src:"",mode:""}})],1)],1)],1),e("v-uni-view",{staticClass:"store bg-white"},[e("v-uni-image",{attrs:{src:"",mode:""}}),e("v-uni-view",{staticClass:"name"},[t._v(t._s(t.store.name))]),e("v-uni-view",{staticClass:"btn"},[t._v("进店逛逛")])],1)],1)],1)},n=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},9393:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,indicatorActiveColor:"#fff",swiperList:[{},{},{}],isShowTop:!0,data:{price:1099,textList:["包邮","自营"],title:""},store:{name:"SONY官方自营店",imgUrl:""},showPanic:!1}},onLoad:function(t){console.log("分享文章详情页接受到的参数",t),this.data.title=t.info,"true"!==t.panic||(this.showPanic=!0)},methods:{goBack:function(){uni.navigateBack({delta:1})},goShare:function(){uni.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},keepAction:function(){console.log("点击了收藏")},scroll:function(t){t.detail.scrollTop>260?this.isShowTop=!1:t.detail.scrollTop<=260&&(this.isShowTop=!0)}}};i.default=a},b3f9:function(t,i,e){var a=e("d89e");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("66113d5e",a,!0,{sourceMap:!1,shadowMode:!1})},d89e:function(t,i,e){var a=e("b041");i=t.exports=e("2350")(!1),i.push([t.i,'@charset "UTF-8";\n/* 行为相关颜色 */uni-view[data-v-655393ba]{margin:0;padding:0}@font-face{font-family:iconfont;src:url('+a(e("409a"))+");src:url("+a(e("409a"))+'?#iefix) format("embedded-opentype"),url('+a(e("1624"))+') format("woff2"),url('+a(e("6b8d"))+') format("woff"),url('+a(e("fb7e"))+') format("truetype"),url('+a(e("199e"))+'#iconfont) format("svg")}.iconfont[data-v-655393ba]{font-family:iconfont!important;font-style:normal;margin-right:%?10?%;font-size:%?28?%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.bg_primary[data-v-655393ba]{background:#007aff}.bg_success[data-v-655393ba]{background:#4cd964}.bg_warning[data-v-655393ba]{background:#f0ad4e}.bg_error[data-v-655393ba]{background:#dd524d}.font-red[data-v-655393ba]{color:#f4433d}.font-99[data-v-655393ba]{color:#999}.font-66[data-v-655393ba]{color:#666}\n/* iPhone X in portrait & landscape */\n/* iPhone X in landscape */\n/* iPhone X in portrait */.container[data-v-655393ba]{position:relative;width:100%;height:100%;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.content[data-v-655393ba]{position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;background:#f5f5f5;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box}.bg-white[data-v-655393ba]{background:#fff}.topBar[data-v-655393ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 %?30?%;height:88px;width:100%;padding-top:44px;font-size:%?28?%;background:#131313;color:#adadad;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:5}.my-button[data-v-655393ba]{-webkit-border-radius:%?25?%;border-radius:%?25?%;text-align:center}.border-box[data-v-655393ba]{-webkit-box-sizing:border-box;box-sizing:border-box}.flex-box[data-v-655393ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.padding-30[data-v-655393ba]{padding-left:%?30?%;padding-right:%?30?%}.big-cover[data-v-655393ba]{position:fixed;height:100%;width:100%;top:0;left:0;background:rgba(0,0,0,.6);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;z-index:6}.selectSpan[data-v-655393ba]{position:relative;background:#fef0f0!important}.selectSpan[data-v-655393ba]:before{content:"+";position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:%?4?%;bottom:%?-20?%;right:%?-20?%;color:#fff;font-size:%?22?%;height:%?42?%;width:%?42?%;text-align:left;line-height:%?40?%;background:#f2401a;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);z-index:5}.border-red[data-v-655393ba]{color:#ff3c3e!important;border-color:#ff3c3e!important}.topBar[data-v-655393ba]{background:hsla(0,0%,100%,.01);position:absolute;top:0;left:0}.search[data-v-655393ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;line-height:100%;font-size:%?40?%;color:#131313;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.search .conduct .share[data-v-655393ba]{margin-right:%?55?%}.search .iconfont[data-v-655393ba]{color:#131313;font-size:%?40?%}.search .back[data-v-655393ba]{font-weight:600}.swiper[data-v-655393ba]{height:%?750?%}.swiper .swiper-item[data-v-655393ba]{height:%?750?%;width:%?750?%}.panic[data-v-655393ba]{height:%?130?%;padding:%?35?% %?20?% 0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;color:#fff;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;background:#f4a03d}.panic .price .newPrice[data-v-655393ba]{margin-right:%?20?%;font-size:%?56?%;line-height:%?56?%;font-weight:600}.panic .price .oldPrice[data-v-655393ba]{position:relative;font-size:%?26?%;line-height:%?26?%;width:%?350?%}.panic .price .oldPrice[data-v-655393ba]:before{position:absolute;content:"";top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);height:%?1?%;width:100%;background:#fff}.panic .time-box[data-v-655393ba]{height:%?62?%;font-size:%?22?%;text-align:center;padding-left:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box;border-left:1px solid #fff}.panic .time-box .time-info[data-v-655393ba]{font-size:%?20?%;line-height:%?20?%;margin-bottom:%?11?%}.panic .time-box .time-info>.iconfont[data-v-655393ba]{-webkit-border-radius:100%;border-radius:100%;background:#fff;color:#f4a03d}.panic .time-box .time[data-v-655393ba]{height:%?30?%;line-height:%?30?%;width:%?220?%;background:hsla(0,0%,88.2%,.3);-webkit-border-radius:%?15?%;border-radius:%?15?%;text-align:center}.head[data-v-655393ba]{height:%?234?%;padding:%?30?% %?44?% %?20?% %?32?%;-webkit-box-sizing:border-box;box-sizing:border-box}.head .title[data-v-655393ba]{margin-bottom:%?29?%;white-space:nowrap;overflow:hidden;word-break:break-all;-o-text-overflow:ellipsis;text-overflow:ellipsis;font-size:%?32?%;line-height:%?32?%}.head .price[data-v-655393ba]{margin-bottom:%?35?%;font-size:%?36?%;line-height:%?36?%;font-weight:600}.head .tags[data-v-655393ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.head .tags .tag[data-v-655393ba]{display:inline-block;height:%?40?%;padding:0 %?17?%;margin-right:%?10?%;-webkit-border-radius:%?20?%;border-radius:%?20?%;line-height:%?40?%;font-size:%?24?%;background:rgba(244,67,61,.08);color:#f4433d}.head .tags .tag[data-v-655393ba]:nth-child(2n-1){background:rgba(244,160,61,.08);color:#f2401a}.row[data-v-655393ba]{height:%?104?%;padding:0 %?30?%;border-bottom:%?1?% solid #f5f5f5;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.row .row-name[data-v-655393ba]{font-size:%?28?%;color:#999;margin-right:%?44?%}.row .row-info[data-v-655393ba]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:%?26?%;padding-right:%?70?%;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}.sale-info[data-v-655393ba]{height:%?114?%;margin:%?20?% 0}.user-comment[data-v-655393ba]{margin-top:%?20?%;margin-bottom:%?20?%;padding:0 %?30?%}.user-comment .comment-head[data-v-655393ba]{height:%?94?%;font-size:%?28?%;margin-bottom:%?20?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;border-bottom:%?1?% solid #f5f5f5}.user-comment .comment-head>uni-view>uni-text[data-v-655393ba]{margin-right:%?18?%}.user-comment .comment-head .font-red>.iconfont[data-v-655393ba]{margin-left:%?18?%}.user-comment .comment-writer[data-v-655393ba]{height:%?332?%}.user-comment .comment-writer .writer-head[data-v-655393ba]{height:%?78?%;margin-top:%?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.user-comment .comment-writer .writer-head>uni-view>uni-view[data-v-655393ba]{font-size:%?26?%;line-height:%?44?%;margin-bottom:%?13?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.user-comment .comment-writer .writer-head>uni-view>uni-view>uni-image[data-v-655393ba]{height:%?44?%;width:%?44?%;-webkit-border-radius:100%;border-radius:100%;margin-right:%?16?%;background:#ccc}.user-comment .comment-writer .writer-head>uni-view .font-99[data-v-655393ba]{font-size:%?22?%;line-height:%?21?%}.user-comment .comment-writer .writer-speak[data-v-655393ba]{font-size:%?28?%;line-height:%?50?%;margin-top:%?7?%}.user-comment .comment-writer .writer-speak-img[data-v-655393ba]{height:%?110?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;overflow:hidden}.user-comment .comment-writer .writer-speak-img>uni-image[data-v-655393ba]{height:%?110?%;width:%?110?%;margin-right:%?10?%;background:#ccc}.store[data-v-655393ba]{height:%?150?%;padding:0 %?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.store>uni-image[data-v-655393ba]{height:%?100?%;width:%?100?%;margin-right:%?54?%;-webkit-border-radius:100%;border-radius:100%;background:#ccc}.store .name[data-v-655393ba]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-size:%?32?%}.store .btn[data-v-655393ba]{height:%?50?%;width:%?140?%;border:%?1?% solid #131313;text-align:center;font-size:%?24?%;line-height:%?50?%;-webkit-border-radius:%?25?%;border-radius:%?25?%}',""])},fd66:function(t,i,e){"use strict";e.r(i);var a=e("6a30"),n=e("1cb4");for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);e("457a");var s=e("2877"),r=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"655393ba",null);i["default"]=r.exports}}]);