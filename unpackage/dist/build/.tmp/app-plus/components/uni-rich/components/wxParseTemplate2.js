(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-rich/components/wxParseTemplate2"],{"0589":function(n,e,t){"use strict";t.r(e);var r=t("9dd4"),o=t.n(r);for(var u in r)"default"!==u&&function(n){t.d(e,n,function(){return r[n]})}(u);e["default"]=o.a},"9dd4":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){return t.e("components/uni-rich/components/wxParseTemplate3").then(t.bind(null,"a56e"))},o=function(){return t.e("components/uni-rich/components/wxParseImg").then(t.bind(null,"849d"))},u=function(){return t.e("components/uni-rich/components/wxParseVideo").then(t.bind(null,"4fe7"))},a=function(){return t.e("components/uni-rich/components/wxParseAudio").then(t.bind(null,"0863"))},i=function(){return t.e("components/uni-rich/components/wxParseTable").then(t.bind(null,"51d3"))},c={name:"wxParseTemplate2",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:o,wxParseVideo:u,wxParseAudio:a,wxParseTable:i},methods:{wxParseATap:function(n){var e=n.currentTarget.dataset.href;if(e){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(e,n)}}}};e.default=c},bcc9:function(n,e,t){"use strict";var r=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"a",function(){return r}),t.d(e,"b",function(){return o})},fd14:function(n,e,t){"use strict";t.r(e);var r=t("bcc9"),o=t("0589");for(var u in o)"default"!==u&&function(n){t.d(e,n,function(){return o[n]})}(u);var a=t("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-rich/components/wxParseTemplate2-create-component',
    {
        'components/uni-rich/components/wxParseTemplate2-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("fd14"))
        })
    },
    [['components/uni-rich/components/wxParseTemplate2-create-component']]
]);                
