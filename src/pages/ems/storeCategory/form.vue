<template>
  <Form :label-width="120"
        :model="entity"
        :rules="rules"
        ref="form">
    <FormItem label="分类名称"
              prop="typeName">
      <Input placeholder="建议不要超过四个中文"
             v-model.trim="entity.typeName"
             :maxlength="6" />
    </FormItem>

    <FormItem label="上级分类"
              prop="parentId">
      <Select v-model="entity.parentId"
              :disabled="!!data.id || !!data.parentId">
        <Option :value="1">无</Option>
        <!--<Option v-for="v in categoryList"-->
                <!--:key="v.id"-->
                <!--:value="v.id">{{v.typeName}}</Option>-->
      </Select>
    </FormItem>

    <FormItem label="分类图片"
              prop="logo">
      <vma-image-upload v-model="entity.logo" />
      <p>建议图片尺寸100*100</p>
    </FormItem>

    <FormItem>
      <Button type="ghost"
              style="margin-right: 8px"
              @click="cancel">取消</Button>
      <Button type="primary"
              @click="submit">确定</Button>
    </FormItem>
  </Form>
</template>

<script>
import { formMixin } from '@/mixins'
import { storeCategoryApi } from '@/api/ems'

export default {
  mixins: [formMixin],
  data() {
    return {
      entity: {
        typeName: '',
        parentId: 1,
        logo: ''
      },
      rules: {
        typeName: [
          { required: true, message: '请输入分类名称' }
        ],
        logo: [
          { required: true, message: '请选择分类图片' }
        ]
      },
      categoryList: []
    }
  },
  methods: {
    getApi() {
      return storeCategoryApi
    },
    initData(resolve) {
      storeCategoryApi.list_no_undefined().then(data => {
        this.categoryList = data
        resolve()
      })
    }
  }
}
</script>
