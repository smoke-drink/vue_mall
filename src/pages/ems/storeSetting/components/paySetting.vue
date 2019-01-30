<template>
  <div>
    <div class="block">
      <div class="block-header">微信支付配置</div>
      <div class="block-body">
        <Form :label-width="120"
              ref="form">
          <FormItem label="商户号: ">{{entity.mchId}}</FormItem>
          <FormItem label="商户密钥: ">{{entity.payKey}}</FormItem>
          <FormItem label="付款证书: ">
            <span v-if="entity.payP12"
                  class="c-success">
              <Icon type="checkmark"></Icon>&nbsp;已上传</span>
            <span v-else
                  class="c-danger">
              <Icon type="close-round"></Icon>&nbsp;未上传</span>
          </FormItem>
          <FormItem>
            <p class="c-info">用户在商城内进行支付配置需先配置微信支付商户信息</p>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="showForm(entity)">编辑</Button>
          </FormItem>
        </Form>
      </div>
    </div>

    <Modal v-model="form.show"
           title="编辑"
           class="modal-hide-footer">
      <pay-form :data="form.entity"
                v-if="form.show"
                @after-submit="afterSubmitForm"
                @on-cancel="cancelForm" />
    </Modal>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { storeSettingApi } from '@/api/ems'
import PayForm from './components/payForm'

export default {
  mixins: [indexMixin],
  components: {
    PayForm
  },
  data() {
    return {
      entity: {}
    }
  },
  methods: {
    list() {
      storeSettingApi.getPay().then(data => {
        this.entity = data
      })
    }
  }
}
</script>
