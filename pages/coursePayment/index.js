// pages/index/coursePayment/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    courses:
    [
      {
        category_value: 1,
        content: "",
        create_time: 1543199862,
        start_time: 1548000000,
        end_time: 1557072000,
        id: 16,
        mine_banner: "",
        name: "100小时搞定高考英语",
        old_price: 399,
        plan_banner: "",
        price: 99,
        read_banner: "",
        students: 14321,
      },
      {
        category_value: 2,
        content: "",
        create_time: 1543199862,
        start_time: 1548000000,
        end_time: 1557072000,
        id: 16,
        mine_banner: "",
        name: "100小时搞定四级英语",
        old_price: 499,
        plan_banner: "",
        price: 119,
        read_banner: "",
        students: 13453,
      },
      {
        category_value: 3,
        content: "",
        create_time: 1543199862,
        start_time: 1548000000,
        end_time: 1557072000,
        id: 16,
        mine_banner: "",
        name: "100小时搞定六级英语",
        old_price: 599,
        plan_banner: "",
        price: 139,
        read_banner: "",
        students: 21435,
      },
      {
        category_value: 4,
        content: "",
        create_time: 1543199862,
        start_time: 1548000000,
        end_time: 1557072000,
        id: 16,
        mine_banner: "",
        name: "100小时搞定考研英语",
        old_price: 699,
        plan_banner: "",
        price: 169,
        read_banner: "",
        students: 18142,
      },
    ],
    courseInfo:[
    {
        src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOamAFos7icib4CJzHEhDvial9IcCkXLTqqHcSibMic5TvNpKEqhOHicVYIk9Kaic0V0iaicnTEnhItcnefxYWYA/0?wx_fmt=png",
        w: 750,
        h1: 1445,
        h2: 0,
    },
    {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOamAFos7icib4CJzHEhDvial9IcI6N4sC9ZgGDmTLdsEJknQwIltdQTj2gu2uVKgLicicQmuazyMFQEMfbw/0?wx_fmt=png",
        w: 750,
        h1: 1574,
        h2: 0,
      },
    {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOamAFos7icib4CJzHEhDvial9IcWXML9Ne9rpf6Ajia9oROloK1SIl3HMFn4zTnLf1YmXn2TI9AvBKHm6w/0?wx_fmt=png",
        w: 750,
        h1: 1938,
        h2: 0,
      },
    {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOamAFos7icib4CJzHEhDvial9IcxmzuibjoQSMd2uVptqrsyuLdrFUnltP3SW7Mp81h6BYg9ZYvQn5K0lQ/0?wx_fmt=png",
        w: 750,
        h1: 1958,
        h2: 0,
      }
    ],
    isIOS: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    try {
      wx.getSystemInfo({
        success: function (res) {
          var pos = res.system.indexOf('iOS')
          if (pos >= 0){
            that.setData({
              isIOS: true,
            })
          }
          that.setData({
            width: res.windowWidth,
            'courseInfo[0].h2': res.windowWidth * that.data.courseInfo[0].h1 / that.data.courseInfo[0].w,
            'courseInfo[1].h2': res.windowWidth * that.data.courseInfo[1].h1 / that.data.courseInfo[0].w,
            'courseInfo[2].h2': res.windowWidth * that.data.courseInfo[2].h1 / that.data.courseInfo[0].w,
            'courseInfo[3].h2': res.windowWidth * that.data.courseInfo[3].h1 / that.data.courseInfo[0].w,
          })
        },
        fail: function (res) {
          wx.showToast({
            title: 'getSystemInfo: error',
          })
        }
      })
    } catch (e) { }

    console.log("options", options)
    that.setData({
      returnDatas: that.data.courses[options.course],
      number: options.number,
      price: options.price,
      courseId: options.courseid,
      category_value: options.course,
    })
    console.log("returnDatas:", that.data.courseId)

    var start_time = new Date(parseInt(that.data.returnDatas.start_time)*1000)
    var end_time = new Date(parseInt(that.data.returnDatas.end_time) * 1000) 

    that.setData({
      start_time: start_time.getFullYear() + "." + (start_time.getMonth() + 1).toString() + "." + start_time.getDate(),
      end_time: end_time.getFullYear() + "." + (end_time.getMonth() + 1).toString() + "." + end_time.getDate()
    })

    console.log("app.globalData.userInfo4", app.globalData.userInfo, that.data.start_time, that.data.end_time)
  },

  onPay: function () {
    var that = this
    wx.request({
      url: app.globalData.host + 'pay/pay_order',
      data: {
        openid: app.globalData.userInfo.openid,
        goods_id: that.data.courseId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log("coursePayment", app.globalData.userInfo.openid, that.data.courseId, res)
        if (res.data.state_code == 8000) {
          if (res.data.state_code) {
            wx.requestPayment({
              'timeStamp': res.data.data.timeStamp + '',
              'nonceStr': res.data.data.nonceStr + '',
              'package': res.data.data.package + '',
              'signType': 'MD5',
              'paySign': res.data.data.sign + '',
              success (res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                })
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/myCourse/index?goods_id=' + that.data.courseId,
                  })
                }, 200)
              },
              'fail'(res) {
                console.log('支付失败', res)
              },
              'complete'(res) {
                console.log('支付完成', res)
              }
            })
          }
        } else if (res.state == 0) {
          wx.showModal({
            title: '提示',
            showCancel: false,
          })
        }
      }
    })
  },

  tapCheckCourses: function(){
    wx.reLaunch({
      url: '/pages/courseIntroduction/index',
    })
  },

  tapShare: function (options) {
    wx.navigateTo({
      url: '/pages/customerShare/index'
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