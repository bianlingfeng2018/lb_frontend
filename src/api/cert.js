import request from '@/utils/request'
export function getCertList(param) {
  return request({
    url: '/api/certification/queryList',
    method: 'get',
    params: param
  })
}
export function delCert(params) {
  return request({
    url: '/api/certification/delete',
    method: 'delete',
    params: params
  })
}
export function getCustomerList() {
  return request({
    url: '/api/user/queryList',
    method: 'get'
  })
}
export function getCustomerListWithPages() {
  return request({
    url: '/api/user/queryListWithPages',
    method: 'get'
  })
}
export function uploadVertification(data) {
  return request({
    url: '/api/certification/uploadCertification',
    method: 'post',
    data
  })
}
export function downloadCert(params) {
  return request({
    url: '/api/certification/queryFileNameByEncryptionKey',
    method: 'get',
    params: params
  })
}
export function previewCert(params) {
  return request({
    url: '/api/certification/previewByEncryptionKey',
    method: 'get',
    params: params
  })
}
