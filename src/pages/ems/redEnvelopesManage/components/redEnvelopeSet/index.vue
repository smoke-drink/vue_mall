<template>
  <div>
     <div class="block">
      <!-- <div class="block-header">活动设置</div> -->
      <div class="block-body">
        <Form :label-width="120" :model="entity" :rules="rules" ref="form">
          <Row>
            <i-col :xs="24" :sm="24" :md="10">
              <FormItem label="开启迎新红包">
                <i-switch v-model="entity.switch" @on-change="onChangeSwitch" />
              </FormItem>
              <FormItem label="红包发放账户">
                <RadioGroup v-model="entity.seckill_astrict">
                  <Radio label="0"><span>发送到微信红包</span></Radio>
                  <Radio label="1"><span>发放到佣金余额</span></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="总预算" prop="activity_name">
                <i-input v-model="entity.activity_name" placeholder="请输入总预算"></i-input>
              </FormItem>
              <FormItem label="红包金额">
                <RadioGroup v-model="entity.seckill_astrict">
                  <Radio label="0"><span>固定金额</span></Radio>
                  <Radio label="1"><span>随机金额</span></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="" v-if="entity.seckill_astrict==='1'">
                <Row>
                  <i-col span="6"><i-input v-model="entity.min"></i-input></i-col>
                  <i-col span="1" offset="1">~</i-col>
                  <i-col span="6"><i-input v-model="entity.max"></i-input></i-col>
                  <i-col span="1" offset="1">元</i-col>
                </Row>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="end" class="mb-25">
            <i-col span="3" offset="1">
              <Button type="primary" @click="onSubmit"  class="w-100">确定</Button>
            </i-col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      entity: {
        switch: false,
        activity_name: '',
        seckill_astrict: '0',
        min: '',
        max: ''
      },
      rules: {}
    }
  },
  methods: {
    onChangeSwitch() { },
    onSubmit() { }
  }
}
</script>
