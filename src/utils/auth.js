import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

/** 从Cookie中获取token */
export function getToken () {
  return Cookies.get(TokenKey)
}

/** 设置cookie中的token */
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

/** 移除cookie中的token */
export function removeToken () {
  return Cookies.remove(TokenKey)
}