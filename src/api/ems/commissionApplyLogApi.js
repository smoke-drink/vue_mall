import axios from 'axios'

const MODULE = '/V1.0/company/store/commissionApply'
const removeEmpty = true

export default {
  /**
   * 佣金提现审核/列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/commissionApplyListUsingPOST
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
   * 佣金提现审核/详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/commissionApplyDetailUsingGET
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
   * 佣金提现审核/发放
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/auditingPassUsingPUT_1
   *
   * @param {*} data
   * @returns
   */
  giveOut(data) {
    return axios({
      url: `${MODULE}/giveOut`,
      method: 'PUT',
      data
    })
  },
  /**
   * 佣金提现审核/批量审核
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/auditingPassUsingPUT
   *
   * @param {*} data
   * @returns
   */
  batchAuditResolve(data) {
    return axios({
      url: `${MODULE}/auditing`,
      method: 'PUT',
      data
    })
  },
  /**
   * 佣金提现审核/批量驳回
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/rejectUsingPUT
   *
   * @param {*} data
   * @returns
   */
  batchAuditReject(data) {
    return axios({
      url: `${MODULE}/reject`,
      method: 'PUT',
      data
    })
  },
  /**
   * 佣金提现审核/通过
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/auditingPassUsingPUT
   *
   * @param {*} id
   * @returns
   */
  auditResolve(id) {
    return axios({
      url: `${MODULE}/auditing`,
      method: 'PUT',
      data: [id]
    })
  },
  /**
   * 佣金提现审核/驳回
   * http://121.196.203.33:9500/push/swagger-ui.html#!/CommissionManageController/rejectUsingPUT
   *
   * @param {*} id
   * @returns
   */
  auditReject(id) {
    return axios({
      url: `${MODULE}/reject`,
      method: 'PUT',
      data: [id]
    })
  }
}
