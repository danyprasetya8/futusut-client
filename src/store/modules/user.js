import api from '@/constant/api'
import axios from '@/axios'

const state = {
  currentUser: { null: true },
  isGettingUser: true
}

const getters = {
  currentUser (state) {
    return state.currentUser
  },
  isGettingUser (state) {
    return state.isGettingUser
  }
}

const mutations = {
  setCurrentUser (state, value) {
    state.currentUser = value
  },
  setGettingUser (state, value) {
    state.isGettingUser = value
  },
  clearCurrentUser (state) {
    state.currentUser = { null: true }
  }
}

const actions = {
  login ({ commit }, { payload = {}, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.post(api.user.login, payload)
      .then(res => {
        commit('setIsLoading', false)
        onSuccess && onSuccess(res)
      })
      .catch(err => {
        commit('setIsLoading', false)
        onFail && onFail(err)
      })
  },
  getCurrentUser ({ commit }, { onSuccess, onFail } = {}) {
    commit('setGettingUser', true)
    return axios.get(api.user.base)
      .then(res => {
        commit('setGettingUser', false)
        commit('setCurrentUser', res.data.user)
        onSuccess && onSuccess(res)
      })
      .catch(err => {
        commit('setGettingUser', false)
        onFail && onFail(err)
      })
  } 
}

export default {
  actions,
  getters,
  mutations,
  state
}
