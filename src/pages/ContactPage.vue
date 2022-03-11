<template>
  <BaseLayout>
    <section class="flex flex-col">
      <section class="flex py-10 px-20">
        <p class="text-2xl">
          Contact
        </p>
        <div class="h-1 w-24 bg-black mx-8 mt-4" />
        <p class="text-4xl font-bold">
          Let's be friends.
          <br>
          Don't Hesitate to Get in Touch
        </p>
      </section>

      <form class="mb-12 w-1/2 self-center grid grid-cols-2 gap-6">
        <div class="p-4 border-b-2 border-black">
          <input
            type="text"
            class="outline-none w-full"
            placeholder="Name"
          >
        </div>
        <div class="p-4 border-b-2 border-black">
          <input
            type="text"
            class="outline-none w-full"
            placeholder="Phone"
          >
        </div>
        <div class="p-4 border-b-2 border-black col-span-2">
          <input
            type="text"
            class="outline-none w-full"
            placeholder="Email"
          >
        </div>
        <div class="p-4 border-b-2 border-black col-span-2">
          <textarea
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
</script>
