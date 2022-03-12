<template>
  <div class="flex items-center justify-between px-6 xl:px-40 py-5 border bottom-1 shadow">
    <RouterLink :to="base">
      <img
        src="~@/assets/images/logo.png"
        class="w-24 xl:w-40"
      />
    </RouterLink>

    <nav v-if="!isMobile">
      <RouterLink
        v-for="page in PAGES"
        :key="page.text"
        :to="page.path"
        :class="{ 'mr-10 hover-title': true, 'active': isTabActive(page.path) }"
      >
        {{ page.text  }}
      </RouterLink>
    </nav>

    <nav v-else>
      <BurgerMenu @click="visibleMobileMenu = true" />

      <transition
        enter-active-class="transition ease-in-out duration-300"
        enter-from-class="transform scale-x-0"
        leave-active-class="transition ease-in-out duration-300"
        leave-to-class="transform scale-x-0 origin-right"
      >
        <div
          v-if="visibleMobileMenu"
          class="fixed top-0 right-0 h-screen w-full bg-white py-8 px-10 flex flex-col origin-right"
        >
          <XIcon
            class="w-6 ml-auto"
            @click="visibleMobileMenu = false"
          />

          <nav class="flex flex-col justify-end text-right text-xl h-3/4">
            <RouterLink
              v-for="page in PAGES"
              :key="page.text"
              :to="page.path"
              :class="{ 'hover-title': true, 'active': isTabActive(page.path) }"
            >
              {{ page.text  }}
            </RouterLink>
          </nav>
        </div>
      </transition>
    </nav>
  </div>
</template>

<style scoped>
.hover-title {
  @apply mb-4 font-semibold hover:text-gray-500 transition duration-200 ease-in-out;
}

.active {
  @apply text-sky-800;
}
</style>

<script setup>
import config from '@/constant/config'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { XIcon } from '@heroicons/vue/solid'
import useResponsive from '@/composable/responsive'
import BurgerMenu from '@/components/BurgerMenu'

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

const { isMobile } = useResponsive()
const route = useRoute()
const visibleMobileMenu = ref(false)

const isTabActive = path => route.path === path
</script>
