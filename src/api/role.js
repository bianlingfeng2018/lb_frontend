import request from '@/utils/request'

export function getRolesByPage(params) {
  return request({
    url: '/api/roles-page',
    method: 'get',
    params: params
  })
}

export function getRoles() {
  return request({
    url: '/api/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/api/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/role/${id}`,
    method: 'delete'
  })
}
