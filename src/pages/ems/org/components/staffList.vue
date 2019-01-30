<template>
  <div>
    <Table :columns="table.columns"
           :data="table.list"
           ref="table" />
    <Button class="org-add-staff"
            type="primary"
            icon="plus"
            @click="show_add_modal">添加员工</Button>
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />
    <Modal v-model="show_detail_modal"
           title="编辑"
           @on-ok="saveStaffInfo">
      <Form :model="staffInfo"
            :label-width="140"
            :rules="rules">
        <FormItem label="员工姓名">
          <i-input type="text"
                   v-model="staffInfo.name"
                   placeholder="员工姓名"></i-input>
        </FormItem>
        <FormItem label="员工岗位">
          <i-input type="text"
                   v-model="staffInfo.station"
                   placeholder="员工岗位"></i-input>
        </FormItem>
        <FormItem label="所属部门">
          <h3 type="text">{{staffInfo.departmentName}}</h3>
          <Button type="primary"
                  @click="showdepttree">选择部门</Button>
        </FormItem>
        <FormItem label="绑定微信手机号">
          <i-input type="text"
                   v-model="staffInfo.wxPhone"
                   readonly
                   placeholder="微信绑定的号码,添加后不可修改！"></i-input>
        </FormItem>
        <FormItem label="名片展示号码"
                  prop="phone">
          <i-input type="text"
                   v-model="staffInfo.phone"
                   placeholder="名片展示号码"></i-input>
        </FormItem>
        <FormItem label="头像">
          <vma-image-upload v-model="staffInfo.headIcon"></vma-image-upload>
        </FormItem>
        <FormItem label="商品"
                  class="mt-25">
          <Button type="success"
                  @click="getOfferTree">编辑</Button>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="addModal"
           title="添加员工"
           @on-ok="addStaff">
      <Form :model="addStaffParam"
            :label-width="140"
            :rules="rules">
        <FormItem label="员工姓名">
          <i-input type="text"
                   v-model="addStaffParam.name"
                   placeholder="员工姓名"></i-input>
        </FormItem>
        <FormItem label="员工岗位">
          <i-input type="text"
                   v-model="addStaffParam.station"
                   placeholder="员工岗位"></i-input>
        </FormItem>
        <FormItem label="所属部门">
          <h3 type="text">{{addStaffParam.department_name}}</h3>
          <Button type="primary"
                  @click="showdepttree">选择部门</Button>
        </FormItem>
        <FormItem label="商品"
                  class="mt-25">
          <Button type="success"
                  @click="getOfferTree">编辑</Button>
        </FormItem>
        <FormItem label="绑定微信手机号"
                  prop="wxPhone">
          <i-input type="text"
                   v-model="addStaffParam.wxPhone"
                   placeholder="微信绑定的号码,添加后不可修改！"></i-input>
        </FormItem>
        <FormItem label="名片展示号码"
                  prop="phone">
          <i-input type="text"
                   v-model="addStaffParam.phone"
                   placeholder="名片展示号码"></i-input>
        </FormItem>
        <FormItem label="头像">
          <vma-image-upload v-model="addStaffParam.headIcon"></vma-image-upload>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="show_tree"
           title="选择部门"
           @on-ok="changeDept">
      <Tree :data="deptTree"
            ref="tree"
            v-on:on-select-change="check"></Tree>
    </Modal>
    <Modal v-model="show_del_modal"
           title="删除"
           @on-ok="delStaffdelStaff">
      确定删除员工?
    </Modal>
    <Modal v-model="editStoreOfferVisible"
           title="选择商品">
      选择商品:
      <Tree :data="offerTreeData"
            ref="offerTree"
            show-checkbox
            multiple></Tree>
      <div slot="footer">
        <Button type="success"
                @click="saveSelectOffer">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { orgApi, storeOfferApi } from '@/api/ems'
import {mobileOrTelphoneValidator} from '@/assets/js/asyncValidator/validators'
export default {
  mixins: [indexMixin],
  data() {
    return {
      params: {
        department_id: '' // 查询员工列表的参数 部门id
      },
      dept: {}, // 部门信息
      staffInfo: {}, // 用户信息 /编辑用户信息的参数
      delStaffParam: {}, // 删除员工 参数
      addStaffParam: {}, // 添加员工参数
      table: {
        columns: [{
          title: '头像',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.headIcon} width="60px" height="60px" /></div>)
          }
        }, {
          title: '名字',
          align: 'center',
          key: 'name'
        }, {
          title: '岗位',
          align: 'center',
          key: 'station'
        }, {
          title: '手机号',
          align: 'center',
          key: 'phone'
        }, {
          title: '部门',
          align: 'center',
          key: 'departmentName'
        }, {
          title: '操作',
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
                  click: () => { // 点击修改触发
                    this.getStaffInfo(row.id)
                    orgApi.tree().then(data => { // 获取树的数据
                      this.deptTree = data
                    })
                    orgApi.offerTree(row.id).then(data => {
                      this.offerTreeData = data
                    })
                    // alert(row.id)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => { // 点击删除触发
                    this.delStaffParam = {
                      id: row.id,
                      wx_id: row.wxId
                    }
                    this.show_del_modal = true
                  }
                }
              }, '删除')
            ])
          }
        }]
      },
      show_detail_modal: false,
      show_tree: false,
      show_del_modal: false,
      addModal: false,
      deptTree: [],
      editStoreOfferVisible: false,
      offerTreeData: [],
      offerNum: 0,
      rules: {
        wxPhone: [
          { required: true, message: '请输入联系号码' },
          { validator: mobileOrTelphoneValidator }
        ],
        phone: [
          { required: true, message: '请输入联系号码' },
          { validator: mobileOrTelphoneValidator }
        ]
      }
    }
  },
  created() {
    this.$onBus('stafflist', target => { // 监听数据
      this.params.department_id = target
      this.search()
    })
    this.getOfferNum()
  },
  methods: {
    getApi() {
      return orgApi
    },
    /**
       * 获取用户数据
       */
    getStaffInfo(id) {
      orgApi.staffInfo(id).then(data => { // 绑定用户信息
        this.staffInfo = data
        this.show_detail_modal = true
      })
    },
    /**
       * 删除员工
       */
    delStaffdelStaff() {
      orgApi.delStaffInfo(this.delStaffParam).then(data => {
        this.search()
      })
    },
    /**
       * 获取列表数据
       */
    // search() {
    //   this.table.selection = []
    //   this.params.pageNum = 1
    //   this.listAndDetail(0)
    // },
    /**
       * 保存用户
       */
    saveStaffInfo() {
      const offerList = []
      for (let i = 0; i < this.$refs.offerTree.getCheckedNodes().length; i++) {
        offerList.push(this.$refs.offerTree.getCheckedNodes()[i].id)
      }
      this.staffInfo.offerList = offerList
      orgApi.updateStaffInfo(this.staffInfo).then(data => {
        this.staffInfo = {}
        this.search()
      })
    },
    /**
     * 增加用户
     */
    addStaff() {
      const offerList = []
      for (let i = 0; i < this.$refs.offerTree.getCheckedNodes().length; i++) {
        offerList.push(this.$refs.offerTree.getCheckedNodes()[i].id)
      }
      this.addStaffParam.offerList = offerList
      orgApi.addStaffInfo(this.addStaffParam).then(data => {
        this.addStaffParam = {}
        this.search()
      })
    },
    /**
       * 编辑窗口 弹出部门tree
       */
    showdepttree() {
      this.show_tree = true
    },
    /**
       * 选中部门
       * @param node
       */
    check(node) {
      this.dept.id = node[0].id
      this.dept.name = node[0].title
    },
    /**
       * 确认选择部门
       */
    changeDept() {
      this.staffInfo.departmentName = this.dept.name
      this.staffInfo.departmentId = this.dept.id
      this.addStaffParam.department_name = this.dept.name
      this.addStaffParam.department_id = this.dept.id
    },
    /**
       * 弹出添加用户窗口
       */
    show_add_modal() {
      orgApi.allOfferTree().then(data => {
        this.offerTreeData = data
      })
      this.addModal = true
      orgApi.tree().then(data => { // 获取树的数据
        this.deptTree = data
      })
    },
    saveSelectOffer() {
      this.editStoreOfferVisible = false
    },
    getOfferNum() {
      storeOfferApi.offerNum().then(data => {
        this.offerNum = data
      })
    },
    getOfferTree() {
      this.editStoreOfferVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.org-add-staff {
  position: absolute;
  right: 40px;
  top: 40px;
}
</style>
