<template>
  <Form :label-width="120"
        :model="entity"
        :rules="rules"
        ref="form">
    <div v-if="entity.offerSpecId">
      <FormItem label="产品名称: ">
        {{entity.offerSpec.offerName}}
      </FormItem>
      <FormItem label="产品价格: ">
        <span class="mr30"
              v-if="entity.offerSpec.marketPrice">
          市场价:
          <span class="c-danger">{{entity.offerSpec.marketPrice}}</span>元
        </span>
        <span>
          售卖价:
          <span class="c-danger">{{entity.offerSpec.offerPrice}}</span>元
        </span>
      </FormItem>
      <FormItem label="产品图片: ">
        <img v-for="(v, i) in productPhotoList"
             :key="i"
             :src="v.url"
             width="60"
             height="60"
             class="mr10"
             v-image-view>
      </FormItem>
      <FormItem label="产品详情: ">
        <img v-for="(v, i) in detailPhotoList"
             :key="i"
             :src="v.url"
             width="60"
             height="60"
             class="mr10"
             v-image-view>
      </FormItem>
      <FormItem v-if="!data.id">
        <Button @click="showStoreOffer">重新选择</Button>
      </FormItem>
    </div>
    <div v-else>
      <Button type="primary"
              @click="showStoreOffer">选择商品</Button>
    </div>

    <Modal v-model="store.show"
           title="选择商品"
           class="modal-hide-footer"
           width="600px">
      <vma-lazy :initial="store.show">
        <store-offer-list @select="selectStoreOffer" />
      </vma-lazy>
    </Modal>
  </Form>
</template>

<script>
import { formMixin } from '@/mixins'
import { StoreOfferList } from '@/components/packages/storeOffer'

export default {
  mixins: [formMixin],
  components: {
    StoreOfferList
  },
  data() {
    return {
      entity: {
        offerSpecId: '',
        offerSpec: {
          offerName: '',
          marketPrice: '',
          offerPrice: '',
          imgs: []
        }
      },
      rules: {
        offerSpecId: [
          { required: true, message: '请选择商品' }
        ]
      },
      store: {
        show: false
      }
    }
  },
  computed: {
    productPhotoList() {
      return this.entity.offerSpec.imgs.filter(v => v.type === 1)
    },
    detailPhotoList() {
      return this.entity.offerSpec.imgs.filter(v => v.type === 2)
    }
  },
  methods: {
    validate() {
      return Promise.resolve(Object.assign({}, this.entity))
    },
    showStoreOffer() {
      this.store.show = true
    },
    selectStoreOffer(data) {
      this.entity.offerSpecId = data.id
      this.entity.offerSpec = Object.assign({}, this.entity.offerSpec, data)
      this.store.show = false
      this.$emit('select', data)
    }
  }
}
</script>
