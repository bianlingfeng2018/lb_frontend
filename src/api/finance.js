import request from '@/utils/request'

export function downloadAuditPart(params) {
  return request({
    url: '/api/test/downloadAuditPart',
    method: 'get',
    params: params,
    responseType: "blob"
  })
}
export function getFinancesPage(params) {
  return request({
    url: '/api/finances-page',
    method: 'get',
    params: params
  })
}
export function getFinanceById(id) {
  return request({
    url: `/api/finance/${id}`,
    method: 'get'
  })
}
export function addFinance(data) {
  return request({
    url: '/api/finance',
    method: 'post',
    data: data
  })
}
export function deleteFinance(id) {
  return request({
    url: `/api/finance/${id}`,
    method: 'delete'
  })
}
export function updateFinance(id, data) {
  return request({
    url: `/api/finance/${id}`,
    method: 'put',
    data: data
  })
}
// export function updateFinanceAttach(data) {
//   return request({
//     url: '/api/test/update-finance-attach',
//     method: 'post',
//     data: data
//   })
// }
export function getTestTradeApplicationFormPDFs(params) {
  return request({
    url: '/api/test-trade-application-form-pdf',
    method: 'get',
    params: params
  })
}
export function getTestTradeApplicationFormImages(params) {
  return request({
    url: '/api/test-trade-application-form-image',
    method: 'get',
    params: params
  })
}

