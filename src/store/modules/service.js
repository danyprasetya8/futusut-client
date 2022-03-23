import api from '@/constant/api'
import axios from '@/axios'

const actions = {
  getServices(_, { onSuccess, onFail } = {}) {
    return axios.get(api.services)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  },
  getService({ commit, dispatch }, { payload = {}, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.get(api.service, { params: payload })
      .then(res => {
        commit('setIsLoading', false)
        onSuccess && onSuccess(res)
      })
      .catch(err => {
        commit('setIsLoading', false)
        dispatch('toastGeneralError')
        onFail && onFail(err)
      })
  },
  getServiceAddOns(_, { onSuccess, onFail } = {}) {
    return axios.get(api.addOns)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  }
}

export default { actions }
