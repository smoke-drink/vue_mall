<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Table :columns="table.columns" :data="table.list" ref="table"/>
        <vma-pagination
          :pageNum="params.pageNum"
          :pageSize="params.pageSize"
          :total="page.totalNum"
          @change="list"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { indexMixin } from "@/mixins";
import { vipListApi } from "@/api/ems";

export default {
  mixins: [indexMixin],
  data() {
    return {
      table: {
        columns: [
          {
            title: "姓名",
            key: "name"
          },
          {
            title: "手机",
            key: "phone"
          },
          {
            title: "卡号",
            key: "cardId"
          },
          {
            title: "卡状态",
            key: "cardStatus"
          },
          {
            title: "积分",
            key: "scord"
          },
          {
            title: "等级",
            key: "level"
          },
          {
            title: "折扣",
            key: "discount"
          },
          {
            title: "激活时间",
            key: "time"
          }
        ]
      }
    };
  },
  methods: {
    getApi() {
      return vipListApi;
    }
  }
};
</script>

