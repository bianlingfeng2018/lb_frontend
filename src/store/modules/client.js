import { getToken } from "@/utils/auth"
import { addUser, updateUser } from "@/api/user"

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: []
}

const actions = {
  updateClient({ commit }, param1, param2) {
    return new Promise((resolve, reject) => {
      updateUser(param1, param2)
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
  saveClient({ commit }, param) {
    return new Promise((resolve, reject) => {
      addUser(param)
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
