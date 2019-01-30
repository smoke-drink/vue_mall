import axios from 'axios'

const MODULE = '/V1.0/company/store'
const removeEmpty = true

export default {
  /**
   * 商品条件查询列表
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#/StoreManageController
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/offer/listNew`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 批量下架商品
   * @param {*} data
   */
  UnderCarriage (data) {
    return axios({
      url: `${MODULE}/offer/down`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 批量上架商品
   * @param {*} data
   */
  HandlerGrounding (data) {
    return axios({
      url: `${MODULE}/offer/up`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 商品详情
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/StoreManageController/offerDetailUsingGET
   * @param {*} data
   */
  getStoreDetail(id) {
    return axios({
      url: `${MODULE}/offer/${id}`
    })
  },
  /**
   * 商品详情New
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/StoreManageController/offerDetailUsingGET
   * @param {*} data
   */
  getStoreDetailNew(id) {
    return axios({
      url: `${MODULE}/offerNew/${id}`
    })
  },
  /**
   * 修改商品
   * @param {*} data
   */
  updateStore (data) {
    return axios({
      url: `${MODULE}/offer`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加商品
   * @param {*} data
   */
  addStore (data) {
    return axios({
      url: `${MODULE}/offer`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 修改商品New
   * @param {*} data
   */
  updateStoreNew (data) {
    return axios({
      url: `${MODULE}/offerNew`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加商品New
   * @param {*} data
   */
  addStoreNew (data) {
    return axios({
      url: `${MODULE}/offer/new`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 商品删除
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/StoreManageController/offerDelUsingDELETE
   * @param {*} data
   */
  deleteStore(id) {
    return axios({
      url: `${MODULE}/offer/${id}`,
      method: 'DELETE'
    })
  },
  /**
   * 修改商品佣金分配
   * @param {*} data
   */
  updateOfferCommission (data) {
    return axios({
      url: `${MODULE}/offerCommission`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 修改商品佣金分配
   * @param {*} data
   */
  updateMoreOfferCommission (data) {
    return axios({
      url: `${MODULE}/offersCommission`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 获取商品分类树
   * @param {*} data
   */
  classifyTree () {
    return axios({
      url: `${MODULE}/classify/listNew`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 批量添加到分类
   * @param {*} data
   */
  add2Classify (data) {
    return axios({
      url: `${MODULE}/classify/add`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 批量转移到分类
   * @param {*} data
   */
  move2Classify (data) {
    return axios({
      url: `${MODULE}/classify/move`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 商品数量
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/storeManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  offerNum() {
    return axios({
      url: `${MODULE}/getOfferNum`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  }
}
