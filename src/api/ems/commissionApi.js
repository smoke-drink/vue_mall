import axios from 'axios'

const MODULE = '/V1.0/company/store/user/commission'
const removeEmpty = true

export default {
  /**
   * 分销佣金列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/userCommissionListUsingPOST
   *
   * @param {*} data
   * @returns
   */
  list(data) {
    return axios({
      url: `${MODULE}`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 分销佣金/订单历史列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/userCommissionOrderListUsingPOST
   *
   * @param {*} data
   * @returns
   */
  listOrder(data) {
    return axios({
      url: `${MODULE}/order`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 分销订单列表导出
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/userCommissionOrderListUsingPOST
   *
   * @param {*} userId
   * @returns
   */
  exportOrder(userId) {
    return axios({
      url: `${MODULE}/order/export/${userId}`,
      method: 'POST',
      responseType: 'blob'
    })
  }
}
