<template>
  <span>
    <render-cell v-if="column.render"
                 :row="row"
                 :column="column"
                 :index="index"
                 :render="column.render" />
    <span v-else-if="column.html"
          v-html="column.html(row, column)"></span>
    <span v-else-if="column.format">{{column.format(row, column)}}</span>
    <span v-else>{{row.item[column.key]}}</span>
  </span>
</template>

<script>
import RenderCell from './renderCell'

export default {
  components: {
    RenderCell
  },
  props: {
    row: Object,
    index: Number,
    column: Object
  }
}
</script>
