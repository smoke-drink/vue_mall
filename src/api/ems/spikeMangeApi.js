import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 提交秒杀管理
   */
  addOfferSeckillNew(data) {
    return axios({
      url: `${MODULE}/addOfferSeckillNew`,
      method: 'POST',
      removeEmpty,
      data,
      responseType: 'json'
    })
  },
  list(data) {
    return axios({
      url: `${MODULE}/Seckill/underWayNew`,
      method: 'POST',
      removeEmpty,
      data,
      responseType: 'json'
    })
  },
  updateStatus(data) {
    return axios({
      url: `${MODULE}/Seckill/updateDecideNew`,
      method: 'PUT',
      removeEmpty,
      data,
      responseType: 'json'
    })
  }
}
