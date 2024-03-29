import api from '@/constant/api'
import axios from '@/axios'

const state = {
  currentBook: {}
}

const mutations = {
  setCurrentBook(state, value) {
    state.currentBook = value
  }
}

const getters = {
  currentBook(state) {
    return state.currentBook
  }
}

const actions = {
  getReservedBookingTimes({ commit, dispatch }, { payload = {}, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.get(api.reservedBookingTime, { params: { ...payload } })
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
  isBookingTimesAvailable(_, { payload = {}, onSuccess, onFail } = {}) {
    const { timestamps = [] } = payload
    const promises = timestamps.map(timestamp => axios.get(api.bookingTimeAvailability, { params: { timestamp } }))
    return Promise.all(promises)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  },
  createBooking({ commit, dispatch }, { payload = {}, onSuccess, onFail } = {}) {
    commit('setIsLoading', true)
    return axios.post(api.book, payload)
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
  getCheckoutDetail({ commit, dispatch }, { payload = {}, onSuccess, onFail }) {
    commit('setIsLoading', true)
    return axios.get(api.bookingDetail, { params: payload })
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

export default { actions, getters, state, mutations }
