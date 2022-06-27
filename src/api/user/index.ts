// import { ReqAuth, ReqParams, ResResult } from './type'
import axios from 'axios'

export interface ReqParams {
  mobile: 'string'
  password: 'string'
}

enum URL {
  login = '/v1/user/login',
  permission = '/v1/user/permission',
}

// 登录
export const loginRequest = (params: ReqParams) =>
  axios({
    url: URL.login,
    method: 'post',
    data: params,
  })
