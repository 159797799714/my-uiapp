import store from '../store/index.js'

export default function(obj){
  uni.showLoading({
    title: '加载中'
  })
  let params = {
    'wxapp_id': '10001',
    token: store.state.token
    // token: '74155add51e6d35b3ac603555fa0083e'
  }
  let data ={...obj.data, ...params}
  console.log(store.state.token)
  uni.request({
    url: obj.url,
    method: obj.method? obj.method : 'GET',
    data: data,
    header: obj.header? obj.header : {'content-type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'},
    success: (res) => {
      if(res.data.code === -1) {
        // 未登录或者登陆失效，重定向到登陆
        uni.reLaunch({
          url: '../login/login'
        })
        return
      }
      if(res.data.code === 0 && res.msg) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      obj.cb(null, res.data)
    },
    fail: (err) => {
      obj.cb(err, null)
    },
    complete: (data)=> {
      if(!data) {
        uni.showToast({
          title: '请求出错',
          icon: 'none'
        })
      } else {
        uni.hideLoading()
      }
    }
  })
}
