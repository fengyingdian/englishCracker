// packageExam/illustration/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    try {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            screenWidth: res.windowWidth,
          })
          console.log(that.data.screenWidth)
        }
      })
    } catch (e) { }

    that.setData({
      goods_id: options.goods_id,
      oldexam_id: options.oldexam_id,
      chapters_id: options.chapters_id,
    })

    console.log(options, app.globalData.userInfo.openid)
    wx.request({
      url: app.globalData.host + 'business/today_oldexam_info',
      data: {
        openid: app.globalData.userInfo.openid,
        oldexam_id: options.oldexam_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log('business/today_oldexam_info', res2)
        if (res2.data.data.article != false) {
          that.setData({
            article: res2.data.data.article,
            questions: res2.data.data.question,
          })
        }
      }
    })

    wx.request({
      url: app.globalData.host + 'business/get_oldexam_log',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: options.goods_id,
        oldexam_id: options.oldexam_id,
        chapters_id: options.chapters_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        var log = res2.data.data
        var result = JSON.parse(log.answer)
        var ratio = 0
        for (var i = 0; i < result.length; i++){
          var one = result[i]
          if (one.answer == one.select){
            ratio += 100 / result.length
            result[i]['right'] = true
          }else{
            result[i]['right'] = false
          }
        }

        console.log('business/get_oldexam_log', res2, result, 100 / result.length, ratio)
        that.setData({
          timeCount1: log.finish_time%60,
          timeCount2: Math.floor(log.finish_time/60),
          words: log.words,
          answer: result,
          ratio: ratio.toFixed(2)
        })
      }
    })
  },

  tapReturn: function () {
    wx.navigateBack({
      delta: 2,
    })
    //wx.reLaunch({
    //  url: '/pages/myCourse/index?goods_id=' + that.data.goods_id
    //})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
    if (app.examIllustrationReturnCallback) {
      app.examIllustrationReturnCallback()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})