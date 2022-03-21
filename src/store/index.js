import { createStore } from 'vuex'
import adminBookingModule from './modules/admin-booking'
import bookModule from './modules/book'
import commonModule from './modules/common'
import responsiveModule from './modules/responsive'
import serviceModule from './modules/service'
import toastModule from './modules/toast'

export default createStore({
  modules: {
    adminBookingModule,
    bookModule,
    commonModule,
    responsiveModule,
    serviceModule,
    toastModule
  }
})
