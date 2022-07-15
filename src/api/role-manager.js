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
 * 更新用户角色列表
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

/**
 * 添加角色
 * @param data
 * @returns {AxiosPromise}
 */
const addRole = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}

/**
 * 查询单个角色
 * @param id
 * @returns {AxiosPromise}
 */
const findRole = (id) => {
  return request({
    url: `/role/info/${id}`,
    method: 'GET'
  })
}

/**
 * 更新角色信息
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const updateRoleInfo = (data) => {
  return request({
    url: '/role/update',
    method: 'PUT',
    data
  })
}

export default {
  getRoleList,
  updateRole,
  findRole,
  addRole,
  updateRoleInfo
}
