import request from '@/utils/request'

export function queryClientComPage(params) {
  return request({
    url: '/api/client-com-page',
    method: 'get',
    params: params
  })
}
export function queryClientComPageAll(params) {
  return request({
    url: '/api/client-com-page-all',
    method: 'get',
    params: params
  })
}
export function queryClientComPagePub(params) {
  return request({
    url: '/api/client-com-page-pub',
    method: 'get',
    params: params
  })
}
export function queryClientComPageMy(params) {
  return request({
    url: '/api/client-com-page-my',
    method: 'get',
    params: params
  })
}
export function queryClientComList(params) {
  return request({
    url: '/api/client-com-list',
    method: 'get',
    params: params
  })
}
export function getContactsByComId(params) {
  return request({
    url: '/api/contacts-by-com-id',
    method: 'get',
    params: params
  })
}
export function getClientComById(params) {
  return request({
    url: '/api/client-com-by-id',
    method: 'get',
    params: params
  })
}
export function updateClientCom(params) {
  return request({
    url: '/api/client-com',
    method: 'put',
    data: params
  })
}
export function saveClientCom(params) {
  return request({
    url: '/api/client-com',
    method: 'post',
    data: params
  })
}
export function deleteClientCom(id) {
  return request({
    url: `/api/client-com/${id}`,
    method: 'delete'
  })
}
export function unlockClient(params) {
  return request({
    url: '/api/unlock-client',
    method: 'post',
    data: params
  })
}
export function lockClient(params) {
  return request({
    url: '/api/lock-client',
    method: 'post',
    data: params
  })
}
export function transferClient(params, userId) {
  return request({
    url: '/api/trans-client?userId=' + userId,
    method: 'post',
    data: params
  })
}
export function getClientTraceHistory(params) {
  return request({
    url: '/api/client-trace-history',
    method: 'get',
    params: params
  })
}
export function getAddressByCodeAndType(params) {
  return request({
    url: '/api/addr-by-code-and-type',
    method: 'get',
    params: params
  })
}
export function getFullAddressByCode(params) {
  return request({
    url: '/api/full-addr-by-code',
    method: 'get',
    params: params
  })
}
export function checkClientNameExist(params) {
  return request({
    url: '/api/check-client-name-exist',
    method: 'post',
    data: params
  })
}
export function checkContactNameExist(params) {
  return request({
    url: '/api/check-contact-name-exist',
    method: 'post',
    data: params
  })
}
export function checkContactPhoneNumExist(params) {
  return request({
    url: '/api/check-contact-phone-num-exist',
    method: 'post',
    data: params
  })
}
