import requestsh from '@/utils/request-sh'

//获取组织机构树
export function getTreesPage(data) {
  return requestsh({
    url: '/org/tree',
    method: 'post',
    data
  })
}
//下属组织列表
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
//获取负责人
export function deletePermission(id) {
  return requestsh({
    url: `/api/permission/${id}`,
    method: 'delete'
  })
}
