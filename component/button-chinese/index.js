Component({
  properties: {
    translate: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
      }
    },
    background: {
      type: String,
      value: "white",
      observer: function (newVal, oldVal, changedPath) {
      }
    },
    color: {
      type: String,
      value: "black",
      observer: function (newVal, oldVal, changedPath) {
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
    onTap: function () {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('tap', myEventDetail, myEventOption)
    },
  },
})