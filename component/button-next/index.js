Component({
  properties: {
    translate: {
      type: String,
      value: true,
      observer: function (newVal, oldVal, changedPath) {
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
    },
  },
})