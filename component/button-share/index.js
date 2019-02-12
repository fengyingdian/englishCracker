Component({
  properties: {
    imageSrc: String,
  },

  data: {
    animationData: {},
  },

  attached: function () {
    console.log("button-service.attached")
  },

  ready: function () {
  },

  methods: {
    onHome: function () {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      animation.scale(1.2, 1.2).step()
      this.setData({
        animationData: animation.export()
      })

      setTimeout(function () {
        animation.scale(1.0, 1.0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 500)

      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})