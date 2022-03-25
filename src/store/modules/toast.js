import { useToast, POSITION } from 'vue-toastification'
import debounce from '@/utils/debouncer'

const toast = useToast()

const OPTION = {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  toastClassName: 'toast-container'
}

const actions = {
  toastSuccess(_, message) {
    toast.success(message, OPTION)
  },
  toastInfo(_, message) {
    toast.info(message, OPTION)
  },
  toastError(_, errorMessage) {
    toast.error(errorMessage, OPTION)
  },
  toastGeneralError() {
    debounce(() => toast.error('Something went wrong, please try again', OPTION), 300, 'toast')
  }
}

export default { actions }
