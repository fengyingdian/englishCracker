Component({
  properties: {
    titleSelected: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        //console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
    width: {
      type: Number,
      value: 100,
      observer: function (newVal, oldVal, changedPath) {
        //console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
  },

  data: {
    topTitles: [
      { name: "选课报名" },
      { name: "课程详情" },
      { name: "奖学计划" },
    ],
  },

  attached: function () {
  },

  ready: function () {
  },

  methods: {
    onTap: function (e) {
      var myEventDetail = { titleSelected: e.currentTarget.id}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})