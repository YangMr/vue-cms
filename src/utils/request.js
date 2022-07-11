/**
 * @author YangLing
 * @date 2022/7/11 09:14
 */

// 导入axios
import axios from 'axios'

// 导入message消息提示组件
import { Message } from 'element-ui'

// 导入自定义消息提示
import exceptionMessage from './exception-message'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  if (response.data.code === 200) {
    return response.data.data
  }
  _showErrorMessage(response.data.code, response.data.msg)
}, (error) => {
  console.log('2')
  return Promise.reject(error)
})

// 错误消息提示
const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  Message({ message, type: 'error' })
}

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

// 导出axios实例对象
export default request
