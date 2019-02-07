<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form ref="searchForm" label-position="right" :label-width="85">
          <Row>
            <i-col span="8">
              <FormItem label="所属部门">
                <Select style="width: 200px;" v-model="params.department">
                  <Option value>全部</Option>
                  <Option
                    v-for="item in departmentMap"
                    :value="item.value"
                    :key="item.value"
                  >{{item.text}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="所属员工">
                <Select style="width: 200px;" v-model="params.employ">
                  <Option value>全部</Option>
                  <Option
                    v-for="item in employMap"
                    :value="item.value"
                    :key="item.value"
                  >{{item.text}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="最后访问时间">
                <DatePicker
                  type="daterange"
                  style="width: 200px;"
                  v-model="dateRange"
                  placeholder="日期区间选择"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>

          <Row>
            <i-col span="8">
              <FormItem label="昵称">
                <i-input style="width: 200px;" v-model.trim="params.offerName" type="text"/>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="授权电话">
                <i-input style="width: 200px;" v-model.trim="params.phone" type="text"/>
              </FormItem>
            </i-col>
          </Row>

          <FormItem>
            <Button type="primary" @click="search">搜索</Button>
            <Button type="primary" style="float: right;">数据导出</Button>
          </FormItem>
        </Form>

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
import { customerListApi } from "@/api/ems";
import { watchDateRangeToTimestamp } from "@/utils";

export default {
  mixins: [indexMixin],
  data() {
    return {
      params: {
        department: "",
        employ: "",
        offerName: "",
        phone: ""
      },
      dateRange: [],
      departmentMap: [{ value: 11, text: "haha" }],
      employMap: [{ value: 22, text: "xixixi" }],
      table: {
        columns: [
          {
            title: "头像",
            key: "imgUrl",
            align: "center",
            render: (h, { row, column, index }) => {
              return (
                <div class="img-space-del-table">
                  <img src={row.imgUrl} width="60px" height="60px" />
                </div>
              );
            }
          },
          {
            title: "微信昵称",
            key: "name"
          },
          {
            title: "备注名",
            key: "remark"
          },
          {
            title: "授权电话",
            key: "phone"
          },
          {
            title: "所属员工",
            key: "employ"
          },
          {
            title: "最后访问时间",
            key: "time"
          },
          {
            title: "总成交金额",
            key: "deal"
          }
        ]
      }
    };
  },
  created() {
    this.$watch(
      "dateRange",
      watchDateRangeToTimestamp(() => this.params, "startTime", "endTime")
    );
  },
  methods: {
    getApi() {
      return customerListApi;
    },
    list(pageNum, pageSize) {
      this.setPageNumSize(pageNum, pageSize);
      let params = this.getParams();
      return customerListApi.list(params).then(list => {
        this.afterList(list);
        this.setTableList(list.dataList);
      });
    }
  }
};
</script>