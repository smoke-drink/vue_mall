<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Tabs v-model="tabName">
          <TabPane label="待审核"
                   name="first">
            <to-be-audited v-if="tabName === 'first'" />
          </TabPane>
          <TabPane label="待发放"
                   name="second">
            <list :status="1"
                  v-if="tabName === 'second'" />
          </TabPane>
          <TabPane label="已发放"
                   name="third">
            <list :status="2"
                  v-if="tabName === 'third'" />
          </TabPane>
          <TabPane label="已驳回"
                   name="fourth">
            <list :status="3"
                  v-if="tabName === 'fourth'" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import List from './components/list'
import ToBeAudited from './components/toBeAudited'

export default {
  components: {
    List,
    ToBeAudited
  },
  data() {
    return {
      tabName: 'first'
    }
  }
}
</script>
