<template>
  <div class="flex items-center justify-between px-60 py-5 border bottom-1 shadow">
    <RouterLink :to="base">
      <img
        src="~@/assets/images/logo.png"
        class="w-48"
      />
    </RouterLink>

    <nav>
      <RouterLink
        v-for="page in PAGES"
        :key="page.text"
        :to="page.path"
        :class="{ 'mr-10 hover-title': true, 'active': isTabActive(page.path) }"
      >
        {{ page.text  }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.hover-title {
  @apply font-semibold hover:text-gray-500 transition duration-200 ease-in-out;
}

.active {
  @apply text-gray-500;
}
</style>

<script setup>
import config from '@/constant/config'
import { useRoute } from 'vue-router'

const { base, about, contact, bookOnline, pricelist } = config.page

const PAGES = [
  {
    path: base,
    text: 'Home'
  },
  {
    path: about,
    text: 'About'
  },
  {
    path: contact,
    text: 'Contact'
  },
  {
    path: bookOnline,
    text: 'Book Online'
  },
  {
    path: pricelist,
    text: 'Pricelist'
  }
]

const route = useRoute()
const isTabActive = path => route.path === path
</script>
