import request from '@/utils/request'

/** Online User */
export function list () {
  return request({
    url: '/screen/sessions.do',
    method: 'get'
  })
}

export function forceLogout (sessionid) {
  return request({
    url: '/screen/forcelogout.do',
    method: 'post',
    params: {
      sessionid
    }
  })
}

/** Land log */
export function landlogs () {
  return request({
    url: '/screen/landlogs.do',
    method: 'get'
  })
}
