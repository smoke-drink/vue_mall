export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: '',
    // iview树组件不支持过滤
    showFilter: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    transferData: {
      type: Function,
      default: null
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    addRoot: {
      type: Boolean,
      default: false
    },
    rootData: {
      type: Object,
      default () {
        return {
          id: 0,
          label: '全部'
        }
      }
    }
  },
  data() {
    return {
      storeData: [],
      data: [],
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.filterNode(val)
    }
  },
  created() {
    this.getData().then(data => {
      if (this.addRoot) {
        data = [Object.assign({}, this.rootData, {
          children: data
        })]
      }
      if (typeof this.transferData === 'function') {
        let res = this.transferData(data)
        if (res !== undefined) {
          data = res
        }
      }
      this.storeData = data
      this.data = data
    })
  },
  mounted() {
    if (this.showFilter && this.$refs.filter) {
      this.$refs.filter.focus()
    }
  },
  methods: {
    getData() {
      throw new Error('请重写该方法')
    },
    filterNode(value) {
      this.data = this.storeData.f
    },
    shoudEmitClick(data, node, tree) {
      return true
    },
    handleNodeClick(data, node, tree) {
      if (this.shoudEmitClick(data, node, tree)) {
        this.$emit('change', data.id)
        this.$emit('click', data, node, tree)
      }
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()
    },
    getSelectedNodes() {
      return this.$refs.tree.getSelectedNodes()
    },
    handleSelect(nodeKey) {
      return this.$refs.tree.handleSelect(nodeKey)
    },
    handleCheck({
      checked,
      nodeKey
    }) {
      return this.$refs.tree.handleCheck({
        checked,
        nodeKey
      })
    }
  }
}
