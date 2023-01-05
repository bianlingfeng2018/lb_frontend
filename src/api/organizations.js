import requestsh from '@/utils/request-sh'

// 获取组织机构树
export function getTreesPage(data) {
  return requestsh({
    url: '/org/tree',
    method: 'post',
    data
  })
}
// 下属组织列表
export function getTreeList(data) {
  return requestsh({
    url: '/org/list',
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
// 获取报价单列表
export function getQuotationList(data) {
  return requestsh({
    url: '/quotation/list',
    method: 'post',
    data
  })
}
// 审核报价单
export function getQuotationExamine(data) {
  return requestsh({
    url: '/quotation/examine',
    method: 'post',
    data
  })
}
// 获取报价单详情
export function getQuotationDetail(data) {
  return requestsh({
    url: '/quotation/detail',
    method: 'post',
    data
  })
}
// 修改报价单
export function editQuotationDetail(data) {
  return requestsh({
    url: '/quotation/modify',
    method: 'post',
    data
  })
}
// 根据客户姓名获取列表
export function getSearchName(data) {
  return requestsh({
    url: '/customer/search/name',
    method: 'post',
    data
  })
}
// 上传水单文件
export function getQuotationUpload(data) {
  return requestsh({
    url: '/quotation/upload',
    method: 'post',
    data
  })
}
// 上传水单
export function getQuotationConfirm(data) {
  return requestsh({
    url: '/quotation/confirm',
    method: 'post',
    data
  })
}
// 新增报价单
export function getQuotationCreate(data) {
  return requestsh({
    url: '/quotation/create',
    method: 'post',
    data
  })
}
// 获取商品列表
export function getProductList(data) {
  return requestsh({
    url: '/product/list',
    method: 'post',
    data
  })
}
// 获取出口国
export function getCountryList(data) {
  return requestsh({
    url: '/product/country/list',
    method: 'post',
    data
  })
}
// 获取基本检测项列表
export function getItemList(data) {
  return requestsh({
    url: '/product/item/list',
    method: 'post',
    data
  })
}
// 获取标准列表
export function getStandardList(data) {
  return requestsh({
    url: '/product/standard/list',
    method: 'post',
    data
  })
}
// 获取客服列表
export function getServiceList(data) {
  return requestsh({
    url: '/api/user/service/list',
    method: 'post',
    data
  })
}
// 创建商品
export function getProductCreate(data) {
  return requestsh({
    url: '/product/create',
    method: 'post',
    data
  })
}
// 获取费率
export function getRate(data) {
  return requestsh({
    url: '/quotation/getRate',
    method: 'post',
    data
  })
}

// 获取申请单列表
export function getApplicationList(data) {
  return requestsh({
    url: '/application/list',
    method: 'post',
    data
  })
}
// 获取申请单详情
export function getApplicationDetail(data) {
  return requestsh({
    url: '/application/detail',
    method: 'post',
    data
  })
}
// 新增申请单
export function getApplicationCreate(data) {
  return requestsh({
    url: '/application/create',
    method: 'post',
    data
  })
}
// 修改申请单
export function getApplicationModify(data) {
  return requestsh({
    url: '/application/modify',
    method: 'post',
    data
  })
}
// 审核申请单
export function getApplicationReview(data) {
  return requestsh({
    url: '/application/review',
    method: 'post',
    data
  })
}

// 获取检测方法和检测条件
export function getItemById(data) {
  return requestsh({
    url: '/test/getItemById',
    method: 'post',
    data
  })
}

