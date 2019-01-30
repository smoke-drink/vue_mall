<template>
  <div>
    <order-table :columns="table.columns"
                 :data="table.list">
      <tr slot-scope="{item}">
        <td colspan="9"
            class="pl10"
            style="background: #efefef;">
          <Row>
            <i-col :span="12">
              订单编号: {{item.orderNbr}}
              <span class="ml20">下单时间: {{item.orderTime | date}}</span>
            </i-col>
            <i-col :span="12"
                   class="text-r pr20">
              订单金额: {{item.totalPrice | currency}}
              <span class="ml20">佣金: {{item.extractValue | currency}} ({{['未入账', '可提现', '在途', '已完成', '已取消'][item.status]}})
              </span>
            </i-col>
          </Row>
        </td>
      </tr>

      <template slot="normsPic"
                slot-scope="{item}">
        <div class="img-space-del-table">
          <img :src="item.normsPic"
               v-image-view
               class="table-cell-img" />
        </div>
      </template>

    </order-table>
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />
  </div>
</template>

<script>
import { indexMixin, detailMixin } from '@/mixins'
import { userCommissionStatApi } from '@/api/ems'

export default {
  mixins: [detailMixin, indexMixin],
  data() {
    return {
      params: {
        staffId: this.data.staffId,
        status: this.data.status
      },
      table: {
        columns: [{
          title: '商品图片',
          key: 'normsPic'
        }, {
          title: '商品名称',
          key: 'normsName'
        }, {
          title: '单价/数量',
          key: 'offerPrice-offerNum',
          format: ({ item }) => {
            return `${this.fmt.currency(item.offerPriceDiscount)} * ${item.offerNum}`
          }
        }, {
          title: '总价',
          key: 'totalPrice',
          format: ({ item }) => {
            return this.fmt.currency(item.totalPriceDiscount)
          }
        }, {
          title: '员工佣金',
          key: 'commission',
          format: ({ item }) => {
            return this.fmt.currency(item.commission)
          }
        }]
      }
    }
  },
  methods: {
    init() { },
    afterEntity() {
      this.search()
    },
    getListApi(params) {
      params.staffId = this.data.staffId
      return userCommissionStatApi.orderListByStaff(params)
    },
    afterList(list) {
      list.forEach(v => {
        if (v.orderDetails && v.orderDetails.length) {
          v.children = v.orderDetails
        }
      })
    }
  }
  // ,
  // watch: {
  //   data: {
  //     handler: function (newVal) {
  //       this.params.staffId = newVal.staffId
  //       this.listAndDetail(0)
  //     },
  //     deep: true
  //   }
  // }
}
</script>
