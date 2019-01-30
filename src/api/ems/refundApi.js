import axios from 'axios'

const MODULE = '/V1.0/company/store/refund'
const removeEmpty = true

export default {
  /**
   * 退款单列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/RefundLogManageController/commissionApplyListUsingPOST_1
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
   * 批量退款
   * http://121.196.203.33:9500/push/swagger-ui.html#!/RefundLogManageController/auditingPassUsingPUT_3
   *
   * @param {*} ids
   * @returns
   */
  batchRefund(ids) {
    return axios({
      url: `${MODULE}`,
      method: 'PUT',
      data: ids
    })
  },
  /**
   * 导出退款单
   * http://121.196.203.33:9500/push/swagger-ui.html#!/RefundLogManageController/exportEquPartUsingPOST
   *
   * @param {*} status
   * @returns
   */
  exportFile(status) {
    return axios({
      url: `${MODULE}/export/${status}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  /**
   * 退款单详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/RefundLogManageController/refundDetailUsingGET
   *
   * @param {*} id
   * @returns
   */
  get(id) {
    return axios({
      url: `${MODULE}/${id}`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 退款
   * http://121.196.203.33:9500/push/swagger-ui.html#!/RefundLogManageController/refundUsingPUT
   *
   * @param {*} id
   * @returns
   */
  refund(id) {
    return axios({
      url: `${MODULE}/${id}`,
      method: 'PUT'
    })
  }
}
