//mine.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    times: '12:00',
    headImage: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanSXU3pIlDyE2kNoKuChFqVqGDjYpSON98Jtmtj2ofTd0tSOCUPgtSkvHyHskOFP3Z5N20Y4EyLyw/0?wx_fmt=png",
      w: 750,
      h1: 343,
      h2: 0,
    },
    setting: [
      { name: "单词量测试", info: "目前词汇量：", data: 0, image: "", tapFunction: "tapVocabulary" },
      { name: "阅读提醒设置", info: "每天", data: "06:00", tapFunction: "tapRemindTime" },
      { name: "我的老师", info: "查看老师微信联系方式", data: "", tapFunction: "tapTeacher" },
      { name: "常见问题", info: "难题解决", data: "", tapFunction: "tapQuestion" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData)
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })

    try {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            width: res.windowWidth,
            ratio: res.windowWidth / that.data.headImage.w,
            'headImage.h2': res.windowWidth * that.data.headImage.h1 / that.data.headImage.w,
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

  tapVocabulary: function(){
    wx.navigateTo({
      url: '/packageVocabulary/index/index',
    })
  },

  tapRemindTime: function () {
    wx.navigateTo({
      url: './reminder/index',
    })
  },

  tapTeacher: function () {
    wx.navigateTo({
      url: './teacherInfo/index',
    })
  },

  tapQuestion: function () {
    wx.showModal({
      title: '提示',
      content: '开课后方可查看',
      showCancel: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    wx.request({
      url: app.globalData.host + 'work/mine_info',
      data: {
        openid: app.globalData.userInfo.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('work/mine_info: ', res)
        if (res.data.state_code == 8000) {
          var number1 = parseInt(res.data.data.reminder.hour) > 9 ? res.data.data.reminder.hour : '0' + res.data.data.reminder.hour
          var number2 = parseInt(res.data.data.reminder.minute) > 9 ? res.data.data.reminder.minute : '0' + res.data.data.reminder.minute

          that.setData({
            reminder: res.data.data.reminder,
            'setting[1].data': number1 + ' : ' + number2
          })

          var cards = []
          if (res.data.data.exam) {
            var oneCard = {
              title: "真题阅读",
              count: res.data.data.exam.length,
              unit: "篇",
            }
            cards.push(oneCard)
          }
          if (res.data.data.periodical) {
            var oneCard = {
              title: "外刊阅读",
              count: res.data.data.periodical.length,
              unit: "篇",
            }
            cards.push(oneCard)
          }
          that.setData({
            cards: cards,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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