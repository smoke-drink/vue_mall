import axios from 'axios';

const MODULE = '/V1.0/company';
const removeEmpty = true;

export default {
  /**
   * 会员卡列表
   */
  list(data) {
    return axios({
      url: 'https://www.easy-mock.com/mock/5c517de27bd67d354475c860/mall/getVIPList',
      method: 'GET',
      removeEmpty,
      data,
      responseType: 'json'
    });
  }
};
