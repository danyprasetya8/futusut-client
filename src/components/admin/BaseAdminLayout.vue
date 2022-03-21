<template>
  <section class="flex">
    <section class="w-1/5 h-screen bg-sky-600 text-white flex flex-col">
      <div class="flex justify-center my-10">
        <img
          src="~@/assets/images/logo-white.png"
          class="w-24 xl:w-32"
        >
      </div>

      <div class="flex flex-col">
        <RouterLink
          v-for="menu in menus"
          :key="menu.path"
          :to="menu.path"
          :class="{
            'py-3.5 px-10 mb-2 hover:bg-sky-500 rounded-tr-full rounded-br-full transition duration-150 ease-linear': true,
            'bg-sky-500': selectedTab.path === menu.path
          }"
          @click="setSelectedTab(menu)"
        >
          {{ menu.text }}
        </RouterLink>
      </div>

      <button
        type="button"
        class="self-center mt-auto mb-12 py-2 w-3/4 border border-white rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-150 ease-linear"
      >
        Logout
      </button>
    </section>
    <section class="w-4/5">
      <header class="flex justify-end p-6 bg-white shadow">
        <div>Hi, admin</div>
      </header>

      <section class="flex flex-col">
        <slot />
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import config from '@/constant/config'

const menus = [
  {
    path: config.page.adminBooking,
    text: 'Booking'
  }
]

const selectedTab = ref(menus[0])

const setSelectedTab = tab => {
  selectedTab.value = tab
}
</script>
