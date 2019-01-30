<template>
  <div>
    <div class="block">
      <div class="block-header">拼团活动</div>
      <div class="block-body">
        <info :data="entity"
              ref="info" />
      </div>
    </div>
    <div class="block">
      <div class="block-header">商品设置</div>
      <div class="block-body">
        <store-offer :data="entity"
                     @select="changeNorms"
                     ref="storeOffer" />
      </div>
    </div>
    <template v-if="entity.offerSpecId">
      <div class="block">
        <div class="block-header">价格设置</div>
        <div class="block-body">
          <norms :data="entity"
                 ref="norms" />
        </div>
      </div>
      <div class="block">
        <div class="block-header">服务设置</div>
        <div class="block-body">
          <service-info :data="entity"
                        ref="serviceInfo" />
        </div>
      </div>

      <div class="mt20 text-c">
        <Button type="ghost"
                style="margin-right: 8px"
                @click="cancel">取消</Button>
        <Button type="primary"
                @click="submit">确定</Button>
      </div>
    </template>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import { activityApi } from '@/api/ems'
import Info from './components/form/info'
import StoreOffer from './components/form/storeOffer'
import Norms from './components/form/norms'
import ServiceInfo from './components/form/serviceInfo'

export default {
  mixins: [formMixin],
  components: {
    Info,
    StoreOffer,
    Norms,
    ServiceInfo
  },
  data() {
    return {
      entity: {
        endTime: '',
        limitTime: 24,
        norms: [],
        num: 2,
        offerSpecId: '',
        serviceInfos: [{ title: '', desc: '' }],
        startTime: ''
      }
    }
  },
  methods: {
    getApi() {
      return activityApi
    },
    changeNorms(data) {
      this.entity = Object.assign({}, this.entity, this.$refs.info.entity, {
        offerSpecId: data.id,
        norms: data.norms || []
      })
    },
    submit() {
      let entity = this.entity
      let promises = []
      if (!entity.id) {
        promises.push(this.$refs.info.validate())
      } else {
        promises.push(Promise.resolve())
      }
      promises.push(this.$refs.storeOffer.validate())
      if (this.entity.offerSpecId) {
        promises.push(this.$refs.norms.validate())
      } else {
        return this.warning('请选择商品')
      }
      promises.push(this.$refs.serviceInfo.validate())
      Promise.all(promises).then(data => {
        let [info, storeOffer, norms, serviceInfos] = data
        let entity = Object.assign({}, this.entity)
        // 合并基本信息数据
        if (info) {
          Object.assign(entity, {
            num: info.num,
            startTime: info.startTime,
            endTime: info.endTime,
            limitTime: info.limitTime
          })
        }
        // 合并选择商品数据
        entity.offerSpecId = storeOffer.offerSpecId
        // 合并价格设置数据
        if (norms) {
          for (let i = 0; i < norms.length; i++) {
            if (norms[i].kuCun > entity.norms[i].num) {
              this.$Message.error({
                content: '规格：' + norms[i].name + ' 的库存大于商品库存，请重新输入',
                duration: 10,
                closable: true
              })
              return
            }
          }
          entity.norms = norms
        }
        // 合并服务设置数据
        entity.serviceInfos = serviceInfos
        activityApi.saveOrUpdate(entity).then(data => {
          this.$emit('after-submit', data, entity)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
