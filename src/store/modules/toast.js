import { useToast, POSITION } from 'vue-toastification'

const toast = useToast()

const OPTION = {
  position: POSITION.TOP_CENTER,
  timeout: 2000,
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
    toast.error('Something went wrong, please try again', OPTION)
  }
}

export default { actions }
