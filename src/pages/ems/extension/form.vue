<template>
  <div>
   <div class="block">
      <div class="block-header">活动设置</div>
      <div class="block-body">
        <Form :label-width="120" :model="entity" :rules="rules" ref="form">
          <Row>
            <i-col :xs="24" :sm="24" :md="10">
              <FormItem label="推广活动名称" prop="activity_name">
                <i-input v-model="entity.activity_name" placeholder="请输入推广活动名称"></i-input>
              </FormItem>
              <FormItem label="落地页">
                <RadioGroup v-model="entity.seckill_astrict">
                  <Radio label="0"><span>名片首页</span></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="备注">
                <i-input v-model="entity.seckill_sales_volume" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></i-input>
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
