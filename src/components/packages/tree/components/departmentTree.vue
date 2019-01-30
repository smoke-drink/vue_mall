<template>
  <div>
    <!--
    <i-input placeholder="输入关键字进行过滤"
             v-model="filterText"
             v-if="showFilter"
             ref="filter">
    </i-input>
    -->
    <Tree :data="data"
          :multiple="multiple"
          :show-checkbox="showCheckbox"
          @on-sellect-change="handleNodeClick"
          @on-check-change="checkChange"
          v-bind="options"
          class="tree-nm"
          ref="tree">
    </Tree>
  </div>
</template>

<script>
import treeMixin from './treeMixin'
import { personApi } from '@/api/ems'

export default {
  mixins: [treeMixin],
  props: {
    containRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getData() {
      function recursive(list) {
        return list.map(data => {
          if (!data.children) {
            data.children = []
          }
          return {
            id: data.id,
            title: `${data.title}`,
            data,
            children: recursive(data.children)
          }
        })
      }
      return personApi.tree().then(data => {
        return recursive(data)
      })
    },
    checkChange(data, isCheck, hasCheckedChild) {
      this.$emit('check-change', data, isCheck, hasCheckedChild)
    }
  }
}
</script>
