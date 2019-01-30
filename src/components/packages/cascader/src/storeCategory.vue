<template>
  <Cascader v-model="computedValue"
            v-bind="options"
            :data="data"
            :placeholder="placeholder"
            @on-visible-change="onVisibleChange"
            @on-change="onChange" />
</template>

<script>
import {
  storeCategoryApi
} from '@/api/ems'
import mixin from './mixin'

export default {
  props: {
    placeholder: {
      type: String,
      default: '选择商品分类'
    }
  },
  mixins: [mixin],
  methods: {
    getData() {
      storeCategoryApi.list().then(page => {
        function loop(list) {
          if (list && list.length) {
            return list.map(v => {
              v.value = v.id
              v.label = v.typeName
              if (v.lists && v.lists.length) {
                v.children = loop(v.lists)
              } else {
                v.children = []
              }
              return v
            })
          }
          return list
        }
        this.data = loop(page)
        this.initial = true
      })
    }
  }
}
</script>
