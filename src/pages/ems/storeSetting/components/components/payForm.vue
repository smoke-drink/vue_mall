<template>
  <Form :label-width="120"
        :model="entity"
        :rules="rules"
        ref="form">
    <FormItem label="商户号: "
              prop="mchId">
      <Input placeholder="请输入商户号"
             v-model.trim="entity.mchId"
             :maxlength="64" />
    </FormItem>
    <FormItem label="商户密钥: "
              prop="payKey">
      <Input placeholder="请输入商户密钥"
             v-model.trim="entity.payKey"
             :maxlength="128" />
    </FormItem>

    <FormItem label="付款证书: "
              prop="payP12">
      <span v-if="entity.payP12"
            class="c-success">
        <Icon type="checkmark"
        ></Icon>&nbsp;已上传</span>
      <span v-else
            class="c-danger">
        <Icon type="close-round"></Icon>&nbsp;未上传</span>
      <vma-upload :title="entity.payP12 ? '修改' : '选择'"
                  :options="uploadOptions"
                  :exts="['p12']"
                  uploadType="upload"
                  @on-success='getFileVal'/>
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
import { storeSettingApi } from '@/api/ems'
import { certificateUploadUrl } from '@/config'
import {
  adminInfoSession
} from '@/storage'

export default {
  mixins: [formMixin],
  data() {
    return {
      entity: {
        mchId: '',
        payKey: '',
        payP12: ''
      },
      rules: {
        mchId: [
          { required: true, message: '请输入商户号' }
        ],
        payKey: [
          { required: true, message: '请输入商密钥' }
        ]
      },
      uploadOptions: {
        action: certificateUploadUrl,
        showUploadList: false,
        headers: {
          session_id: adminInfoSession.getToken()
        },
        name: 'cert-p12-file'
      }
    }
  },
  methods: {
    getFileVal(val) {
      this.entity.payP12 = val
    },
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let entity = Object.assign({}, this.entity)
          storeSettingApi.updatePay(entity).then(data => {
            this.$emit('after-submit', data, entity)
          })
        }
      })
    }
  }
}
</script>
