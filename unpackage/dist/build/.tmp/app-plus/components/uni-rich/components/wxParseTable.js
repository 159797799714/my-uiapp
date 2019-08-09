(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-rich/components/wxParseTable"],{1192:function(t,e,n){"use strict";n.r(e);var r=n("b884"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e["default"]=a.a},"159f":function(t,e,n){"use strict";n.r(e);var r=n("21a3"),a=n("1192");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);var u=n("2877"),l=Object(u["a"])(a["default"],r["a"],r["b"],!1,null,null,null);e["default"]=l.exports},"21a3":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a})},b884:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"wxParseTable",props:{node:{type:Object,default:function(){return{}}}},data:function(){return{nodes:[]}},mounted:function(){this.nodes=this.loadNode([this.node])},methods:{loadNode:function(t){var e=[],n=!0,r=!1,a=void 0;try{for(var o,u=t[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var l=o.value;if("element"==l.node){var i={name:l.tag,attrs:{class:l.classStr},children:l.nodes?this.loadNode(l.nodes):[]};e.push(i)}else"text"==l.node&&e.push({type:"text",text:l.text})}}catch(s){r=!0,a=s}finally{try{n||null==u.return||u.return()}finally{if(r)throw a}}return e}}};e.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-rich/components/wxParseTable-create-component',
    {
        'components/uni-rich/components/wxParseTable-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("159f"))
        })
    },
    [['components/uni-rich/components/wxParseTable-create-component']]
]);                
