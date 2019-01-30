import axios from 'axios'

const MODULE = '/V1.0/company/distributionCfg'

export default {
  /**
   * 分销规则详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/distributionCfgDetailUsingGET
   *
   * @returns
   */
  get() {
    return axios({
      url: `${MODULE}/detail`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 分销规则更新
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/distributionCfgUpdateUsingPUT
   *
   * @param {*} data
   * @returns
   */
  update(data) {
    return axios({
      url: `${MODULE}`,
      method: 'PUT',
      data
    })
  }
}
