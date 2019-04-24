import request from '@/utils/request'

export function getSysOrgTree () {
  return request({
    url: '/screen/orgtree.do',
    method: 'get'
  })
}

export function addOrg (form) {
  return request({
    url: '/screen/addorg.do',
    method: 'post',
    params: {
      form // from : { pid, depart }
    }
  })
}

export function deleteOrgById (id) {
  return request({
    url: '/screen/deleteorg.do',
    method: 'post',
    params: {
      id // org's id
    }
  })
}
