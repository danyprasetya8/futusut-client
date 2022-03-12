<template>
  <BaseLayout>
    <section class="flex flex-col">
      <section class="flex flex-col xl:flex-row py-10 px-8 xl:px-20">
        <div class="flex items-center">
          <p class="text-xl xl:text-2xl">Support</p>
          <div class="h-1 w-full xl:w-24 bg-black mx-8" />
        </div>
        <p class="text-2xl font-bold mt-4 xl:mt-0">Reschedule Policy</p>
      </section>

      <section class="px-8 xl:px-20 xl:mt-6">
        <p class="font-bold underline mb-2 text-lg">
          Cancellation Policy
        </p>
        <p class="text-gray-400">
          It is non refundable for any payment that has been made.
        </p>
      </section>

      <section class="px-8 xl:px-20 my-5 xl:my-10">
        <p class="font-bold underline mb-2 text-lg">
          Reschedule Policy
        </p>
        <p class="text-gray-400">
          It is possible to reschedule once with maximum 1x24 hours prior to your scheduled session, for more information about session rescheduling please reach out through our whatsapp below
        </p>
      </section>

      <section class="px-8 xl:px-20 mb-10">
        <p class="font-bold underline mb-2 text-lg">
          Reach Us
        </p>
        <p class="text-gray-400">
          Addess: Dominico Garden
        </p>
        <p class="text-gray-400">
          Jl. Sei Besitang No.9
        </p>
        <p class="text-gray-400">
          Phone: 088262274552
        </p>
        <p class="text-gray-400">
          Email: futusut@gmail.com
        </p>
      </section>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
