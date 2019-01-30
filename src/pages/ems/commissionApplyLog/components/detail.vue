<template>
  <div>
    <div class="board board-primary">
      <div class="board-header">申请人信息</div>
      <div class="board-body">
        <Row>
          <div class="fl mr20">
            <img :src="entity.headIcon"
                 v-image-view
                 width="80"
                 height="80">
          </div>
          <i-col :span="18">
            <p>申请人: {{entity.linkMan}}</p>
            <p>申请电话: {{entity.linkPhone}}</p>
          </i-col>
        </Row>
      </div>
    </div>
    <div class="board board-primary mt15">
      <div class="board-header">提现信息</div>
      <div class="board-body">
        <Form :label-width="80">
          <FormItem label="姓名: "
                    style="margin-bottom: 0;">
            {{entity.linkMan}}
          </FormItem>
          <FormItem label="银行账号: "
                    style="margin-bottom: 0;">
            {{entity.cardNo}}
          </FormItem>
          <FormItem label="收款金额: "
                    style="margin-bottom: 0;">
            {{entity.cashMoney | currency}}
          </FormItem>

          <FormItem label="银行流水号: "
                    style="margin-bottom: 0;"
                    v-if="entity.bankInfo != null">
            {{entity.bankInfo}}
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="board board-primary mt15"
         v-show="entity.detailLogs && entity.detailLogs.length">
      <div class="board-header">操作记录</div>
      <div class="board-body">
        <p v-for="(v, i) in entity.detailLogs"
           :key="i">{{v.createTime | date}} 由 {{v.operatorName}} {{v.simpleDesc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { detailMixin } from '@/mixins'

export default {
  mixins: [detailMixin]
}
</script>
