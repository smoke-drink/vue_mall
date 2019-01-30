<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form :label-width="120"
              :model="entity"
              :rules="rules"
              ref="form">
          <FormItem label="是否开启分销:"
                    prop="isOpen">
            <i-switch v-model="entity.isOpen"
                      :true-value="1"
                      :false-value="0" />
          </FormItem>
          <FormItem label="商品详情佣金提示:"
                    prop="showInDetail">
            <i-switch v-model="entity.showInDetail"
                      :true-value="1"
                      :false-value="0" />
            <Tooltip placement="right">
              <em class="question">?</em>
              <div slot="content">
                <p>¥35.00
                  <span class="c-warning ml5">本商品佣金: ¥30.00</span>
                </p>
              </div>
            </Tooltip>
          </FormItem>

          <Tabs v-model="tabName"
                type="card">
            <TabPane label="分销佣金设置"
                     name="first">
              <h3>全局佣金设置</h3>
              <FormItem label="分销佣金比例(外部人员):"
                        prop="outPresent"
                        ref="outPresent"
                        :label-width="160">
                <i-input v-model="entity.outPresent"
                         :maxlength="8"
                         style="width: 100px;">
                  <span slot="append">%</span>
                </i-input>
              </FormItem>
              <FormItem label="销售佣金比例(企业员工):"
                        prop="inPresent"
                        ref="inPresent"
                        :label-width="160">
                <i-input v-model="entity.inPresent"
                         :maxlength="8"
                         disabled
                         style="width: 100px;">
                  <span slot="append">%</span>
                </i-input>
              </FormItem>
              <p class="c-warning">该分配方案将会把商品提成按照以上比例发放</p>
            </TabPane>
            <TabPane label="在线提现设置"
                     name="second">
              <FormItem prop="cashOutLine"
                        ref="cashOutLine"
                        :label-width="1">
                <i-input v-model="entity.cashOutLine"
                         :maxlength="8"
                         style="width: 150px;">
                  <span slot="prepend">满</span>
                  <span slot="append">可提现</span>
                </i-input>
              </FormItem>
            </TabPane>
            <TabPane label="分销规则"
                     name="third">
              <FormItem label="是否开启:"
                        prop="cashIntroOpen"
                        :label-width="70">
                <i-switch v-model="entity.cashIntroOpen"
                          :true-value="1"
                          :false-value="0" />
              </FormItem>
              <FormItem prop="cashIntroImg"
                        ref="cashIntroImg"
                        :label-width="70"
                        v-if="entity.cashIntroOpen === 1"
                        key="key-cashIntroImg">
                <vma-image-upload v-model="entity.cashIntroImg" />
                <p class="c-info">建议宽度375px</p>
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem class="text-c">
            <Button type="primary"
                    @click="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import { traderSettingApi } from '@/api/ems'
import { doubleValidator, currencyValidator, minValidator, maxValidator } from '@/assets/js/asyncValidator/validators'

export default {
  mixins: [formMixin],
  data() {
    return {
      tabName: 'first',
      entity: {
        id: '',
        cashIntroImg: '',
        cashIntroOpen: 0,
        cashOutLine: 1,
        inPresent: 0,
        isOpen: 0,
        outPresent: 0,
        showInDetail: 0
      },
      rules: {
        outPresent: [
          { required: true, message: '请填写分销佣金比例' },
          { validator: doubleValidator },
          { validator: maxValidator, max: 100 },
          { validator: minValidator, min: 0 }
        ],
        inPresent: [
          { required: true, message: '请填写销售佣金比例' },
          { validator: doubleValidator },
          { validator: maxValidator, max: 100 },
          { validator: minValidator, min: 0 }
        ],
        cashOutLine: [
          { required: true, message: '请可提现限制金额' },
          { validator: currencyValidator },
          { validator: minValidator, min: 1 }
        ],
        cashIntroImg: [
          { required: true, message: '请选择分销规则图片' }
        ]
      }
    }
  },
  watch: {
    'entity.outPresent'(val) {
      val = Number(val)
      if (!isNaN(val)) {
        this.$refs.form.validateField('outPresent', err => {
          if (!err) {
            this.entity.inPresent = 100 - val
          }
        })
      }
    }
  },
  methods: {
    get() {
      traderSettingApi.get().then(data => {
        this.entity = Object.assign({}, this.entity, data)
      })
    },
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let entity = Object.assign({}, this.entity)
          traderSettingApi.update(entity).then(data => {
            this.success('更新成功')
          })
        } else {
          if (this.$refs.inPresent.validateState !== 'success' || this.$refs.outPresent.validateState !== 'success') {
            this.tabName = 'first'
          } else if (this.$refs.cashOutLine.validateState !== 'success') {
            this.tabName = 'second'
          } else if (this.entity.cashIntroOpen === 1 && this.$refs.cashIntroImg.validateState !== 'success') {
            this.tabName = 'third'
          }
        }
      })
    }
  }
}
</script>
