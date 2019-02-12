// pages/punchMethod/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanaKIhOnK3gEjX6VaQnuicicibg0hUXP4W24HS705ibmIsoWYVicrVsBo5ia0jRCbkh15BiczXTVlibmjHb2Q/0?wx_fmt=png",
      w: 750,
      h1: 2599,
      h2: 0,
    },
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
            width: res.windowWidth,
            'image.h2': res.windowWidth * that.data.image.h1 / that.data.image.w,
          })
        },
        fail: function (res) {
          wx.showToast({
            title: 'getSystemInfo: error',
          })
        }
      })
    } catch (e) { }
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
  onShareAppMessage: function (res) {
    console.log("punch-share:", res)
    if (res.from === 'button') {
      console.log("punch-share: button: ", res.target)
    }
    var url = "/pages/index/index?scene=" + app.globalData.userInfo.openid
    var imageUrl = "https://mmbiz.qpic.cn/mmbiz_jpg/90b2a0yoOalswboqCBg710e69T4iaHnpBsIjdbjxiaDvVwASxznJyGPcWrCNvGBRttXNxuIMbdoDfIcdllMk8ExQ/0?wx_fmt=jpeg"
    return {
      title: '100小时搞定英语考试！',
      path: url,
      imageUrl: imageUrl,
      success(res) {
        if (res.shareTickets) {
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res1) {
            },
            fail() { },
            complete() { }
          });
        }
      },
      fail(e) {
      },
      complete() { }
    }
  }
})