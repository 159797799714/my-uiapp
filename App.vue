<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // #ifdef APP-PLUS
      // 锁定屏幕方向
      plus.screen.lockOrientation('portrait-primary') //锁定
      //#endif
      let that = this
      uni.getStorage({
        key: 'userinfo',
        success: function (res) {
          if(res.data.token) {
            console.log('登录页本地获取的token是', res.data.token)
            that.$store.commit('setToken', res.data.token)
            // if(res.data.mobile) {
            //   console.log('登录页本地获取的手机号是', res.data.mobile)
            //   uni.reLaunch({
            //     url: 'pages/index/index'
            //   })
            //   return
            // }
            
            return
          }
        }
      })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
  page{
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-family: PingFangSC-Regular;
    color: $title-color;
    margin: 0;
    padding: 0;
   }
</style>

