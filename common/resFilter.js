// 请求信息回调统一处理
// 参数1为错误，2为成功 ， 3为提示文字

export default function resFilter(err, res, msg) {
  console.log('resUtil接收到了',err, res, msg)
  if(res) {
    console.log(res)
    if(res.code === 1) {
      
      return true
    } else if(res.code === 0) {
      uni.showToast({
        title: res.msg,
        icon: 'none'
      })
      return false
    } else if(res.code === -1) {
      uni.showToast({
        title: res.msg,
        icon: 'none'
      })
      return false
    }
  }
}