import { createStore } from 'vuex'
import userModule from './modules/user'
import snackbarModule from './modules/snackbar'

export default createStore({
  modules: {
    userModule,
    snackbarModule
  }
})
