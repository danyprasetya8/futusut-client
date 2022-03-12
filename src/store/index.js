import { createStore } from 'vuex'
import responsiveModule from './modules/responsive'

export default createStore({
  modules: {
    responsiveModule
  }
})
