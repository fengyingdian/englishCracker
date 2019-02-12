//pages/logs/courseIntroduction/index.js
const app = getApp() 

Page({
  /**
   * 页面的初始数据
   */
  data: {
    helloImage: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOalswboqCBg710e69T4iaHnpBVfRicPYE44Dju4VRWynAUzUjeP6cgRksy1n6nt9IbEedicf4cESE5VOA/0?wx_fmt=png",
      w: 750,
      h1: 1334,
      h2: 0,
    },
    screenWidth: 0,
    isJumped: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getUserIdReadyCallback = res => {
      app.globalData.userInfo = res.data.data
      if (!that.data.isJumped) {
        that.setData({
          isJumped: true
        })
        that.getUserState()
      }
    }

    try {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            screenWidth: res.windowWidth,
            'helloImage.h2': res.windowWidth * that.data.helloImage.h1 / that.data.helloImage.w
          })
        }
      })
    } catch (e) { }

    //用于用户通过其他途径进入的判断
    if (app.globalData.userInfo.id!=0 && !that.data.isJumped) {
      that.setData({
        isJumped:true
      })
      that.getUserState()
    }
  },

  getUserInfo: function (e) {
    console.log("getUserInfo", e, app.globalData.invite_openid)
    
    let that = this
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.host + 'account/login',
          data: {
            code: res.code,
            invite_openid: app.globalData.invite_openid == null ? "" : app.globalData.invite_openid,
            iv: e.detail.iv == null ? "" : e.detail.iv,
            encryptedData: e.detail.encryptedData == null ? "" : e.detail.encryptedData
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res2) {
            console.log("account/login", app.globalData.userInfo, res2)
            app.globalData.userInfo.city = res2.data.data.city
            app.globalData.userInfo.province = res2.data.data.province
            app.globalData.userInfo.country = res2.data.data.country
            app.globalData.userInfo.header_img = res2.data.data.header_img
            app.globalData.userInfo.language = res2.data.data.language
            app.globalData.userInfo.nick_name = res2.data.data.nick_name
            app.globalData.userInfo.sex = res2.data.data.sex
            app.globalData.userInfo.openid = res2.data.data.openid
            app.globalData.userInfo.id = res2.data.data.id

            if (e.detail.errMsg != 'getUserInfo:ok'){
              app.globalData.userInfo.header_img = 'https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOalUDopfHveyicj4QhTRQPZ79KZnQ3RB5l6Byu1UibTk4SwBOs8fZ0JqCQfqow80vvAdjz91Mw5W6RJA/0?wx_fmt=png'
            }
          },
          complete: function(res3) {
            that.getUserState()
          }
        })
      }
    })
  },

  getUserState: function() {
    console.log("getUserState")
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
        console.log("/business/get_account_state", app.globalData.userInfo.openid, res)
        if (res.data.data.state == 1){
          wx.reLaunch({
            url: '/pages/courseIntroduction/index',
          })
        } else if (res.data.data.state == 2 || res.data.data.state == 3 ){
          wx.reLaunch({
            url: '/pages/myCourse/index?goods_id=' + res.data.data.goods_id,
          })
        } else if (res.data.data.state == -1) {
          //wx.reLaunch({
          //  url: '/pages/myCourse/index?goods_id=' + res.data.data.goods_id,
          //})
        }
      }
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
    console.log("share:", res)
    if (res.from === 'button') {
      console.log("share: button: ", res.target)
    }
    var url = "/pages/index/index?scene=" + app.globalData.userInfo.openid
    var imageUrl = "https://mmbiz.qpic.cn/mmbiz_jpg/90b2a0yoOalswboqCBg710e69T4iaHnpBsIjdbjxiaDvVwASxznJyGPcWrCNvGBRttXNxuIMbdoDfIcdllMk8ExQ/0?wx_fmt=jpeg"
    return {
      title: '100小时搞定英语考试！',
      path: url,
      imageUrl: imageUrl,
      success(res) {
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