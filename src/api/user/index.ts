import { ReqAuth, ReqParams, ResResult } from './type'
import { useRequest } from 'vue-request'

export const loginRequest = () => {
  const { data, loading, error } = useRequest({
    url: '/api/post',
    method: 'post',
  })
  return { data, loading, error }
}
