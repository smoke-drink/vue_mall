<template>
  <div>
    <slot name="tool" />
    <Table :columns="table.columns"
           :data="table.list"
           @on-selection-change="handleTableSelection"
           ref="table" />
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />

    <Modal v-model="detail.show"
           title="提现申请详情"
           width="800px"
           class="modal-hide-footer">
      <vma-lazy :initial="detail.show">
        <mod-detail :data="detail.entity" />
      </vma-lazy>
    </Modal>

    <Modal v-model="audit.show"
           :title="audit.type === 1 ? '审核' : '驳回'"
           class="modal-hide-footer">
      <vma-lazy :initial="audit.show">
        <p>{{audit.type === 1 ? '点击[确定]按钮，把以下申请移到待发放列表' : '确认驳回以下提现申请么'}}</p>
        <div class="ivu-table mt15">
          <table cellspacing="0"
                 cellpadding="0"
                 border="0"
                 style="width: 100%;">
            <thead>
              <tr>
                <th width="50%"
                    class="ivu-table-column-center">提现账号</th>
                <th width="50%"
                    class="ivu-table-column-center">提现金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="ivu-table-column-center">{{audit.entity.userName}}</td>
                <td class="ivu-table-column-center">{{audit.entity.cashMoney | currency}}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-r mt15">
            <Button type="ghost"
                    style="margin-right: 8px"
                    @click="() => audit.show = false">取消</Button>
            <Button type="primary"
                    @click="doAudit">确定</Button>
          </div>
        </div>
      </vma-lazy>
    </Modal>

    <Modal v-model="grant.show"
           title="发放"
           width="600px"
           class="modal-hide-footer">
      <vma-lazy :initial="grant.show">
        <grant :data="grant.entity"
               @after-submit="afterSubmitGrant"
               @on-cancel="() => grant.show = false" />
      </vma-lazy>
    </Modal>

  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { commissionApplyLogApi } from '@/api/ems'
import { generalBtn } from '@/utils'
import ModDetail from './detail'
import Grant from './components/grant'

export default {
  mixins: [indexMixin],
  components: {
    ModDetail,
    Grant
  },
  props: {
    status: {
      required: true
    }
  },
  data() {
    return {
      table: {
        columns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '头像',
          key: 'headIcon',
          render: (h, { row, column, index }) => {
            return h('img', {
              attrs: {
                src: row.headIcon
              },
              class: 'table-cell-img',
              directives: [{
                name: 'image-view'
              }]
            })
          }
        }, {
          title: '申请人',
          key: 'linkMan'
        }, {
          title: '联系电话',
          key: 'linkPhone'
        }, {
          title: '申请金额',
          key: 'cashMoney',
          render: (h, { row, column, index }) => {
            return h('span', {
              class: 'c-danger'
            }, this.fmt.currency(row.cashMoney))
          }
        }, {
          title: '申请时间',
          key: 'createTime',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.date(row.createTime))
          }
        }, {
          title: '操作',
          width: 200,
          render: (h, { row, column, index }) => {
            let opts = [
              generalBtn(h, '查看', () => {
                this.showDetail(row.id)
              }, { type: 'info' })
            ]
            if (this.status === 0) {
              opts.push(
                generalBtn(h, '审核通过', () => {
                  this.showAuditResolve(row)
                })
              )
              opts.push(
                generalBtn(h, '驳回', () => {
                  this.showAuditReject(row)
                }, { type: 'warning' })
              )
            } else if (this.status === 1) {
              opts.push(
                generalBtn(h, '发放', () => {
                  this.showGrant(row)
                })
              )
            }
            return h('div', opts)
          }
        }]
      },
      audit: {
        show: false,
        type: 1,
        entity: {}
      },
      grant: {
        show: false,
        entity: {}
      }
    }
  },
  methods: {
    getApi() {
      return commissionApplyLogApi
    },
    getParams() {
      return Object.assign({
        status: this.status
      }, this.params)
    },
    showAuditResolve(item) {
      this.showAudit(1, item)
    },
    showAuditReject(item) {
      this.showAudit(2, item)
    },
    showAudit(type, item) {
      this.audit.type = type
      this.audit.entity = item
      this.audit.show = true
    },
    doAudit() {
      let auditRequest = this.audit.type === 1 ? commissionApplyLogApi.auditResolve : commissionApplyLogApi.auditReject
      auditRequest(this.audit.entity.id).then(() => {
        this.success(`${this.audit.type === 1 ? '审核' : '驳回'}成功`)
        this.audit.show = false
        this.list()
      })
    },
    showGrant(item) {
      this.grant.entity = item
      this.grant.show = true
    },
    afterSubmitGrant() {
      this.success('发放成功')
      this.list()
      this.grant.show = false
    }
  }
}
</script>
