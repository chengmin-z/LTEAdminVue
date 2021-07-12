import { updateDbInfo, uploadTable, getDownloadUrl } from '@/api/db'

const actions = {
  updateDbInfo({ commit }, dbInfo) {
    const { key, value } = dbInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append(key, value)
      updateDbInfo(formData).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  uploadTable({ commit }, tableInfo) {
    const { tableName, file } = tableInfo
    return new Promise((resolve, reject) => {
      console.log(file)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tableName', tableName)
      uploadTable(formData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDownloadUrl({ commit }, tableInfo) {
    const { tableName } = tableInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('tableName', tableName)
      getDownloadUrl(formData).then(response => {
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
