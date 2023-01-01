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

export function getAllIncomeBill(data) {
  return requestsh({
    url: '/bill/getAllIncomeBill',
    method: 'post',
    data
  })
}
export function getAllOutBill(data) {
  return requestsh({
    url: '/bill/getAllOutBill',
    method: 'post',
    data
  })
}
export function addOneOutBill(data) {
  return requestsh({
    url: '/bill/addOneOutBill',
    method: 'post',
    data
  })
}
export function addOneIncomeBill(data) {
  return requestsh({
    url: '/bill/addOneIncomeBill',
    method: 'post',
    data
  })
}
export function addOutBillBatch(data) {
  return requestsh({
    url: '/bill/addOutBillBatch',
    method: 'post',
    data
  })
}

