<template>
  <Form :label-width="120"
        :model="entity"
        :rules="rules"
        ref="form">
    <FormItem label="拼团设置"
              prop="num">
      <InputNumber v-model="entity.num"
                   :disabled="disabled"
                   :min="2"
                   :max="100" />人成团
    </FormItem>
    <FormItem label="开始结束时间"
              prop="startTime">
      <DatePicker type="datetimerange"
                  v-model="dateRange"
                  :disabled="disabled"
                  placerholder="请选择"
                  format="yyyy-MM-dd HH:mm:ss"
                  :options="pickerOptions"
                  style="width: 300px;" />
    </FormItem>
    <FormItem label="团有效期"
              prop="limitTime">
      <InputNumber v-model="entity.limitTime"
                   :disabled="disabled"
                   :min="1"
                   :max="168" />小时
    </FormItem>
  </Form>
</template>

<script>
import { formMixin } from '@/mixins'
import { integerValidator } from '@/assets/js/asyncValidator/validators'
import { watchDateRangeToTimestamp } from '@/utils'

export default {
  mixins: [formMixin],
  data() {
    return {
      entity: {
        num: 5,
        startTime: '',
        endTime: '',
        limitTime: 24
      },
      rules: {
        num: [
          { required: true, message: '请选择成团人数' },
          { validator: integerValidator }
        ],
        startTime: [
          { required: true, message: '请选择开始结束时间' }
        ],
        limitTime: [
          { required: true, message: '请选择团有效期' },
          { validator: integerValidator }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          let now = new Date()
          now.setDate(now.getDate() - 1)
          return time < now.getTime()
        }
      },
      dateRange: []
    }
  },
  computed: {
    // 编辑时不允许编辑基本信息
    disabled() {
      return !!this.data.id
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(() => this.entity, 'startTime', 'endTime'))
  },
  methods: {
    afterEntity(entity) {
      this.dateRange = [entity.startTime ? new Date(entity.startTime) : '', entity.endTime ? new Date(entity.endTime) : '']
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate().then(valid => {
          if (valid) {
            resolve(Object.assign({}, this.entity))
          } else {
            reject(new Error(''))
          }
        })
      })
    }
  }
}
</script>
