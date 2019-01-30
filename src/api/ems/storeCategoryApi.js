import axios from 'axios'

const MODULE = '/V1.0/company/store/classify'
const removeEmpty = true

export default {
  /**
   * 商品分类列表
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/classifyListsUsingPOST
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
   * 商品分类列表 不包括未分类
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/classifyListsUsingPOST
   *
   * @param {*} data
   * @returns
   */
  list_no_undefined(data) {
    return axios({
      url: `${MODULE}/list_no_undefined`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加分类
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/addClassityUsingPOST
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
   * 更新分类
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/editClassifyUsingPUT
   *
   * @param {*} data
   * @returns
   */
  update(data) {
    return axios({
      url: `${MODULE}`,
      method: 'PUT',
      data
    })
  },
  /**
   * 添加/更新分类
   *
   * @param {*} data
   * @returns
   */
  saveOrUpdate(data) {
    return data.id ? this.update(data) : this.save(data)
  },
  /**
   * 分类排序
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/chuangOrderUsingPUT
   *
   * @param {*} data
   * @returns
   */
  order(data) {
    return axios({
      url: `${MODULE}/order`,
      method: 'PUT',
      data
    })
  },
  /**
   * 删除分类
   * http://121.196.203.33:9500/push/swagger-ui.html#!/StoreManageController/delClassifyUsingDELETE
   *
   * @param {*} id
   * @returns
   */
  del(id) {
    return axios({
      url: `${MODULE}/${id}`,
      method: 'DELETE'
    })
  }
}
