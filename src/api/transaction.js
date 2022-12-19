import request from '@/utils/request'

export function queryTestTradeList(params) {
  return request({
    url: '/api/test/queryTestTradeList',
    method: 'get',
    params: params
  })
}
export function queryTestQuotationList(params) {
  return request({
    url: '/api/test/queryTestQuotationList',
    method: 'get',
    params: params
  })
}
export function queryTestApplicationFormList(params) {
  return request({
    url: '/api/test/queryTestApplicationFormList',
    method: 'get',
    params: params
  })
}
export function queryTestWordOrderList(params) {
  return request({
    url: '/api/test/queryTestWordOrderList',
    method: 'get',
    params: params
  })
}
export function queryTestReportList(params) {
  return request({
    url: '/api/test/queryTestReportList',
    method: 'get',
    params: params
  })
}
export function saveTestTrade(data) {
  return request({
    url: '/api/test/saveTestTrade',
    method: 'post',
    data
  })
}
export function updateTestTrade(data) {
  return request({
    url: '/api/test/updateTestTrade',
    method: 'post',
    data
  })
}
export function updateTestTradeStatus(data) {
  return request({
    url: '/api/test/updateTestTrade/status',
    method: 'post',
    params: data
  })
}
export function updateTestQuotation(data) {
  return request({
    url: '/api/test/updateTestQuotation',
    method: 'post',
    data
  })
}
export function updateTestApply(data) {
  return request({
    url: '/api/test/updateTestApply',
    method: 'post',
    data
  })
}
export function updateTestWorkOrder(data) {
  return request({
    url: '/api/test/updateTestWorkOrder',
    method: 'post',
    data
  })
}
export function updateTestReport(data) {
  return request({
    url: '/api/test/updateTestReport',
    method: 'post',
    data
  })
}
export function deleteTestTrade(params) {
  return request({
    url: '/api/test/deleteTestTrade',
    method: 'delete',
    params: params
  })
}
export function deleteTestQuotation(params) {
  return request({
    url: '/api/test/deleteTestQuotation',
    method: 'delete',
    params: params
  })
}
export function deleteTestApply(params) {
  return request({
    url: '/api/test/deleteTestApply',
    method: 'delete',
    params: params
  })
}
export function deleteTestWorkOrder(params) {
  return request({
    url: '/api/test/deleteTestWorkOrder',
    method: 'delete',
    params: params
  })
}
export function deleteTestReport(params) {
  return request({
    url: '/api/test/deleteTestReport',
    method: 'delete',
    params: params
  })
}
export function queryTestTradeDetail(params) {
  return request({
    url: '/api/test/queryAllFormByTestTradeId',
    method: 'get',
    params: params
  })
}
export function saveTestQuotation(data) {
  return request({
    url: '/api/test/saveTestQuotation',
    method: 'post',
    data
  })
}
export function saveTestApplicationForm(data) {
  return request({
    url: '/api/test/saveTestApplicationForm',
    method: 'post',
    data
  })
}
export function saveTestWorkOrder(data) {
  return request({
    url: '/api/test/saveTestWorkOrder',
    method: 'post',
    data
  })
}
export function saveTestReport(data) {
  return request({
    url: '/api/test/saveTestReport',
    method: 'post',
    data
  })
}
export function previewTestQuotation(params) {
  return request({
    url: '/api/certification/previewByEncryptionKey',
    method: 'get',
    params: params
  })
}
export function downTestQuotation(params) {
  return request({
    url: '/api/test/downloadTestQuotation',
    method: 'get',
    params: params
  })
}
export function auditTestApply(params) {
  return request({
    url: '/api/test/auditTestApply',
    method: 'post',
    data: params
  })
}
export function getTestTradeStatus(data) {
  return request({
    url: '/api/test/getTestTradeStatus',
    method: 'get',
    params: data
  })
}
export function getTestReportImages(params) {
  return request({
    url: '/api/test/test-report-image',
    method: 'get',
    params: params
  })
}
export function updateTestCustomService(params) {
  return request({
    url: '/api/test/updateTestCustomService',
    method: 'post',
    params: params
  })
}
