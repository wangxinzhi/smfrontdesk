import request from '@/utils/request'

export function getProgramList (username) {
  return request({
    url: '/screen/programs.do',
    method: 'get',
    params: {
      username
    }
  })
}

export function getScreens () {
  return request({
    url: '/screen/getscreens.do',
    method: 'get'
  })
}

export function addProgram (form) {
  return request({
    url: '/screen/addprogram.do',
    method: 'post',
    params: {
      form
    }
  })
}

export function editProgram (editform) {
  return request({
    url: '/screen/editprogram.do',
    method: 'post',
    params: {
      editform
    }
  })
}

export function deleteProgram (id) {
  return request({
    url: '/screen/deleteprogram.do',
    method: 'post',
    params: {
      id
    }
  })
}

/** Verify program */

export function getVerifyList (username) {
  return request({
    url: '/screen/verifylist.do',
    method: 'post',
    params: {
      username
    }
  })
}

export function verifyProgram (verifyform) {
  return request({
    url: '/screen/verifyprogram.do',
    method: 'post',
    params: {
      verifyform
    }
  })
}

/** upload */

export function upload (data) {
  return request({
    url: '/screen/upload.do',
    method: 'post',
    params: {
      data
    }
  })
}
