import { request } from '~/utils/request'
export const createUserRequest = () =>
  request({
    url: '/api/createUser',
    method: 'get',
  })
