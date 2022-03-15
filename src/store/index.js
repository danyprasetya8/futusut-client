import { createStore } from 'vuex'
import responsiveModule from './modules/responsive'
import commonModule from './modules/common'
import serviceModule from './modules/service'

export default createStore({
  modules: {
    responsiveModule,
    commonModule,
    serviceModule
  }
})
