Component({
  properties: {
    progress: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal, oldVal, changedPath)
        this.setData({
          progressShow: parseInt(newVal * 100)
        }) 
      }
    },
  },

  data: {
    animationData: {},
  },

  attached: function () {

  },

  ready: function () {
  },


  methods: {
    onTap: function () {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})