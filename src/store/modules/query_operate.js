import { universeQuery } from '@/api/query'
import { analysisC2I, analysisC2I3 } from '@/api/analyze'

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
      console.log('formData')
      console.log(formData)
      universeQuery(formData).then(response => {
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
  }
}
export default {
  namespaced: true,
  actions
}
