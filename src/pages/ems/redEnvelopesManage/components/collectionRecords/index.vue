<template>
  <div>
    <Row class="list mb25">
      <i-col span="6">已发放：个</i-col>
      <i-col span="6">已发放：元</i-col>
      <i-col span="6">当前剩余：元</i-col>
    </Row>
    <Table :columns="table.columns"
           :data="table.list"
           ref="table" />
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { userCommissionStatApi } from '@/api/ems'

export default {
  mixins: [indexMixin],
  data() {
    return {
      table: {
        columns: [{
          title: '领取人',
          key: 'name'
        }, {
          title: '联系方式',
          key: 'phone'
        }, {
          title: '领取金额',
          key: 'departmentName'
        }, {
          title: '领取场景',
          key: 'departmentName'
        }]
      }
    }
  },
  methods: {
    getApi() {
      return userCommissionStatApi
    }
  }
}
</script>
