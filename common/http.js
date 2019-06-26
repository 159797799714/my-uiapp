import store from '../store/index.js'

export default function request(obj){
  uni.showLoading({
    title: '加载中'
  })
  console.log(store.state.token)
  let params = {
    'wxapp_id': '10001',
    token: store.state.token
  }
  let data ={...obj.data, ...params}
  uni.request({
    url: obj.url,
    method: obj.method? obj.method : 'GET',
    data: data,
    header: obj.header? obj.header : {},
    success: (res) => {
      if(res.data) {
        obj.cb(null, res.data)
      } else {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    },
    fail: (err) => {
      obj.cb(err, null)
    },
    complete: (data)=> {
      if(data) {
        uni.hideLoading()
      }
    }
  })
}
