import axios from 'axios'
import { getToken } from './auth'
import { usePermissionStoreWithOut } from '~/store/modules/permission'
import { WhiteList } from './permission'

// 接口返回 形状
export interface ResData<T> {
  code: number
  message: string
  result: T
}

const request = axios.create({
  timeout: 1000, // 请求超时时间
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config: any) {
    // 接口权限拦截
    const store = usePermissionStoreWithOut()
    const { url = '' } = config
    if (!WhiteList.includes(url)) {
      if (!store.getModules.some((item) => item.url === url)) {
        return Promise.reject('没有操作权限')
      }
    }
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
