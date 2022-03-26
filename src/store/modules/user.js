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
        onSuccess && onSuccess(res)
        commit('setIsLoading', false)
      })
      .catch(err => {
        commit('setIsLoading', false)
        onFail && onFail(err)
      })
  },
  logout ({ commit, dispatch }, { payload = {}, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.delete(api.user.logout, { data: payload })
      .then(res => {
        onSuccess && onSuccess(res)
        commit('setIsLoading', false)
      })
      .catch(err => {
        commit('setIsLoading', false)
        dispatch('toastGeneralError')
        onFail && onFail(err)
      })
  },
  getCurrentUser ({ commit }, { onSuccess, onFail } = {}) {
    commit('setGettingUser', true)
    commit('setIsLoading', true)
    return axios.get(api.user.base)
      .then(res => {
        commit('setGettingUser', false)
        commit('setIsLoading', false)
        commit('setCurrentUser', res.data.data)
        onSuccess && onSuccess(res)
      })
      .catch(err => {
        commit('setGettingUser', false)
        commit('setIsLoading', false)
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
