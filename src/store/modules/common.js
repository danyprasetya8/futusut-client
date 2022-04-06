import api from '@/constant/api'
import axios from '@/axios'

const state = {
  isLoading: false
}

const mutations = {
  setIsLoading(state, value) {
    state.isLoading = value
  }
}

const getters = {
  isLoading(state) {
    return state.isLoading
  }
}

const actions = {
  subscribeNewsletter(_, { payload = {}, onSuccess, onFail } = {}) {
    return axios.post(api.subscription, payload)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  },
  sendFeedback({ commit, dispatch }, { payload = {}, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.post(api.feedback, payload)
      .then(res => {
        commit('setIsLoading', false)
        onSuccess && onSuccess(res)
      })
      .catch(err => {
        commit('setIsLoading', false)
        dispatch('toastGeneralError')
        onFail && onFail(err)
      })
  }
}

export default { actions, state, mutations, getters }
