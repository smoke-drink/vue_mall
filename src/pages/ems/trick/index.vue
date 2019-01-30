<template>
  <div>
    <Row>
      <i-col :xs="1" :sm="3" :md="4" :lg="6">
        <Card class="left_box" dis-hover>
          <p slot="title">
            {{typeName}}
          </p>
          <div slot="extra">
            <Button v-if="!editTrickGroupSort" size="small" @click="addNewTrickGroup" type="text" ghost>
              <h3>+</h3>
            </Button>
            <Button v-if="!editTrickGroupSort" type="text" @click="changeTrickGroupSort" ghost size="small">
              <Icon type="arrow-swap"></Icon>
            </Button>
            <Button v-if="editTrickGroupSort" type="success" @click="changeTrickGroupSort" ghost size="small">
              保存
            </Button>
          </div>
          <ul>
            <li v-for="(item,index) in trickGroupList" :key="index" :name="index">
              <div v-if="!item.status && !editTrickGroupSort" @click="changeTrickGroup(item.id)">
                <span>{{item.typeName}}</span>
                <div class="right_ctl">
                  <span>
                    <Button @click="showChange(item)" type="text" ghost>
                      <Icon type="edit" size="16"></Icon>
                    </Button>
                    <Button @click="deleteTrickGroup(item)" type="text" ghost>
                      <Icon type="ios-trash-outline" size="16"></Icon>
                    </Button>
                  </span>
                </div>
              </div>
              <div v-if="!item.status && editTrickGroupSort" @click="changeTrickGroup(item.id)">
                <span>{{item.typeName}}</span>
                <div class="right_ctl">
                  <span>
                    <Button v-if="index !== 0 && index !== trickGroupList.length-1" type="text" ghost @click.stop="upSort(index)">
                      <Icon type="ios-arrow-thin-up" size="16"></Icon>
                    </Button>
                    <Button v-if="index !== 0 && index === trickGroupList.length-1" type="text" ghost style="margin-right: 41px" @click.stop="upSort(index)">
                      <Icon type="ios-arrow-thin-up" size="16"></Icon>
                    </Button>
                    <Button v-if="index !== trickGroupList.length-1" type="text" ghost @click.stop="downSort(index)">
                      <Icon type="ios-arrow-thin-down" size="16"></Icon>
                    </Button>
                  </span>
                </div>
              </div>
                <Input v-if="item.status" v-model="newGroupName" placeholder="请输入名称" style="width: 180px"/>
                <Button @click="saveAddTrickGroup(index)" type="text" ghost v-if="item.status">
                  <Icon type="ios-checkmark" />
                </Button>
                <Button @click="cancelAddTrickGroup(index)" type="text" ghost v-if="item.status">
                  <Icon type="close"></Icon>
                </Button>
            </li>
          </ul>
        </Card>
      </i-col>
      <i-col :xs="3" :sm="9" :md="12" :lg="18">
        <Button type="success" @click="addNewTrick">添加话术</Button>
        <Table :columns="table.columns"
               :data="table.list"
               ref="table"
               class="table"/>

        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </i-col>
    </Row>
    <Modal v-model="editTrickGroup" title="修改">
      请输入名称
      <i-input v-model="editTrickGroupDetail.typeName" style="width:120px" type="text"></i-input>
      <div slot="footer">
        <Button type="success"
                @click="saveEdit">确定</Button>
        <Button type="default"
                @click="cancelEdit">取消</Button>
      </div>
    </Modal>
    <!-- 查看详情 -->
    <vma-panel v-model="editTrickDetail"
               title="修改话术"
               :showClose="false">
      <Form ref="form"
            :model="trickDetail"
            :label-width="120">
        <FormItem label="话术内容"
                  prop="content">
          <Input type="textarea" v-model="trickDetail.content" style="width: 300px"/>
        </FormItem>
        <FormItem label="关键词">
          <Tag v-for="(item, index) in keyWords" :key="item" closable @on-close="closeKeyword(index)">{{ item }}</Tag>
          <Input v-if="addKeywordsStatus" v-model="newKeywords" style="width: 150px" @on-blur="saveKeywords" />
          <Button type="success" @click="addKeywords">添加</Button>
        </FormItem>
        <FormItem label="所在分组">
          <Select v-model="trickDetail.typeId" style="width:200px">
            <Option v-for="item in trickGroupList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="success"
                  @click="saveEditTrick">确定</Button>
          <Button type="default"
                  @click="cancelEditTrick">取消并返回</Button>
        </FormItem>
      </Form>
    </vma-panel>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { personApi } from '@/api/ems'

export default {
  mixins: [indexMixin],
  components: {
  },
  data() {
    return {
      params: {
        id: ''
      },
      table: {
        columns: [ {
          title: '话术内容',
          align: 'center',
          key: 'content'
        }, {
          title: '关键词',
          render: (h, { row, column, index }) => {
            if (row.keywords.length > 0) {
              return h('span', row.keywords.join(','))
            } else {
              return h('span', '')
            }
          }
        }, {
          title: '操作',
          align: 'center',
          width: 180,
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
                    this.editTrickDetail = true
                    personApi.getTrickDetail(row.id).then(data => {
                      this.trickDetail = data
                      this.keyWords = data.keywords
                      this.trickDetail.typeId = this.params.id
                    })
                  }
                }
              }, '修改'),
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
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p>确定删除该话术?</p>',
                      onOk: () => {
                        personApi.deleteTrickDetail(row.id).then(() => {
                          this.success('删除成功！')
                          this.listAndDetail(this.params.pageNum)
                        })
                      },
                      onCancel: () => {
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }]
      },
      trickGroupList: [],
      typeName: '',
      editTrickGroup: false,
      editTrickGroupDetail: {},
      editTrickDetail: false,
      trickDetail: {},
      addKeywordsStatus: false,
      newKeywords: '',
      newGroupName: '',
      editTrickGroupSort: false,
      keyWords: []
    }
  },
  created() {
    personApi.trickGroup().then(data => {
      this.trickGroupList = data
      this.typeName = this.trickGroupList[0].typeName
      this.params.id = this.trickGroupList[0].id
      this.listAndDetail(0)
    })
  },
  methods: {
    getApi() {
      return personApi
    },
    showChange(item) {
      this.editTrickGroup = true
      this.editTrickGroupDetail.id = item.id
      this.editTrickGroupDetail.typeName = item.typeName
    },
    saveEdit() {
      personApi.editTrickGroup(this.editTrickGroupDetail).then(() => {
        personApi.trickGroup().then(data => {
          this.trickGroupList = data
          this.typeName = this.trickGroupList[0].typeName
        })
        this.cancelEdit()
      })
    },
    cancelEdit() {
      this.editTrickGroup = false
    },
    changeTrickGroup(id) {
      this.params.id = id
      this.listAndDetail(0)
    },
    saveEditTrick() {
      if (this.trickDetail.content == null || this.trickDetail.typeId == null || this.keyWords === []) {
        this.$Message.error({
          content: '请输入完整信息',
          duration: 10,
          closable: true
        })
        return
      }
      this.trickDetail.keywords = this.keyWords
      if (this.trickDetail.id) {
        personApi.editTrick(this.trickDetail).then(() => {
          this.cancelEditTrick()
          this.listAndDetail(0)
        })
      } else {
        personApi.addTrick(this.trickDetail).then(() => {
          this.cancelEditTrick()
          this.listAndDetail(0)
        })
      }
    },
    cancelEditTrick() {
      this.trickDetail = {}
      this.keyWords = []
      this.editTrickDetail = false
    },
    closeKeyword(index) {
      this.keyWords.splice(index, 1)
    },
    addKeywords() {
      this.addKeywordsStatus = true
    },
    saveKeywords() {
      if (this.newKeywords !== '') {
        this.keyWords.push(this.newKeywords)
      }
      this.newKeywords = ''
      this.addKeywordsStatus = false
    },
    addNewTrick() {
      this.editTrickDetail = true
    },
    deleteTrickGroup(item) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除 ' + item.typeName + '?</p>',
        onOk: () => {
          personApi.deleteTrickGroup(item.id).then(() => {
            this.success('删除成功！')
            personApi.trickGroup().then(data => {
              this.trickGroupList = data
              this.typeName = this.trickGroupList[0].typeName
            })
          })
        },
        onCancel: () => {
        }
      })
    },
    addNewTrickGroup() {
      this.trickGroupList.push({status: true, id: '123'})
    },
    saveAddTrickGroup(index) {
      if (this.newGroupName === '') {
        this.$Message.error({
          content: '请输入话术分组名称',
          duration: 10,
          closable: true
        })
        return false
      }
      this.trickGroupList[index].status = false
      this.trickGroupList[index].typeName = this.newGroupName
      personApi.addTrickGroup(this.trickGroupList[index]).then(() => {
        this.newGroupName = ''
        personApi.trickGroup().then(data => {
          this.trickGroupList = data
          this.typeName = this.trickGroupList[0].typeName
          this.params.id = this.trickGroupList[0].id
        })
      })
    },
    cancelAddTrickGroup(index) {
      this.trickGroupList.splice(index, 1)
      this.newGroupName = ''
    },
    changeTrickGroupSort() {
      if (this.editTrickGroupSort) {
        let ids = []
        for (let i = 0; i < this.trickGroupList.length; i++) {
          ids.push(this.trickGroupList[i].id)
        }
        personApi.editTrickGroupOrder(ids).then(() => {
          this.editTrickGroupSort = false
        })
      } else {
        this.editTrickGroupSort = true
      }
    },
    upSort(index) {
      let inUp = this.trickGroupList[index - 1]
      this.trickGroupList.splice(index - 1, 1, this.trickGroupList[index])
      this.trickGroupList.splice(index, 1, inUp)
    },
    downSort(index) {
      let inDown = this.trickGroupList[index + 1]
      this.trickGroupList.splice(index + 1, 1, this.trickGroupList[index])
      this.trickGroupList.splice(index, 1, inDown)
    }
  }
}
</script>

<style scoped lang='scss'>
  .right_ctl {
    color: #b1b1b1;
    float: right;
    margin-right: 6px;
    margin-top: 2px;
  }
  .left_box ul li{
    color: #555;
    padding: 20px 6px 20px 24px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  .table table{
    width: 100% !important;
  }
</style>
