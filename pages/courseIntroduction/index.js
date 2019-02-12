//pages/logs/courseIntroduction/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    courses: [
      {
        icon: "/pages/image/icon1.png", name: "备战高考英语", content: "坚持阅读，直通名校", days: 100, labels: ["真题", "外刊", "作文"], number: 14321, price: 99, category_value
: 1},
      { icon: "/pages/image/icon2.png", name: "秒杀四级英语", content: "掌握方法，轻松过级", days: 100, labels: ["真题", "外刊", "作文"], number: 13453, price: 119, category_value: 2},
      { icon: "/pages/image/icon3.png", name: "突破六级英语", content: "攻克难点，实现突破", days: 100, labels: ["真题", "外刊", "作文"], number: 21435, price: 139, category_value: 3},
      { icon: "/pages/image/icon4.png", name: "决胜考研英语", content: "百日计划，成就梦想", days: 100, labels: ["真题", "外刊", "作文"], number: 18142, price: 169, category_value: 4},
    ],
    follows: [
      { icon: "/pages/image/num1.png", name: "选择课程", info: "高考、四六级、考研英语", },
      { icon: "/pages/image/num2.png", name: "报名", info: "选好课程进入报名，付款后准备学习", },
      { icon: "/pages/image/num3.png", name: "添加老师微信", info: "添加老师微信获取学前准备资料", },
    ],
    imageHead: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOalUDopfHveyicj4QhTRQPZ79c9Rk23DT1PtDib0TmfO7AQ316XU6Uq1AZ6mS9iaqsicqNQmrgDE7GCrjA/0?wx_fmt=png",
      w: 750,
      h1: 1051,
      h2: 0,
    },
    imageFlow: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOalUDopfHveyicj4QhTRQPZ79mbwE6wpViaIR0aDgbr8dI4WKn0S4mknjBpqD5SoAngzbiaUW6FCoicEAg/0?wx_fmt=png",
      w: 750,
      h1: 1118,
      h2: 0,
    },
    scholarship:[
      {
        icon:"/pages/image/mani_o.png", 
        name:"坚持打卡7天", 
        info:"赠送价值30元《历年真题阅读词汇手册》一本。"
      },
      {
        icon: "/pages/image/shu_o.png",
        name: "坚持打卡21天",
        info: "赠送新东方名师价值60元《英语阅读突破方法》内部教材一本。"
      },
      {
        icon: "/pages/image/mani_o.png",
        name: "坚持打卡49天",
        info: "赠送100元课程代金券，可用于抵扣\"秒杀英语\"任何课程报名费。"
      },
      {
        icon: "/pages/image/mani_o.png",
        name: "保底承诺",
        info: "坚持打卡81天并在最近一次的相关英语考试中未达到相应要求（高考90/150，四六级425/750，考研55/100）报名费全额退返。"
      },
      {
        icon: "/pages/image/mani_o.png",
        name: "卓越计划",
        info: "坚持打卡81天并在最近一次的相关英语考试中达到相应要求（高考140/150，四六级620/750，考研82/100）报名费全额退返并可参加奖学计划，随机选取1名同学赠送苹果手机一部。"
      },
    ],
    titleSelected: 0,
    showPage: true,
    screenWidth: 0,
    isIOS: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("courseIntroduction")
    let that = this
    try {
      wx.getSystemInfo({
        success: function (res) {
          var pos = res.system.indexOf('iOS')
          if (pos >= 0) {
            that.setData({
              isIOS: true,
            })
          }
          that.setData({
            screenWidth: res.windowWidth,
            'imageHead.h2': res.windowWidth * that.data.imageHead.h1 / that.data.imageHead.w,
            'imageFlow.h2': res.windowWidth * that.data.imageFlow.h1 / that.data.imageFlow.w,
          }) 
          console.log(that.data.screenWidth)
        }
      })
    } catch (e) { }

    wx.request({
      url: app.globalData.host + 'business/goods_list',
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("goods", res)
        var returnData = res.data.data
        var courses = that.data.courses
        for (var i = 0; i < returnData.length; i++){
          var oneCourse = returnData[i]
          var courseIndex = oneCourse.category_value - 1 
          courses[courseIndex].price = oneCourse.price / 100
          courses[courseIndex].name = oneCourse.name
          courses[courseIndex].id = oneCourse.id
          courses[courseIndex].number = courses[courseIndex].number + oneCourse.number
          courses[courseIndex].content = oneCourse.content
        }
        console.log("courses", courses)
        that.setData({
          courses: courses,
        })
      }
    })

    console.log("app.globalData.userInfo", app.globalData.userInfo)
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
  },
  
  tapTopTitle: function (options) {
    let that = this
    that.setData({
      titleSelected: options.detail.titleSelected,
    })
  },

  tapOneCourse: function (options) {
    let that = this 
    console.log("that.data.isIOS:", that.data.isIOS)
    if (that.data.isIOS){
      wx.showModal({
        title: '温馨提示',
        content: '根据相关规范要求，IOS用户暂不支持报名',
        showCancel: false,
        confirmText: '太遗憾了',
      })
    }else{
      var course = that.data.courses[options.currentTarget.id]
      wx.navigateTo({
        url: '/pages/coursePayment/index?course='
          + options.currentTarget.id
          + '&number=' + course.number
          + '&price=' + course.price
          + '&courseid=' + course.id
      })
    }
  },

  tapService: function (options) {
    wx.navigateTo({
      url: '/pages/customerService/index'
    })
  },

  tapShare: function (options) {
    wx.navigateTo({
      url: '/pages/customerShare/index'
    })
  },
})