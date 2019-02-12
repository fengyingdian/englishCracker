// packageExam/index/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleSelected: 0,
    screenWidth: 0,
    showState: 0,
    
    timer: true,
    timeCount1: 0,
    timeCount2: 0,
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
      oldexam_id: options.article_id,
      chapters_id: options.chapters_id,
    })

    console.log(options, app.globalData.userInfo.openid)
    wx.request({
      url: app.globalData.host + 'business/today_oldexam_info',
      data: {
        openid: app.globalData.userInfo.openid,
        oldexam_id: options.article_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log('business/today_oldexam_info', res2)
        if (res2.data.data.article != false){
          that.setData({
            article: res2.data.data.article,
          })

          that.initQuestions(res2.data.data.question)
        }
      }
    })

    wx.request({
      url: app.globalData.host + 'business/get_oldexam_log',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: options.goods_id,
        oldexam_id: options.article_id,
        chapters_id: options.chapters_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log('business/get_oldexam_log', res2)
        if (res2.data.data != false){
          that.setData({
            showState: 1,
          })
        }else{
          if (that.data.showState == 0) {
            wx.showModal({
              title: '提示',
              content: '确定开始挑战吗？',
              success(res) {
                if (res.confirm) {
                  that.startTimer()
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 2,
                  })
                  //wx.reLaunch({
                  //  url: '/pages/myCourse/index?goods_id=' + options.goods_id,
                  //})
                }
              }
            })
          }
        }
      }
    })
  },

  tapTopTitle: function (options) {
    let that = this
    that.setData({
      titleSelected: options.detail.titleSelected,
    })
  },

  startTimer: function () {
    let that = this       
    that.setData({
      timeCount1: 0,
      timeCount2: 0,
    })
    that.data.setInter = setInterval(function () {
      that.setData({
        timeCount1: that.data.timeCount1 + 1
      })
      if (that.data.timeCount1 >= 59) {
        that.data.timeCount1 = -1
        that.setData({
          timeCount2: that.data.timeCount2 + 1
        })
      }
    }, 1000)
  },

  endTimer: function () {
    let that = this
    clearInterval(that.data.setInter)
  },

  tapSubmit: function () {
    let that = this
    console.log("tapSubmit: ", that.data.article, that.data.questions)
    
    var questions = that.data.questions
    var selects = []
    for (var i = 0; i < questions.length; i++){
      var one = questions[i]
      if (one.select == ''){
        wx.showModal({
          title: '提示',
          content: '有未完成的题目',
          showCancel: false,
          confirmText: '哦~好的',
          success(res) {
            if (res.confirm) {
              return
            }
          }
        })
      }else{
        selects.push({
          answer: one.answer,
          select: one.select,
        })
      }
    }
    if (selects.length != that.data.questions.length){
      return 
    }
    that.endTimer()
    
    var answers = JSON.stringify(selects) 
    var words = that.data.article.number
    var finish_time = that.data.timeCount2 * 60 + that.data.timeCount1

    wx.request({
      url: app.globalData.host + 'business/insert_oldexam_log',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: that.data.goods_id,
        oldexam_id: that.data.oldexam_id,
        chapters_id: that.data.chapters_id,
        answer: answers,
        words: words,
        finish_time: finish_time,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log('business/insert_oldexam_log', res2, finish_time, answers)
        wx.navigateTo({
          url: '/packageExam/illustration/index?goods_id=' + that.data.goods_id
            + '&oldexam_id=' + that.data.oldexam_id
            + '&chapters_id=' + that.data.chapters_id
        })

        that.setData({
          showState: 1
        })

        if (app.getExamReturnCallback) {
          console.log("getExamReturnCallback-send")
          app.getExamReturnCallback()
        }
      }
    })
  },

  tapIllustration: function () {
    let that = this
    wx.navigateTo({
      url: '/packageExam/illustration/index?goods_id=' + that.data.goods_id
        + '&oldexam_id=' + that.data.oldexam_id
        + '&chapters_id=' + that.data.chapters_id
    })
  },

  tapAgain: function () {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定开始挑战吗？',
      success(res) {
        if (res.confirm) {
          that.setData({
            showState: 0
          })
          that.startTimer()
        }
      }
    })
  },

  tapSelect: function (ops) {
    var id = parseInt(ops.currentTarget.id)
    var select = ops.currentTarget.dataset.select

    let that = this
    that.data.questions[id].select = select
    that.data.questions[id].a_bk = 'white'
    that.data.questions[id].b_bk = 'white'
    that.data.questions[id].c_bk = 'white'
    that.data.questions[id].d_bk = 'white'

    if (select == 'A'){
      that.data.questions[id].a_bk = 'ghostwhite'
    } else if (select == 'B') {
      that.data.questions[id].b_bk = 'ghostwhite'
    } else if (select == 'C') {
      that.data.questions[id].c_bk = 'ghostwhite'
    } else if (select == 'D') {
      that.data.questions[id].d_bk = 'ghostwhite'
    } 

    that.setData({
      questions: that.data.questions
    })
  },

  initQuestions: function(ops) {
    var questions = ops
    let that = this
    for (var i = 0; i < questions.length; i++){
      questions[i]['select'] = ''
      questions[i]['a_bk'] = 'white'
      questions[i]['b_bk'] = 'white'
      questions[i]['c_bk'] = 'white'
      questions[i]['d_bk'] = 'white'
    }
    that.setData({
      questions: questions
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
    this.endTimer()
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