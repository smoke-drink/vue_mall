<template>
  <div>
    <div class="fr">
      <Dropdown class="header-toggle">
        <a href="javascript:void(0)">
          菜单
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="showModifyPassWordModal">修改密码</DropdownItem>
          <DropdownItem divided
                        @click.native="logout">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <h2 style="display:none">{{title}}{{loginTypeLabel}}</h2>

    <Modal v-model="modifyPassWord.show"
           title="修改密码">
      <modify-pass-word v-if="modifyPassWord.show"
                        @after-submit="hideModifyPassWordModal"
                        @on-cancel="hideModifyPassWordModal" />
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { redirectToLoign } from '@/router'
import { accountApi } from '@/api/common'
import ModifyPassWord from './components/modifyPassWord'
import * as LOGIN_TYPE from '@/constants/src/loginType'
import { title } from '@/config'

export default {
  components: {
    ModifyPassWord
  },
  data() {
    return {
      modifyPassWord: {
        show: false
      },
      title
    }
  },
  computed: {
    loginTypeLabel() {
      return LOGIN_TYPE.getLabel()
    }
  },
  methods: {
    ...mapActions(['logoutClear']),
    logout() {
      accountApi.logout().then(() => {
        this.logoutClear()
        this.success('退出成功')
        redirectToLoign()
      })
    },
    showModifyPassWordModal() {
      this.modifyPassWord.show = true
    },
    hideModifyPassWordModal() {
      this.modifyPassWord.show = false
    }
  }
}
</script>
