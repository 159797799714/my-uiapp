(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-rich/parse"],{"23c6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("f108"));function r(t){return t&&t.__esModule?t:{default:t}}var a=function(){return n.e("components/uni-rich/components/wxParseTemplate0").then(n.bind(null,"8b28"))},o={name:"wxParse",props:{userSelect:{type:String,default:"text"},imgOptions:{type:[Object,Boolean],default:function(){return{loop:!1,indicator:"number",longPressActions:!1}}},loading:{type:Boolean,default:!1},className:{type:String,default:""},content:{type:String,default:""},noData:{type:String,default:'<div style="color: red;">数据不能为空</div>'},startHandler:{type:Function,default:function(){return function(t){t.attr.class=null,t.attr.style=null}}},endHandler:{type:Function,default:null},charsHandler:{type:Function,default:null},imageProp:{type:Object,default:function(){return{mode:"aspectFit",padding:0,lazyLoad:!1,domain:""}}}},components:{wxParseTemplate:a},data:function(){return{nodes:{},imageUrls:[],wxParseWidth:{value:0}}},computed:{},mounted:function(){var t=this;this.getWidth().then(function(e){t.wxParseWidth.value=e}),this.setHtml()},methods:{setHtml:function(){var t=this.content,e=this.noData,n=this.imageProp,r=this.startHandler,a=this.endHandler,o=this.charsHandler,s=t||e,l={start:r,end:a,chars:o},u=(0,i.default)(s,l,n,this);this.imageUrls=u.imageUrls,this.nodes=u.nodes},getWidth:function(){var e=this;return new Promise(function(n,i){t.createSelectorQuery().in(e).select(".wxParse").fields({size:!0,scrollOffset:!0},function(t){n(t.width)}).exec()})},navigate:function(t,e){this.$emit("navigate",t,e)},preview:function(e,n){this.imageUrls.length&&"boolean"!==typeof this.imgOptions&&t.previewImage({current:e,urls:this.imageUrls,loop:this.imgOptions.loop,indicator:this.imgOptions.indicator,longPressActions:this.imgOptions.longPressActions}),this.$emit("preview",e,n)},removeImageUrl:function(t){var e=this.imageUrls;e.splice(e.indexOf(t),1)}},provide:function(){return{parseWidth:this.wxParseWidth}},watch:{content:function(){this.setHtml()}}};e.default=o}).call(this,n("6e42")["default"])},ecae:function(t,e,n){"use strict";n.r(e);var i=n("eef7"),r=n("f65d");for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);var o=n("2877"),s=Object(o["a"])(r["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},eef7:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},f65d:function(t,e,n){"use strict";n.r(e);var i=n("23c6"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-rich/parse-create-component',
    {
        'components/uni-rich/parse-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("ecae"))
        })
    },
    [['components/uni-rich/parse-create-component']]
]);                
