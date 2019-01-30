<template>
  <div>
    <Form :label-width="120"
          ref="form">
      <div v-for="(v, i) in entity.serviceInfos"
           :key="i">
        <service-item :data="v"
                      :showRemove="i > 0"
                      @add="add(i + 1)"
                      @remove="remove(i)"
                      ref="serviceItem" />
        <hr class="mb10" />
      </div>
    </Form>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import ServiceItem from './components/serviceItem'

export default {
  mixins: [formMixin],
  components: {
    ServiceItem
  },
  data() {
    return {
      entity: {
        serviceInfos: []
      }
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        let promised = this.$refs.serviceItem.map(v => v.validate())
        Promise.all(promised).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    add(index) {
      this.entity.serviceInfos.splice(index, 0, {
        title: '',
        desc: ''
      })
    },
    remove(index) {
      this.entity.serviceInfos.splice(index, 1)
    }
  }
}
</script>
