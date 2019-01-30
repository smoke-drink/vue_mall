<template>
  <Form :label-width="120"
        :model="entity"
        :rules="rules"
        ref="form">
    <FormItem label="流水号"
              prop="bankInfo">
      <Input placeholder="请输入流水号"
             v-model="entity.bankInfo"
             :maxlength="32" />
    </FormItem>

    <FormItem>
      <Button type="ghost"
              style="margin-right: 8px"
              @click="cancel">取消</Button>
      <Button type="primary"
              @click="submit">确定</Button>
    </FormItem>
  </Form>
</template>

<script>
import { formMixin } from '@/mixins'
import { commissionApplyLogApi } from '@/api/ems'

export default {
  mixins: [formMixin],
  data() {
    return {
      entity: {
        bankInfo: ''
      },
      rules: {
        bankInfo: [
          { required: true, message: '请输入流水号' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let entity = Object.assign({}, this.entity)
          commissionApplyLogApi.giveOut(entity).then(data => {
            this.$emit('after-submit', data, entity)
          })
        }
      })
    }
  }
}
</script>
