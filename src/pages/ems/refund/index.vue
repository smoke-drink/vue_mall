<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form mb-20"
              inline
              :label-width="1">
          <FormItem>
            <ButtonGroup>
              <Button :type="params.status === 0 ? 'primary' : 'default'"
                      @click="changeParamsStatus(0)">退款中</Button>
              <Button :type="params.status === 1 ? 'primary' : 'default'"
                      @click="changeParamsStatus(1)">退款成功</Button>
            </ButtonGroup>
          </FormItem>
        </Form>
        <div class="tool"
             slot="tool">
          <div class="tool-btns">
            <template v-if="params.status === 0">
              <Button type="primary"
                      @click="batchRefund">批量退款</Button>
            </template>
            <Button type="primary"
                    @click="exportFile">导出</Button>
          </div>
        </div>
        <Table :columns="table.columns"
               :data="table.list"
               @on-selection-change="handleTableSelection"
               ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />

        <Modal v-model="detail.show"
               title="详情"
               width="800px"
               class="modal-hide-footer">
          <vma-lazy :initial="detail.show">
            <mod-detail :data="detail.entity" />
          </vma-lazy>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import ModDetail from './detail'
import { generalBtn, downloadFile } from '@/utils'
import { refundApi } from '@/api/ems'

export default {
  mixins: [indexMixin],
  components: {
    ModDetail
  },
  data() {
    return {
      params: {
        status: 0
      },
      table: {
        columns: [{
          type: 'selection',
          width: 60
        }, {
          title: '订单号',
          key: 'orderNbr'
        }, {
          title: '退款原因',
          key: 'refundReason'
        }, {
          title: '退款金额',
          key: 'refundMoney',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.currency(row.refundMoney))
          }
        }, {
          title: '退款账号',
          key: 'userName'
        }, {
          title: '生成时间',
          key: 'createTime',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.date(row.createTime))
          }
        }, {
          title: '退款时间',
          key: 'refundTime',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.date(row.refundTime))
          }
        }, {
          title: '状态',
          key: 'statusName'
        }, {
          title: '操作',
          render: (h, { row, column, index }) => {
            let opts = [
              generalBtn(h, '查看', () => {
                this.showDetail(row.id)
              }, { type: 'info' })
            ]
            if (this.params.status === 0) {
              opts.push(
                generalBtn(h, '退款', () => {
                  this.showRefund(row)
                })
              )
            }
            return h('div', opts)
          }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return refundApi
    },
    changeParamsStatus(status) {
      this.params.status = status
      this.search()
    },
    showRefund({ id }) {
      this.$Modal.confirm({
        title: '确认退款',
        content: '金额将原路退回客户，请确认',
        onOk: (action, instance) => {
          refundApi.refund(id).then(() => {
            this.success('退款成功')
            this.list()
          })
        }
      })
    },
    batchRefund() {
      let ids = this.getTableSelection()
      if (ids.length === 0) {
        return this.warning('请先选择数据')
      }
      refundApi.batchRefund(ids).then(() => {
        this.success('批量退款成功')
        this.list()
      })
    },
    exportFile() {
      refundApi.exportFile(this.params.status).then(data => {
        this.success('导出成功')
        downloadFile(data, '退款单.xls')
      })
    }
  }
}
</script>
