<template>
  <div>
    <Form class="panel-form mb-20"
          inline
          :label-width="60">
      <FormItem :label-width="1">
        <i-input v-model.trim="params.staffName"
                 @on-enter="search"
                 placeholder="输入姓名查询" />
      </FormItem>
      <FormItem :label-width="1">
        <department-input v-model="params.departmentIds"
                          @change="search"
                          showCheckbox
                          placeholder="选择部门" />
      </FormItem>
      <FormItem :label-width="1">
        <Button type="primary"
                @click="search">查询</Button>
      </FormItem>
    </Form>
    <div class="tool">
      <div class="tool-btns">
        <Button type="primary"
                @click="exportFile">导出</Button>
      </div>
    </div>
    <Table :columns="table.columns"
           :data="table.list"
           ref="table" />
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />

    <Modal v-model="detail.show"
           title="详情"
           class="modal-hide-footer"
           width="80%">
      <vma-lazy :initial="detail.show">
        <mod-detail :data="detail.entity" />
      </vma-lazy>
    </Modal>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { userCommissionStatApi } from '@/api/ems'
import { generalBtn, downloadFile } from '@/utils'
import ModDetail from '../detail'
import { departmentInput } from '@/components/packages/input'

export default {
  mixins: [indexMixin],
  components: {
    ModDetail,
    departmentInput
  },
  data() {
    return {
      params: {
        departmentIds: [],
        staffName: '',
        status: 0,
        time: ''
      },
      month: '',
      table: {
        columns: [{
          title: '头像',
          key: 'headUrl',
          render: (h, { row, column, index }) => {
            return h('img', {
              attrs: {
                src: row.headUrl,
                width: 40,
                height: 40
              },
              directives: [{
                name: 'image-view'
              }]
            })
          }
        }, {
          title: '业务员',
          key: 'name'
        }, {
          title: '手机',
          key: 'phone'
        }, {
          title: '部门',
          key: 'departmentName'
        }, {
          title: '未入账佣金',
          key: 'notInCount',
          render: (h, { row, column, index }) => {
            return h('span', {
              class: 'c-danger'
            }, this.fmt.currency(row.notInCount))
          }
        }, {
          title: '操作',
          render: (h, { row, column, index }) => {
            return h('span', [
              generalBtn(h, '明细', () => {
                row.status = 0
                this.showDetail(row)
              }, { type: 'info' })
            ])
          }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return userCommissionStatApi
    },
    exportFile() {
      userCommissionStatApi.exportFile(this.params.status).then(data => {
        downloadFile(data, '未入账佣金.xls')
      })
    }
  }
}
</script>
