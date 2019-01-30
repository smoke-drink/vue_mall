<template>
  <div>
    <Form class="panel-form mb-20"
          inline>
      <FormItem>
        <store-category-cascader v-model="params.typeId"
                                 :options="{'change-on-select':true}"
                                 @on-change="delaySearch" />
      </FormItem>
      <FormItem>
        <i-input type="text"
                 v-model="params.offerName"
                 placeholder="商品名"></i-input>
      </FormItem>
      <div class="fr">
        <FormItem>
          <Button type="primary"
                  @click="search">查询</Button>
          <Button type="primary"
                  @click="handlerAdd">添加</Button>
        </FormItem>
      </div>
    </Form>
    <Table :columns="table.columns"
           :data="table.list"
           ref="table"
           @on-selection-change="selectRow" />
    <div style="margin-top:20px">
      <Button v-if="idList.length !== 0" @click="showMove2Classify">批量转移到分类</Button>
      <Button v-if="idList.length === 0" disabled>批量转移到分类</Button>
      <Button v-if="idList.length !== 0" @click="showAdd2Classify">批量添加到分类</Button>
      <Button v-if="idList.length === 0" disabled>批量添加到分类</Button>
      <Button v-if="idList.length !== 0" @click="changeCommission">批量修改佣金</Button>
      <Button v-if="idList.length === 0" disabled>批量修改佣金</Button>
      <Button v-if="idList.length !== 0" @click="handlerMoreUnderCarriage">批量下架</Button>
      <Button v-if="idList.length === 0" disabled>批量下架</Button>
      <Button v-if="idList.length !== 0" @click="handlerMoreGrounding">批量上架</Button>
      <Button v-if="idList.length === 0" disabled>批量上架</Button>
    </div>
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />
    <!-- 查看详情 -->
    <vma-panel v-model="editVisible"
               title="详情"
               :showClose="false">
      <edit v-model="editVisible"
            :editId="id"
            @after-save="refresh"
            @after-cancel="cancel"></edit>
    </vma-panel>
    <!-- 修改佣金 -->
    <Modal v-model="editCommissionVisible" title="修改佣金">

      <RadioGroup v-model="commissionType">
        <Radio label="one">
          <span>应用全局规则</span>
        </Radio>
        <Radio label="two">
          <span>自定义</span>
        </Radio>
      </RadioGroup>
      <div class="line">
        <span style="float: left">分销佣金比例(外部人员)：</span>
        <span v-if="commissionType === 'one'">{{overAll.outPersent}}</span>
        <Input v-if="commissionType === 'two'" v-model="outPersent" style="width: 50px" @on-change="editOutPersent" />
      </div>
      <div class="line">
        <span style="float: left">销售佣金比例(企业员工)：</span><span v-if="commissionType === 'one'">{{overAll.inPersent}}</span>
        <Input v-if="commissionType === 'two'" disabled  v-model="inPersent" style="width: 50px" />
      </div>
      <div slot="footer">
        <Button type="success" @click="editCommission">确认修改</Button>
      </div>
    </Modal>
    <!-- 批量修改佣金 -->
    <Modal v-model="editMoreCommissionVisible" title="批量修改佣金">
      <RadioGroup v-model="moreCommissionType">
        <Radio label="one">
          <span>应用全局规则</span>
        </Radio>
        <Radio label="two">
          <span>自定义</span>
        </Radio>
      </RadioGroup>
      <div class="line">
        <span style="float: left">分销佣金比例(外部人员)：</span>
        <span v-if="moreCommissionType === 'one'">{{overAll.outPersent}}</span>
        <Input v-if="moreCommissionType === 'two'" v-model="moreOutPersent" style="width: 50px" @on-change="editMoreOutPersent" />
      </div>
      <div class="line">
        <span style="float: left">销售佣金比例(企业员工)：</span>
        <span v-if="moreCommissionType === 'one'">{{overAll.inPersent}}</span>
        <Input v-if="moreCommissionType === 'two'" disabled  v-model="moreInPersent" style="width: 50px" />
      </div>
      <div slot="footer">
        <Button type="success" @click="editMoreCommission">确认修改</Button>
      </div>
    </Modal>

    <!-- 批量修改佣金 -->
    <Modal v-model="editMoreCommissionVisible" title="批量修改佣金">
      <RadioGroup v-model="moreCommissionType">
        <Radio label="one">
          <span>应用全局规则</span>
        </Radio>
        <Radio label="two">
          <span>自定义</span>
        </Radio>
      </RadioGroup>
      <div class="line">
        <span style="float: left">分销佣金比例(外部人员)：</span>
        <span v-if="moreCommissionType === 'one'">{{overAll.outPersent}}</span>
        <Input v-if="moreCommissionType === 'two'" v-model="moreOutPersent" style="width: 50px" @on-change="editMoreOutPersent" />
      </div>
      <div class="line">
        <span style="float: left">销售佣金比例(企业员工)：</span>
        <span v-if="moreCommissionType === 'one'">{{overAll.inPersent}}</span>
        <Input v-if="moreCommissionType === 'two'" disabled  v-model="moreInPersent" style="width: 50px" />
      </div>
      <div slot="footer">
        <Button type="success" @click="editMoreCommission">确认修改</Button>
      </div>
    </Modal>
    <!--批量添加分类-->
    <Modal v-model="isShowAdd2Classify" title="批量添加到分类">
      <Cascader :data="storeAdd2Classify"
                @on-change="selectAdd2Classify"
                placeholder="选择商品分类"></Cascader>
      <div slot="footer">
        <Button type="success" @click="add2Classify">确认</Button>
      </div>
    </Modal>
    <!--批量转移分类-->
    <Modal v-model="isShowMove2Classify" title="批量转移分类">
      <Cascader :data="storeMove2Classify"
                @on-change="selectMove2Classify"
                placeholder="选择商品分类"></Cascader>
      <div slot="footer">
        <Button type="success" @click="move2Classify">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import edit from '../components/edit'
import { indexMixin } from '@/mixins'
import Digit from '../../home/components/digit'
import { storeOfferApi, traderSettingApi, storeCategoryApi } from '@/api/ems'
import { StoreCategoryCascader } from '@/components/packages/cascader'

export default {
  mixins: [indexMixin],
  props: {
    offerType: {
      type: String,
      default: '1'
    }
  },
  components: {
    Digit,
    edit,
    StoreCategoryCascader
  },
  data() {
    return {
      params: {
        type: 2,
        offerName: '',
        typeId: []
      },
      table: {
        columns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '商品图片',
          align: 'center',
          key: 'normsPic',
          width: 80,
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.normsPic} width="40px" height="40px" /></div>)
          }
        }, {
          title: '商品名称',
          align: 'center',
          key: 'offerName',
          width: 248
        }, {
          title: '所属分类',
          width: 165,
          render: (h, { row, column, index }) => {
            if (row.typeName.length > 0) {
              return h('span', row.typeName.join(','))
            } else {
              return h('span', '无分类')
            }
          }
        }, {
          title: '商品单价',
          align: 'center',
          key: 'offerPrice',
          width: 100
        }, {
          title: '销量',
          align: 'center',
          key: 'offerSale',
          width: 80
        }, {
          title: '库存',
          align: 'center',
          key: 'offerLeave',
          width: 80
        }, {
          title: '提成方式',
          align: 'center',
          key: 'extractType',
          width: 100,
          value: row => {
            return `${['百分比', '固定提成'][row.extractType]}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '佣金提成',
          align: 'center',
          width: 100,
          value: row => {
            return row.extractType === 0 ? `${row.extractPer}%` : `￥${row.extractValue}`
          },
          render: (h, {row, column, index}) => {
            return h('span', column.value(row))
          }
        }, {
          title: '佣金分配',
          align: 'center',
          width: 125,
          render: (h, { row, column, index }) => {
            let outPersentString
            if (row.outPersent != null && row.outPersent >= 0 && row.isPayOnline !== 0) {
              outPersentString = '分销佣金: ' + row.outPersent + '%'
            } else {
              outPersentString = '分销佣金: ' + this.overAll.outPersent + '%'
            }
            let inPersentString
            if (row.inPersent != null && row.inPersent >= 0 && row.isPayOnline !== 0) {
              inPersentString = '销售佣金: ' + row.inPersent + '%'
            } else {
              inPersentString = '销售佣金: ' + this.overAll.inPersent + '%'
            }
            return h('span', [
              h('a', {
                on: {
                  click: () => {
                    if (row.inPersent != null && row.inPersent >= 0) {
                      this.inPersent = row.inPersent
                      this.outPersent = row.outPersent
                    } else {
                      this.inPersent = this.overAll.inPersent
                      this.outPersent = this.overAll.outPersent
                    }
                    this.offerId = row.id
                    this.editCommissionVisible = true
                  }
                }
              }, outPersentString),
              h('br'),
              h('a', {
                on: {
                  click: () => {
                    if (row.inPersent) {
                      this.inPersent = row.inPersent
                      this.outPersent = row.outPersent
                    } else {
                      this.inPersent = this.overAll.inPersent
                      this.outPersent = this.overAll.outPersent
                    }
                    this.offerId = row.id
                    this.editCommissionVisible = true
                  }
                }
              }, inPersentString)
            ])
          }
        }, {
          title: '修改时间',
          align: 'center',
          key: 'createTime',
          width: 155,
          value: row => {
            return `${this.fmt.date(row.createTime)}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '上架时间',
          align: 'center',
          key: 'onsaleTime',
          width: 155,
          value: row => {
            return row.onsaleTime === null ? `` : `${this.fmt.date(row.onsaleTime)}%`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '操作',
          align: 'center',
          width: 180,
          fixed: 'right',
          render: (h, { row, column, index }) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emitBus('getOfferDetail', row.id)
                    this.editVisible = true
                    this.id = row.id
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p>确认删除该商品？</p>',
                      onOk: () => {
                        storeOfferApi.deleteStore(row.id).then(() => {
                          this.success('删除成功！')
                          this.listAndDetail(this.params.pageNum)
                          this.idList = []
                        })
                      },
                      onCancel: () => { }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }]
      },
      idList: [],
      // 添加编辑
      editVisible: false,
      editCommissionVisible: false,
      isShowMove2Classify: false,
      isShowAdd2Classify: false,
      editMoreCommissionVisible: false,
      id: '',
      overAll: {
        outPersent: 0,
        inPersent: 0
      },
      outPersent: 0,
      inPersent: 0,
      commissionType: 'one',
      offerId: '',
      moveTypeId: [],
      addTypeId: [],
      storeAdd2Classify: [],
      storeMove2Classify: [],
      moreCommissionType: 'one',
      moreOutPersent: 0,
      moreInPersent: 0
    }
  },
  computed: {},
  mounted() {
    this.getDefaultCommission()
  },
  watch: {},
  created() {
    this.$onBus('offerSoldOutListChange', target => {
      this.listAndDetail(0)
    })
    if (this.$route.query.classityId) {
      this.params.typeId.push(this.$route.query.classityId)
    }
    this.getStoreClassify()
  },
  methods: {
    getApi() {
      return storeOfferApi
    },
    // search() {
    //   this.table.selection = []
    //   // 切换筛选条件时，默认获取第一页
    //   this.params.pageNum = 1
    //   this.listAndDetail(0)
    // },
    handlerAdd() {
      this.$emitBus('getOfferDetail', '')
      this.editVisible = true
    },
    refresh() {
      this.id = ''
      this.listAndDetail(0)
    },
    cancel() {
      this.id = ''
    },
    getParams() {
      let params = Object.assign({}, this.params)
      // 及联下拉框的值是数组，需要特别处理
      if (params.typeId && params.typeId.length) {
        params.typeId = params.typeId[params.typeId.length - 1]
      } else {
        params.typeId = ''
      }
      return params
    },
    selectRow(selection) {
      let idList = []
      for (let i = 0; i < selection.length; i++) {
        idList.push(selection[i].id)
      }
      if (idList) {
        this.idList = idList
      } else {
        this.idList = []
      }
    },
    showMove2Classify() {
      this.isShowMove2Classify = true
    },
    showAdd2Classify() {
      this.isShowAdd2Classify = true
    },
    move2Classify() {
      let req = {
        typeId: this.moveTypeId[this.moveTypeId.length - 1],
        ids: this.idList
      }
      storeOfferApi.move2Classify(req).then(() => {
        this.idList = []
        this.listAndDetail(this.params.pageNum)
      })
    },
    add2Classify() {
      let req = {
        typeId: this.addTypeId[this.addTypeId.length - 1],
        ids: this.idList
      }
      storeOfferApi.add2Classify(req).then(() => {
        this.idList = []
        this.listAndDetail(this.params.pageNum)
      })
    },
    getDefaultCommission() {
      traderSettingApi.get().then(data => {
        this.overAll.inPersent = data.inPresent
        this.overAll.outPersent = data.outPresent
      })
    },
    editOutPersent() {
      this.inPersent = 100 - this.outPersent
    },
    editCommission() {
      if (this.commissionType === 'two') {
        if (this.outPersent % 1 === 0) {
          if (this.outPersent > 100 || this.outPersent < 0) {
            this.$Message.error({
              content: '请输入正确的佣金分配比例',
              duration: 10,
              closable: true
            })
            return false
          }
        } else {
          this.$Message.error({
            content: '请输入正确的佣金分配比例',
            duration: 10,
            closable: true
          })
          return false
        }
        storeOfferApi.updateOfferCommission({
          offerId: this.offerId,
          inPersent: this.inPersent,
          outPersent: this.outPersent
        }).then(() => {
          this.editCommissionVisible = false
          this.listAndDetail(this.params.pageNum)
        })
      } else {
        storeOfferApi.updateOfferCommission({
          offerId: this.offerId,
          inPersent: this.overAll.inPersent,
          outPersent: this.overAll.outPersent
        }).then(() => {
          this.editCommissionVisible = false
          this.listAndDetail(this.params.pageNum)
        })
      }
    },
    handlerMoreUnderCarriage() {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认下架这些商品？</p>',
        onOk: () => {
          storeOfferApi.UnderCarriage(this.idList).then(() => {
            this.success('下架成功！')
            this.$emitBus('offerUpListChange', 'offerUpListChange')
            this.$emitBus('offerDownedListChange', 'offerDownedListChange')
            this.listAndDetail(this.params.pageNum)
            this.idList = []
          })
        },
        onCancel: () => { }
      })
    },
    handlerMoreGrounding() {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认上架这些商品？</p>',
        onOk: () => {
          storeOfferApi.HandlerGrounding(this.idList).then(() => {
            this.success('上架成功！')
            this.$emitBus('offerUpListChange', 'offerUpListChange')
            this.$emitBus('offerDownedListChange', 'offerDownedListChange')
            this.listAndDetail(this.params.pageNum)
            this.idList = []
          })
        },
        onCancel: () => { }
      })
    },
    getStoreClassify() {
      storeCategoryApi.list().then(page => {
        function loop(list) {
          if (list && list.length) {
            return list.map(v => {
              v.value = v.id
              v.label = v.typeName
              if (v.lists && v.lists.length) {
                v.children = loop(v.lists)
              } else {
                v.children = []
              }
              return v
            })
          }
          return list
        }

        this.storeAdd2Classify = loop(page)
        this.storeMove2Classify = loop(page)
      })
    },
    selectAdd2Classify(value, selectedData) {
      this.addTypeId = value
    },
    selectMove2Classify(value, selectedData) {
      this.moveTypeId = value
    },
    changeCommission() {
      this.editMoreCommissionVisible = true
    },
    editMoreCommission() {
      if (this.moreCommissionType === 'one') {
        storeOfferApi.updateMoreOfferCommission({
          ids: this.idList,
          inPersent: this.overAll.inPersent,
          outPersent: this.overAll.outPersent
        }).then(() => {
          this.editMoreCommissionVisible = false
          this.idList = []
          this.listAndDetail(this.params.pageNum)
        })
      } else {
        if (this.outPersent % 1 === 0) {
          if (this.outPersent > 100 || this.outPersent < 0) {
            this.$Message.error({
              content: '请输入正确的佣金分配比例',
              duration: 10,
              closable: true
            })
            return false
          }
        } else {
          this.$Message.error({
            content: '请输入正确的佣金分配比例',
            duration: 10,
            closable: true
          })
          return false
        }
        storeOfferApi.updateMoreOfferCommission({
          ids: this.idList,
          inPersent: this.moreInPersent,
          outPersent: this.moreOutPersent
        }).then(() => {
          this.editMoreCommissionVisible = false
          this.idList = []
          this.listAndDetail(this.params.pageNum)
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
