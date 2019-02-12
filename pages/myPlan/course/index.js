// pages/myPlan/course/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    days: 0,
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      goods_id: options.goods_id,
      days: options.number,
    })

    that.account_chapters_info(options)
  },

  account_chapters_info: function (options) {
    let that = this
    wx.request({
      url: app.globalData.host + 'business/account_chapters_info',
      data: {
        openid: app.globalData.userInfo.openid,
        number: options.number,
        goods_id: options.goods_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log("business/account_chapters_info", res2)
        if (res2.data.state_code != 8000) {
          return
        }
        if (res2.data.data.good_chapter.lesson_name == "真题+期刊") {
          that.setData({
            oldexam: res2.data.data.oldexam,
            periodical: res2.data.data.periodical,
          })

          var courses = []
          var is_show = false
          if (res2.data.data.oldexam) {
            var obj = res2.data.data.oldexam
            var course = {
              courseType: 1,
              courseName: obj.title,
              cover: obj.bg_img,
              dayNumber: that.data.days,
              title: obj.title_en,
              article_id: obj.id,
              chapters_id: res2.data.data.good_chapter.id,
              tap: 'tapOneExam',
              log: obj.log,
              is_show: true,
            }
            courses.push(course)
            if (obj.log.is_finish) {
              is_show = true
            }
          }
          if (res2.data.data.periodical) {
            var obj = res2.data.data.periodical
            courses.push({
              courseType: 2,
              courseName: obj.cn_title,
              cover: obj.bg_img,
              dayNumber: that.data.days,
              title: obj.en_title,
              article_id: obj.id,
              chapters_id: res2.data.data.good_chapter.id,
              tap: 'tapOnePeriodical',
              log: obj.log,
              is_show: is_show,
            })
          }
          var goods = [{
            goods_id: options.goods_id,
            courses: courses,
            is_show: is_show,
            tapShare: 'tapExamShare'
          }]
          that.setData({
            goods: goods
          })
        }
      }
    })
  },

  tapShare: function () {
    wx.navigateTo({
      url: '/pages/customerShare/index'
    })
  },

  tapOneExam: function (ops) {
    console.log('tapOneExam', ops)
    let that = this

    app.getExamReturnCallback = res => {
      console.log('getExamReturnCallback-receive')
      that.account_chapters_info({
        goods_id: that.data.goods_id,
        number: that.data.days
      })
    }

    wx.navigateTo({
      url: '/packageExam/index/index?goods_id=' + that.data.goods_id
        + '&article_id=' + ops.currentTarget.dataset.article_id
        + '&chapters_id=' + ops.currentTarget.dataset.chapters_id
    })
  },

  tapOnePeriodical: function (ops) {
    console.log('tapOnePeriodical', ops)
    let that = this
    app.getPeriodicalReturnCallback = res => {
      console.log('getPeriodicalReturnCallback-receive')
      that.onLoad({
        goods_id: that.data.goods_id,
        number: that.data.days,
      })
    }

    wx.navigateTo({
      url: '/packagePeriodical/index/index?goods_id=' + that.data.goods_id
        + '&article_id=' + ops.currentTarget.dataset.article_id
        + '&chapters_id=' + ops.currentTarget.dataset.chapters_id
    })

    wx.request({
      url: app.globalData.host + 'business/insert_periodical_log',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: that.data.goods_id,
        periodical_id: ops.currentTarget.dataset.article_id,
        chapters_id: ops.currentTarget.dataset.chapters_id,
        words: that.data.periodical.number,
        finish_time: 0,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log('business/insert_periodical_log', res2)
      }
    })
  },

  tapExamShare: function () {
    console.log('tapExamShare')
    let that = this
    wx.navigateTo({
      url: '/packageExam/share/index?goods_id=' + that.data.goods_id
        + '&number=' + that.data.days
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
  onShow: function (ops) {
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
    //console.log("punch-share:", res)
    if (res.from === 'button') {
      //console.log("punch-share: button: ", res.target)
    }
    var url = "/pages/index/index?scene=" + app.globalData.userInfo.openid
    var imageUrl = "https://mmbiz.qpic.cn/mmbiz_jpg/90b2a0yoOalswboqCBg710e69T4iaHnpBsIjdbjxiaDvVwASxznJyGPcWrCNvGBRttXNxuIMbdoDfIcdllMk8ExQ/0?wx_fmt=jpeg"
    return {
      title: '100小时搞定英语考试！',
      path: url,
      imageUrl: imageUrl,
      success(res) {
        console.log("share-res0：", res)
        if (res.shareTickets) {
          console.log("share-res1：", res)
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res1) {
              console.log("share-res2：", res1)
            },
            fail() { },
            complete() { }
          })
        }
      },
      fail(e) {
      },
      complete() { }
    }
  }
})