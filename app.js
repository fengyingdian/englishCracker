//app.js
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
})

updateManager.onUpdateReady(function () {
  updateManager.applyUpdate()
})

updateManager.onUpdateFailed(function () {
  wx.showToast({
    title: '新版本更新失败',
  })
})

App({
  onLaunch: function (ops) {
    console.log("app.onLaunchxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", ops)
    let that = this
    if (ops.query.scene != null){
      that.globalData.invite_openid = ops.query.scene
    }
    
    var host = that.globalData.host + "account/is_regist"
    wx.login({
      success: res => {
        wx.request({
          url: host,
          data: {
            code: res.code,
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res2) {
            console.log("account/is_regist1", res2.data.data)
            if (res2.data.state_code == 8000){
              //res2.data.data.is_regist = "N"
              if (res2.data.data.is_regist == "Y") {
                that.globalData.userInfo = res2.data.data
                if (that.getUserIdReadyCallback) {
                  that.getUserIdReadyCallback(res2)
                }
              } else {
                that.globalData.userInfo.openid = res2.data.data.openid
              }
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },

  onShow: function (res) {
    console.log("app.onShow")
    try {
      var timeStamp1 = wx.getStorageSync('sessionHideTimeStamp')
      if (timeStamp1 != ''){
        var timeStamp2 = new Date().getTime()
        if (timeStamp2 - timeStamp1 > 1000 * 60 * 5) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    } catch (e) {}

    var timeStamp = new Date().getTime()
    try {
      wx.setStorageSync('sessionHideTimeStamp', timeStamp)
    } catch (e) {}

    wx.checkSession({
      success: function () {
      },
      fail: function () {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })
  },

  onHide: function () {
    console.log("onHide")
    var timeStamp = new Date().getTime()
    try {
      wx.setStorageSync('sessionHideTimeStamp', timeStamp)
    } catch (e) {
    }
  },

  globalData: {
    userInfo: {
      city: "",
      country: "",
      header_img: "",
      id: 0,
      language: "",
      nick_name: "user",
      openid: "",
      province: "",
      sex: 0,
    },
    invite_openid: null,
    host: "http://api.allqa.net/",
    host2: "http://a1.huakai.org/",
    host3: "https://api.allqa.com.cn/"
  }
})