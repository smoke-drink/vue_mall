<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <div style="margin-bottom: 1rem;">
          <Button type="primary" @click="createNewMessage">新建消息推送</Button>
        </div>
        <Table :columns="table.columns" :data="table.list" ref="table"/>
        <vma-pagination
          :pageNum="params.pageNum"
          :pageSize="params.pageSize"
          :total="page.totalNum"
          @change="list"
        />
      </div>
    </div>
    <CreateMessage v-model="shouldCreateMessage"
               v-if="resetCreatePanel"
               @on-createsuccess='createSuccess'></CreateMessage>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { messagePushApi } from '@/api/ems'
import CreateMessage from './component/createMessage.vue'

export default {
  mixins: [indexMixin],
  components: {
    CreateMessage
  },
  data() {
    return {
      table: {
        columns: [
          {
            title: '客户群体',
            key: 'group',
            align: 'left'
          },
          {
            title: '消息内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.open(params.id)
                    }
                  }
                }, '开启'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.id)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showDel(params.id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      },
      shouldCreateMessage: false,
      resetCreatePanel: true
    }
  },
  methods: {
    getApi() {
      return messagePushApi
    },
    createNewMessage() {
      this.shouldCreateMessage = true
    },
    createSuccess() {
      this.search()
      this.resetCreatePanel = false
      this.$nextTick(() => {
        this.resetCreatePanel = true
      })
    }
  }
}
</script>
