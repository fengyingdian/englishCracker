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
      periodical_id: options.periodical_id,
      chapters_id: options.chapters_id,
    })

    wx.request({
      url: app.globalData.host + 'business/today_periodical_info',
      data: {
        openid: app.globalData.userInfo.openid,
        periodical_id: options.periodical_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log('business/today_periodical_info', res2, options.periodical_id)
        if (res2.data.state_code == 8000) {
          that.setData({
            article: res2.data.data,
          })
        }
      }
    })
  },

  tapReturn: function () {
    wx.navigateBack({
      delta: 2,
    })
    //let that = this 
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