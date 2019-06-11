<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // #ifdef APP-PLUS
      // 锁定屏幕方向
      plus.screen.lockOrientation('portrait-primary') //锁定
      //#endif
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

