<template>
  <div class="bg-light-black text-white px-10 py-8 xl:px-24 xl:py-16">
    <section class="text-xl xl:text-3xl flex">
      <a
        href="https://instagram.com/futusut?utm_medium=copy_link"
        target="_blank"
        class="mb-4 mr-6 xl:mr-12 hover:text-gray-300 transition duration-150 ease"
      >
        Instagram
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=6281992123123"
        target="_blank"
        class="mb-4 hover:text-gray-300 transition duration-150 ease"
      >
        Whatsapp
      </a>
    </section>

    <div class="mt-6 xl:mt-16 mb-8 xl:mb-14">
      <form
        v-if="false"
        class="flex flex-col xl:flex-row"
        @submit="doSubscribe"
      >
        <div class="text-black p-2 xl:p-3 bg-white xl:w-1/3 mb-4 xl:mb-0">
          <input
            v-model="email"
            type="text"
            class="outline-none w-full"
            placeholder="Enter your email here"
          >
        </div>
        <button
          type="submit"
          class="xl:ml-8 text-lg hover:text-gray-300 transition duration-150 ease"
        >
          Subscribe Now
        </button>
      </form>
    </div>

    <section class="text-gray-400 flex flex-col items-center xl:flex-row justify-center">
      <div class="flex flex-col items-center xl:flex-row">
        <RouterLink
          :to="faq"
          class="mb-2 xl:mb-0 xl:mr-8 underline"
        >
          FAQ
        </RouterLink>
        <RouterLink
          :to="reschedulePolicy"
          class="mb-2 xl:mb-0 xl:mr-8 underline"
        >
          Reschedule Policy
        </RouterLink>
        <RouterLink
          :to="studioPolicy"
          class="underline"
        >
          Studio Policy & Protocols
        </RouterLink>
      </div>
    </section>
    <section class="text-gray-400 flex flex-col items-center xl:flex-row justify-center mt-8">
      &copy; 2022 by Futusut
    </section>
  </div>
</template>

<script setup>
import config from '@/constant/config'
import { ref } from 'vue'
import { isValidEmail } from '@/utils/validation'
import { useStore } from 'vuex'

const { faq, reschedulePolicy, studioPolicy } = config.page

const email = ref('')
const store = useStore()

const doSubscribe = e => {
  e.preventDefault()
  if (!email.value) return
  alert('Email submitted')

  if (isValidEmail) {
    store.dispatch('subscribeNewsletter', {
      payload: {
        email: email.value
      }
    })
  }

  email.value = ''
}
</script>
