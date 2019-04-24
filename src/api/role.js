import request from '@/utils/request'

export function getSysRoles () {
  return request({
    url: '/screen/roles.do',
    method: 'get'
  })
}

export function addRole (form) {
  return request({
    url: '/screen/addrole.do',
    method: 'post',
    params: {
      form
    }
  })
}

export function editRole (editform) {
  return request({
    url: '/screen/editrole.do',
    method: 'post',
    params: {
      editform
    }
  })
}

export function deleteRole (id) {
  return request({
    url: '/screen/deleterole.do',
    method: 'get',
    params: {
      id
    }
  })
}
