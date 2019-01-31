import axios from 'axios'

const MODULE = ''
const removeEmpty = true

export default {
  /**
   * 保存会员等级设置
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
  }
}
