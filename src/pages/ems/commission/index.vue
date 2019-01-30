<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form mb-20"
              inline
              :label-width="60">
          <FormItem :label-width="1">
            <i-input v-model.trim="params.userName"
                     @on-enter="search"
                     placeholder="输入用户昵称" />
          </FormItem>
          <FormItem :label-width="1">
            <Button type="primary"
                    @click="search">查询</Button>
          </FormItem>
        </Form>

        <Table :columns="table.columns"
               :data="table.list"
               ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </div>
    </div>

    <Modal title="明细"
           v-model="detail.show"
           width="80%">
      <vma-lazy :initial="detail.show">
        <mod-detail :data="detail.entity" />
      </vma-lazy>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { commissionApi } from '@/api/ems'
import ModDetail from './detail'

export default {
  mixins: [indexMixin],
  components: {
    ModDetail
  },
  data() {
    return {
      params: {
        userName: ''
      },
      table: {
        columns: [{
          title: '头像',
          key: 'headIcon',
          render: (h, { row, column, index }) => {
            return h('img', {
              attrs: {
                src: row.headIcon,
                width: 40,
                height: 40
              },
              directives: [{
                name: 'image-view'
              }]
            })
          }
        }, {
          title: '昵称',
          key: 'nickName'
        }, {
          title: '手机',
          key: 'phone'
        }, {
          title: '成交订单数',
          key: 'orderNum'
        }, {
          title: '成交金额',
          key: 'orderAmount',
          render: (h, { row, column, index }) => {
            return h('span', {
              class: 'c-danger'
            }, this.fmt.currency(row.orderAmount))
          }
        }, {
          title: '总佣金',
          key: 'totalCommission',
          render: (h, { row, column, index }) => {
            return h('span', {
              class: 'c-danger'
            }, this.fmt.currency(row.totalCommission))
          }
        }, {
          title: '操作',
          render: (h, { row, column, index }) => {
            let that = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    that.showDetail(row)
                  }
                }
              }, '详情')
            ])
          }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return commissionApi
    }
  }
}
</script>
