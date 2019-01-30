<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Tabs v-model="tabName">
          <TabPane label="迎新红包设置"
                   name="first">
            <vma-lazy :initial="tabName === 'first'">
              <first-list />
            </vma-lazy>
          </TabPane>
          <TabPane label="红包领取记录"
                   name="second">
            <vma-lazy :initial="tabName === 'second'">
              <second-list />
            </vma-lazy>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>

import firstList from './components/redEnvelopeSet'
import secondList from './components/collectionRecords'

export default {
  components: {
    firstList,
    secondList
  },
  data() {
    return {
      tabName: 'first'
    }
  }
}
</script>
