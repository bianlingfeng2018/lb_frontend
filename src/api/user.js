import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login/account',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/currentUser',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get'
  })
}

export function getUsersByPage(params) {
  return request({
    url: '/api/users-page',
    method: 'get',
    params: params
  })
}

export function getAllUsers() {
  return request({
    url: '/api/users',
    method: 'get'
  })
}

export function getAllUsersByRole(params) {
  return request({
    url: '/api/users-by-role',
    method: 'get',
    params: params
  })
}

export function getAllClientsByOwner(params) {
  return request({
    url: '/api/clients-by-owner',
    method: 'get',
    params: params
  })
}

export function getClientsByPageAndOwner(params) {
  return request({
    url: '/api/clients-page-by-owner',
    method: 'get',
    params: params
  })
}

export function getEmployeeByPage(params) {
  return request({
    url: '/api/employee-page',
    method: 'get',
    params: params
  })
}

export function updateUser(id, data) {
  return request({
    url: `/api/user/${id}`,
    method: 'put',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/api/user/${id}`,
    method: 'delete'
  })
}
export function addUserTestTradePer(data) {
  return request({
    url: '/api/user-test-trade-permission',
    method: 'post',
    data
  })
}
export function getUserByUsername(params) {
  return request({
    url: '/api/user-by-username',
    method: 'get',
    params: params
  })
}
export function getUserById(params) {
  return request({
    url: '/api/user-by-id',
    method: 'get',
    params: params
  })
}
export function updateUserPassword(params) {
  return request({
    url: '/api/updateUserPassword',
    method: 'post',
    params: params
  })
}
export function getUserByRoleAndTradeId(params) {
  return request({
    url: '/api/user-by-role-and-trade-id',
    method: 'get',
    params: params
  })
}
export function uploadSignature(data) {
  return request({
    url: '/api/upload-signature',
    method: 'post',
    data: data
  })
}
export function getUserSignature(params) {
  return request({
    url: '/api/user-signature',
    method: 'get',
    params: params
  })
}
