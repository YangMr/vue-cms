/**
 * @author YangLing
 * @date 2022/7/14 09:47
 */

import request from '@/utils/request'

/**
 * 获取用户管理列表
 * @param params
 * @returns {AxiosPromise}
 */
const getUserList = (data) => {
  return request({
    url: '/user/list',
    method: 'get',
    data
  })
}

/**
 * 删除用户接口
 * @param data
 * @returns {AxiosPromise}
 */
const deleteUser = (data) => {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

/**
 * 新增用户接口
 * @param data
 * @returns {AxiosPromise}
 */
const addUser = (data) => {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

/**
 * 更新用户接口
 * @param data
 * @returns {AxiosPromise}
 */
const updateUser = (data) => {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

/**
 * 查询单个用户信息接口
 * @param id
 * @returns {AxiosPromise}
 */
const findUser = (id) => {
  return request({
    url: `user/userInfo/${id}`,
    method: 'get'
  })
}

export default {
  getUserList,
  deleteUser,
  addUser,
  updateUser,
  findUser
}
