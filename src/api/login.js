import request from '@/utils/request'

export function login (username, password, rememberMe) {
  return request({
    url: '/screen/login.do',
    method: 'post',
    params: {
      username,
      password,
      rememberMe
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/screen/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout (token) {
  return request({
    url: '/screen/logout.do',
    method: 'get',
    params: {
      token
    }
  })
}
