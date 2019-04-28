import request from '@/utils/request'

export function list () {
  return request({
    url: '/screen/sessions.do',
    method: 'get'
  })
}
