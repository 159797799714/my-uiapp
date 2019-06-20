
export default function request(obj){
  let params = {
    'wxapp_id': '10001',
    token: 'b377d993eb053778e684c00bfff7e442'
  }
  let data ={...obj.data, ...params}
  uni.request({
    url: obj.url,
    method: obj.method? obj.method : 'GET',
    // data: obj.data? obj.data: {},
    data: data,
    header: obj.header? obj.header : {},
    success: (res) => {
      obj.cb(null, res.data)
    },
    fail: (err) => {
      obj.cb(err, null)
    }
  })
}
