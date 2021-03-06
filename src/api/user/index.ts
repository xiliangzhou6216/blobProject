// import { ReqAuth, ReqParams, ResResult } from './type'

import { ReqParams } from './type'
import { request } from '~/utils/request'

enum URL {
  login = '/api/user/login',
  permission = '/api/user/permission',
}

// 登录
export const loginRequest = (params: ReqParams) =>
  request({
    url: URL.login,
    method: 'post',
    data: params,
  })

// 权限
export const permissionRequest = () =>
  request({
    url: URL.permission,
    method: 'get',
  })
