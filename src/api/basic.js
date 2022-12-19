import request from '@/utils/request'

export function getAllTestItemInMap(params) {
  return request({
    url: '/api/basic/test-item-list',
    method: 'get',
    params: params
  })
}
export function getAllStandards(params) {
  return request({
    url: '/api/basic/standard-list',
    method: 'get',
    params: params
  })
}
