(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/addAddress"],{3157:function(e,t,n){},"537a":function(e,t,n){"use strict";n.r(t);var i=n("7725"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=a.a},"5e90":function(e,t,n){"use strict";var i=n("3157"),a=n.n(i);a.a},7725:function(e,t,n){"use strict";(function(e,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-pick/mpvue-citypicker/mpvueCityPicker")]).then(n.bind(null,"39b5"))},o={components:{mpvueCityPicker:a},data:function(){return{address_id:"",isDefault:!1,detail:{name:"",phone:"",region:"",detail:""},cityPickerValueDefault:[0,0,1],themeColor:"#007AFF"}},onLoad:function(e){e.id&&(this.isDefault="true"===e.isDefault,this.address_id=e.id,this.getAddressDetail(e.id))},onUnload:function(){},computed:{statusBarHeight:function(){return this.$store.state.statusBarHeight}},methods:{goBack:function(){e.navigateBack({delta:1})},showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},onConfirm:function(e){this.detail.region=e.label.replace(/-/g,",")},getAddressDetail:function(t){var n=this;n.$http({url:n.$api.addressDetail,data:{address_id:t},cb:function(t,i){t||1!==i.code?0===i.code?e.showToast({title:i.msg,icon:"none"}):e.showToast({title:"收货地址获取失败",icon:"none"}):(i.data.detail.region=i.data.detail.region.city+","+i.data.detail.region.province+","+i.data.detail.region.region,n.detail=i.data.detail)}})},saveAddress:function(){var t=this,n=t.detail;n.address_id=t.address_id,t.address_id?t.$http({url:t.$api.editAddres,data:n,method:"POST",cb:function(t,n){t||1!==n.code?0===n.code?e.showToast({title:n.msg,icon:"none"}):e.showToast({title:"修改失败，请重试",icon:"none"}):(e.showToast({title:"修改",icon:"none"}),e.navigateBack({delta:1}))}}):t.$http({url:t.$api.addAddress,data:t.detail,method:"POST",cb:function(t,n){t||1!==n.code?0===n.code?e.showToast({title:n.msg,icon:"none"}):e.showToast({title:"添加失败，请重试",icon:"none"}):(e.showToast({title:"添加成功",icon:"none"}),e.navigateBack({delta:1}))}})},selectRegion:function(e){console.log(i(e.detail.value," at pages\\mine\\addAddress.vue:202"));var t=e.detail.value.join(",");this.detail.region=t},saveAction:function(){var t=this;e.showModal({content:"确认保存？",success:function(e){e.confirm?t.saveAddress():e.cancel&&console.log(i("用户点击取消"," at pages\\mine\\addAddress.vue:230"))}})},switchChange:function(t){var n=this;t.target.value?n.$http({url:n.$api.setDefaultAddress,data:{address_id:n.address_id},method:"POST",cb:function(t,i){t||1!==i.code?0===i.code?e.showToast({title:i.msg,icon:"none"}):e.showToast({title:"设置失败，请重试",icon:"none"}):(e.showToast({title:"设置成功",icon:"none"}),n.isDefault=!0)}}):n.isDefault=!1},delAddress:function(){var t=this;t.$http({url:t.$api.deleteAddress,data:{address_id:t.address_id},method:"POST",cb:function(t,n){t||1!==n.code?0===n.code?e.showToast({title:n.msg,icon:"none"}):e.showToast({title:"删除失败，请重试",icon:"none"}):(e.showToast({title:"删除成功",icon:"none"}),e.navigateBack({delta:1}))}})}}};t.default=o}).call(this,n("6e42")["default"],n("0de9")["default"])},ae22:function(e,t,n){"use strict";n.r(t);var i=n("fe62"),a=n("537a");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);n("5e90");var s=n("2877"),d=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,"0303f53c",null);t["default"]=d.exports},fe62:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a})}},[["2f13","common/runtime","common/vendor"]]]);