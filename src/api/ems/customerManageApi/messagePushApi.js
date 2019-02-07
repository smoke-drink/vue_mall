import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 客户消息推送列表
   */
  list(data) {
    console.log(data, 'data')
    return axios({
      url: 'https://www.easy-mock.com/mock/5c517de27bd67d354475c860/mall/getMessageList',
      method: 'GET',
      removeEmpty,
      data,
      responseType: 'json'
    })
  },
  createMessage(data) {
    return axios({
      url: ``,
      method: 'POST',
      data,
      removeEmpty
    })
  }
}
