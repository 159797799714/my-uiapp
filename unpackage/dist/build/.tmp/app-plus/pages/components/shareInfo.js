(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/shareInfo"],{"310b":function(t,e,i){"use strict";i.r(e);var o=i("78a1"),n=i("47c3");for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i("8f9d");var s=i("2877"),l=Object(s["a"])(n["default"],o["a"],o["b"],!1,null,"fca3d032",null);e["default"]=l.exports},"47c3":function(t,e,i){"use strict";i.r(e);var o=i("83a6c"),n=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);e["default"]=n.a},"78a1":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},"83a6c":function(t,e,i){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return Promise.all([i.e("common/vendor"),i.e("components/uni-rich/parse")]).then(i.bind(null,"0aed"))},a={components:{uParse:n},data:function(){return{scrollTop:0,isHeadShow:!0,title:"",article_id:"",indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,indicatorActiveColor:"#ffffff",detail:{},userInfo:{},cultureInfo:{title:"2019深圳奶油田电音节",tags:["深圳奶油田","深圳"],time:"2019-05-16",words:"邀请了著名乐队Pendulum的核心成员Rob Swire和GaretMcGrillen改组成的双人电子音乐制作团队KnifeParty等，一系列世界级百慕大DJ及国际流行巨星齐现阵。一系列世界级百慕大DJ及国际流行巨星齐现阵。除了力为消费者带来前所未有的跟世界音乐巨星接触的机会，作为风暴电音节的主赞助商，随时随地可以去发现、体检、享受电音所带来的无限兴奋和快乐。"},strings:[],speakVal:"",sumList:{zanTotal:2e3,starTotal:1578,megTotal:1959}}},onLoad:function(t){this.article_id=t.article_id,this.getDetail(this.article_id)},computed:{statusBarHeight:function(){return this.$store.state.statusBarHeight}},methods:{goBack:function(){t.navigateBack({delta:1})},onScroll:function(t){var e=this;t.detail.scrollTop>e.scrollTop&&e.isHeadShow?e.isHeadShow=!1:t.detail.scrollTop<e.scrollTop&&!e.isHeadShow&&(e.isHeadShow=!0),e.scrollTop=t.detail.scrollTop},getDetail:function(t){var e=this;this.$http({url:this.$api.detailing,data:{article_id:t},cb:function(t,i){console.log(o(i.data.detail," at pages\\components\\shareInfo.vue:200"));var n=i.data.detail;e.detail=n,e.swiperList=n.banners,e.cultureInfo.title=n.article_title,e.userInfo={file_path:n.headimg.file_path,author:n.author};var a=n.article_content,s=new RegExp("img");a=a.replace(s,'img style="max-width: 100%;"'),e.strings=a,e.cultureInfo.time=n.update_time}})},gogoodDetail:function(e){console.log(o(e," at pages\\components\\shareInfo.vue:223")),t.navigateTo({url:"./goodDetail?goods_id="+e.goods_id})},zanAction:function(e,i){var n=this;console.log(o("点赞",e,e.islike,i," at pages\\components\\shareInfo.vue:230"));var a=this.$api.commentunlike;"no"===e.islike&&(a=this.$api.commentlike),this.$http({url:a,data:{comment_id:e.id},cb:function(e,o){if(!e&&o)switch(n.detail.comments_show[i].islike){case"yes":n.detail.comments_show[i].islike="no",n.detail.comments_show[i].likenum-=1,t.showToast({title:"取消点赞成功",icon:"none"});break;case"no":n.detail.comments_show[i].islike="yes",n.detail.comments_show[i].likenum+=1,t.showToast({title:"点赞成功",icon:"none"});break}else switch(n.detail.comments_show[i].islike){case"yes":t.showToast({title:"取消点赞失败",icon:"none"});break;case"no":t.showToast({title:"点赞失败请重试",icon:"none"});break}}})},goShare:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"uni-app分享",summary:"我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",imageUrl:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(t){console.log(o("success:"+JSON.stringify(t)," at pages\\components\\shareInfo.vue:291"))},fail:function(t){console.log(o("fail:"+JSON.stringify(t)," at pages\\components\\shareInfo.vue:294"))}})},onInput:function(t){this.speakVal=t.detail.value},addComment:function(e){var i=this;console.log(o(this.speakVal," at pages\\components\\shareInfo.vue:303")),this.$http({url:this.$api.addcomments,data:{article_id:this.article_id,comment:e.detail.value},cb:function(e,o){e||1!==o.code?t.showToast({title:"发布失败请重试",icon:"none"}):(i.getDetail(i.article_id),i.speakVal="",t.showToast({title:"评论发布成功",icon:"none"}))}})}}};e.default=a}).call(this,i("6e42")["default"],i("0de9")["default"])},"88af":function(t,e,i){},"8f9d":function(t,e,i){"use strict";var o=i("88af"),n=i.n(o);n.a}},[["1c0e","common/runtime","common/vendor"]]]);