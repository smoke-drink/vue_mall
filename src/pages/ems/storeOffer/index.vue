<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Tabs v-model="tabName">
          <TabPane label="全部"
                   name="one">
            <all-offer-list v-if="tabName === 'one'" />
          </TabPane>
          <TabPane label="已上架"
                   name="two">
            <offer-up-list v-if="tabName === 'two'" />
          </TabPane>
          <TabPane label="未上架"
                   name="three">
            <offer-downed-list v-if="tabName === 'three'" />
          </TabPane>
          <TabPane label="已售罄"
                   name="four">
            <offer-sold-out-list v-if="tabName === 'four'" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import offerUpList from './components/offerUpList'
import offerSoldOutList from './components/offerSoldOutList'
import offerDownedList from './components/offerDownedList'
import allOfferList from './components/AllOfferList'

export default {
  components: {
    offerSoldOutList,
    offerUpList,
    offerDownedList,
    allOfferList
  },
  data() {
    return {
      tabName: 'one',
      // 查看详情
      detailVisible: false,
      id: ''
    }
  }
}
</script>
