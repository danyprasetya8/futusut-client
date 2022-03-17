import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import './assets/tailwind.css'
import 'v-calendar/dist/style.css';

require('@api-mock')

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(store)
app.mount('#app')
