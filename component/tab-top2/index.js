Component({
  properties: {
    titleSelected: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
    width: {
      type: Number,
      value: 100,
      observer: function (newVal, oldVal, changedPath) {
        console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
  },

  data: {
    topTitles: [
      { name: "真题" },
      { name: "题目" },
    ],
  },

  attached: function () {
  },

  ready: function () {
  },

  methods: {
    onTap: function (e) {
      let that = this
      that.setData({
        titleSelected: e.currentTarget.id,
      })  
      var myEventDetail = { titleSelected: e.currentTarget.id}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})