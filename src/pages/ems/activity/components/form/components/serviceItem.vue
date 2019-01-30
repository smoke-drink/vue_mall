<template>
  <div>
    <Form :label-width="120"
          :model="entity"
          :rules="rules"
          ref="form">
      <Row>
        <i-col :span="8">
          <FormItem label="标题"
                    prop="title">
            <Input placeholder="请输入标题"
                   v-model.trim="entity.title"
                   :maxlength="20" />
          </FormItem>
        </i-col>
        <i-col :span="12">
          <FormItem label="描述"
                    prop="desc">
            <Input placeholder="请输入描述"
                   v-model.trim="entity.desc"
                   :maxlength="100" />
          </FormItem>
        </i-col>
        <i-col :span="4"
               class="pl10">
          <Button @click="add">新增</Button>
          <Button type="error"
                  v-if="showRemove"
                  @click="remove">删除</Button>
        </i-col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'

export default {
  mixins: [formMixin],
  props: {
    // 是否显示移除按钮
    showRemove: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      entity: {
        title: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题' }
        ],
        desc: [
          { required: true, message: '请输入描述' }
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
    add() {
      this.$emit('add')
    },
    remove() {
      this.$emit('remove')
    }
  }
}
</script>
