<template>
  <div>
    <div class="board board-primary">
      <div class="board-body">
        <Row>
          <i-col :span="18">
            <p>
              <label class="label-th-v">退款订单号:</label> {{entity.orderId}}</p>
            <p>
              <label class="label-th-v">微信退款单号:</label> {{entity.orderNbr}}</p>
            <p>
              <label class="label-th-v">退款原因:</label> {{entity.refundReason}}</p>
          </i-col>
        </Row>
      </div>
    </div>
    <div class="board board-primary mt15">
      <div class="board-header">退款日志</div>
      <div class="board-body">
        <div v-if="entity.repRefundPayLog && entity.repRefundPayLog.length">
          <p v-for="(v, i) in entity.repRefundPayLog"
             :key="i">{{v.createTime | date}} {{v.apiInfo}}</p>
        </div>
        <p v-else
           class="nodata">暂无数据</p>
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
