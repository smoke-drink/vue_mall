import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 客户消息推送列表
   */
  list(data) {
    return axios({
      url: 'https://www.easy-mock.com/mock/5c517de27bd67d354475c860/mall/getMessageList',
      method: 'POST',
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
  },
  del(data) {
    return axios({
      url: ``,
      method: 'POST',
      data,
      removeEmpty
    })
  },
  get(data) {
    return axios({
      url: `https://www.easy-mock.com/mock/5c517de27bd67d354475c860/mall/get`,
      method: 'POST',
      data,
      removeEmpty
    })
  },
  listCoupon() {
    return axios({
      url: `${MODULE}/offer_list`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  getCoupon(data) {
    return axios({
      url: `${MODULE}/offer_list`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  open(data) {
    return axios({
      url: `https://www.easy-mock.com/mock/5c517de27bd67d354475c860/mall/open`,
      method: 'POST',
      data,
      removeEmpty
    })
  }
}
