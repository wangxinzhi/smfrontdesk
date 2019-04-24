/* eslint-disable no-undef */
import request from '@/utils/request'

export function getUserList (username) {
  return request({
    url: '/screen/userlist.do',
    method: 'get',
    params: {
      username // username
    }
  })
}

export function addUser (form) {
  return request({
    url: '/screen/adduser.do',
    method: 'post',
    params: {
      form // user's info
    }
  })
}

export function editUserInfo (editform) {
  return request({
    url: '/screen/edituser.do',
    method: 'post',
    params: {
      editform // user's info
    }
  })
}

export function deleteUser (uid) {
  return request({
    url: '/screen/deleteuser.do',
    method: 'get',
    params: {
      uid // user' id
    }
  })
}

export function resetpassword (uid) {
  return request({
    url: '/screen/resetpassword.do',
    method: 'get',
    params: {
      uid // user' id
    }
  })
}
