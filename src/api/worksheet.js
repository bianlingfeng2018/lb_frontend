import requestsh from '@/utils/request-sh'

//工作单列表接口
export function getworkOrderList(data) {
  return requestsh({
    url: '/workOrder/list',
    method: 'post',
    data
  })
}

//确认工作单
export function getworkConfirm(data) {
  return requestsh({
    url: '/workOrder/confirm',
    method: 'post',
    data
  })
}

//删除工作单
export function getworkDelete(data) {
  return requestsh({
    url: '/workOrder/delete',
    method: 'post',
    data
  })
}

//工作单详情
export function getworkDetail(data) {
  return requestsh({
    url: '/workOrder/detail',
    method: 'post',
    data
  })
}

// 上传样品图片
export function getworkUpload(data) {
  return requestsh({
    url: '/workOrder/upload',
    method: 'post',
    data
  })
}

// 原始记录单列表
export function getoriList(data) {
  return requestsh({
    url: '/ori/list',
    method: 'post',
    data
  })
}

// 原始记录单详情
export function getoriDetail(data) {
  return requestsh({
    url: '/ori/detail',
    method: 'post',
    data
  })
}

// 审核原始记录单
export function getoriReview(data) {
  return requestsh({
    url: '/ori/review',
    method: 'post',
    data
  })
}

// 上传文件
export function getoriUpload(data) {
  return requestsh({
    url: '/ori/upload',
    method: 'post',
    data
  })
}


//检测报告单列表
export function getReportList(data) {
  return requestsh({
    url: '/report/list',
    method: 'post',
    data
  })
}

//检测报告单审核
export function approveReport(data) {
  return requestsh({
    url: '/report/approve',
    method: 'post',
    data
  })
}
//检测报告单审核
export function approveReportBatch(data) {
  return requestsh({
    url: '/report/approveBatch',
    method: 'post',
    data
  })
}


