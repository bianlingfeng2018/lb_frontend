import requestsh from '@/utils/request-sh'

//获取商户账户列表
export function getBalanceList(data) {
  return requestsh({
    url: '/balance/getBalanceList',
    method: 'post',
    data
  })
}
//设置商户账户信用额度
export function setCreditLimit(data) {
  return requestsh({
    url: '/balance/setCreditLimit',
    method: 'post',
    data
  })
}
export function addOrg(data) {
  return requestsh({
    url: '/org/create',
    method: 'post',
    data
  })
}

export function updateOrg(data) {
  return requestsh({
    url: '/org/modify',
    method: 'post',
    data
  })
}
//获取负责人
export function deletePermission(id) {
  return requestsh({
    url: `/api/permission/${id}`,
    method: 'delete'
  })
}
