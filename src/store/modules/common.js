import api from '@/constant/api'
import axios from '@/axios'

const actions = {
  getBanners(_, { onSuccess, onFail } = {}) {
    return axios.get(api.banner)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  },
  subscribeNewsletter(_, { payload = {}, onSuccess, onFail } = {}) {
    return axios.post(api.subscription, payload)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  },
  sendFeedback(_, { payload = {}, onSuccess, onFail } = {}) {
    return axios.post(api.feedback, payload)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  }
}

export default { actions }
