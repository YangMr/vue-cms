/**
 * @author YangLing
 * @date 2022/7/11 10:03
 */

import request from '@/utils/request'

/**
 * 获取验证码接口
 * @returns {AxiosPromise}
 */
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}

/**
 * 登录接口
 * @param data
 * @returns {AxiosPromise}
 */
const login = (data) => {
  return request({
    url: '/login?username=' + data.username + '&password=' + data.password + '&code=' + data.code + '&token=' + data.token,
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息接口
 * @returns {AxiosPromise}
 */
const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}

/**
 * 获取用户权限接口
 * @returns {AxiosPromise}
 */
const getPermissionList = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}

/**
 * 退出登录接口
 * @returns {AxiosPromise}
 */
const logout = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}

/**
 * 导出api接口
 */
export default {
  getCaptcha,
  login,
  getUserInfo,
  getPermissionList,
  logout
}
