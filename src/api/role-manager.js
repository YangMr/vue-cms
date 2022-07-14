/**
 * @author YangLing
 * @date 2022/7/14 09:47
 */

import request from '@/utils/request'

/**
 * 获取角色列表
 * @param data
 * @returns {AxiosPromise}
 */
const getRoleList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}

/**
 * 更新角色列表
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const updateRole = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}

export default {
  getRoleList,
  updateRole
}
