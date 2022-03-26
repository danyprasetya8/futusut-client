<template>
  <section class="flex h-screen">
    <section class="w-1/2 flex justify-center items-center">
      <img
        src="~@/assets/images/logo.png"
        class="w-1/2"
        alt=""
      >
    </section>

    <section class="w-1/2 flex justify-center items-center bg-black">
      <form
        class="rounded-lg w-3/5 p-12 bg-white"
        @submit="login"
      >
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
          class="text-center w-full text-white py-2.5 bg-sky-800 hover:bg-sky-600 transition duration-150 ease-linear"
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
import { isValidEmail } from '@/utils/validation'

const form = ref({
  email: '',
  password: ''
})

const error = ref({
  email: ''
})

const store = useStore()

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
    console.log(form.value)
  }
}
</script>
