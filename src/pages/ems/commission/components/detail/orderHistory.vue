<template>
  <div>
    <div class="tool">
      <div class="tool-btns">
        <Button type="success"
                @click="exportFile">导出</Button>
      </div>
    </div>
    <order-table :columns="table.columns"
                 :data="table.list">
      <tr slot-scope="{item}">
        <td colspan="9"
            class="pl10"
            style="background: #efefef;">
          订单编号: {{item.orderNbr}}
          <span class="ml20">完成时间: {{item.finishTime | date}}</span>
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
import { commissionApi } from '@/api/ems'
import { downloadFile } from '@/utils'

export default {
  mixins: [detailMixin, indexMixin],
  data() {
    return {
      params: {
        userId: this.data.id
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
            return `${this.fmt.currency(item.offerPrice)} * ${item.offerNum}`
          }
        }, {
          title: '总价',
          key: 'totalPrice',
          format: ({ item }) => {
            return this.fmt.currency(item.totalPrice)
          }
        }, {
          title: '应付',
          key: 'totalPriceDiscount',
          format: ({ item }) => {
            return this.fmt.currency(item.totalPriceDiscount)
          }
        }, {
          title: '优惠',
          key: 'discount',
          format: ({ item }) => {
            return `-${this.fmt.currency(item.discount)}`
          }
        }, {
          title: '分销佣金',
          key: 'commission',
          format: ({ item }) => {
            return this.fmt.currency(item.commission)
          }
        }, {
          title: '收货人',
          key: 'linkMan',
          align: 'center',
          html: ({ item, parent }) => {
            return `<p>${parent.linkMan}<br />${parent.linkPhone}</p>`
          }
        }, {
          // 0未支付 1已支付 2用户取消 3超时取消 4未发货 5已发货 6完成
          title: '状态',
          key: 'status',
          format: ({ item, parent }) => {
            return {
              '0': '未支付',
              '1': '已支付',
              '2': '用户取消',
              '3': '超时取消',
              '4': '未发货',
              '5': '已发货',
              '6': '完成',
              '7': '拼图失败',
              '8': '已退款'
            }[parent.status]
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
      return commissionApi.listOrder(params)
    },
    afterList(list) {
      list.forEach(v => {
        if (v.repCommissionOrderLogDetailList && v.repCommissionOrderLogDetailList.length) {
          v.children = v.repCommissionOrderLogDetailList
        }
      })
    },
    exportFile() {
      commissionApi.exportOrder(this.data.id).then(data => {
        downloadFile(data, '分销订单历史.xls')
      })
    }
  }
}
</script>
