<template>
  <div>
     <div class="block">
      <div class="block-header">活动设置</div>
      <div class="block-body">
        <Form :label-width="120" :model="entity" :rules="rules" ref="form">
          <Row>
            <i-col :xs="24" :sm="24" :md="10">
              <FormItem label="折扣名称" prop="activity_name">
                <i-input v-model="entity.activity_name" placeholder="请输入折扣名称"></i-input>
              </FormItem>
              <FormItem label="自定义商品折扣">
                <Row>
                  <i-col span="22"><i-input v-model="entity.seckill_sales_volume" placeholder="请输入自定义商品折扣"></i-input></i-col>
                  <i-col span="1" offset="1">折</i-col>
                </Row>
              </FormItem>
              <FormItem label="每人限购">
                <RadioGroup v-model="entity.seckill_astrict">
                  <Radio label="0"><span>全部商品</span></Radio>
                  <Radio label="1"><span>自定义</span></Radio>
                </RadioGroup>
                <i-input v-model="entity.seckill_astrict_num" placeholder="请输入限购数量" v-if="entity.seckill_astrict==='1'"></i-input>
              </FormItem>
              <FormItem label="生效开始结束时间" prop="seckill_start">
                <DatePicker type="datetimerange"
                  v-model="dateRange"
                  placeholder="请选择生效开始结束时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  :disabled="disabled"
                  :options="pickerOptions"  class="w-100"/>
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
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { numberValidator, integerValidator } from '@/assets/js/asyncValidator/validators'
import { watchDateRangeToTimestamp } from '@/utils'

import { spikeMangeApi } from '@/api/ems'
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
      dateRange: [],
      entity: {
        serviceInfos: [{ title: '', desc: '' }],
        offer_spec_id: '',
        activity_name: '',
        seckill_num: '',
        seckill_start: '',
        seckill_over: '',
        seckill_price: '',
        seckill_sales_volume: '',
        seckill_astrict: '0',
        seckill_astrict_num: '',
        seckill_pay_time: '',
        share_article: '',
        share_img_url: '',
        decide: '0'
      },
      rules: {
        activity_name: [
          {required: true, message: '请输入活动名称'}
        ],
        seckill_num: [
          {required: true, message: '请输入秒杀商品库存数'},
          { validator: integerValidator }
        ],
        seckill_start: [
          {required: true, message: '请选择活动开始结束时间'}
        ],
        seckill_price: [
          {required: true, message: '请输入秒杀价格'},
          { validator: numberValidator }
        ],
        seckill_pay_time: [
          {required: true, message: '请输入订单有效期'}
        ]
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
    this.$watch('dateRange', watchDateRangeToTimestamp(() => this.entity, 'startTime', 'endTime'))
  },
  methods: {
    getApi() {
      return spikeMangeApi
    },
    changeNorms(data) {
      this.entity = Object.assign({}, this.entity, {
        offer_spec_id: data.id
      })
    },
    onSubmit() {
      spikeMangeApi.addOfferSeckillNew(this.entity).then(data => {

      })
    },
    onCancel() {
      this.$refs.form.resetFields()
      this.listAndDetail(0)
    }
  }
}
</script>
