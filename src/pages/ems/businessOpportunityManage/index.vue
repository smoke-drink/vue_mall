<template>
  <div class="business-opportunity-manage">
    <div class="panel">
      <div class="panel-body">
        <Row>
          <i-col span="12">
            <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 400px">
              <FormItem
                v-for="(item, index) in formDynamic.items"
                :key="item.id"
                :label="`阶段${index+1}`"
                :prop="item.value"
              >
                <Row>
                  <i-col span="18">
                    <Input type="text" v-model="item.value" placeholder="新阶段..." />
                  </i-col>
                  <i-col span="4" offset="1">
                    <Icon
                      type="ios-plus-outline"
                      class="opt-btn"
                      v-if="index !== 0 && index !== formDynamic.items.length - 1"
                      @click.native.stop="handleAdd(index)"
                    ></Icon>
                    <Icon
                      type="ios-minus-outline"
                      class="opt-btn"
                      @click.native.stop="handleRemove(index)"
                      v-if="index !== 0 && index !== formDynamic.items.length - 1 && formDynamic.items.length > 3"
                    ></Icon>
                  </i-col>
                </Row>
              </FormItem>

              <FormItem>
                <Button class="btn-save" @click="handleSubmit('formDynamic')">保存</Button>
              </FormItem>
            </Form>
          </i-col>
          <i-col span="8">
            <div class="view-content">
              <p>预览</p>
              <h3>商机</h3>
              <div class="view-item">主题
                <p>简单描述商机</p>
              </div>
              <div class="view-item">金额
                <p>简单描述商机</p>
              </div>
              <div class="view-item">关联客户
                <div class="associated-customers-icon">
                  <Icon type="android-add" class></Icon>
                </div>
              </div>
              <div class="view-item">所在阶段
                <div>
                  <ul>
                    <li v-for="(item, index) in formDynamic.items" :key="item.id">{{`阶段${index+1}`}}</li>
                  </ul>
                </div>
                <p>阶段1：{{formDynamic.items[0].value}}</p>
              </div>
              <Button disabled style="width: 100%">保存</Button>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 3,
      formDynamic: {
        items: [
          {
            value: "",
            id: 1
          },
          {
            value: "",
            id: 2
          },
          {
            value: "",
            id: 3
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {},
    handleAdd(index) {
      this.id++;
      this.formDynamic.items.length > 4
        ? this.$Message.error("最多五条!")
        : this.formDynamic.items.splice(index + 1, 0, {
            value: "",
            id: this.id
          });
    },
    handleRemove(index) {
      this.formDynamic.items.splice(index, 1);
    }
  }
};
</script>
<style lang="less">
.business-opportunity-manage {
  .opt-btn {
    font-size: 26px;
    cursor: pointer;
  }
  .btn-save {
    background-color: #8bc34a;
    color: #fff;
    border-color: #8bc34a;
  }
  .view-content {
    h3 {
      text-align: center;
    }
    .associated-customers-icon {
      width: 60px;
      height: 60px;
      border: 2px solid #ccc;
      text-align: center;
      color: #ccc;
      line-height: 60px;
      font-size: 36px;
    }
    ul {
      margin: 12px 0;
      border: 1px solid #ddd;
      display: inline-block;
      li:nth-child(1) {
        background-color: coral;
        color: #fff;
      }
      li {
        display: inline-block;
        padding: 6px 20px;
        border-right: 1px solid #ddd;
      }
    }
    li:last-child {
      border-right: none;
    }
  }
}
</style>