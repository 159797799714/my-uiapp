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
  uni.request({
    url: obj.url,
    method: obj.method? obj.method : 'GET',
    data: data,
    header: obj.header? obj.header : {},
    success: (res) => {
      if(res.data.code === -1 || res.data.code === 0 && res.msg) {
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
