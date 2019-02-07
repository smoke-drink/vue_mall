<template>
  <div class="card-wrap">
    <div class="card-form">
      <Form class="card-form" ref="vipCard" :model="vipCard" :rules="cardRules" :label-width="120">
      <FormItem label="商户logo" prop="customer_logo">
        <Row class="logo-wrap">
          <i-col span="6">
            <img :src="vipCard.customer_logo" class="card-logo">
          </i-col>
          <i-col span="16">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" >上传logo</Button>
            </Upload>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="商户名称" prop="customer_name" >
        <Row>
          <i-col span="15">
            <Input type="text" v-model="vipCard.customer_name" :maxlength="12"/>
          </i-col>
          <i-col span="8" offset="1">
            <span> {{nameLength}}/12 (一旦审核成功，则不可修改)</span>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="卡券封面" prop="card_ticket_cover">
        <RadioGroup v-model="vipCard.card_ticket_cover">
          <Radio :label="0">封面</Radio>
          <Radio :label="1">颜色</Radio>
        </RadioGroup>
        <div v-if="vipCard.card_ticket_cover == 0">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button type="ghost" >上传封面</Button>
          </Upload>
          <span>请参照<a :href="upload_normal" target="blank" rel="noopener onreferer"> 图片规范 </a>上传</span>
        </div>
        <div v-if="vipCard.card_ticket_cover == 1">
           <ColorPicker v-model="card_color" recommend/>
        </div>
      </FormItem>
      <FormItem label="会员卡标题" prop="card_title">
        <Row>
          <i-col span="21">
            <Input type="text" v-model="vipCard.card_title" :maxlength="9"/>
          </i-col>
          <i-col span="2" offset="1">
            <span> {{titleLength}}/9</span>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="操作提示" prop="operation_hint">
        <Row>
          <i-col span="21">
            <Input type="text" v-model="vipCard.operation_hint" :maxlength="16" />
          </i-col>
          <i-col span="2" offset="1">
            <span> {{hintLength}}/16</span>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="特权说明" prop="privilege">
        <Input type="textarea" v-model="vipCard.privilege" :autosize="{minRows: 2,maxRows: 5}" placeholder="特权"/>
      </FormItem>
      <FormItem label="使用须知" prop="use">
        <Input type="textarea" v-model="vipCard.use" :autosize="{minRows: 2,maxRows: 5}" placeholder="使用须知"/>
      </FormItem>
      <FormItem label="图文介绍">
        <vma-editor ref="editor" />
      </FormItem>
      <FormItem label="客服电话" prop="customer_service_phone">
        <Row>
          <i-col span="13">
            <Input type="text" v-model="vipCard.customer_service_phone"/>
          </i-col>
          <i-col span="10" offset="1">
            <span>可输入手机号码或固话（格式如:020-888888880）</span>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="激活设置" ></FormItem>
      <FormItem label="必填信息" prop="required_information">
        <CheckboxGroup v-model="vipCard.required_information"  @on-change="relateOptional">
                <Checkbox v-for="({label, value}) in requiredList" :key="label" :label="value" ><span>{{label}}</span></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="选填信息" prop="optional_information">
        <CheckboxGroup v-model="vipCard.optional_information">
                <Checkbox v-for="({label, value}, index) in optionalList" :key="index" :label="value"><span>{{label}}</span></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem style="text-align: center">
        <Button type="primary" @click="saveCard('vipCard')">保存</Button>
      </FormItem>
    </Form>
    </div>
    <div class="card-preview">
      <img :src="preview_url"/>
    </div>
  </div>
</template>
<script>
import {requiredList} from './config'
import {vipCardApi} from '@/api/ems'
// import { formMixin } from '@/mixins'

export default {
  // mixins: [formMixin],
  data() {
    return {
      vipCard: {
        customer_logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549214692296&di=b6cbc3f45418c98b800d319906456346&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1603%2F21%2Fc14%2F19462188_1458564373718_mthumb.jpg',
        customer_name: '',
        card_ticket_cover: 0,
        cover: '',
        card_title: '',
        operation_hint: '',
        privilege: '',
        use: '',
        customer_service_phone: '',
        required_information: [],
        optional_information: [],
        intrudction: '',
        card_color: '#19be6b'
      },
      preview_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549214692296&di=b6cbc3f45418c98b800d319906456346&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1603%2F21%2Fc14%2F19462188_1458564373718_mthumb.jpg',
      requiredList,
      optionalList: requiredList,
      upload_normal: 'https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/card_cover_tmpl&type=info&lang=zh_CN',
      cardRules: {
        customer_logo: [
          {required: true, message: '请上传商户logo', trigger: 'change'}
        ],
        customer_name: [
          {required: true, message: '请填写商户名称', trigger: 'blur'}
        ],
        card_title: [
          {required: true, message: '请填写会员卡标题', trigger: 'blur'}
        ],
        operation_hint: [
          {required: true, message: '请填写操作提示', trigger: 'blur'}
        ],
        privilege: [
          {required: true, message: '请填写特权说明', trigger: 'blur'}
        ],
        use: [
          {required: true, message: '请填写使用须知', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    nameLength: function() {
      let nameLen = this.vipCard.customer_name.length
      return nameLen
    },
    titleLength: function() {
      let titleLen = this.vipCard.card_title.length
      return titleLen
    },
    hintLength: function() {
      let operationLen = this.vipCard.operation_hint.length
      return operationLen
    }
  },
  methods: {
    // getApi () {
    //   return vipCardApi
    // },
    relateOptional(data) {
      this.optionalList = this.requiredList.filter(r => {
        let l = Object.assign({}, r)
        return !data.includes(l.value)
      })
    },
    saveCard(name) {
      let vipCard = Object.assign({}, this.vipCard)
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = this.$refs['editor'].getData()
          vipCard.intrudction = data
          vipCardApi.save(vipCard).then()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-wrap {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-form {
      flex: 1;
      margin-right: 1rem;
      .logo-wrap {
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .card-logo {
        height: 120px;
        width: 120px;
      }
    }
    .card-preview {
      width: 30rem;
      img {
        width: 100%;
      }
    }
  }
</style>
