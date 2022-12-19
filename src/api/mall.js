import request from '@/utils/request'

export function updateGoods(params) {
  return request({
    url: '/api/mall/goods',
    method: 'put',
    data: params
  })
}
export function saveGoods(params) {
  return request({
    url: '/api/mall/goods',
    method: 'post',
    data: params
  })
}
export function getGoodsPage(params) {
  return request({
    url: '/api/mall/goods-page',
    method: 'get',
    data: params
  })
}
export function getGoodsById(id) {
  return request({
    url: `/api/mall/goods/${id}`,
    method: 'get'
  })
}
export function getGoodsImagesById(id) {
  return request({
    url: `/api/mall/goods-images/${id}`,
    method: 'get'
  })
}
