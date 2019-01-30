<template>
  <div>
    <div class="ivu-table-wrapper mt15">
      <div class="ivu-table">
        <table cellspacing="0"
               cellpadding="0"
               border="0"
               style="width: 100%;">
          <thead>
            <tr>
              <th width="25%"
                  class="ivu-table-column-center">规格内容</th>
              <th width="25%"
                  class="ivu-table-column-center">单独购买价
                <i-input v-model="singlePrice"
                         style="width: 60px;" />
                <Dropdown transfer
                          placement="bottom-end">
                  <a href="javascript:void(0)">
                    应用
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem @click.native="useSinglePrice(false)">应用到所有规格</DropdownItem>
                    <DropdownItem @click.native="useSinglePrice(true)">仅应用到未填写</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </th>
              <th width="25%"
                  class="ivu-table-column-center">拼团价
                <i-input v-model="tuanPrice"
                         style="width: 60px;" />
                <Dropdown transfer
                          placement="bottom-end">
                  <a href="javascript:void(0)">
                    应用
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem @click.native="useTuanPrice(false)">应用到所有规格</DropdownItem>
                    <DropdownItem @click.native="useTuanPrice(true)">仅应用到未填写</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </th>
              <th width="25%"
                  class="ivu-table-column-center">活动库存</th>
            </tr>
          </thead>
          <tbody v-show="entity.norms.length">
            <tr v-for="(v, i) in entity.norms"
                :key="i">
              <td colspan="4">
                <norms-item :data="v"
                            ref="normsItem" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="c-warning mt15">
      商品价格（重点说明价格设置）——拼团有别于常态商品的价格，巨大的价差非常吸引用户，利用人性中贪小便宜的心理进行转化
      <br /> 市场价：是单独购买价的8-30倍价格，若是市面已有定价商品，不要超出
      <br /> 单独购买价：是拼团价的3倍-7倍的价格
      <br /> 拼团价：以商品成本价或最低能做的价格为参考 如 ：富安娜 繁花似锦4件套 成本价189元，则视活动力度及期望影响力，可设置拼团价199元，单独购买价：999元，参考价：1599
    </p>
  </div>
</template>

<script>
import { formMixin } from '@/mixins'
import NormsItem from './components/normsItem'
import { isCurrency } from '@/utils'

export default {
  mixins: [formMixin],
  components: {
    NormsItem
  },
  data() {
    return {
      entity: {
        norms: []
      },
      singlePrice: '',
      tuanPrice: ''
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        if (this.entity.norms && this.entity.norms.length) {
          let promises = this.$refs.normsItem.map(v => v.validate())
          Promise.all(promises).then(data => {
            resolve(data)
          }, err => {
            reject(err)
          })
        } else {
          resolve([])
        }
      })
    },
    // 应用单独购买价
    useSinglePrice(onlyEmpty) {
      let singlePrice = this.singlePrice
      if (!isCurrency(singlePrice) ||
        singlePrice < 0 || singlePrice > 9999999) {
        return this.warning('请输入0-9,999,999的数字，最多保留两位小数')
      }
      if (this.entity.norms && this.entity.norms.length) {
        let normsItem = this.$refs.normsItem
        if (onlyEmpty) {
          normsItem = normsItem.filter(v => v.isSinglePriceEmpty())
        }
        normsItem.forEach(v => v.setSinglePrice(singlePrice))
      }
    },
    // 应用团购价
    useTuanPrice(onlyEmpty) {
      let tuanPrice = this.tuanPrice
      if (!isCurrency(tuanPrice) ||
        tuanPrice < 0 || tuanPrice > 9999999) {
        return this.warning('请输入0-9,999,999的数字，最多保留两位小数')
      }
      if (this.entity.norms && this.entity.norms.length) {
        let normsItem = this.$refs.normsItem
        if (onlyEmpty) {
          normsItem = normsItem.filter(v => v.isTuanPriceEmpty())
        }
        normsItem.forEach(v => v.setTuanPrice(tuanPrice))
      }
    }
  }
}
</script>
