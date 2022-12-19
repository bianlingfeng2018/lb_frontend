import { queryClientComPage, saveClientCom, updateClientCom } from "@/api/clientCompany"

const state = {
}

const actions = {
  queryClientComPage({ commit }, param) {
    return new Promise((resolve, reject) => {
      queryClientComPage(param)
        .then((response) => {
          const { data } = response
          if (!data) {
            reject("获取失败，请稍后再试~")
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateClientCom({ commit }, param) {
    return new Promise((resolve, reject) => {
      updateClientCom(param)
        .then((response) => {
          const { data } = response
          if (!data) {
            reject("获取失败，请稍后再试~")
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  saveClientCom({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveClientCom(param)
        .then((response) => {
          const { data } = response
          if (!data) {
            reject("获取失败，请稍后再试~")
          }
          resolve(response)
        })
        .catch((error) => {
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
