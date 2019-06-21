
export default function request(obj){
  uni.showLoading({
    title: '加载中'
  })
  let params = {
    'wxapp_id': '10001',
    token: 'e49a5f24059cca8dd47eb38d5d631742'
  }
  let data ={...obj.data, ...params}
  uni.request({
    url: obj.url,
    method: obj.method? obj.method : 'GET',
    data: data,
    header: obj.header? obj.header : {},
    success: (res) => {
      obj.cb(null, res.data)
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
