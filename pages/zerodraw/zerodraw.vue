<template>
  <view class="container dis-flex flex-dir-column b-15 col-f">
    <view v-if="activityList.length > 0" class="activity-list col-f b-15">
      <view class="past-activity f-25" catchtap="goPast">往期查看</view>
      <view class="activity-menu">
        <view v-for="(item, index) in activityList" :key="index" :class="{'activity-menu-bar': true, 'b-red': item.category_id === selectBarIndex }" @click="selectBar">
          <!-- 参数 data-id="{{ item.category_id }}" data-status="{{ item.status }}" data-endtime="{{ item.activity_endtime }}" -->
          <view class="day f-22">{{ item.activity_date }}</view>
          <view class="time f-33">{{ item.activity_time }}</view>
          <view class="status f-23">{{ item.status }}</view>
        </view>
      </view>
    </view>
    <view class="content">
      <view v-if="goodsList.data.length !== 0" v-for="(item, index) in goodsList.data" :key="index" class="good-item b-f">
         <!--参数 data-id="{{ item.goods_id }}" -->
        <view class="good-img">
          <image src="item.image[0].file_path"></image>
        </view>
        <view class="good-info dis-flex flex-dir-column flex-x-center flex-y-center">
          <view class="good-name f-22 col-13">{{ item.goods_name }}</view>
          <view class="good-price f-25 col-13">官方价：￥{{ item.goods_max_price }}</view>
          <form name="pushMsgFm" bindsubmit="goDraw" report-submit="true">
             <!--参数 data-good_id="{{ item.goods_id }}" data-activity_category_id="{{ selectBarIndex }}" -->
            <button :class="{'draw-btn': true, 'f-30': true, 'col-f': true, 'none': item.isbuy === 'no_allow', 'b-red': true }">￥ 0 抽奖</button>
          </form>
        </view>
      </view>
      <cover-view class="b-f col-13 f-30 f-w">{{ formId }}</cover-view>
      <!-- 无数据 -->
      <view v-if="goodsList.data.length === 0" class="yoshop-notcont">
        <view class="img">
          <image mode="aspectFit" src="../../static/img/no_content.png"></image>
        </view>
        <text class="cont">亲, 没有相关内容</text>
      </view>  
    </view>
    
  </view>
</template>

<script>
</script>


<style lang="scss" scoped>
  
</style>
