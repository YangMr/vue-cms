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
 * 导出api接口
 */
export default {
  getCaptcha,
  login
}
