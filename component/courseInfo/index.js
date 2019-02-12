Component({
  properties: {

  },

  data: {
    courseInfo: [
      {
        src: "https://mmbiz.qpic.cn/mmbiz_jpg/90b2a0yoOanziaMicv82Kws5ogSB4Umpf62HUKKLLw7tvNQrTicOBUFLINKc2LibkzbBtaYAtiaRB7MPZj8NgLUU1Hw/0?wx_fmt=jpeg",
        w: 750,
        h1: 495,
        h2: 0,
      },
      {
        src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanziaMicv82Kws5ogSB4Umpf65HqoXBr7NHcUuqfkGHI9NB2dsE8HgrOmkZptcAe0dOl6QOcBiapNaXw/0?wx_fmt=png",
        w: 750,
        h1: 1188,
        h2: 0,
      },
      {
        src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanziaMicv82Kws5ogSB4Umpf6fy4zOIqzbuLicDA7NdkTK4BKyZOgXe5nlmCAicaF0L8wiaJ3YWrU6hYTQ/0?wx_fmt=png",
        w: 750,
        h1: 3494,
        h2: 0,
      },
      {
        src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanziaMicv82Kws5ogSB4Umpf61ZxPyxKm9x1kC6L8t1ibtq1j95MwqpRn9ia4901TAfgDibLjQibpkmKpZQ/0?wx_fmt=png",
        w: 750,
        h1: 2640,
        h2: 0,
      },
      {
        src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOanziaMicv82Kws5ogSB4Umpf610tLqibjry36HjW1iaXcshJA5xP67sqo6oXfibsoBicA7oUPibGsRLvHKfg/0?wx_fmt=png",
        w: 750,
        h1: 1438,
        h2: 0,
      }
    ],
    course: {
      src: "https://mmbiz.qpic.cn/mmbiz_jpg/90b2a0yoOanziaMicv82Kws5ogSB4Umpf62HUKKLLw7tvNQrTicOBUFLINKc2LibkzbBtaYAtiaRB7MPZj8NgLUU1Hw/0?wx_fmt=jpeg",
      w: 750,
      h1: 495,
      h2: 0,
    },
  },

  attached: function () {
  },

  ready: function () {
    let that = this
    try {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            width: res.windowWidth,
          })
          for (var i = 0; i < that.data.courseInfo.length; i++) {
            that.data.courseInfo[i].h2 = res.windowWidth * that.data.courseInfo[i].h1 / that.data.courseInfo[i].w
          }
          that.setData({
            courseInfo: that.data.courseInfo
          })
          console.log('that.data.courseInfo:', that.data.courseInfo)
        },
        fail: function (res) {
          wx.showToast({
            title: 'getSystemInfo: error',
          })
        }
      })
    } catch (e) { }
  },

  methods: {
    onTap: function (e) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})