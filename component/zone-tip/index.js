Component({
  properties: {
    icon: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        //console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
    name: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        //console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
    info: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        //console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
    height: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        //console.log("tab-top", newVal, oldVal, changedPath, this)
      }
    },
  },

  data: {
  },

  attached: function () {
  },

  ready: function () {
  },

  methods: {
    onTap: function (e) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    }
  },
})