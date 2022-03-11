<template>
  <div class="bg-light-black text-white px-24 py-16">
    <section class="text-3xl">
      <a href="https://instagram.com/futusut?utm_medium=copy_link" target="_blank" class="mr-12 hover:text-gray-300 transition duration-150 ease">
        Instagram
      </a>
      <a href="https://api.whatsapp.com/send?phone=6281992123123" target="_blank" class="mr-12 hover:text-gray-300 transition duration-150 ease">
        Whatsapp
      </a>
      <a href="" target="_blank" class="hover:text-gray-300 transition duration-150 ease">
        Email
      </a>
    </section>

    <section class="mt-16 mb-14 flex">
      <div class="text-black p-3 bg-white w-1/3">
        <input
          type="text"
          class="outline-none w-full"
          placeholder="Enter your email here"
        >
      </div>
      <button class="ml-8 text-lg hover:text-gray-300 transition duration-150 ease">
        Subscribe Now
      </button>
    </section>

    <section class="text-gray-400 w-1/2 flex justify-between">
      &copy; 2022 by Futusut

      <div>
        <RouterLink :to="faq" class="mr-8 underline">FAQ</RouterLink>
        <RouterLink :to="reschedulePolicy" class="mr-8 underline">Reschedule Policy</RouterLink>
        <RouterLink :to="studioPolicy" class="underline">Studio Policy & Protocols</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import config from '@/constant/config'

const { faq, reschedulePolicy, studioPolicy } = config.page
</script>
