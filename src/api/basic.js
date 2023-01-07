import request from '@/utils/request'
import requestsh from '@/utils/request-sh'
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
export function getGoodsClass(data) {
  return requestsh({
    url: '/product/class/list',
    method: 'post',
    data
  })
}
export function getGoodsMaterial(data) {
  return requestsh({
    url: '/product/class/materialList',
    method: 'post',
    data
  })
}
export function getAllHSCode(data) {
  return requestsh({
    url: '/product/class/hsCode',
    method: 'post',
    data
  })
}
