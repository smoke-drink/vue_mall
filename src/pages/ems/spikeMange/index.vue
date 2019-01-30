<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form mb-20"
              inline
              :label-width="1">
          <FormItem>
            <ButtonGroup>
              <Button :type="params.status === 1 ? 'primary' : 'default'"
                      @click="changeParamsStatus(1)">进行中</Button>
              <Button :type="params.status === 2 ? 'primary' : 'default'"
                      @click="changeParamsStatus(2)">未开始</Button>
              <Button :type="params.status === 3 ? 'primary' : 'default'"
                      @click="changeParamsStatus(3)">已结束</Button>
              <Button :type="params.status === 4 ? 'primary' : 'default'"
                      @click="changeParamsStatus(4)">已下架</Button>
            </ButtonGroup>
          </FormItem>
          <FormItem>
            <store-category-cascader v-model="params.offerType"
                                     :options="{'change-on-select': true}"
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

        <div class="tool">
          <div class="tool-btns">
            <Button type="primary"
                    @click="showForm()">添加活动</Button>
          </div>
        </div>

        <Table :columns="table.columns"
               :data="table.list"
               ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </div>
    </div>

    <vma-panel v-model="form.show"
               :title="form.entity.id ? '编辑活动' : '添加活动'">
      <mod-form :data="form.entity"
                v-if="form.show"
                @after-submit="afterSubmitForm"
                @on-cancel="cancelForm" />
    </vma-panel>

  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { spikeMangeApi } from '@/api/ems'
import { StoreCategoryCascader } from '@/components/packages/cascader'
import { generalBtn } from '@/utils'
import ModForm from './form'

export default {
  mixins: [indexMixin],
  components: {
    StoreCategoryCascader,
    ModForm
  },
  data() {
    return {
      params: {
        status: 1,
        offerType: [],
        offerName: ''
      },
      table: {
        columns: [{
          title: '商品图片',
          key: 'imgUrl',
          render: (h, { row, column, index }) => {
            return h('img', {
              attrs: {
                src: row.imgUrl
              },
              class: 'table-cell-img',
              directives: [{
                name: 'image-view'
              }]
            })
          }
        }, {
          title: '商品名称',
          key: 'offerName'
        }, {
          title: '所属分类',
          key: 'offerType'
        }, {
          title: '秒杀价',
          key: 'seckillPrice',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.currency(row.seckillPrice))
          }
        }, {
          title: '开始时间',
          key: 'seckillStart',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.date(row.seckillStart))
          }
        }, {
          title: '结束时间',
          key: 'seckillOver',
          render: (h, { row, column, index }) => {
            return h('span', this.fmt.date(row.seckillOver))
          }
        }, {
          title: '销量',
          key: 'seckillSalesVolume'
        }, {
          title: '操作',
          render: (h, { row, column, index }) => {
            let opts = []
            // 未开始、进行中 状态可编辑
            // if (row.decide === 1) {
            //   opts.push(
            //     generalBtn(h, '编辑', () => {
            //       this.showForm(row.id)
            //     })
            //   )
            // }
            // 进行中 可下架
            if (row.decide === 1) {
              opts.push(
                generalBtn(h, '下架', () => {
                  this.updateStatus(row.offerSpecId, 3, '下架')
                })
              )
            }
            // 已结束且结束时间>当前时间 可上架
            // if (row.decide === 4 && Date.now() < row.endTime) {
            //   opts.push(
            //     generalBtn(h, '上架', () => {
            //       this.updateStatus(row.id, 1, '上架')
            //     })
            //   )
            // }
            return h('span', opts)
          }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return spikeMangeApi
    },
    changeParamsStatus(status) {
      this.params.status = status
      this.search()
    },
    getParams() {
      let params = Object.assign({}, this.params)
      // 及联下拉框的值是数组，需要特别处理
      if (params.offerType && params.offerType.length) {
        params.offerType = params.offerType[params.offerType.length - 1]
      } else {
        params.offerType = ''
      }
      return params
    },
    updateStatus(id, status, label) {
      spikeMangeApi.updateStatus({offer_spec_id: id}).then(() => {
        this.success(`${label}成功`)
        this.list()
      })
    },
    afterSubmitForm(data, entity) {
      this.form.show = false
      // 新增时刷新未开始列表
      // 编辑时更新当前列表
      if (!entity.id) {
        this.changeParamsStatus(2)
      } else {
        this.list()
      }
      this.success(`${entity.id ? '编辑' : '新增'}成功`)
    }
  }
}
</script>
