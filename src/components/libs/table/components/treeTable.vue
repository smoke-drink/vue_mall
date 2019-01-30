<template>
  <div class="table ivu-table-wrapper">
    <div class="ivu-table">
      <div class="ivu-table-header">
        <table cellspacing="0"
               cellpadding="0"
               border="0"
               style="width: 100%">
          <colgroup>
            <col :width="50">
            <col v-for="(col, i) in columns"
                 :key="i"
                 :width="columnWidth">
          </colgroup>
          <thead>
            <tr>
              <th>
                <div class="ivu-table-cell">
                  <span></span>
                </div>
              </th>
              <th v-for="(col, i) in columns"
                  :key="i"
                  :class="{'ivu-table-column-center': col.align === 'center'}">
                <div class="ivu-table-cell">
                  <span>{{col.title}}</span>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="ivu-table-body"
           v-show="data.length > 0">
        <table cellspacing="0"
               cellpadding="0"
               border="0"
               style="width: 100%">
          <colgroup>
            <col :width="50">
            <col v-for="(col, i) in columns"
                 :key="i"
                 :width="columnWidth">
          </colgroup>
          <tbody class="ivu-table-tbody">
            <template v-for="(item, i) in computedData">
              <tr class="ivu-table-row"
                  :key="generalKey(item, i)">
                <td>
                  <div class="ivu-table-cell ivu-table-cell-with-expand"
                       v-if="item.children && item.children.length">
                    <div :class="{'ivu-table-cell-expand-expanded': item._expand}"
                         class="ivu-table-cell-expand"
                         @click="toggleExpand(item)">
                      <Icon type="ios-arrow-right"></Icon>
                    </div>
                  </div>
                </td>
                <td v-for="(col, j) in columns"
                    :key="col.key + j"
                    :class="{'ivu-table-column-center': col.align === 'center'}">
                  <div class="ivu-table-cell">
                    <table-cell :row="{item, list: data}"
                                :column="col"
                                :index="i" />
                  </div>
                </td>
              </tr>
              <template v-if="item.children && item.children.length">
                <collapse-transition :key="generalKey(item, i)">
                  <tr v-show="item._expand">
                    <td :colspan="columns.length + 1">
                      <table cellspacing="0"
                             cellpadding="0"
                             border="0"
                             class="ivu-table-child"
                             style="width: 100%"
                             :class="childTableClass">
                        <colgroup>
                          <col :width="50">
                          <col v-for="(col, i) in columns"
                               :key="i"
                               :width="columnWidth">
                        </colgroup>
                        <tbody class="ivu-table-tbody">
                          <tr v-for="(child, j) in item.children"
                              :key="generalKey(child, j)">
                            <td>
                              <div class="ivu-table-cell"></div>
                            </td>
                            <td v-for="(col, k) in columns"
                                :key="col.key + k"
                                :class="{'ivu-table-column-center': col.align === 'center'}">
                              <div class="ivu-table-cell">
                                <table-cell :row="{item: child, list: item.children, parent: item, parentList: data}"
                                            :column="col"
                                            :index="j" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </collapse-transition>
              </template>
            </template>
          </tbody>
        </table>
      </div>
      <div class="ivu-table-tip"
           v-show="data.length === 0">
        <table cellspacing="0"
               cellpadding="0"
               border="0"
               style="width: 100%">
          <tbody>
            <tr>
              <td style="width: 100%">
                <span>暂无数据</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TableCell from './tableCell'
import CollapseTransition from '~/iview/src/components/base/collapse-transition'

export default {
  components: {
    TableCell,
    CollapseTransition
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    rowKey: {
      type: Function,
      required: false
    },
    childTableClass: ''
  },
  data() {
    return {
      expandedIds: []
    }
  },
  computed: {
    columnWidth() {
      return `${(100 / this.columns.length).toFixed(2)}%`
    },
    computedData() {
      return this.data.map(v => {
        this.$set(v, '_expand', this.expandedIds.includes(v.id))
        return v
      })
    }
  },
  methods: {
    generalKey(item, index) {
      if (typeof this.rowKey === 'function') {
        return this.rowKey(item)
      }
      return item.id || index
    },
    toggleExpand(item) {
      item._expand = !item._expand
      let index = this.expandedIds.indexOf(item.id)
      if (item._expand) {
        if (index === -1) {
          this.expandedIds.push(item.id)
        }
      } else {
        if (index > -1) {
          this.expandedIds.splice(index, 1)
        }
      }
    }
  }
}
</script>
