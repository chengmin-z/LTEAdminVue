import { universeQuery, kpiInfoQuery } from '@/api/query'
import { analysisC2I, analysisC2I3, getKPIPRBInfo } from '@/api/analyze'

const actions = {
  universeQuery({ commit }, dbInfo) {
    const keyandvalues = dbInfo.keyandvalues
    const { tableName, currentPage } = dbInfo
    console.log(keyandvalues)
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      for (const keyandvalue of keyandvalues) {
        formData.append(keyandvalue.key, keyandvalue.value)
      }
      formData.append('tableName', tableName)
      formData.append('currentPage', currentPage)
      console.log(formData)
      universeQuery(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  kpiInfoQuery({ commit }, info) {
    const { startTimeStamp, endTimeStamp, field, communityName } = info
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('startTimeStamp', startTimeStamp)
      formData.append('endTimeStamp', endTimeStamp)
      formData.append('communityName', communityName)
      formData.append('field', field)
      kpiInfoQuery(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  analyzeC2I({ commit }, info) {
    const { threshold } = info
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('threshold', threshold)
      analysisC2I(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  analyzeC2I3({ commit }, info) {
    const { x } = info
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('x', x)
      analysisC2I3(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getKPIPRBInfo({ commit }, info) {
    const { type } = info
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('type', type)
      getKPIPRBInfo(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  actions
}
