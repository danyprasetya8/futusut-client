<template>
  <section class="flex h-screen">
    <section class="w-1/2 flex justify-center items-start xl:items-center">
      <img
        src="~@/assets/images/logo.png"
        class="w-3/4 xl:w-1/2 mt-8 xl:mt-0"
        alt=""
      >
    </section>

    <section class="w-1/2 flex justify-center items-center bg-black">
      <form
        class="rounded w-11/12 xl:w-7/12 shadow-lg p-8 bg-white fixed xl:relative top-1/2 xl:top-auto left-1/2 xl:left-auto transform -translate-x-1/2 xl:translate-x-0 -translate-y-1/2 xl:translate-y-0"
        @submit="login"
      >
        <div class="text-center font-bold text-2xl mb-6">
          ADMIN MENU
        </div>

        <div class="mb-4">
          <div class="mb-4 text-gray-800">
            Email
          </div>
          <div class="py-2 px-4 border border-gray-300 rounded">
            <input
              v-model="form.email"
              type="text"
              class="outline-none w-full"
            >
          </div>
          <div class="text-xs text-red-400 mt-2">
            {{ error.email }}
          </div>
        </div>

        <div class="mb-8">
          <div class="mb-4 text-gray-800">
            Password
          </div>
          <div class="py-2 px-4 border border-gray-300 rounded">
            <input
              v-model="form.password"
              type="password"
              class="outline-none w-full"
            >
          </div>
        </div>

        <button
          type="submit"
          class="text-center w-full text-white py-2.5 bg-black hover:bg-gray-800 rounded transition duration-150 ease-linear"
        >
          Login
        </button>
      </form>
    </section>
  </section>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { isValidEmail } from '@/utils/validation'
import config from '@/constant/config'

const form = ref({
  email: '',
  password: ''
})

const error = ref({
  email: ''
})

const store = useStore()
const route = useRoute()
const router = useRouter()

const isValidForm = () => {
  if (!isValidEmail(form.value.email)) {
    error.value.email = 'Must be valid email'
    return false
  }

  return true
}

const login = e => {
  e.preventDefault()
  error.value.email = ''

  if (isValidForm()) {
    store.dispatch('login', {
      payload: form.value,
      onSuccess: loginOnSuccess,
      onFail: () => {
        store.dispatch('toastError', 'Incorrect email/password')
      }
    })
  }
}

const loginOnSuccess = res => {
  window.localStorage.setItem('token', res.data.token)
  store.commit('setIsLoading', true)
  store.dispatch('getCurrentUser', {
    onSuccess: () => {
      store.commit('setIsLoading', false)
      if (route.query.redirect) {
        const parsed = Buffer.from(route.query.redirect, 'base64')
          .toString('ascii')

        router.push(parsed)
        return
      }
      router.push(config.page.admin)
    },
    onFail: () => store.commit('setIsLoading', false)
  })
}
</script>
