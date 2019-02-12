//pages/mine/reminder/index.js
const app = getApp()

Page({
  data: {
    hour: 0,
    minute: 0,
    state: 0,
  },

  onLoad: function (options) {
    let that = this

    var days = ['上午', '下午']
    var hours = []
    var minutes = []

    for (let i = 0; i <= 11; i++) {
      hours.push(i)
    }

    for (let i = 0; i <= 59; i++) {
      minutes.push(i)
    }

    that.setData({
      days: days,
      hours: hours,
      minutes: minutes, 
    })

    that.get_remind_info()
  },

  switchChange(e) {
    let that = this

    that.setData({
      state: e.detail.value?1:0,
    })

    that.set_remind()
  },

  pickerChange: function (e) {
    let that = this
    const value = e.detail.value

    var day = that.data.days[value[0]]
    var hour = value[1]

    if (day=='下午'){
      hour += 12 
    }
    var minute = value[2]

    that.setData({
      hour: hour,
      minute: minute
    })

    that.set_remind()
  },

  set_remind: function(){
    let that = this
    wx.request({
      url: app.globalData.host + 'work/set_remind',
      data: {
        openid: app.globalData.userInfo.openid,
        hour: that.data.hour,
        minute: that.data.minute,
        state: that.data.state
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('work/set_remind: ', res)
      }
    })
  },

  get_remind_info: function () {
    let that = this
    wx.request({
      url: app.globalData.host + 'work/remind_info',
      data: {
        openid: app.globalData.userInfo.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('work/remind_info: ', res)
        that.setData({
          state: res.data.data.state,
          minute: res.data.data.minute,
        })

        if (res.data.data.hour >= 12){
          that.setData({
            day: '下午',
            hour: res.data.data.hour-12,
            value: [1, res.data.data.hour - 12, res.data.data.minute]
          })

        }else{
          that.setData({
            day: '上午',
            value: [0, res.data.data.hour, res.data.data.minute]
          })
        }
      }
    })
  }
})