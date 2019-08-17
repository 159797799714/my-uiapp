/**
 * 工具类
 */
module.exports = {

  /**
   * scene解码
   */
  scene_decode: function(e) {
    if (e === undefined)
      return {};
    let scene = decodeURIComponent(e),
      params = scene.split(','),
      data = {};
    for (let i in params) {
      var val = params[i].split(':');
      val.length > 0 && val[0] && (data[val[0]] = val[1] || null)
    }
    return data;
  },

  /**
   * 格式化日期格式 (用于兼容ios Date对象)
   */
  format_date: function(time) {
    // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    return time.replace(/\-/g, "/");
  },

  /**
   * 对象转URL
   */
  urlEncode: function(data) {
    var _result = [];
    for (var key in data) {
      var value = data[key];
      if (value.constructor == Array) {
        value.forEach(function(_value) {
          _result.push(key + "=" + _value);
        });
      } else {
        _result.push(key + '=' + value);
      }
    }
    return _result.join('&');
  },

  /**
   * 倒计时
   */
  countDown: function(time, callback) {
    if (time === "") {
      return
    }

    function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    let countDownName = setInterval(function() {
      let format = time.replace(/-/g, '/')
      let countDown = Date.parse(new Date(format))
      if (countDown < new Date()) {
        clearInterval(countDownName);
        callback("00:00:00")
        return
      }
      var leftTime = (countDown) - (new Date()); //计算剩余的毫秒数 
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
      var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
      // days = checkTime(days);
      if (days == 0) {
        hours = checkTime(hours);
      }
      minutes = checkTime(minutes);
      seconds = checkTime(seconds);
      let nowTime = (days * 24 == 0 ? '' : (days * 24)) + hours + ":" + minutes + ":" + seconds
      callback(nowTime)
      if (hours == '00' && minutes == '00' && seconds == '00') {
        clearInterval(countDownName);
      }
    }, 1000)

  },
  
  delInterval() {
    clearInterval(countDownName);
  },
  
  DecideReceive(time) {
    let format = time.replace(/-/g, '/')
    let countDown = Date.parse(new Date(format))
    var leftTime = (new Date() - (countDown)); //计算剩余的毫秒数 
    console.log(leftTime)
    return (leftTime > 259200000)
  }

};
