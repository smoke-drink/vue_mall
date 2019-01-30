import axios from 'axios'

const MODULE = '/V1.0/company/store/activity_offer'
const removeEmpty = true

export default {
  /**
   * 活动列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/activityOfferListUsingPOST
   *
   * @param {*} data
   * @returns
   */
  list(data) {
    return axios({
      url: `${MODULE}/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加活动
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/addActivityOfferUsingPOST
   *
   * @param {*} data
   * @returns
   */
  save(data) {
    return axios({
      url: `${MODULE}`,
      method: 'POST',
      data
    })
  },
  /**
   * 更新活动
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/offerInfoEditUsingPUT
   *
   * @param {*} data
   * @returns
   */
  update(data) {
    return axios({
      url: `${MODULE}/offer_info`,
      method: 'PUT',
      data
    })
  },
  /**
   * 添加/更新活动
   *
   * @param {*} data
   * @returns
   */
  saveOrUpdate(data) {
    return data.id ? this.update(data) : this.save(data)
  },
  /**
   * 活动详情
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/offerInfoUsingGET
   *
   * @param {*} id
   * @returns
   */
  get(id) {
    return axios({
      url: `${MODULE}/offer_info/${id}`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 选择商品
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/offerInfoSimpleUsingGET
   *
   * @param {*} id
   * @returns
   */
  getStoreOffer(id) {
    return axios({
      url: `${MODULE}/offer_info_simple/${id}`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 可选商品列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/offerListUsingPOST
   *
   * @param {*} data
   * @returns
   */
  listStoreOffer(data) {
    return axios({
      url: `${MODULE}/offer_list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 上架/下架
   * http://121.196.203.33:9500/push/swagger-ui.html#!/ActivityController/changeActivityStatusUsingPUT
   *
   * @param {*} id
   * @param {*} status
   * @returns
   */
  updateStatus(id, status) {
    return axios({
      url: `${MODULE}/option`,
      method: 'PUT',
      data: {
        id,
        status
      }
    })
  }
}
