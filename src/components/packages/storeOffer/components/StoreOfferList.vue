<template>
  <div>
    <Form class="panel-form mb-20"
          inline
          :label-width="1">
      <FormItem>
        <store-category-cascader v-model="params.offerType"
                                 @on-change="delaySearch" />
      </FormItem>
      <FormItem>
        <i-input v-model.trim="params.offerName"
                 @on-enter="search"
                 placeholder="输入商品名称" />
      </FormItem>
      <FormItem>
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
</template>

<script>
import { indexMixin } from '@/mixins'
import { activityApi } from '@/api/ems'
import { StoreCategoryCascader } from '@/components/packages/cascader'
import { generalBtn } from '@/utils'

export default {
  mixins: [indexMixin],
  components: {
    StoreCategoryCascader
  },
  data() {
    return {
      params: {
        offerName: '',
        offerType: []
      },
      table: {
        columns: [{
          title: '商品ID',
          key: 'code'
        }, {
          title: '商品名称',
          key: 'offerName'
        }, {
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
