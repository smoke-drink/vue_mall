<template>
  <list :status="0"
        ref="list">
    <div class="tool"
         slot="tool">
      <div class="tool-btns">
        <Button type="primary"
                @click="batchAuditResolve">批量审核通过</Button>
        <Button type="warning"
                @click="batchAuditReject">批量驳回</Button>
      </div>
    </div>
  </list>
</template>

<script>
import List from './list'
import { commissionApplyLogApi } from '@/api/ems'

export default {
  components: {
    List
  },
  methods: {
    getTableSelectionIds() {
      return this.$refs.list.getTableSelection()
    },
    batchAuditResolve() {
      let ids = this.getTableSelectionIds()
      if (ids.length === 0) {
        return this.warning('请选择数据')
      }
      commissionApplyLogApi.batchAuditResolve(ids).then(() => {
        this.success('批量审核通过成功')
        this.$refs.list.selection = []
        this.$refs.list.list()
      })
    },
    batchAuditReject() {
      let ids = this.getTableSelectionIds()
      if (ids.length === 0) {
        return this.warning('请选择数据')
      }
      commissionApplyLogApi.batchAuditReject(ids).then(() => {
        this.success('批量驳回成功')
        this.$refs.list.selection = []
        this.$refs.list.list()
      })
    }
  }
}
</script>
