<template>
  <Tabs v-model="tabName">
    <TabPane label="个人资料"
             name="info">
      <info :data="entity"
            class="pd10" />
    </TabPane>
    <TabPane label="分销订单历史"
             name="orderHistory">
      <vma-lazy :initial="tabName === 'orderHistory'">
        <order-history :data="entity"
                       class="pd5" />
      </vma-lazy>
    </TabPane>
  </Tabs>
</template>

<script>
import { detailMixin } from '@/mixins'
import Info from './components/detail/info'
import OrderHistory from './components/detail/orderHistory'

export default {
  mixins: [detailMixin],
  components: {
    Info,
    OrderHistory
  },
  data() {
    return {
      tabName: 'info'
    }
  }
}
</script>
