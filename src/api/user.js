import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/getCurrentUser',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/addUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/deleteUser',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
