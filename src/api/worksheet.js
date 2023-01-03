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


