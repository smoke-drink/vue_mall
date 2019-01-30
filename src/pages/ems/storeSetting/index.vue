<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Tabs v-model="tabName">
          <TabPane label="支付设置"
                   name="first">
            <vma-lazy :initial="tabName === 'first'">
              <pay-setting />
            </vma-lazy>
          </TabPane>
          <TabPane label="佣金设置"
                   name="second">
            <vma-lazy :initial="tabName === 'second'">
              <commission-setting />
            </vma-lazy>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import PaySetting from './components/paySetting'
import CommissionSetting from './components/commissionSetting'

export default {
  components: {
    PaySetting,
    CommissionSetting
  },
  data() {
    return {
      tabName: 'first'
    }
  }
}
</script>
