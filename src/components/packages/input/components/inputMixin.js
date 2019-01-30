export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  props: {
    clearable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    showFilter: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '点击选择'
    }
  },
  data() {
    return {
      tree: {
        show: false
      },
      messages: {
        input: this.placeholder
      },
      checkedNodes: []
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('model', val)
      }
    }
  },
  methods: {
    emitChange() {
      this.$emit('change', this.computedValue)
    },
    showTree() {
      this.tree.show = true
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes().filter(v => {
        return v.isLeaf !== true
      })
    },
    selectTree() {
      let checkedNodes = this.getCheckedNodes()
      if (checkedNodes && checkedNodes.length) {
        this.computedValue = checkedNodes.map(v => v.id)
        this.messages.input = '已选 [' + checkedNodes[0].title + '] 等'
        this.checkedNodes = checkedNodes
      } else {
        this.computedValue = []
        this.messages.input = this.placeholder
        this.checkedNodes = []
      }
      this.tree.show = false
      this.emitChange()
    },
    cancelTree() {
      this.tree.show = false
    },
    clear() {
      if (this.checkedNodes.length) {
        this.checkedNodes.forEach(v => {
          this.$refs.tree.handleCheck({
            checked: false,
            nodeKey: v.nodeKey
          })
        })
        this.computedValue = []
        this.checkedNodes = []
        this.messages.input = this.placeholder
        this.emitChange()
      }
    }
  }
}
