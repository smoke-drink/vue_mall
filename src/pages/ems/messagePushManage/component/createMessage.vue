<template>
  <div class="message-wrap">
    <vma-panel v-model="computedValue"
               title="编辑消息推送">
      <Form ref="form"
            :model="entity"
            :rules="rules">
        <FormItem prop="title"
                  label="标题">
          <Input type="text"
                 v-model="entity.title"
                 placeholder="请输入标题"/>
        </FormItem>
        <FormItem prop="content"
                  label="内容">
          <Input type="textarea" v-model="entity.content" :autosize="{minRows: 2,maxRows: 5}"/>
        </FormItem>
        <FormItem prop="relateSetting" label="关联设置">
          <RadioGroup v-model="entity.relateSetting">
            <Radio :label="0">不关联</Radio>
            <Radio :label="1">商品</Radio>
            <Radio :label="2">优惠券</Radio>
          </RadioGroup>
          <p>关联设置是指当用户点击消息时跳转到的页面，如果选择不关联则默认跳转到商城首页</p>
          <div v-if="entity.relateSetting == 1">
            <div v-if="entity.store.storeId">
              <FormItem label="产品名称: ">
                {{entity.store.offerName}}
              </FormItem>
              <FormItem label="产品价格: ">
                <span class="mr30"
                      v-if="entity.store.marketPrice">
                  市场价:
                  <span class="c-danger">{{entity.store.marketPrice}}</span>元
                </span>
                <span>
                  售卖价:
                  <span class="c-danger">{{entity.store.offerPrice}}</span>元
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
              <FormItem >
                <Button type="primary" @click="showStoreOffer">重新选择</Button>
              </FormItem>
            </div>
            <div v-else>
              <Button type="primary"
                      @click="showStoreOffer">选择商品</Button>
            </div>
          </div>
          <div v-if="entity.relateSetting == 2">
            <div v-if="entity.coupon.couponId">
              <FormItem label="优惠券名称: ">
                {{entity.coupon.couponName}}
              </FormItem>
              <FormItem >
                <Button type="primary" @click="showCoupon">重新选择</Button>
              </FormItem>
            </div>
            <div v-else>
              <Button type="primary"
                      @click="showCoupon">选择优惠券</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="发送时间" prop="sendTime">
          <DatePicker transfer
                        type="date"
                        placement="bottom-end"
                        v-model="entity.sendTime"
                        placeholder="发送时间"
                        style="width:rem(300px)"></DatePicker>
        </FormItem>
        <FormItem label="发送范围" prop="sendRange" >
          <Input  v-model="entity.sendRange" @on-focus="choosePerson" />
          <p>选择后凡是符合条件的客户系统会自动在在当天晚上8点发送消息</p>
        </FormItem>
        <FormItem >
          <Button type="primary"
                  @click="submit('form')">保存</Button>
          <p>为响应微信倡议，请勿滥用群发，以防止功能被禁用</p>
        </FormItem>
      </Form>
    </vma-panel>
    <Modal v-model="choosePersonModal" title="选择发送人群" @on-ok="appendPerson" okText="确定">
      <CheckboxGroup v-model="choosedPersons">
        <Checkbox v-for="({label, value}) in persons" :key="label" :label="value" ><span>{{label}}</span></Checkbox>
      </CheckboxGroup>
    </Modal>
    <Modal v-model="chooseGoodsModal"
           title="选择商品"
           class="modal-hide-footer"
           width="600px">
      <vma-lazy :initial="chooseGoodsModal">
        <store-list @select="selectStoreOffer" />
      </vma-lazy>
    </Modal>
    <Modal v-model="chooseCouponModal"
           title="选择优惠券"
           class="modal-hide-footer"
           width="600px">
      <vma-lazy :initial="chooseCouponModal">
        <coupon-list @select="selectCoupon" />
      </vma-lazy>
    </Modal>
  </div>
</template>

<script>
import { messagePushApi } from '@/api/ems'
import {formMixin} from '@/mixins'
import StoreList from './storeList'
import CouponList from './couponList'
export default {
  mixins: [formMixin],
  model: {
    prop: 'value',
    event: 'model'
  },
  components: { StoreList, CouponList },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    detailEntity: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('model', val)
      }
    },
    productPhotoList() {
      return this.entity.store.imgs.filter(v => v.type === 1)
    },
    detailPhotoList() {
      return this.entity.store.imgs.filter(v => v.type === 2)
    },
  },
  watch: {
    detailEntity(newVal) {
      let value = Object.assign({}, newVal.data)
      if(value.title) {
        this.entity = value
        this.entity.sendTime = new Date(value.sendTime)
      }
    }
  },
  data() {
    return {
      options: {
        showUploadList: false
      },
      entity: {
        content: '',
        relateSetting: 2,
        sendTime: '2019-12-22',
        title: '',
        sendRange: '',
        store: {
          storeId: '',
          offerName: '',
          marketPrice: '',
          offerPrice: '',
          imgs: []
        },
        coupon: {
          couponId: '2',
          couponName: '100-300优惠券'
        }
      },
      choosePersonModal: false,
      isShowCropper: false,
      isPreview: false,
      choosedPersons: [],
      chooseGoodsModal: false,
      choosedGoods: {},
      chooseCouponModal: false,
      persons: [
        {
          label: '1天未回访的客户',
          value: 0
        },
        {
          label: '2天未回访的客户',
          value: 1
        },
        {
          label: '3天未回访的客户',
          value: 2
        },
        {
          label: '4天未回访的客户',
          value: 3
        },
        {
          label: '5天未回访的客户',
          value: 4
        },
        {
          label: '全部客户',
          value: 5
        }
      ],
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { max: 50, message: '标题不能超过50位字符' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        sendTime: [
          { required: true, type: 'date', message: '发送时间不能为空', trigger: 'change' }
        ],
        sendRange: [
          { required: true, message: '发送范围不能为空', trigger: 'change' }
        ]
      },
      imgUrls: []
    }
  },
  methods: {
    clickSelectCover() {
      this.isShowCropper = true
    },
    uploadSuccess(url) {
      this.entity.cover = url
    },
    previewAddCircle() {
      this.entity.content = this.$refs.editor.getData()
      this.isPreview = true
    },
    async createMessage() {
      await messagePushApi.createMessage(this.entity)
      this.computedValue = false
      this.$emit('on-createsuccess', true)
    },
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.entity, 'entitytytyty')
          this.createMessage()
        }
      })
    },
    choosePerson() {
      this.choosePersonModal = true
    },
    appendPerson() {
      let value = this.persons.map(person => {
        let p = Object.assign({}, person)
        if (this.choosedPersons.includes(p.value)) {
          return p.label
        }
      }).filter(f => !!f).join(',')
      this.entity.sendRange = value
      console.log(this.entity)
    },
    showStoreOffer() {
      this.chooseGoodsModal = true
    },
    appendGoods() {
      console.log(this.choosedGoods)
    },
    selectStoreOffer(data) {
      console.log(data, 'store')
      this.entity.store.storeId = data.id
      this.entity.store = Object.assign({}, this.entity.store, data)
      this.chooseGoodsModal = false
    },
    showCoupon() {
      this.chooseCouponModal = true
    },
    selectCoupon(data) {
      this.entity.coupon.couponId = data.id
      this.entity.coupon = Object.assign({}, this.entity.coupon, data)
      this.chooseCouponModal = false
    }
  }
}
</script>
