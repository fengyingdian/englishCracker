Component({
  properties: {
    title: {
      type: String,
      value: true,
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
    }
  },
})