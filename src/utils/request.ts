import axios from 'axios'
import { getToken } from './auth'

const request = axios.create({
  timeout: 1000, // 请求超时时间
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token && !config.headers['Authorization']) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export { request }
