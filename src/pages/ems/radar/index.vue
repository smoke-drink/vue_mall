<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form"
              inline>
          <FormItem>
            <i-input type="text"
                     v-model="params.name"
                     placeholder="请输入名字"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="search">查询</Button>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="refresh">刷新二维码</Button>
          </FormItem>

          <div class="fr">
            <FormItem>
              共{{this.cards.total}}张名片 已用{{this.cards.used}}张
            </FormItem>
            <FormItem>
              <Button type="primary"
                      @click="addCard">申请扩容</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <Table :columns="table.columns"
               :data="table.list"
               ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </div>

      <Modal v-model="modal"
             title="申请扩容">
        请联系客户经理
      </Modal>
      <Modal v-model="modalCode"
             title="名片二维码"
             :footerHide="true">
        <div>
          <img :src='softImgUrl'
               width="500px"
               height="500px" />
        </div>
      </Modal>
      <Modal v-model="bossFlag" title="选择部门">
        选择部门:
        <Tree :data="personTreeData"
              show-checkbox
              multiple
              ref="departmentTree"></Tree>
        <div slot="footer">
          <Button type="success" @click="saveSelectPerson">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import Digit from '../home/components/digit'
import { radarApi } from '@/api/ems'
export default {
  mixins: [indexMixin],
  components: {
    Digit
  },
  data() {
    return {
      bossFlag: false,
      personTreeData: [],
      staffId: '',
      params: {
        pageNum: 1,
        pageSize: 10,
        name: ''
      },
      modal: false,
      modalCode: false,
      softImgUrl: '',
      cards: {
        total: '',
        used: ''
      },
      table: {
        columns: [{
          title: '头像',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.headIcon} width="60px" height="60px"/></div>)
          }
        }, {
          title: '姓名',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.name))
          }
        }, {
          title: '岗位',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.station))
          }
        }, {
          title: '手机号',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.phone))
          }
        }, {
          title: '部门',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('span', (row.departmentName))
          }
        }, {
          title: '销售雷达',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.openAi === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  if (row.openAi === 1) {
                    row.openAi = 0
                  } else {
                    row.openAi = 1
                  }
                  radarApi.update({
                    id: row.id,
                    openAi: row.openAi
                  }).then(data => {
                    radarApi.info().then((data) => {
                      this.cards = data
                    })
                    this.listAndDetail(this.params.pageNum)
                  })
                }
              }
            })
          }
        }, {
          title: '老板雷达',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.openBoss === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  // this.getAllPersonTreeData({
                  //   id: row.id
                  // })
                  if (row.openBoss === 1) {
                    row.openBoss = 0
                  } else {
                    row.openBoss = 1
                    // this.bossFlag = true
                  }
                  radarApi.update({
                    id: row.id,
                    openBoss: row.openBoss
                  }).then(data => {
                    radarApi.info().then((data) => {
                      this.cards = data
                    })
                    this.listAndDetail(this.params.pageNum)
                  })
                }
              }
            })
          }
        }, {
          title: '雷达权限',
          align: 'center',
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
                    this.getAllPersonTreeData({
                      id: row.id
                    })
                    this.bossFlag = true
                  }
                }
              }, '权限设置')
            ])
          }
        }, {
          title: '设置为默认名片',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.defaultVisitingCard === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  if (row.defaultVisitingCard === 1) {
                    row.defaultVisitingCard = 0
                  } else {
                    row.defaultVisitingCard = 1
                  }
                  radarApi.updateCardStatus({
                    id: row.id,
                    defaultVisitingCard: row.defaultVisitingCard
                  }).then((data) => {
                    this.listAndDetail(this.params.pageNum)
                  })
                }
              }
            })
          }
        }, {
          title: '是否允许发布动态',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.dynamicState === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  if (row.dynamicState === 1) {
                    row.dynamicState = 0
                  } else {
                    row.dynamicState = 1
                    this.value = true
                  }
                  radarApi.updateCardStatus({
                    id: row.id,
                    dynamicState: row.dynamicState
                  })
                }
              }
            })
          }
        }, {
          title: '名片',
          align: 'center',
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
                    this.modalCode = true
                    this.softImgUrl = row.softImgUrl
                  }
                }
              }, '名片二维码')
            ])
          }
        }]
      }
    }
  },
  methods: {
    getApi() {
      return radarApi
    },
    addCard() {
      this.modal = true
    },
    refresh() {
      radarApi.refresh().then(() => {
        this.listAndDetail(0)
      })
    },
    getAllPersonTreeData(id) {
      if (id) {
        this.staffId = id.id
      }
      radarApi.allPersonTree(id.id).then(data => {
        this.personTreeData = data
      })
    },
    saveSelectPerson() {
      let bossRadarRela = []
      // console.log(this.$refs.departmentTree.getCheckedNodes())
      for (let i = 0; i < this.$refs.departmentTree.getCheckedNodes().length; i++) {
        let deptId = this.$refs.departmentTree.getCheckedNodes()[i].id
        bossRadarRela.push({dept_id: deptId, staff_id: this.staffId})
      }
      this.bossFlag = false
      radarApi.saveDepartmentTree({
        staff_id: this.staffId,
        bossRadarRela: bossRadarRela
      })
    }
  },
  created: function () {
    radarApi.info().then((data) => {
      this.cards = data
    })
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
