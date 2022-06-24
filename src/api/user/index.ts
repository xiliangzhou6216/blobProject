// import { ReqAuth, ReqParams, ResResult } from './type'
import { useRequest } from 'vue-request'

export const loginRequest = () => {
  const { data, loading, error } = useRequest({
    url: '/api/post',
    method: 'post',
  })
  return { data, loading, error }
}

export const createUserRequest = () => {
  // const { data, loading, error } = useRequest({
  //   url: '/v1/user/login',
  //   method: 'get',
  // })
  // return { data, loading, error }
  return useRequest({
    url: '/v1/user/login',
    method: 'get',
  })
}
