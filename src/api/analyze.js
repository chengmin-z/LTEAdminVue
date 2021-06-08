import request from '@/utils/request'

export function analysisC2I(data) {
  return request({
    url: '/analysis7',
    method: 'post',
    data
  })
}

export function analysisC2I3(data) {
  return request({
    url: '/analysis8',
    method: 'post',
    data
  })
}

export function analysis9() {
  return request({
    url: '/analysis9',
    method: 'get'
  })
}
