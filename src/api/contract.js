import requestsh from '@/utils/request-sh'

// 获取合同列表
export function getContractList(data) {
  return requestsh({
    url: '/contract/list',
    method: 'post',
    data
  })
}
// 新增合同
export function getContractAdd(data) {
  return requestsh({
    url: '/contract/add',
    method: 'post',
    data
  })
}
// 编辑合同
export function getContractModify(data) {
  return requestsh({
    url: '/contract/modify',
    method: 'post',
    data
  })
}

// 合同详情
export function getContractDetail(data) {
  return requestsh({
    url: '/contract/detail',
    method: 'post',
    data
  })
}

// 审核合同
export function getContractReview(data) {
  return requestsh({
    url: '/contract/review',
    method: 'post',
    data
  })
}

// 上传文件
export function getContractUpload(data) {
  return requestsh({
    url: '/contract/upload',
    method: 'post',
    data
  })
}



