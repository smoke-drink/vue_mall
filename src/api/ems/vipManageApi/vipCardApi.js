import axios from 'axios'

const MODULE = ''
const removeEmpty = true

export default {
  /**
   * 保存会员卡设置
   * url
   * @param {*} data
   */
  save(data) {
    return axios({
      url: `${MODULE}`,
      method: 'POST',
      removeEmpty,
      data
    })
  },

  /**
   * 获取会员卡列表
   * url
   * @param {*} data
   */
  getCardList() {
    return axios({
      url: `${MODULE}`,
      method: 'GET',
      removeEmpty
    })
  }
}
