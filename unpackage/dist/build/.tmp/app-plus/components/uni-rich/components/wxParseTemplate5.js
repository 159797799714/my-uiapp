(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-rich/components/wxParseTemplate5"],{"971c":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){return t.e("components/uni-rich/components/wxParseTemplate6").then(t.bind(null,"9c74"))},o=function(){return t.e("components/uni-rich/components/wxParseImg").then(t.bind(null,"f708"))},u=function(){return t.e("components/uni-rich/components/wxParseVideo").then(t.bind(null,"7cc0"))},a=function(){return t.e("components/uni-rich/components/wxParseAudio").then(t.bind(null,"4069"))},i=function(){return t.e("components/uni-rich/components/wxParseTable").then(t.bind(null,"159f"))},c={name:"wxParseTemplate5",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:o,wxParseVideo:u,wxParseAudio:a,wxParseTable:i},methods:{wxParseATap:function(n){var e=n.currentTarget.dataset.href;if(e){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(e,n)}}}};e.default=c},b476:function(n,e,t){"use strict";t.r(e);var r=t("971c"),o=t.n(r);for(var u in r)"default"!==u&&function(n){t.d(e,n,function(){return r[n]})}(u);e["default"]=o.a},e4ed:function(n,e,t){"use strict";t.r(e);var r=t("fba9"),o=t("b476");for(var u in o)"default"!==u&&function(n){t.d(e,n,function(){return o[n]})}(u);var a=t("2877"),i=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=i.exports},fba9:function(n,e,t){"use strict";var r=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"a",function(){return r}),t.d(e,"b",function(){return o})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-rich/components/wxParseTemplate5-create-component',
    {
        'components/uni-rich/components/wxParseTemplate5-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("e4ed"))
        })
    },
    [['components/uni-rich/components/wxParseTemplate5-create-component']]
]);                