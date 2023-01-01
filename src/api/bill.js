import requestsh from '@/utils/request-sh'

// 获取商户账户列表
export function getPersonalBillList(data) {
  return requestsh({
    url: '/bill/getPersonalBillList',
    method: 'post',
    data
  })
}

export function updatePersonalBillBatch(data) {
  return requestsh({
    url: '/bill/updatePersonalBillBatch',
    method: 'post',
    data
  })
}

export function updatePersonalBill(data) {
  return requestsh({
    url: '/bill/updatePersonalBill',
    method: 'post',
    data
  })
}

