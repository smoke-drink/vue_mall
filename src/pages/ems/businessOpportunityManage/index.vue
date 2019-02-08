<template>
  <div class="business-opportunity-manage">
    <div class="panel">
      <div class="panel-body">
        <Row>
          <i-col span="9">
            <Form :label-width="80" style="width: 400px">
              <FormItem
                v-for="(item, index) in items"
                :key="item.id"
                :label="`阶段${index+1}`"
                :prop="item.value"
              >
                <Row>
                  <i-col span="18">
                    <Input type="text" v-model="item.value" placeholder="新阶段..."/>
                  </i-col>
                  <i-col span="4" offset="1">
                    <Icon
                      type="ios-plus-outline"
                      class="opt-btn"
                      v-if="index !== 0 && index !== items.length - 1"
                      @click.native.stop="handleAdd(index)"
                    ></Icon>
                    <Icon
                      type="ios-minus-outline"
                      class="opt-btn"
                      @click.native.stop="handleRemove(index)"
                      v-if="index !== 0 && index !== items.length - 1 && items.length > 3"
                    ></Icon>
                  </i-col>
                </Row>
              </FormItem>

              <FormItem>
                <Button class="btn-save" @click="handleSubmit">保存</Button>
              </FormItem>
            </Form>
          </i-col>
          <i-col span="7" offset="4">
            <p>预览</p>
            <div class="view-content">
              <h2>商机</h2>
              <div class="view-item">主题
                <p class="theme">简单描述商机</p>
              </div>
              <div class="view-item">金额
                <p></p>
              </div>
              <div class="view-item">关联客户
                <div class="associated-customers-icon">
                  <Icon type="android-add" class></Icon>
                </div>
              </div>
              <div class="view-item">所在阶段
                <Row class="step">
                  <i-col
                    :span="parseInt(24/items.length)"
                    v-for="(item, index) in items"
                    :key="item.id"
                  >{{`阶段${index+1}`}}</i-col>
                </Row>
                <p>阶段1：{{items[0].value}}</p>
              </div>
              <div class="save-content">
                <Button disabled>保存</Button>
              </div>
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
    };
  },
  methods: {
    handleSubmit() {
      console.log("this.items", this.items);
    },
    handleAdd(index) {
      this.id++;
      this.items.length > 4
        ? this.$Message.error("最多五条!")
        : this.items.splice(index + 1, 0, {
            value: "",
            id: this.id
          });
    },
    handleRemove(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>
<style lang="less">
.business-opportunity-manage {
  min-width: 800px;
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
    border: 1px solid #ddd;
    min-width: 320px;
    h2 {
      text-align: center;
    }
    .view-item {
      padding: 8px 12px;
      line-height: 24px;
      border-bottom: 1px solid #ddd;
      min-height: 60px;
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
    }
    .theme {
      font-size: 16px;
      color: #ccc;
    }
    .associated-customers-icon {
      width: 50px;
      height: 50px;
      border: 1px solid #ccc;
      text-align: center;
      color: #ccc;
      line-height: 50px;
      font-size: 36px;
      border-radius: 4px;
    }
    .step {
      .ivu-col {
        padding: 4px 6px;
        border-width: 1px;
        border-color: #ddd #ddd #ddd transparent;
        border-style: solid;
        text-align: center;
        &:first-child {
          background-color: coral;
          color: #fff;
        }
      }
    }
    .save-content {
      padding: 12px;

      button {
        width: 100%;
        height: 40px;
        font-size: 19px;
        background-color: #dcdcdc;
        color: #fff;
      }
    }
  }
}
</style>