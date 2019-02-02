<template>
  <div class="vip-setting">
    <Form ref="vipLevel" :model="vipLevel" class="vip-form">
      <FormItem label="开启会员卡功能" prop="openVip">
        <i-switch v-model="vipLevel.openVip" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
        <p class="switch_tip">如果要使用会员卡功能请先开启积分功能</p>
      </FormItem>
      <FormItem label="开启会员卡功能" prop="firstDisaccount">
        <RadioGroup v-model="vipLevel.firstDisaccount">
          <Radio label="huiyuanzhekou">优先会员卡折扣</Radio>
          <Radio label="yuangongshangchengzhekou">优先员工商城折扣</Radio>
          <Radio label="yunxudiejia">允许叠加</Radio>
          <Radio label="youxianzuidizhekou">优先最低的折扣</Radio>
        </RadioGroup>
        <p class="switch_tip">如果会员卡与员工商城的折扣会相互覆盖，只有一种生效。您也可以选择折扣叠加或者只计算最低的折扣</p>
      </FormItem>
      <FormItem>
          <add-level @on-add="addVipLevel"></add-level>
      </FormItem>
      <FormItem label="会员说明" prop="vipInstruction">
        <Input
          v-model="vipLevel.vipInstruction"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入会员说明"
        />
      </FormItem>
      <FormItem>
            <Button type="primary" @click="handleSubmit('vipLevel')">提交</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import AddLevel from './components/addLevel'
export default {
  components: {
    AddLevel
  },
  data() {
    return {
      vipLevel: {
        openVip: true,
        firstDisaccount: 'youxianzuidizhekou',
        vipInstruction: '',
        levelList: []
      },
      vipLevelRule: {}
    }
  },
  methods: {
    handleSubmit () {
      let data = Object.assign({}, this.vipLevel)
      // TODO: 调用保存api
    },
    addVipLevel (column) {
      this.vipLevel.levelList.push(column)
    }
  }
}
</script>
<style lang="scss" scoped>
  .vip-setting {
      height: 100%;
      background: #fff;
    .vip-form {
      width: 50%;
      max-width: 60%;
    }
  }
</style>
