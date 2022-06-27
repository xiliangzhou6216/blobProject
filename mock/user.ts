import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from './_util'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'sssgoEasy Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      auths: [],
      modules: [],
      is_admin: 1,
      role_name: '管理员角色',
      mobile: 13000000000,
      last_login: '2021-11-11 12:00',
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      auths: [],
      modules: ['home', 'website'],
      is_admin: 0,
      role_name: '普通用户角色',
      mobile: 18000000000,
      last_login: '2021-11-11 12:12',
    },
  ]
}
// 单纯的使⽤⾃⼰的返回数据话，可以不⽤引⼊mockjs
// http://mockjs.com/examples.html
import Mock, { Random } from 'mockjs'
export default [
  // mock user login
  {
    url: '/v1/user/login',
    timeout: 200,
    method: 'post',
    response: (request: requestParams) => {
      console.log(request, 9999)
      const { username, password } = request.body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/v1/user/permission',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/v1/user/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },
  {
    url: '/v1/account/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/v1/createUser',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        result: Mock.mock({
          'list|4': [
            {
              id: '@id',
              name: '@cname',
              age: Random.integer(1, 100),
              address: '@county',
              city: '@city',
              province: '@province',
              email: Random.email(),
              phone: /^1[0-9]{10}$/,
              regin: '@region',
              url: '@url',
              date: Random.date('yyyy-MM-dd'),
            },
          ],
        }),
      }
    },
  },
] as MockMethod[]
