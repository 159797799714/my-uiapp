<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      // 锁定屏幕方向
      plus.screen.lockOrientation('portrait-primary') //锁定
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
	// @import './common/common.scss';
</style>

