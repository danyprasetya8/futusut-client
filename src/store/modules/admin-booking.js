import api from '@/constant/api'
import axios from '@/axios'

const actions = {
  getBookingList({ dispatch }, { payload, onSuccess, onFail } = {}) {
    return axios.get(api.admin.booking, { params: payload })
      .then(res => onSuccess && onSuccess(res))
      .catch(err => {
        dispatch('toastGeneralError')
        onFail && onFail(err)
      })
  },
  getBookingDetail({ commit, dispatch }, { payload, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.get(api.admin.bookingDetail, { params: payload })
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
  rescheduleBooking({ commit, dispatch }, { payload, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.put(api.admin.reschedule, payload)
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
