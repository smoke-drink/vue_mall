// EnterCustomerController : 超级后台--企业管理
import axios from 'axios'

const MODULE = '/V1.0/common/account'

export default {
  /**
   *
   * @param {*} data
      id (string, optional): id ,
      passwrod (string, optional): 重置密码
   */
  updatePassword (data) {
    return axios({
      url: `${MODULE}/password/reset`,
      method: 'PUT',
      data
    })
  },
  /**
   *
   * @param {*} data
      id (string, optional): id ,
      status (string, optional): 0 禁用，2 启用
   */
  updateStatus (data) {
    return axios({
      url: `${MODULE}/status`,
      method: 'PUT',
      data
    })
  }
}
