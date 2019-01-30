<template>
  <div class="table ivu-table-wrapper">
    <div class="ivu-table">
      <div class="ivu-table-header">
        <table cellspacing="0"
               cellpadding="0"
               border="0"
               style="width: 100%">
          <colgroup>
            <col v-for="(col, i) in columns"
                 :key="i"
                 :width="columnWidth">
          </colgroup>
          <thead>
            <tr>
              <th :class="{'ivu-table-column-center': col.align === 'center'}"
                  v-for="(col, i) in columns"
                  :key="i">
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
            <col v-for="(col, i) in columns"
                 :key="i"
                 :width="columnWidth">
          </colgroup>
          <tbody class="ivu-table-tbody">
            <template v-for="parent in data">
              <slot :item="parent"
                    :list="data" />
              <template v-if="parent.children && parent.children.length">
                <tr class="ivu-table-row"
                    v-for="(child, k) in parent.children"
                    :key="generalKey(child, k)">
                  <td v-for="(col, j) in columns"
                      :key="col.key + j"
                      :class="{'ivu-table-column-center': col.align === 'center'}">
                    <div class="ivu-table-cell">
                      <slot :name="col.key"
                            :item="child"
                            :list="parent.children"
                            :parent="parent"
                            :parentList="data">
                        <table-cell :row="{item: child, list: parent.children, parent, parentList: data}"
                                    :column="col"
                                    :index="k" />
                      </slot>
                    </div>
                  </td>
                </tr>
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

export default {
  components: {
    TableCell
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
    }
  },
  computed: {
    columnWidth() {
      return `${(100 / this.columns.length).toFixed(2)}%`
    }
  },
  methods: {
    generalKey(item, index) {
      if (typeof this.rowKey === 'function') {
        return this.rowKey(item)
      }
      return item.id || index
    }
  }
}
</script>
