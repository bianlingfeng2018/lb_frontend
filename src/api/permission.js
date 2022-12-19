import request from '@/utils/request'

export function getRoutesByPage(params) {
  return request({
    url: '/api/routes-page',
    method: 'get',
    params: params
  })
}

export function addPermission(data) {
  return request({
    url: '/api/permission',
    method: 'post',
    data
  })
}

export function updatePermission(id, data) {
  return request({
    url: `/api/permission/${id}`,
    method: 'put',
    data
  })
}

export function deletePermission(id) {
  return request({
    url: `/api/permission/${id}`,
    method: 'delete'
  })
}
