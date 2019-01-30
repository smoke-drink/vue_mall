<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <div class="tool">
          <div class="tool-btns">
            <Button type="info"
                    @click="() => isSorting = !isSorting">{{isSorting ? '取消排序' : '排序'}}</Button>
            <template v-if="!isSorting">
              <Button type="primary"
                      @click="showForm()">添加一级分类</Button>
            </template>
          </div>
        </div>

        <tree-table :columns="table.columns"
                    :data="table.list"
                    childTableClass="tree-table-child"
                    ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </div>
    </div>

    <Modal v-model="form.show"
           :title="form.entity.id ? '编辑分类' : '添加分类'"
           class="modal-hide-footer">
      <mod-form :data="form.entity"
                v-if="form.show"
                @after-submit="afterSubmitForm"
                @on-cancel="cancelForm" />
    </Modal>

  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { storeCategoryApi } from '@/api/ems'
import ModForm from './form'
import { generalBtn } from '@/utils'
import {mapActions} from 'vuex'
import * as emsTypes from '@/router/ems/types'

const ORDER_TYPE = {
  TOP: 0,
  BOTTOM: 2,
  UP: 1,
  DOWN: -1
}
export default {
  mixins: [indexMixin],
  components: {
    ModForm
  },
  data() {
    return {
      isSorting: false,
      table: {
        columns: [{
          title: '分类名称',
          key: 'typeName'
        }, {
          title: '商品数量',
          key: 'num'
        }, {
          title: '操作',
          render: (h, { row }) => {
            let { item, list } = row
            let opts = []
            if (this.isSorting) {
              // 排除第一项--无分类列表，不允许排序
              if (item.parentId !== '0') {
                if (item.index > 1) {
                  opts.push(
                    generalBtn(h, '置顶', () => {
                      this.order(item.id, ORDER_TYPE.TOP)
                    }, { type: 'success' })
                  )
                  opts.push(
                    generalBtn(h, '上移', () => {
                      this.order(item.id, ORDER_TYPE.UP)
                    })
                  )
                } else {
                  opts.push(
                    generalBtn(h, '置顶', () => { }, { type: 'success', style: { visibility: 'hidden' } })
                  )
                  opts.push(
                    generalBtn(h, '上移', () => { }, { style: { visibility: 'hidden' } })
                  )
                }
                if (item.index < list.length - 1) {
                  opts.push(
                    generalBtn(h, '下移', () => {
                      this.order(item.id, ORDER_TYPE.DOWN)
                    })
                  )
                  opts.push(
                    generalBtn(h, '置底', () => {
                      this.order(item.id, ORDER_TYPE.BOTTOM)
                    }, { type: 'success' })
                  )
                } else {
                  opts.push(
                    generalBtn(h, '下移', () => { }, { style: { visibility: 'hidden' } })
                  )
                  opts.push(
                    generalBtn(h, '置底', () => { }, { type: 'success', style: { visibility: 'hidden' } })
                  )
                }
              }
            } else {
              opts = [
                generalBtn(h, '查看商品', () => {
                  this.showStore(item)
                }, { type: 'info' })
              ]
              // 无分类列表不能删除
              if (item.parentId !== '0') {
                opts.push(
                  generalBtn(h, '删除', () => {
                    this.showDel(item.id, item.level === 1
                      ? `删除分类后，该分类下的子分类将一并删除，确认删除[${item.typeName}]分类吗？` : `删除分类后，该分类下的商品将解除与该分类的关联关系，确认删除[${item.typeName}]分类吗？`)
                  }, { type: 'error' })
                )
                opts.push(
                  generalBtn(h, '编辑', () => {
                    this.showForm(item)
                  })
                )
              }
              if (item.level === 1 && item.parentId !== '0') {
                opts.push(generalBtn(h, '添加子分类', () => {
                  this.addChild(item)
                }))
              }
            }
            return h('div', opts)
          }
        }]
      }
    }
  },
  methods: {
    ...mapActions(['setCurrentMenuUrl']),
    getApi() {
      return storeCategoryApi
    },
    list(pageNum, pageSize) {
      this.setPageNumSize(pageNum, pageSize)
      let params = this.getParams()
      return storeCategoryApi.list(params).then(list => {
        this.afterList(list)
        this.setTableList(list)
      })
    },
    afterList(list) {
      list.forEach((v, i) => {
        v.num = v.allNum
        v.index = i
        // 一级分类
        v.level = 1
        if (v.lists && v.lists.length) {
          v.children = v.lists.map((c, j) => {
            c.num = c.chilNum
            c.index = j
            // 二级分类
            c.level = 2
            return c
          })
        }
      })
    },
    showStore(item) {
      // currentMenuUrl
      this.setCurrentMenuUrl({
        name: emsTypes.STORE_OFFER,
        query: {
          classityId: item.id
        }
      })
    },
    addChild(item) {
      this.showForm({
        parentId: item.id
      })
    },
    order(id, tOrder) {
      storeCategoryApi.order({
        id,
        tOrder
      }).then(() => {
        this.success('排序成功')
        this.list()
      })
    }
  }
}
</script>
