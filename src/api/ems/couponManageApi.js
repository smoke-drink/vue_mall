import axios from 'axios'

const MODULE = '/V1.0'
const removeEmpty = true

export default {
  /**
   * 提交优惠券
   */
  couponAdd(data) {
    return axios({
      url: `${MODULE}/company/coupon/couponAdd`,
      method: 'POST',
      removeEmpty,
      data,
      responseType: 'json'
    })
  },
  list(data) {
    return axios({
      url: `${MODULE}/company/coupon/enterprise`,
      method: 'POST',
      removeEmpty,
      data,
      responseType: 'json'
    })
  }
}
