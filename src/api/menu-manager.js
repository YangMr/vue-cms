/**
 * @author YangLing
 * @date 2022/7/14 09:47
 */

import request from '@/utils/request'

/**
 * 获取菜单列表
 * @param data
 * @returns {AxiosPromise}
 */
const getMenuList = (data = {}) => {
  return request({
    url: '/menu/list',
    method: 'GET',
    data
  })
}

export default {
  getMenuList
}
