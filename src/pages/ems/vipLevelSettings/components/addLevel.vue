<template>
  <div>
    <Table :columns="columns1" :data="data1"></Table>
    <div class="add-modal-container">
      <Button type="primary" @click="vipLevelModal.show = true">新增会员登记</Button>
      <Modal
        class="add-modal"
        v-model="vipLevelModal.show"
        :loading="vipLevelModal.loading"
        title="添加登记"
        ok-text="提交"
        cancel-text="取消"
        @on-ok="createVipLevel('addLevel')"
      >
        <Form class="add-level" ref="addLevel" :model="addLevel" :rules="addLevelRules" :label-width="80">
          <FormItem label="等级名称">
            <Input :model="addLevel.levelName" clearable/>
          </FormItem>
          <FormItem label="积分要求">
            <Row>
              <i-col span="10" >
                <InputNumber type="text" :min="0" :formatter="value => `${value}`.includes('.') ? parseInt(`${value}`.split('.')[0]) : value" v-model="addLevel.startPoints"  clearable/>
              </i-col>
              <i-col span="4" style="text-align:center;">到</i-col>
              <i-col span="10">
                <InputNumber type="text" :min="0" :formatter="value => `${value}`.includes('.') ? parseInt(`${value}`.split('.')[0]) : value" :model="addLevel.endPoints" clearable/>
              </i-col>
            </Row>
          </FormItem>
          <FormItem label="购物折扣">
            <InputNumber :model="addLevel.levelDiscount" :formatter="value => `${value}`.includes('.') ? parseInt(`${value}`.split('.')[0]) : value" :max="100" clearable/>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: '会员等级名称',
          key: 'name'
        },
        {
          title: '积分要求',
          key: 'points'
        },
        {
          title: '折扣',
          key: 'discount'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          points: 300,
          discount: '95折'
        }
      ],
      vipLevelModal: {
        show: false,
        loading: false
      },
      addLevel: {
        levelName: '',
        startPoints: 0,
        endPoints: 0,
        levelDiscount: 0
      },
      addLevelRules: {}
    }
  },
  methods: {
    createVipLevel(name) {
      console.log(this.addLevel)
      // TODO: 发送异步请求
      // this.$refs[name].validate((valid) => {
      //   console.log(valid)
      // })
    }
  }
}
</script>
<style  scoped lang="scss">
  .add-modal-container {
    margin-top: 1rem;
  }

</style>
