import request from '@/utils/request'

export function getSysResource () {
  return request({
    url: '/screen/restree.do',
    method: 'get'
  })
}
