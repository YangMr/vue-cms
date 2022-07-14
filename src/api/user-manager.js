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

export default {
  getUserList,
  deleteUser
}
