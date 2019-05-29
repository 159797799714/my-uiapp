<template>
  <view class="container">
    <view class="topBar">
      
    </view>
    <srollview class="content">
      <input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
      <input class="uni-input" placeholder="带清除按钮的输入框" :value="inputClearValue" @input="clearInput" />
      <view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
    </srollview>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        title: '搜索页',
        inputClearValue: '',
        showClearIcon: false
      }
    },
    methods: {
      clearIcon: function() {
      	this.inputClearValue = '';
      	this.showClearIcon = false;
      },
      clearInput: function(event) {
        console.log(event.target.value)
      	this.inputClearValue = event.target.value;
      	if (event.target.value.length > 0) {
      		this.showClearIcon = true;
      	} else {
      		this.showClearIcon = false;
      	}
      },
    }
  }
</script>

<style>
</style>
