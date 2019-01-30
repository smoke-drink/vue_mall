<template>
  <div>
    <Form :label-width="120"
          :model="entity"
          :rules="rules"
          ref="form">
      <table cellspacing="0"
             cellpadding="0"
             border="0"
             style="width: 100%;">
        <thead>
          <tr>
            <th width="25%"></th>
            <th width="25%"></th>
            <th width="25%"></th>
            <th width="25%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ivu-table-column-center" hidden="hidden">{{entity.id}}</td>
            <td class="ivu-table-column-center">{{entity.name}}</td>
            <td class="ivu-table-column-center">
              <FormItem prop="price"
                        style="margin-top: 10px;">
                <i-input v-model.trim="entity.price"
                         style="width: 100px;">
                  <span slot="append">元</span>
                </i-input>
              </FormItem>
            </td>
            <td class="ivu-table-column-center">
              <FormItem prop="tuanPrice"
                        style="margin-top: 10px;">
                <i-input v-model.trim="entity.tuanPrice"
                         style="width: 100px;">
                  <span slot="append">元</span>
                </i-input>
              </FormItem>
            </td>
            <td class="ivu-table-column-center">
              <FormItem prop="kuCun"
                        style="margin-top: 10px;">
                <i-input v-model.trim="entity.kuCun"
                         style="width: 100px;">
                  <span slot="append">件</span>
                </i-input>
              </FormItem>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import { currencyValidator, integerValidator } from '@/assets/js/asyncValidator/validators'

export default {
  mixins: [formMixin],
  data() {
    return {
      entity: {
        kuCun: '',
        offerNormId: '',
        price: '',
        tuanPrice: ''
      },
      rules: {
        price: [
          { required: true, message: '请输入单独购买价' },
          { validator: currencyValidator }
        ],
        tuanPrice: [
          { required: true, message: '请输入拼团价' },
          { validator: currencyValidator }
        ],
        kuCun: [
          { required: true, message: '请输入库存数' },
          { validator: integerValidator }
        ]
      }
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate().then(valid => {
          if (valid) {
            resolve(Object.assign({}, this.entity))
          } else {
            reject(new Error())
          }
        })
      })
    },
    // 单独购买价是否为空
    isSinglePriceEmpty() {
      return !this.entity.price
    },
    // 设置单独购买价
    setSinglePrice(value) {
      this.entity.price = value
    },
    // 拼团价是否为空
    isTuanPriceEmpty() {
      return !this.entity.tuanPrice
    },
    // 设置拼团价
    setTuanPrice(value) {
      this.entity.tuanPrice = value
    }
  }
}
</script>
