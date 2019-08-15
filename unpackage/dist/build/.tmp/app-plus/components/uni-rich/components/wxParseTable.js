(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-rich/components/wxParseTable"],{"0cb2":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"wxParseTable",props:{node:{type:Object,default:function(){return{}}}},data:function(){return{nodes:[]}},mounted:function(){this.nodes=this.loadNode([this.node])},methods:{loadNode:function(t){var e=[],n=!0,r=!1,o=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var l=a.value;if("element"==l.node){var i={name:l.tag,attrs:{class:l.classStr},children:l.nodes?this.loadNode(l.nodes):[]};e.push(i)}else"text"==l.node&&e.push({type:"text",text:l.text})}}catch(s){r=!0,o=s}finally{try{n||null==u.return||u.return()}finally{if(r)throw o}}return e}}};e.default=r},"1f28":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return o})},"51d3":function(t,e,n){"use strict";n.r(e);var r=n("1f28"),o=n("6655");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);var u=n("2877"),l=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=l.exports},6655:function(t,e,n){"use strict";n.r(e);var r=n("0cb2"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-rich/components/wxParseTable-create-component',
    {
        'components/uni-rich/components/wxParseTable-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("51d3"))
        })
    },
    [['components/uni-rich/components/wxParseTable-create-component']]
]);                
