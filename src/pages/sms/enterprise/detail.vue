<template>
  <div class="panel">
    <div class="panel-header">
      <i class="icon icon-enlarge panel-header-icon"
         :class="fullScreen ? 'icon-narrow' : 'icon-enlarge'"
         @click="toggleFullScreen"></i>
      企业详情
      <div class="fr">
        <Form class="panel-form"
              inline>
          <FormItem v-if="isShowCircle === 0 || isShowCircle == null || isShowCircle === undefined" :label-width="1">
            <Button type="primary"
                    @click="closeOrOpenCircle">开启朋友圈</Button>
          </FormItem>
          <FormItem v-if="isShowCircle === 1" :label-width="1">
            <Button type="error"
                    @click="closeOrOpenCircle">关闭朋友圈</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="panel-body">
      <p class="nodata"
         v-show="!data">暂无数据</p>
      <mod-detail v-if="data"
                  :id="entity.id"></mod-detail>
    </div>
  </div>
</template>
<script>
import { detailMixin } from '@/mixins'
import ModDetail from '@/components/packages/enterpriseDetail'
import enterpriseApi from '@/api/sms/enterprise'

export default {
  mixins: [detailMixin],
  components: {
    ModDetail
  },
  data() {
    return {
      tabName: 'info',
      id: '',
      isShowCircle: 0
    }
  },
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$onBus('isShowCircle', target => {
      this.isShowCircle = target.isShowCircle
      this.id = target.id
    })
  },
  methods: {
    toggleFullScreen() {
      this.$emit('toggleFullScreen', !this.fullScreen)
    },
    closeOrOpenCircle() {
      if (this.isShowCircle === 0) {
        enterpriseApi.closeOrOpenCircle({enterpriseId: this.id, status: 1}).then(
          this.isShowCircle = 1
        )
      } else {
        enterpriseApi.closeOrOpenCircle({enterpriseId: this.id, status: 0}).then(
          this.isShowCircle = 0
        )
      }
    }
  }
}
</script>
