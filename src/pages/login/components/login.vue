<template>
  <div class="login-bg"
       :style="loginBg ? `background-image: url(${loginBg})` : ''">
    <div class="login-wrapper">
      <h1 class="login-title">{{title}}</h1>
      <Form class="login-form"
            ref="form"
            :model="form"
            :rules="rules">
        <FormItem prop="phone">
          <i-input type="text"
                   v-model.trim="form.phone"
                   :maxlength="20"
                   placeholder="请输入登录账号"
                   @keyup.native.enter="handleLoginSubmit"
                   ref="phone" />
        </FormItem>
        <FormItem prop="passWord">
          <i-input type="password"
                   v-model.trim="form.passWord"
                   :maxlength="20"
                   placeholder="请输入密码"
                   @keyup.native.enter="handleLoginSubmit" />
        </FormItem>
        <FormItem class="login-code"
                  prop="code">
          <i-input type="text"
                   v-model.trim="form.code"
                   :maxlength="4"
                   placeholder="请输入验证码"
                   @keyup.native.enter="handleLoginSubmit" />
          <g-verify class="login-code-img"
                    ref="gVerify" />
        </FormItem>
        <slot name="loginType" />

        <FormItem>
          <Button class="login-btn-submit"
                  type="primary"
                  @click="handleLoginSubmit">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import * as LOGIN_TYPE from '@/constants/src/loginType'
import { accountApi } from '@/api/common'
import { navigateToSystem } from '@/router'
import { adminInfoSession, loginTypeLocal } from '@/storage'
import { adminInfoMixin } from '@/mixins'
import { loginBg } from '@/config'

export default {
  mixins: [adminInfoMixin],
  props: {
    type: Number,
    uuid: String
  },
  data() {
    let verifyCodeValidator = (rule, value, callback, source, options) => {
      let errors = []
      if (value && !this.$refs.gVerify.validate(value)) {
        errors.push(rule.message || '验证码错误')
      }
      callback(errors)
    }
    return {
      form: {
        phone: '',
        passWord: '',
        code: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入账号' }
        ],
        passWord: [
          { required: true, message: '请输入密码' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { validator: verifyCodeValidator, trigger: 'blur' }
        ]
      },
      loginBg
    }
  },
  computed: {
    title() {
      return LOGIN_TYPE.getLabel(this.type)
    }
  },
  mounted() {
    this.focus()
  },
  methods: {
    handleLoginSubmit() {
      loginTypeLocal.set(this.type)
      this.$refs['form'].validate(valid => {
        if (valid) {
          let entity = Object.assign({
            type: this.type,
            uuid: this.uuid
          }, this.form)
          // 暂时移除验证码
          delete entity.code
          accountApi.login(entity).then(data => {
            console.log(JSON.stringify(data.menu))
            this.success('登录成功')
            adminInfoSession.setJSON(data)
            adminInfoSession.setToken(data.token)
            // 登录成功
            navigateToSystem()
          })
        }
      })
    },
    focus() {
      this.$refs.phone.focus()
    }
  }
}
</script>
