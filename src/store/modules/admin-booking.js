import api from '@/constant/api'
import axios from '@/axios'

const actions = {
  getBookingList({ commit, dispatch }, { payload, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.get(api.admin.booking, { params: payload })
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
  getBookingDetail({ commit, dispatch }, { payload, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.get(api.admin.bookingDetail(payload.bookingId))
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

export default { actions }
