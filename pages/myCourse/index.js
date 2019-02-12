// pages/myCourse/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    days: 0,
    goods: [],
    headImage: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOakznro0PHXTraNqKJtKkODe8GsynqmcqRJG9SyoSibicic50Rm87ayuTiaLxicQNtWj930xyiamvYYWbX1w/0?wx_fmt=png",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      goods_id: options.goods_id
    })

    wx.request({
      url: app.globalData.host + 'business/get_start_course_days',
      data: {
        openid: app.globalData.userInfo.openid,
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      fail: function (res) { },
      complete: function (res) { },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("get_start_course_days", res)
        that.setData({
          state: res.data.data.state,
          days: res.data.data.days,
        })
        if (res.data.data.state == 0){           //已开课
          that.teacher_info(options)
        }
        else {                                   //未开课
          that.account_chapters_info(options, res)
        }
      }
    })
  },

  account_chapters_info: function (options, res) {
    let that = this
    wx.request({
      url: app.globalData.host + 'business/account_chapters_info',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: options.goods_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log("business/account_chapters_info", res2)
        if (res2.data.state_code != 8000){
          return
        }
        if (res2.data.data.good_chapter.lesson_name == "真题+期刊") {
          that.get_exam_periodical({
            goods_id: options.goods_id,
            good_chapter: res2.data.data.good_chapter, 
            oldexam: res2.data.data.oldexam,
            periodical: res2.data.data.periodical,
          })
        } else if(res2.data.data.good_chapter.lesson_name == "作文") {
          that.get_composition({
            goods_id: options.goods_id,
            good_chapter: res2.data.data.good_chapter,
            composition: res2.data.data.composition,
          })
        }
      }
    })
  },

  get_exam_periodical(options){
    let that = this

    that.setData({
      good_chapter: options.good_chapter,
      oldexam: options.oldexam,
      periodical: options.periodical,
    })

    var courses = []
    var is_show = false
    if (options.oldexam) {
      var obj = options.oldexam
      var course = {
        courseType: 1,
        courseName: obj.title,
        cover: obj.bg_img,
        dayNumber: options.good_chapter.number,
        title: obj.title_en,
        article_id: obj.id,
        chapters_id: options.good_chapter.id,
        tap: 'tapOneExam',
        log: obj.log,
        is_show: true,
      }
      courses.push(course)
      if (obj.log.is_finish) {
        is_show = true
      }
    }
    if (options.periodical) {
      var obj = options.periodical
      courses.push({
        courseType: 2,
        courseName: obj.cn_title,
        cover: obj.bg_img,
        dayNumber: options.good_chapter.number,
        title: obj.en_title,
        article_id: obj.id,
        chapters_id: options.good_chapter.id,
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
  },

  get_composition(options) {
    let that = this

    that.setData({
      good_chapter: options.good_chapter,
      composition: options.composition,
    })

    var courses = []
    var is_show = false
    if (options.composition) {
      var obj = options.composition
      var course = {
        courseType: 1,
        courseName: obj.cn_title,
        cover: obj.bg_img,
        dayNumber: options.good_chapter.number,
        title: obj.en_title,
        article_id: obj.id,
        chapters_id: options.good_chapter.id,
        tap: 'tapOneComposition',
        log: obj.log,
        is_show: true,
      }
      courses.push(course)
      if (obj.log.is_finish) {
        is_show = true
      }
    }
    var goods = [{
      goods_id: options.goods_id,
      courses: courses,
      is_show: is_show,
      tapShare: 'tapCompositionShare'
    }]
    that.setData({
      goods: goods
    })
  },

  teacher_info: function (options) {
    let that = this
    wx.request({
      url: app.globalData.host + 'account/teacher_info',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: options.goods_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res2) {
        console.log("account/teacher_info", res2)
        that.setData({
          qrcode: res2.data.data.qrcode,
          wechat: res2.data.data.wechat,
        })
      }
    })
  },

  tapPreviewImage: function (option) {
    wx.previewImage({
      urls: [option.currentTarget.dataset.src]
    })
  },

  tapPunchCard: function(){
    wx.navigateTo({
      url: '/pages/punchMethod/index',
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
      that.onLoad({
        goods_id: that.data.goods_id
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
        goods_id: that.data.goods_id
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

  tapExamShare: function(){
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