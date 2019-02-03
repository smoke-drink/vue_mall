<template>
  <div>
    <Table :columns="columns" :data="data"></Table>
    <div class="add-modal-container">
      <Button type="primary" @click="vipLevelModal.show = true">新增会员登记</Button>
      <Modal
        v-model="vipLevelModal.show"
        title="添加登记"
        width="400"
      >
        <Form class="add-level" v-if="vipLevelModal.show" ref="addLevel" :model="addLevel" :rules="addLevelRules" :label-width="80">
          <FormItem label="等级名称" prop="levelName">
            <Input v-model="addLevel.levelName" clearable/>
          </FormItem>
          <FormItem label="积分要求" prop="startPoints">
            <Row>
              <i-col span="10" >
                <Input v-model.trim="addLevel.startPoints"    clearable style="width:100%"/>
              </i-col>
              <i-col span="4" style="text-align:center;">到</i-col>
              <i-col span="10">
                <Input v-model.trim="addLevel.endPoints"  clearable style="width:100%"/>
              </i-col>
            </Row>
          </FormItem>
          <FormItem label="购物折扣" prop="levelDiscount">
            <Row>
              <i-col span="23">
                <Input v-model.trim="addLevel.levelDiscount"  clearable style="width:99%"/>
              </i-col>
              <i-col span="1">
                折
              </i-col>
            </Row>
          </FormItem>
        </Form>
        <div slot="footer" class="modal-footer">
          <Button type="text" size="large" @click="vipLevelModal.show=false">取消</Button>
          <Button type="primary" size="large" @click="createVipLevel()">保存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '会员等级名称',
          key: 'levelName'
        },
        {
          title: '积分要求',
          key: 'startPoints'
        },
        {
          title: '折扣',
          key: 'levelDiscount'
        }
      ],
      data: [],
      vipLevelModal: {
        show: false
      },
      addLevel: {
        levelName: '',
        startPoints: '',
        endPoints: '',
        levelDiscount: ''
      },
      addLevelRules: {
        levelName: [
          {required: true, message: '请填写商品名称', trigger: 'blur'}
        ],
        startPoints: [
          {required: true, message: '请填写积分范围', trigger: 'blur'},
          {
            type: 'number',
            message: '请输入整数',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }
          }
        ],
        endPoints: [
          {required: true, message: '请填写积分范围', trigger: 'blur'},
          {
            type: 'number',
            message: '请输入整数',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }
          }
        ],
        levelDiscount: [
          {required: true, message: '请填写折扣', trigger: 'blur'},
          {
            type: 'number',
            message: '请输入整数',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }
          }
        ]
      }
    }
  },
  methods: {
    createVipLevel(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let level = this.addLevel
          let column = Object.assign({}, level)
          this.data.push(column)
          this.$emit('on-add', column)
          this.$refs[name].resetFields()
          this.vipLevelModal.show = false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .add-modal-container {
    margin-top: 1rem;
  }
  .modal-footer {
    text-align: center;
  }
</style>
