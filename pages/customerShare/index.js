//pages/logs/customerService/index.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageBK: {
      src1: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOalh45yfHkFOvMFtwHmrAexL9LooOEhAvNqdnia17ITORkO8NbvyiaUl5gOTgh5wfvtoQyylyh7Ohv5Q/0?wx_fmt=png",
      src2: "",
      w: 750,
      h1: 1205,
      h2: 0,
    },
    imageQRCode: {
      src1: "",
      src2: "",
      w: 300,
      h1: 300,
      h2: 0,
    },
    sharedUsers: [],
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
            'imageBK.h2': 0.6 * res.windowWidth * that.data.imageBK.h1 / that.data.imageBK.w,
            'imageQRCode.h2': 0.6 * res.windowWidth * that.data.imageQRCode.h1 / that.data.imageQRCode.w,
          })
        },
        fail: function (res) {
          wx.showToast({
            title: 'error',
          })
        }
      })
    } catch (e) { }
     
    that.getSharedUsers()    
  },

  getSharedUsers: function(){
    let that = this
    wx.request({
      url: app.globalData.host + 'account/get_share_img',
      data: {
        openid: app.globalData.userInfo.openid,
        codeWidth: that.data.imageQRCode.w, 
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('account/get_share_img:', res, app.globalData.userInfo.openid)
        that.setData({
          'imageQRCode.src1': res.data.data.img,
          sharedUsers: res.data.data.account,
        })

        for (var i = 0; i < that.data.sharedUsers.length; i++) {
          that.data.sharedUsers[i].formatTime = util.formatTime(new Date(that.data.sharedUsers[i].create_time * 1000))
        }

        that.setData({
          sharedUsers: that.data.sharedUsers
        })

        that.downloadImg()
      }
    })
  },

  downloadImg: function(){
    let that = this
    if (app.globalData.userInfo.id != 0 && app.globalData.userInfo.header_img != "") {
      wx.getImageInfo({
        src: app.globalData.userInfo.header_img,
        success: function (resInfo1) {
          that.setData({
            headImage: resInfo1,
          })
          wx.getImageInfo({
            src: that.data.imageBK.src1,
            success: function (resInfo2) {
              console.log(resInfo2)
              that.setData({
                'imageBK.src2': resInfo2.path
              })
              wx.getImageInfo({
                src: that.data.imageQRCode.src1,
                success: function (resInfo3) {
                  console.log(resInfo3)
                  that.setData({
                    'imageQRCode.src2': resInfo3.path
                  })
                  that.tapDraw()
                },
                fail: function () {
                  wx.showToast({
                    title: '绘制失败',
                  })
                }
              })
            },
            fail: function () {
              wx.showToast({
                title: '绘制失败',
              })
            }
          })
        },
        fail: function () {
          wx.showToast({
            title: '绘制失败',
          })
        }
      })
    } else {
      wx.getImageInfo({
        src: that.data.imageBK.src1,
        success: function (resInfo2) {
          console.log(resInfo2)
          that.setData({
            'imageBK.src2': resInfo2.path
          })
          wx.getImageInfo({
            src: that.data.imageQRCode.src1,
            success: function (resInfo3) {
              console.log(resInfo3)
              that.setData({
                'imageQRCode.src2': resInfo3.path
              })
              that.tapDraw()
            },
            fail: function () {
              wx.showToast({
                title: '绘制失败',
              })
            }
          })
        },
        fail: function () {
          wx.showToast({
            title: '绘制失败',
          })
        }
      })
    }
  },

  tapDraw: function (event) {
    let that = this
    that.setData({
      showPage: true
    })
    wx.showLoading({
      title: '正在生成',
    })
    that.funDraw()
  },

  funDraw: function () {
    let that = this

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setGlobalAlpha(1)
    ctx.setFillStyle("#ff6600")
    ctx.fillRect(0, 0, that.data.width, 1000)
    ctx.save()

    ctx.drawImage(that.data.imageBK.src2, 0, 0, 0.6 * that.data.width, that.data.imageBK.h2)

    var widthQRCode = that.data.imageQRCode.w * that.data.imageBK.h2 / that.data.imageBK.h1
    var xQRCode = 0.6 * that.data.width / 2 - 0.5*widthQRCode
    var yQRCode = 480 * that.data.imageBK.h2 / that.data.imageBK.h1
    ctx.drawImage(that.data.imageQRCode.src2, xQRCode, yQRCode, widthQRCode, widthQRCode)

    if (app.globalData.userInfo.id != 0 && app.globalData.userInfo.header_img != "") {
      var avatarurl_x = 0.6 * that.data.width / 2 - 20
      var avatarurl_y = 66 * that.data.imageBK.h2 / that.data.imageBK.h1
      var avatarurl_width = 40
      var avatarurl_heigth = 40
      {
        ctx.beginPath()
        ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false)
        ctx.clip()
        ctx.drawImage(that.data.headImage.path, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth)
        ctx.restore()
      }

      ctx.beginPath()
      {
        ctx.setFillStyle("black")
        ctx.font = 'normal normal 14px sans-serif'
        ctx.setTextAlign('center')
        ctx.fillText(app.globalData.userInfo.nick_name, 0.3 * that.data.width, avatarurl_y + 70 * that.data.imageBK.h2 / that.data.imageBK.h1 + 40)
      }
    }
    ctx.draw()

    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        fileType: 'jpg',
        success: function (res) {
          that.setData({
            imagePath: res.tempFilePath,
          })
          wx.showToast({
            title: '完成',
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 1000)
  },

  tapPreviewImage: function(){
    let that = this
    wx.previewImage({
      urls: [that.data.imagePath]
    })
  },

  tapSave: function () {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
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
    console.log("punch-share:", res, app.globalData.userInfo.openid)
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