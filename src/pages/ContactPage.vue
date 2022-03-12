<template>
  <BaseLayout>
    <section class="flex flex-col xl:mb-24 mt-8 xl:mt-20 w-10/12 xl:w-2/3 self-center">
      <section class="grid grid-cols-3 xl:grid-cols-6 gap-4 xl:w-2/3">
        <p class="text-xl xl:text-2xl">
          Contact
        </p>
        <div class="h-1 xl:w-3/4 bg-black mt-4 col-span-2 xl:col-span-1" />
        <p class="text-2xl xl:text-4xl font-bold col-span-3 xl:col-span-4">
          Let's be friends.
          <br>
          Don't Hesitate to Get in Touch
        </p>
      </section>

      <form
        class="my-12 w-full xl:w-1/2 self-center grid grid-cols-2 gap-3 xl:gap-6"
        @submit="sendMessage"
      >
        <div class="p-4 border-b-2 border-black col-span-2 xl:col-span-1">
          <input
            v-model="name"
            type="text"
            class="outline-none w-full"
            placeholder="Name"
          >
        </div>
        <div class="p-4 border-b-2 border-black col-span-2 xl:col-span-1">
          <input
            :value="phone"
            type="text"
            class="outline-none w-full"
            placeholder="Phone"
            @keypress="numberInput"
          >
        </div>
        <div class="p-4 border-b-2 border-black col-span-2">
          <input
            v-model="email"
            type="text"
            class="outline-none w-full"
            placeholder="Email"
          >
        </div>
        <div class="p-4 border-b-2 border-black col-span-2">
          <textarea
            v-model="message"
            class="outline-none w-full"
            placeholder="Message"
          />
        </div>

        <div class="col-span-2 mt-6 flex justify-center">
          <button
            type="submit"
            class="text-xl font-bold hover:text-gray-500 transition duration-200 ease-in-out"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { ref } from 'vue'
import { numberInput } from '@/utils/number-input'

const email = ref('')
const message = ref('')
const name = ref('')
const phone = ref('')

const sendMessage = e => {
  e.preventDefault()
}
</script>
