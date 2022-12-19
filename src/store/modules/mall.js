import { getGoodsById, getGoodsPage, saveGoods, updateGoods } from "@/api/mall"

const state = {
}

const actions = {
  saveGoods({ commit }, param) {
    return new Promise((resolve, reject) => {
      saveGoods(param)
        .then((response) => {
          const { data, errorMessage } = response
          if (!data) {
            reject(errorMessage)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateGoods({ commit }, param) {
    return new Promise((resolve, reject) => {
      updateGoods(param)
        .then((response) => {
          const { data, errorMessage } = response
          if (!data) {
            reject(errorMessage)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getGoodsPage({ commit }, param) {
    return new Promise((resolve, reject) => {
      getGoodsPage(param)
        .then((response) => {
          const { data, errorMessage } = response
          if (!data) {
            reject(errorMessage)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getGoodsById({ commit }, param) {
    return new Promise((resolve, reject) => {
      getGoodsById(param)
        .then((response) => {
          const { data, errorMessage } = response
          if (!data) {
            reject(errorMessage)
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
