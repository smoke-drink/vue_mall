<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Tabs v-model="tabName">
          <TabPane label="可发放佣金"
                   name="first">
            <vma-lazy :initial="tabName === 'first'">
              <available-list />
            </vma-lazy>
          </TabPane>
          <TabPane label="未入账佣金"
                   name="second">
            <vma-lazy :initial="tabName === 'second'">
              <unaccount-list />
            </vma-lazy>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import AvailableList from './components/availableList'
import UnaccountList from './components/unaccountList'

export default {
  components: {
    AvailableList,
    UnaccountList
  },
  data() {
    return {
      tabName: 'first'
    }
  }
}
</script>
