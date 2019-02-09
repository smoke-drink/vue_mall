import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 客户列表
   */
  list(data = {}) {
    return axios({
      url: 'https://www.easy-mock.com/mock/5c517de27bd67d354475c860/mall/customerList',
      method: 'POST',
      removeEmpty,
      data,
      responseType: 'json'
    })
  }
}
