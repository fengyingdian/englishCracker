Component({
  properties: {
    cards: {
      type: Array,
      value: [],
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