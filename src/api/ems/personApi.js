import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 部门树
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  tree() {
    return axios({
      url: `${MODULE}/person/department/tree`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 查询员工
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/getStaffUsingGET_1
   * @param {*} data
   */
  get(id) {
    return axios({
      url: `${MODULE}/person/staff/${id}`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 员工树
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  personTree(offerId) {
    return axios({
      url: `${MODULE}/person/department/tree/new/${offerId}`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * ALL员工树
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  allPersonTree() {
    return axios({
      url: `${MODULE}/person/department/tree/new`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 员工数量
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  staffNum() {
    return axios({
      url: `${MODULE}/person/getStaffNum`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 话术分组
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  trickGroup() {
    return axios({
      url: `${MODULE}/person/trick/group/list`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 话术分组
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  editTrickGroup(data) {
    return axios({
      url: `${MODULE}/person/trick/group`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 分组下的话术列表
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/person/trick/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 话术详情
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  getTrickDetail(id) {
    return axios({
      url: `${MODULE}/person/trick/${id}`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 话术编辑
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  editTrick(data) {
    return axios({
      url: `${MODULE}/person/trick`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加话术
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  addTrick(data) {
    return axios({
      url: `${MODULE}/person/trick`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 删除话术详情
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  deleteTrickDetail(id) {
    return axios({
      url: `${MODULE}/person/trick/${id}`,
      method: 'DELETE',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 删除话术分组
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  deleteTrickGroup(id) {
    return axios({
      url: `${MODULE}/person/trick/group/${id}`,
      method: 'DELETE',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加话术分组
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  addTrickGroup(data) {
    return axios({
      url: `${MODULE}/person/trick/group`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 修改话术分组排序
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  editTrickGroupOrder(data) {
    return axios({
      url: `${MODULE}/person/trick/group/order`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
