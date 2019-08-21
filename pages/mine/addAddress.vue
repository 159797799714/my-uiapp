<template>
  <view class="container">
    <view class="topBar" :style="{'padding-top': statusBarHeight + 'px' }">
      <text class="iconfont" @click="goBack">&#xe61c;</text>
      <text @click="saveAction">编辑收货地址</text>
      <text class="iconfont" @click="saveAction">&#xe603;</text>
    </view>
    <view class="content padding-30 border-box bg-white">
      <view class="row">
        <text class="name">收货人</text>
        <view class="center dis-flex flex-y-center ">
          <input type="text" class="ipt" v-model="detail.name" placeholder="请输入收货人姓名"/>
        </view>
      </view>
      <view class="row">
        <text class="name">手机号码</text>
        <view class="center dis-flex flex-y-center ">
          <input type="text" class="ipt" v-model="detail.phone"  maxlength="11"  placeholder="请输入手机号码"/>
        </view>
      </view>
      <view class="row">
        <text class="name">所在地区</text>
        <view class="center dis-flex flex-y-center" @click="showMulLinkageThreePicker">
          <text v-if="!detail.region" class="f-30">选择省、市、区</text>
          <text v-else class="f-30">{{ detail.region }}</text>
        </view>
        <!-- <text class="iconfont region" @click="getLocation">&#xe646;</text> -->
      </view>
      <view class="row">
        <text class="name">详细地址</text>
        <view class="center dis-flex flex-y-center">
          <input type="text" class="ipt" v-model="detail.detail" placeholder="请输入街道楼层等具体信息"/>
        </view>
      </view>
      <view class="row">
        <text class="name">标签</text>
        <view class="center dis-flex flex-y-center">
          <text v-for="(item, index) in detail.tags" :key="index" class="tag">{{ item }}</text>
        </view>
      </view>
      <view v-if="address_id && !isDefault" class="def">
        <text>设为默认地址</text>
        <switch :checked="isDefault" style="transform:scale(0.7)" @change="switchChange" color="#F4433D" />
      </view>
      <view v-if="address_id" class="delBtn" @click="delAddress">
        <button type="warn">删除地址</button>
      </view>
      <view v-if="!address_id" class="delBtn bg-13 my-btn col-f" @click="saveAction">保存</view>
    </view>
    <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
      @onConfirm="onConfirm"></mpvue-city-picker>
  </view>
</template>

<script>
  import mpvueCityPicker from '../../components/uni-pick/mpvue-citypicker/mpvueCityPicker.vue'
  export default {
    components: {
      mpvueCityPicker
    },
    data() {
      return {
        address_id: '', // 传过来的地址id
        isDefault: false, // 是否默认地址
        detail: {
          name: '',
          phone: '',
          region: '',
          detail: ''
        },

        // 城市选择
        cityPickerValueDefault: [0, 0, 1],             
        themeColor: '#007AFF'
      }
    },
    onLoad(option) {
      if (option.id) {
        this.isDefault = option.isDefault === 'true' ? true : false
        this.address_id = option.id
        // 获取地址详情
        this.getAddressDetail(option.id)
      }
    },
    onUnload() {
      // if(address_id) {
      //   
      // } else {
      //   // 离开页面自动保存
      //   this.saveAddress()  
      // }
    },
    computed: {
      statusBarHeight() {
        return this.$store.state.statusBarHeight
      }
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 三级联动选择
      showMulLinkageThreePicker() {
        this.$refs.mpvueCityPicker.show()
      },
      // 地址确定回调
      onConfirm(e) {
        this.detail.region = e.label.replace(/-/g, ',')
      },
      // 获取地址详情
      getAddressDetail(id) {
        let that = this
        that.$http({
          url: that.$api.addressDetail,
          data: {
            address_id: id
          },
          cb: (err, res) => {
            if (!err && res.code === 1) {
              res.data.detail.region = res.data.detail.region.city + ',' + res.data.detail.region.province + ',' +
                res.data.detail.region.region
              that.detail = res.data.detail
            } else if (res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '收货地址获取失败',
                icon: 'none'
              })
            }
          }
        })
      },
      // 保存或者添加收货地址
      saveAddress() {
        let that = this
        let detail = that.detail
        detail.address_id = that.address_id
        if (that.address_id) {
          that.$http({
            url: that.$api.editAddres,
            data: detail,
            method: 'POST',
            cb: (err, res) => {
              if (!err && res.code === 1) {
                uni.showToast({
                  title: '修改',
                  icon: 'none'
                })
                uni.navigateBack({
                  delta: 1
                })
              } else if (res.code === 0) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              } else {
                uni.showToast({
                  title: '修改失败，请重试',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          that.$http({
            url: that.$api.addAddress,
            data: that.detail,
            method: 'POST',
            cb: (err, res) => {
              if (!err && res.code === 1) {
                uni.showToast({
                  title: '添加成功',
                  icon: 'none'
                })
                uni.navigateBack({
                  delta: 1
                })
              } else if (res.code === 0) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              } else {
                uni.showToast({
                  title: '添加失败，请重试',
                  icon: 'none'
                })
              }
            }
          })
        }
      },
      // 选择省市区
      selectRegion(e) {
        console.log(e.detail.value)
        let region = e.detail.value.join(',')
        this.detail.region = region
      },
      // 打开地图选择地址并获取位置
      // getLocation() {
      //   let that = this
      //   uni.chooseLocation({
      //     success: function(res) {
      //       console.log(res)
      //       that.info.region = res.address
      //       console.log('位置名称：' + res.name);
      //       console.log('详细地址：' + res.address);
      //       console.log('纬度：' + res.latitude);
      //       console.log('经度：' + res.longitude);
      //     }
      //   })
      // },
      // 保存地址
      saveAction() {
        let that = this
        uni.showModal({
          // title: '温馨提示',
          content: '确认保存？',
          success(res) {
            if (res.confirm) {
              that.saveAddress()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },

      // 选择默认
      switchChange(e) {
        let that = this
        if (e.target.value) {
          that.$http({
            url: that.$api.setDefaultAddress,
            data: {
              address_id: that.address_id
            },
            method: 'POST',
            cb: (err, res) => {
              if (!err && res.code === 1) {
                uni.showToast({
                  title: '设置成功',
                  icon: 'none'
                })
                that.isDefault = true
              } else if (res.code === 0) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              } else {
                uni.showToast({
                  title: '设置失败，请重试',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          that.isDefault = false
        }
      },
      // 删除地址
      delAddress() {
        let that = this
        that.$http({
          url: that.$api.deleteAddress,
          data: {
            address_id: that.address_id
          },
          method: 'POST',
          cb: (err, res) => {
            if (!err && res.code === 1) {
              uni.showToast({
                title: '删除成功',
                icon: 'none'
              })
              uni.navigateBack({
                delta: 1
              })
            } else if (res.code === 0) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            } else {
              uni.showToast({
                title: '删除失败，请重试',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar {
    display: flex;
    justify-content: space-between;
    font-size: $font-38;
    color: $color-white;

    .iconfont {
      font-size: $font-42;
      font-weight: 500;
    }

    .del {
      transform: rotate(45deg);
    }
  }

  .content {
    padding-top: 30upx;
    font-size: $font-28;

    .row {
      display: flex;
      height: 104upx;
      line-height: 104upx;
      border-bottom: 1px solid $color-f5;

      .name {
        display: inline-block;
        width: 120upx;
        margin-right: 20upx;
        color: $title-color;
        text-align: left;
      }

      .center {
        flex: 1;

        .ipt {
          height: 70rpx;
          width: 100%;
        }

        .tag {
          margin-right: 23upx;
          display: inline-block;
          height: 40upx;
          width: 92upx;
          text-align: center;
          line-height: 40upx;
          border-radius: 20upx;
          border: 1px solid $color-99;
          color: $word-color;
        }
      }

      .region {
        font-size: $font-38;
      }
    }

    .def {
      display: flex;
      justify-content: space-between;
      height: 104upx;
      line-height: 104upx;
      color: $word-color;
      border-bottom: 1px solid $color-f5;
    }

    .delBtn {
      margin-top: 100upx;
      height: 92upx;
      line-height: 92upx;
    }

  }
</style>
