import { login, logout, getInfo, addUser, deleteUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('username', username.trim())
      formData.append('password', password)
      login(formData).then(response => {
        const { detail } = response
        commit('SET_TOKEN', detail.token)
        setToken(detail.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // add user
  addUser({ commit }, userInfo) {
    const { username, password, role } = userInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('username', username.trim())
      formData.append('password', password)
      formData.append('role', role)
      addUser(formData).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // delete user
  deleteUser({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('username', username.trim())
      deleteUser(formData).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { detail } = response
        if (!detail) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_NAME', detail.username)
        commit('SET_AVATAR', detail.avatar)
        commit('SET_ROLE', detail.role)
        resolve(detail)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

