import {
  getCertList, delCert, getCustomerList,
  getCustomerListWithPages, uploadVertification,
  downloadCert, previewCert
} from '@/api/cert'
import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const actions = {
  getCertList({ commit, state }, param) {
    return new Promise((resolve, reject) => {
      getCertList(param).then(response => {
        const { data } = response
        if (!data) {
          reject('获取数据失败，请稍后再试哦~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delCert({ commit }, param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      delCert({ certificationId: param }).then(response => {
        const { data } = response
        if (!data) {
          reject('删除失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCustomerList({ commit }) {
    return new Promise((resolve, reject) => {
      getCustomerList().then(response => {
        const { data } = response
        if (!data) {
          reject('删除失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCustomerListWithPages({ commit }) {
    return new Promise((resolve, reject) => {
      getCustomerListWithPages().then(response => {
        const { data } = response
        if (!data) {
          reject('删除失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  uploadVertification({ commit }, param) {
    const { name, username, desc } = param
    return new Promise((resolve, reject) => {
      uploadVertification({ name: name, username: username, desc: desc }).then(response => {
        const { data } = response
        if (!data) {
          reject('保存，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  downloadCert({ commit }, param) {
    return new Promise((resolve, reject) => {
      downloadCert({ encryptionKey: param }).then(response => {
        const { data, errorMessage } = response
        if (!data) {
          reject(errorMessage)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  previewCert({ commit }, param) {
    return new Promise((resolve, reject) => {
      previewCert({ encryptionKey: param }).then(response => {
        const { data, errorMessage } = response
        if (!data) {
          reject(errorMessage)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  actions
}
