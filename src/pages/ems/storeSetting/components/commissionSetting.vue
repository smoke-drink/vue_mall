<template>
  <div>
    <div class="block">
      <div class="block-header">佣金入账周期</div>
      <div class="block-body">
        <Form :label-width="120"
              :model="entity"
              :rules="rules"
              ref="form">
          <FormItem label="发货后: "
                    prop="days">
            <InputNumber :max="100"
                         :min="0"
                         v-model="entity.days" />天
          </FormItem>
          <FormItem>
            <p class="c-info">保存后即时生效，直销佣金与分销佣金都按照本设置入账。</p>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="submit">保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import { storeSettingApi } from '@/api/ems'
import { integerValidator } from '@/assets/js/asyncValidator/validators'

export default {
  mixins: [formMixin],
  data() {
    return {
      entity: {
        days: 0
      },
      rules: {
        days: [
          { required: true, message: '请输入天数' },
          { validator: integerValidator }
        ]
      }
    }
  },
  methods: {
    get() {
      storeSettingApi.getCircle().then(days => {
        this.entity = {
          days
        }
      })
    },
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          storeSettingApi.updateCircle(this.entity.days).then(data => {
            this.success('更新成功')
          })
        }
      })
    }
  }
}
</script>
