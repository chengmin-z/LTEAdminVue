import request from '@/utils/request'

export function universeQuery(data) {
  return request({
    url: '/query',
    method: 'post',
    data
  })
}

export function getSectorId() {
  return request({
    url: '/getSectorId',
    method: 'get'
  })
}

export function getSectorName() {
  return request({
    url: '/getSectorName',
    method: 'get'
  })
}

export function getEnodeBID() {
  return request({
    url: '/getEnodeBID',
    method: 'get'
  })
}

export function getEnodeBName() {
  return request({
    url: '/getEnodeBName',
    method: 'get'
  })
}

export function kpiInfoQuery(data) {
  return request({
    url: '/CommunityKPIIndicatorInformationQuery',
    method: 'post',
    data
  })
}

export function prbHourLevel(data) {
  return request({
    url: '/prbHourLevel',
    method: 'post',
    data
  })
}

export function prbMinLevel(data) {
  return request({
    url: '/prbMinLevel',
    method: 'post',
    data
  })
}
