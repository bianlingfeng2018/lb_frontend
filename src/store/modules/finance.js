import { getToken } from "@/utils/auth"
import { downloadAuditPart } from "@/api/finance"
const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: []
}

const actions = {
  downloadAuditPart({ commit }, param) {
    return new Promise((resolve, reject) => {
      downloadAuditPart(param)
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
