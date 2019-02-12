// pages/myPlan/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    headImage: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOalb8tpzxI3jl0IIwZhZISicoLWFTibCO9nxSeicM9xWkw4fJcWTHlicUtgcA7jpJibibrObwhf5CwPETyUw/0?wx_fmt=png",
      w: 750,
      h1: 263,
      h2: 0,
    },
    plan: [],
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
            'headImage.h2':res.windowWidth * that.data.headImage.h1 / that.data.headImage.w,
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

  get_account_state: function() {
    let that = this
    wx.request({
      url: app.globalData.host + '/business/get_account_state',
      data: {
        openid: app.globalData.userInfo.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("/business/get_account_state", res)
        if (res.data.state_code == 8000){
          var date = new Date()
          that.setData({
            goods_id: res.data.data.goods_id,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          })
         
          that.curr_month_reading_log({
            goods_id: that.data.goods_id,
            month: that.data.month,
            year: that.data.year,
          })
        }
      }
    })
  },

  curr_month_reading_log: function(options){
    let that = this
    wx.request({
      url: app.globalData.host + 'business/curr_month_reading_log',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: options.goods_id,
        month: options.month,
        year: options.year,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log("business/curr_month_reading_log", res)
        that.setData({
          plan: res.data.data
        })
        
        that.activeCourseDay({
          year: options.year,
          month: options.month,
        })
      }
    })
  },

  activeCourseDay: function (param){
    let that = this
    const plan = that.data.plan

    var courseData = []
    for (var i = 0; i < plan.length; i++) {
      var date = plan[i]
      if (date.year != param.year) {
        continue
      }
      if (date.month == param.month) {
        if (date.state == 1){
          courseData.push({
            month: "current",
            day: parseInt(date.day),
            color: "white",
            background: "rgb(177,177,177)",
          })
        } else if(date.state == 2) {
          courseData.push({
            month: "current",
            day: parseInt(date.day),
            color: "white",
            background: "rgb(37,34,31)",
          })
        } else if (date.state == 3) {
          courseData.push({
            month: "current",
            day: parseInt(date.day),
            color: "white",
            background: "rgb(255,184,45)",
          })
        }
      }
    }
    this.setData({
      courseData: courseData,
    })
  },

  dayClick: function (event) {
    let that = this
    var plan = that.data.plan
    for (var i = 0; i < plan.length; i++){
      const one = plan[i]
      if (one.day == event.detail.day && one.month == event.detail.month && one.year == event.detail.year) {
        var date = new Date()
        if (date.getDate() >= one.day && date.getMonth() + 1 == one.month){
          wx.navigateTo({
            url: './course/index?goods_id=' + that.data.goods_id
              + '&number=' + one.number
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '只能查看发布过的课程哦',
            showCancel: false,
            confirmText: '好哒'
          })
        }
        break
      }
    }
  },

  next: function (event) {
    console.log(event.detail)
    let that = this
    that.curr_month_reading_log({
      openid: that.data.openid,
      goods_id: that.data.goods_id,
      year: event.detail.currentYear,
      month: event.detail.currentMonth,
    })

    that.setData({
      month: event.detail.currentMonth,
      year: event.detail.currentYear,
    })
  },

  prev: function (event) {
    console.log(event.detail)
    let that = this
    that.curr_month_reading_log({
      openid: that.data.openid,
      goods_id: that.data.goods_id,
      year: event.detail.currentYear,
      month: event.detail.currentMonth,
    })

    that.setData({
      month: event.detail.currentMonth,
      year: event.detail.currentYear,
    })
  },

  dateChange: function (event) {
    console.log(event.detail)

    let that = this
    that.curr_month_reading_log({
      openid: that.data.openid,
      goods_id: that.data.goods_id,
      year: event.detail.currentYear,
      month: event.detail.currentMonth,
    })

    that.setData({
      month: event.detail.currentMonth,
      year: event.detail.currentYear,
    })
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
    let that = this
    if (!that.data.goods_id){
      console.log('onShow1')
      that.get_account_state()
    }else{
      console.log('onShow2')
      that.curr_month_reading_log({
        goods_id: that.data.goods_id,
        month: that.data.month,
        year: that.data.year,
      })
    }
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