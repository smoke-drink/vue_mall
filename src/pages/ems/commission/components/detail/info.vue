<template>
  <div>
    <div class="board board-primary">
      <div class="board-body">
        <Row>
          <div class="fl mr20">
            <img :src="entity.headIcon"
                 v-image-view
                 width="80"
                 height="80">
          </div>
          <i-col :span="18">
            <p>申请人: {{entity.nickName}}</p>
            <p>申请电话: {{entity.phone}}</p>
          </i-col>
        </Row>
      </div>
    </div>
    <hr class="mt20">
    <Row class="mt20">
      <i-col :span="8">
        总佣金: {{entity.totalCommission | currency}}
      </i-col>
      <i-col :span="8">
        已提现: {{entity.cashedCommission | currency}}
      </i-col>
      <i-col :span="8">
        可提现: {{entity.canCashCommission | currency}}
      </i-col>
    </Row>
    <Row class="mt20">
      <i-col :span="8">
        在途: {{entity.onWayCommission | currency}}
      </i-col>
      <i-col :span="8">
        未入账: {{entity.notInCount | currency}}
      </i-col>
      <i-col :span="8">
        已扣减: {{entity.reduceCommission | currency}}
      </i-col>
    </Row>
  </div>
</template>

<script>
import { detailMixin } from '@/mixins'

export default {
  mixins: [detailMixin]
}
</script>
