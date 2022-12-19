import {
  queryTestTradeList,
  saveTestTrade,
  updateTestTrade,
  deleteTestTrade,
  queryTestTradeDetail,
  saveTestQuotation,
  saveTestWorkOrder,
  saveTestReport,
  queryTestQuotationList,
  deleteTestQuotation,
  updateTestQuotation,
  updateTestTradeStatus,
  queryTestApplicationFormList,
  queryTestWordOrderList,
  queryTestReportList,
  auditTestApply,
  deleteTestReport,
  deleteTestWorkOrder,
  deleteTestApply,
  saveTestApplicationForm,
  updateTestReport,
  updateTestWorkOrder,
  updateTestApply,
  updateTestCustomService
} from '@/api/transaction'
import { getToken } from '@/utils/auth'
import { downTestQuotation, previewTestQuotation } from "@/api/transaction"

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const actions = {
  queryTestTradeList({ commit }, params) {
    return new Promise((resolve, reject) => {
      queryTestTradeList(params).then(response => {
        const { data } = response
        if (!data) {
          reject('获取失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTestQuotationList({ commit }, params) {
    return new Promise((resolve, reject) => {
      queryTestQuotationList(params).then(response => {
        const { data } = response
        if (!data) {
          reject('获取失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTestApplicationFormList({ commit }, params) {
    return new Promise((resolve, reject) => {
      queryTestApplicationFormList(params).then(response => {
        const { data } = response
        if (!data) {
          reject('获取失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTestWordOrderList({ commit }, params) {
    return new Promise((resolve, reject) => {
      queryTestWordOrderList(params).then(response => {
        const { data } = response
        if (!data) {
          reject('获取失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTestReportList({ commit }, params) {
    return new Promise((resolve, reject) => {
      queryTestReportList(params).then(response => {
        const { data } = response
        if (!data) {
          reject('获取失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveTestTrade({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTestTrade(params).then(response => {
        const { data } = response
        if (!data) {
          reject('保存失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTestTrade({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTestTrade(params).then(response => {
        const { data } = response
        if (!data) {
          reject('更新失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTestTradeStatus({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTestTradeStatus(params).then(response => {
        const { data } = response
        if (!data) {
          reject('更新失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTestQuotation({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTestQuotation(params).then(response => {
        const { data } = response
        if (!data) {
          reject('更新失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTestApply({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTestApply(params).then(response => {
        const { data } = response
        if (!data) {
          reject('更新失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTestWorkOrder({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTestWorkOrder(params).then(response => {
        const { data } = response
        if (!data) {
          reject('更新失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTestReport({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTestReport(params).then(response => {
        const { data } = response
        if (!data) {
          reject('更新失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteTestTrade({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTestTrade(params).then(response => {
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
  deleteTestQuotation({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTestQuotation(params).then(response => {
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
  deleteTestApply({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTestApply(params).then(response => {
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
  deleteTestWorkOrder({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTestWorkOrder(params).then(response => {
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
  deleteTestReport({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTestReport(params).then(response => {
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
  queryTestTradeDetail({ commit }, params) {
    return new Promise((resolve, reject) => {
      queryTestTradeDetail(params).then(response => {
        const { data } = response
        if (!data) {
          reject('获取失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveTestQuotation({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTestQuotation(params).then(response => {
        const { data } = response
        if (!data) {
          reject('保存失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveTestApplicationForm({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTestApplicationForm(params).then(response => {
        const { data } = response
        if (!data) {
          reject('保存失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveTestWorkOrder({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTestWorkOrder(params).then(response => {
        const { data } = response
        if (!data) {
          reject('保存失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveTestReport({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTestReport(params).then(response => {
        const { data } = response
        if (!data) {
          reject('保存失败，请稍后再试~')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  downloadTestQuotation({ commit }, params) {
    return new Promise((resolve, reject) => {
      downTestQuotation(params).then(response => {
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
  previewTestQuotation({ commit }, param) {
    return new Promise((resolve, reject) => {
      previewTestQuotation({ encryptionKey: param }).then(response => {
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
  auditTestApply({ commit }, param) {
    return new Promise((resolve, reject) => {
      auditTestApply(param).then(response => {
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
  updateTestCustomService({ commit }, param) {
    return new Promise((resolve, reject) => {
      updateTestCustomService(param).then(response => {
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
