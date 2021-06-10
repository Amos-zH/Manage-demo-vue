import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 获取token
export function getToken () {
  return Cookies.get(TokenKey)
}

// 设置1天token到cookie
export function setToken (token) {
  Cookies.set(TokenKey, token, { expires: 1, path: '' })
}

// 删除token
export function removeToken () {
  return Cookies.remove(TokenKey, { path: '' })
}
