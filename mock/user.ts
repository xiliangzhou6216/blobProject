import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from './_util'

export function createFakeUserList() {
  return [
    {
      id: '1',
      username: 'admin',
      realName: 'Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      auths: ['admin'],
      modules: [
        {
          action: 'post', // module和action组成  按钮级别权限
          module: 'home', // 菜单路由权限
          name: 'home模块',
          url: '/api/user/login', //接口访问权限
        },
        {
          action: 'post',
          module: 'others',
          name: 'others二级菜单',
          url: '/api/user/permission',
        },
        {
          action: 'post',
          module: 'otherschild',
          name: 'otherschild三级菜单',
          url: '/api/user/permission',
        },
      ],
      is_admin: 1,
      role_name: '管理员角色',
      mobile: 13000000000,
      last_login: '2021-11-11 12:00',
    },
    {
      id: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      auths: ['test'],
      modules: [
        {
          action: 'post',
          module: 'home',
          name: 'home模块',
          uri: '/api/user/login',
        },
      ],
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
    url: '/api/user/login',
    timeout: 200,
    method: 'post',
    response: (request: requestParams) => {
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
    url: '/api/user/permission',
    method: 'get',
    timeout: 200,
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
    url: '/api/user/logout',
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
    url: '/api/account/info',
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
    url: '/api/createUser',
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
