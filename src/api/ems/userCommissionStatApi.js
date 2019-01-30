import axios from 'axios'

const MODULE = '/V1.0/company/store'
const removeEmpty = true

export default {
  /**
   * 员工佣金统计
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/commissionListUsingPOST
   *
   * @param {*} data
   * @returns
   */
  list(data) {
    return axios({
      url: `${MODULE}/commission/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 员工佣金详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/notInCountDetailUsingPOST
   *
   * @param {*} data
   * @returns
   */
  listNoincount(data) {
    return axios({
      url: `${MODULE}/noincount/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 员工佣金导出
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/userCommissionOrderListUsingPOST
   *
   * @param {*} status
   * @returns
   */
  exportFile(data) {
    return axios({
      url: `${MODULE}/commission/export`,
      method: 'POST',
      data,
      responseType: 'blob'
    })
  },
  /**
   * 员工佣金订单
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/notInCountDetailUsingPOST
   *
   * @param {*} data
   * @returns
   */
  orderListByStaff(data) {
    return axios({
      url: `${MODULE}/commission/detail`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
