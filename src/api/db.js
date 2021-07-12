import request from '@/utils/request'

export function updateDbInfo(data) {
  return request({
    url: '/updateDbInfo',
    method: 'post',
    data
  })
}

export function uploadTable(data) {
  return request({
    url: '/uploadTable',
    method: 'post',
    data
  })
}

export function getDbInfo() {
  return request({
    url: '/getDbInfo',
    method: 'get'
  })
}

export function getTableList() {
  return request({
    url: '/getTableList',
    method: 'get'
  })
}

export function getDownloadUrl(data) {
  return request({
    url: '/exportTable',
    method: 'post',
    data
  })
}

