<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // #ifdef APP-PLUS
      // 锁定屏幕方向
      plus.screen.lockOrientation('portrait-primary') //锁定
      //#endif
      let that = this
      let userinfo = uni.getStorageSync('userinfo')
      if(userinfo) {
        if(userinfo.token) {
          that.$store.commit('setToken', userinfo.token)
          if(userinfo.mobile) {
            uni.reLaunch({
              url: './pages/index/index'
            })
            return
          } else {
            uni.navigateTo({
              url: './pages/login/bindTel'
            })
          }
        } else {
          uni.reLaunch({
            url: './pages/login/login'
          })  
        }
      } else {
        uni.reLaunch({
          url: './pages/login/login'
        })
      }
      
      
      // uni.getStorage({
      //   key: 'userinfo',
      //   success: function (res) {
      //     if(res.data.token) {
      //       console.log('app.vue本地获取的token是', res.data)
      //       that.$store.commit('setToken', res.data.token)
      //       if(res.data.mobile) {
      //         uni.reLaunch({
      //           url: './pages/index/index'
      //         })
      //         return
      //       } else {
      //         uni.navigateTo({
      //           url: './pages/login/bindTel'
      //         })
      //       }
      //       return
      //     } else {
      //       uni.redirectTo({
      //         url: './pages/login/login'
      //       })
      //     }
      //   },
      //   fail: (err) => {
      //     uni.reLaunch({
      //       url: './pages/login/login'
      //     })
      //   }
      // })
      
      
      
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
  @import url("./components/uni-rich/parse.css");
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

