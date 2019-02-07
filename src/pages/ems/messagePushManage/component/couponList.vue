<template>
  <div>
    <Table :columns="table.columns"
           :data="table.list"
           :show-header="false"
           ref="table" />
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { activityApi } from '@/api/ems'
import { generalBtn } from '@/utils'

export default {
  mixins: [indexMixin],
  components: {},
  data() {
    return {
      table: {
        columns: [{
          title: '优惠券类别',
          key: 'type',
          render: (h, {row, column, index}) => {
            return h('div',[
              h('p', {
                style: {
                  padding: '10px'
                }
              }, row.type || '满300-100 优惠券'),
              h('span', {
                style: {
                  marginRight: '20px'
                }
              }, `剩余：${row.rest || 12}`),
              h('span', {}, `已发：${row.rest || 12}`)
            ])
          }
        },{
          title: '操作',
          width: 100,
          render: (h, { row, column, index }) => {
            return h('div', [
              generalBtn(h, '选择', () => {
                activityApi.getStoreOffer(row.id).then(data => {
                  this.$emit('select', data)
                })
              })
            ])
          }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return activityApi
    },
    getListApi(params) {
      return activityApi.listStoreOffer(params)
    },
    getParams() {
      let params = Object.assign({}, this.params)
      if (params.offerType && params.offerType.length) {
        params.offerType = params.offerType[params.offerType.length - 1]
      } else {
        params.offerType = ''
      }
      return params
    }
  }
}
</script>
