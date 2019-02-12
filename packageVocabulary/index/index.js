// pages/wordPage/index.js
const utils = require('../words.js')
import { vocabulary } from '../words.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '指尖英语单词测试系统',
    curCount: 0,
    progress: 0.001,
    rightCount: 0,
    words:[],
    background: ["white,white,white,white"],
    color: ["black,black,black,black"],
    disable: false,
  },

  tapNext: function(){
    console.log("tapNext:")
    if (this.data.words.length > this.data.curCount+1){
      this._start()

      setTimeout(function () {
        this._animation()
        this.setData({
          curCount: this.data.curCount + 1,
          curWord: this.data.words[this.data.curCount + 1],
          progress: (this.data.curCount + 1) / this.data.words.length
        })
      }.bind(this), 500)

    }else{
      var score = utils.getScore(this.data.rightCount)

      this.setData({
        progress: 1
      })
      this._start()
      setTimeout(function () {
        wx.reLaunch({
          url: '../score/index?score=' + score
        })
      }.bind(this), 1000)
    }
    this.setData({
      disable: false
    })
  },

  tapTranslate: function(options) {
    if (this.data.disable == true){
      return
    }

    this.setData({
      disable: true
    })

    var index = parseInt(options.currentTarget.id) + 1
    var oneAnimation = "_animation[" + index + "]"
    this.setData({
      [oneAnimation]: this._expand(),
    })
    setTimeout(function () {
      this.setData({
        [oneAnimation]: this._step(),
      })
    }.bind(this), 500)

    var background = "background[" + this.data.curWord.right + "]"
    var color = "color[" + this.data.curWord.right + "]"
    this.setData({
      [background]: "rgb(34,177,76)",
      [color]: "white"
    })

    if (options.currentTarget.id != this.data.curWord.right){
      background = "background[" + options.currentTarget.id + "]"
      color = "color[" + options.currentTarget.id + "]"
      this.setData({
        [background]: "red",
        [color]: "white"
      })
    }else{
      this.setData({
        rightCount: this.data.rightCount+1
      })
    }

    setTimeout(function () {
      this.tapNext()
    }.bind(this), 1000)
  },

  _start: function () {
    this.setData({
      _animation: [this._prepareHide(), this._prepare(), this._prepare(), this._prepare(), this._prepare(), this._prepareY()],
      background: ["white,white,white,white"],
      color: ["black,black,black,black"],
    })
  },

  _prepare: function () {
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })
    animation.translateX(1000).opacity(0).step()
    return animation.export()
  },

  _prepareY: function () {
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })
    animation.translateY(1000).opacity(0).step()
    return animation.export()
  },

  _prepareHide: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    animation.opacity(0).step()
    return animation.export()
  },

  _animation: function () {
    this.setData({
      _animation: [this._step(500), this._step(500), this._step(400), this._step(300), this._step(200), this._step(1000)]
    })
  },

  _step: function (duration) {
    var animation = wx.createAnimation({
      duration: duration,
      timingFunction: 'ease',
    })
    animation.opacity(1).scale(1, 1).step()
    return animation.export()
  },

  _expand: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animation.opacity(1).scale(1.1, 1.1).step()
    return animation.export()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temp = []
    vocabulary.forEach(item => {
      temp.push({
        english: item.english,
        right: item.right,
        grade: item.grade,
        translate: item.translate,
      })
    })

    this.setData({
      words: temp,
    })

    this.setData({
      curWord: this.data.words[this.data.curCount]
    })

    this._start()

    setTimeout(function () {
      this._animation()
    }.bind(this), 500)
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
  onShareAppMessage: function () {

  }
})