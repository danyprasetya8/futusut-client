import api from '@/constant/api'
import axios from '@/axios'

const actions = {
  getServices(_, { onSuccess, onFail } = {}) {
    return axios.get(api.services)
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  },
  getService(_, { payload = {}, onSuccess, onFail } = {}) {
    return axios.get(api.service(payload.serviceId))
      .then(res => onSuccess && onSuccess(res))
      .catch(err => onFail && onFail(err))
  }
}

export default { actions }
