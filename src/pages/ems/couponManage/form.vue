<template>
  <div>
    <div class="block">
      <div class="block-header">活动设置</div>
      <div class="block-body">
        <Form :label-width="120" :model="entity" :rules="rules" ref="form">
          <Row>
            <i-col :xs="24" :sm="24" :md="10">
              <FormItem label="优惠券类型">
                <RadioGroup v-model="entity.coupon_type">
                  <Radio label="1"><span>满减券</span></Radio>
                  <Radio label="2"><span>折扣券</span></Radio>
                  <Radio label="3"><span>抵现券</span></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="优惠券名称" prop="coupon_name">
                <i-input v-model="entity.coupon_name" placeholder="请输入优惠券名称"></i-input>
              </FormItem>
              <template v-if="entity.coupon_type==='1'">
                <FormItem label="优惠金额" prop="discount_amount">
                  <Row>
                    <i-col span="22"><i-input v-model="entity.discount_amount" placeholder="请输入优惠金额"></i-input></i-col>
                    <i-col span="1" offset="1">元</i-col>
                  </Row>
                </FormItem>
              </template>
              <template v-if="entity.coupon_type==='2'">
                <FormItem label="折扣力度" prop="coupon_level">
                  <Row>
                    <i-col span="22"><i-input v-model="entity.coupon_level" placeholder="请输入折扣力度"></i-input></i-col>
                    <i-col span="1" offset="1">折</i-col>
                  </Row>
                </FormItem>
              </template>
              <template v-if="entity.coupon_type==='3'">
                <FormItem label="抵现金额" prop="coupon_cash_amount">
                  <Row>
                    <i-col span="22"><i-input v-model="entity.coupon_cash_amount" placeholder="请输入抵现金额"></i-input></i-col>
                    <i-col span="1" offset="1">元</i-col>
                  </Row>
                </FormItem>
              </template>
              <FormItem label="最低使用金额" prop="use_money_limit">
                <Row>
                  <i-col span="22"><i-input v-model="entity.use_money_limit" placeholder="请输入最低使用金额"></i-input></i-col>
                  <i-col span="1" offset="1">元</i-col>
                </Row>
              </FormItem>
              <FormItem label="领取后有效期" prop="coupon_use_time">
                <Row>
                  <i-col span="22"><i-input v-model="entity.coupon_use_time" placeholder="请输入领取后有效期"></i-input></i-col>
                  <i-col span="1" offset="1">天</i-col>
                </Row>
              </FormItem>
              <FormItem label="使用时间" prop="coupon_use_start">
                <DatePicker type="datetimerange"
                  v-model="dateRange"
                  placeholder="请选择开始结束时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  :disabled="disabled"
                  :options="pickerOptions"  class="w-100"/>
              </FormItem>
              <FormItem label="可分配员工">
                <RadioGroup v-model="entity.staff_all">
                  <Radio label="1"><span>全体员工</span></Radio>
                  <Radio label="0" @click="getPersonTree"><span>指定员工</span></Radio>
                </RadioGroup>
                <p v-if="entity.staff_all==='0' && entity.staff_id.length > 0">已选择指定员工（{{entity.staff_id.length}}人)</p>
              </FormItem>
              <FormItem label="可用商品">
                <RadioGroup v-model="entity.offer_all">
                  <Radio label="1"><span>无限制</span></Radio>
                  <Radio label="0"><span>指定商品</span></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="优惠券总量" prop="coupon_count">
                <Row>
                  <i-col span="22"><i-input v-model="entity.coupon_count" placeholder="请输入优惠券总量"></i-input></i-col>
                  <i-col span="1" offset="1">张</i-col>
                </Row>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="end" class="mb-25">
            <i-col span="3">
              <Button type="ghost"  @click="onCancel" class="w-100">取消</Button>
            </i-col>
            <i-col span="3" offset="1">
              <Button type="primary" @click="onSubmit"  class="w-100">确定</Button>
            </i-col>
          </Row>
        </Form>
      </div>
    </div>
    <!-- 选择员工 -->
    <Modal v-model="editStoreStaffVisible" title="选择员工">
      选择员工:
      <Tree :data="personTreeData"
            ref="personTree"
            show-checkbox
            multiple></Tree>
      <div slot="footer">
        <Button type="success"
                @click="saveSelectPerson">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
// import { numberValidator, integerValidator } from '@/assets/js/asyncValidator/validators'
import { watchDateRangeToTimestamp } from '@/utils'

import {couponManageApi, storeOfferApi, personApi} from '@/api/ems'
import StoreOffer from './components/form/storeOffer'

export default {
  mixins: [indexMixin],
  components: {
    StoreOffer
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          let now = new Date()
          now.setDate(now.getDate() - 1)
          return time < now.getTime()
        }
      },
      treeData: [], // 选择员工数据
      personTreeData: [],
      typeExample: [],
      staffNum: 0,
      dateRange: [],
      editStoreStaffVisible: false,
      entity: {
        coupon_type: '1',
        coupon_name: '',
        discount_amount: '',
        coupon_level: '',
        coupon_cash_amount: '',
        use_money_limit: '',
        coupon_use_time: '',
        coupon_use_start: '',
        coupon_use_end: '',
        coupon_count: '',
        staff_id: [],
        offer_id: [],
        staff_all: '1',
        offer_all: '1'
      },
      rules: {
        coupon_name: [
          {required: true, message: '请输入优惠券名称'}
        ]
      }
    }
  },
  watch: {
    'entity.staff_all': function(val) {
      if (val && val === '0') {
        this.editStoreStaffVisible = true
      } else {
        this.editStoreStaffVisible = false
      }
    }
  },
  computed: {
    // 编辑时不允许编辑基本信息
    disabled() {
      return false
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(() => this.entity, 'coupon_use_start', 'coupon_use_end'))
    // 获取员工
    this.getAllPersonTreeData()
    this.$onBus('getOfferDetail', target => {
      alert(target)
      if (target != null && target !== '') {
        this.getPersonTreeData(target)
      } else {
        this.getAllPersonTreeData()
      }
    })
    this.getStaffNum()
  },
  methods: {
    getApi() {
      return couponManageApi
    },
    changeNorms(data) {
      this.entity = Object.assign({}, this.entity, {
        offer_spec_id: data.id
      })
    },
    getPersonTree() {
      this.editStoreStaffVisible = true
    },
    getPersonTreeData(id) {
      personApi.personTree(id).then(data => {
        this.personTreeData = data
      })
    },
    getAllPersonTreeData() {
      personApi.allPersonTree().then(data => {
        console.log(JSON.stringify(data))
        this.personTreeData = data
      })
    },
    getStaffNum() {
      storeOfferApi.classifyTree().then(data => { // 获取树的数据
        this.treeData = data
        if (data && typeof data !== 'undefined') {
          for (let i = 0; i < data.length; i++) {
            this.typeExample.push({id: data[i].id, title: data[i].title})
            if (data[0].children) {
              for (let j = 0; j < data[i].children.length; j++) {
                this.typeExample.push({id: data[i].children[j].id, title: data[i].children[j].title})
              }
            }
          }
        }
      })
      personApi.staffNum().then(data => {
        this.staffNum = data
      })
    },
    saveSelectPerson() {
      this.entity.staff_id = []
      for (let i = 0; i < this.$refs.personTree.getCheckedNodes().length; i++) {
        this.entity.staff_id.push(this.$refs.personTree.getCheckedNodes()[i].id)
      }
      this.editStoreStaffVisible = false
    },
    onSubmit() {
      console.log(JSON.stringify(this.entity))
      couponManageApi.couponAdd(this.entity).then(data => {

      })
    },
    onCancel() {
      this.$refs.form.resetFields()
      this.listAndDetail(0)
    }
  }
}
</script>
