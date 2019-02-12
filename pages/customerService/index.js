//pages/logs/customerService/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageORCode: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanPfKnjVH8njUag2WhALbic7X9ib7ficicibbib0gmPWwBibjlyCqygTuS8veADM1QyPN6IrtnK3lJOvBibiaQ/0?wx_fmt=png",
      w: 727,
      h1: 1139,
      h2: 0,
    },
  },

  tapPreviewImage: function (option) {
    console.log("tapPreviewImage:", option)
    wx.previewImage({
      urls: [option.currentTarget.dataset.src]
    })
  },

  tapReturn: function (option) {
    wx.navigateBack()
  },

  tapSaveImage: function (option) {
    console.log("tapSaveImage", option)
    let that = this
    wx.getImageInfo({
      src: option.currentTarget.dataset.src,
      success: function (res) {
        console.log(res)
        that.setData({
          image: res,
        })

        that.tapSave()
      }
    })
  },

  tapSave: function () {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.image.path,
      success(res) {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail(res) {
        console.log(res)
      }
    })
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
            'imageORCode.h2': 0.9 * res.windowWidth * that.data.imageORCode.h1 / that.data.imageORCode.w,
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