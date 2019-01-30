import axios from 'axios'

const MODULE = '/V1.0/company/store'

export default {
  /**
   * 支付配置详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/findPaykeyUsingGET
   *
   * @returns
   */
  getPay() {
    return axios({
      url: `${MODULE}/paykey`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 支付配置更新
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/updateCommissionUsingPUT
   *
   * @param {*} data
   * @returns
   */
  updatePay(data) {
    return axios({
      url: `${MODULE}/paykey`,
      method: 'PUT',
      data
    })
  },
  /**
   * 佣金配置详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/findsettleCircleUsingGET
   *
   * @returns
   */
  getCircle() {
    return axios({
      url: `${MODULE}/settle_circle`,
      method: 'GET'
    })
  },
  /**
   * 佣金配置更新
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/settleCircleUsingPUT
   *
   * @param {*} value
   * @returns
   */
  updateCircle(value) {
    return axios({
      url: `${MODULE}/settle_circle/${value}`,
      method: 'PUT'
    })
  }
}
