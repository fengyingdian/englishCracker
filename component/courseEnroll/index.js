Component({
  properties: {
  },

  data: {
    courses: [
      { icon: "/pages/image/icon1.png", name: "备战高考英语", info: "坚持阅读，直通名校", days: "100天" },
      { icon: "/pages/image/icon2.png", name: "秒杀四级英语", info: "掌握方法，轻松过级", days: "100天" },
      { icon: "/pages/image/icon3.png", name: "突破六级英语", info: "攻克难点，实现突破", days: "100天" },
      { icon: "/pages/image/icon4.png", name: "决胜考研英语", info: "百日计划，成就梦想", days: "100天" },
    ],
    follows: [
      { icon: "/pages/image/num1.png", name: "选择课程", info: "高考、四六级、考研英语", },
      { icon: "/pages/image/num2.png", name: "报名", info: "选好课程进入报名，付款后准备学习", },
      { icon: "/pages/image/num3.png", name: "添加老师微信", info: "添加老师微信获取学前准备资料", },
    ],
    imageHead: {
      src: "https://mmbiz.qpic.cn/mmbiz_png/90b2a0yoOak1gGPRjGds2dFhteCYPia4P7zbicticZ8Y6qw9bUDHqtAn4xHAedC4zYnhNDtz7IicaGricYNqmmNV6UQ/0?wx_fmt=png",
      w: 750,
      h1: 568,
      h2: 568,
    }
  },

  attached: function () {
  },

  ready: function () {
    let that = this
    try {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            'imageHead.h2': res.windowWidth * that.data.imageHead.h1/that.data.imageHead.w 
          }) 
        },
        fail: function(res){
          wx.showToast({
            title: 'getSystemInfo: error',
          })
        }
      })
    } catch (e) { }
  },

  methods: {
    onTap: function (e) {
      console.log("methods", e.currentTarget.id)
      wx.navigateTo({
        url: '/pages/index/payments/payments',
      })
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})