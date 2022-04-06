<template>
  <section class="flex">
    <section
      v-if="!isMobile"
      class="w-1/5 h-screen bg-sky-600 text-white flex flex-col sticky left-0 top-0"
    >
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
            'bg-sky-500': isActiveTab(menu.path)
          }"
          @click="setSelectedTab(menu)"
        >
          {{ menu.text }}
        </RouterLink>
      </div>

      <button
        type="button"
        class="self-center mt-auto mb-12 py-2 w-3/4 border border-white rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-150 ease-linear"
        @click="logout"
      >
        Logout
      </button>
    </section>

    <section class="w-full xl:w-4/5">
      <header class="flex justify-between xl:justify-end items-center py-6 px-6 xl:px-12 bg-white shadow">
        <div>Hi, {{ currentUser.email }}</div>

        <BurgerMenu
          v-if="isMobile"
          @click="visibleMobileMenu = true"
        />

        <transition
          enter-active-class="transition ease-in-out duration-300"
          enter-from-class="transform scale-x-0"
          leave-active-class="transition ease-in-out duration-300"
          leave-to-class="transform scale-x-0 origin-right"
        >
          <div
            v-if="visibleMobileMenu"
            class="z-10 fixed top-0 right-0 h-screen w-full bg-sky-600 text-white py-8 px-10 flex flex-col origin-right"
          >
            <XIcon
              class="w-6 ml-auto"
              @click="visibleMobileMenu = false"
            />
            <nav class="flex flex-col justify-end text-right text-xl h-3/4">
              <RouterLink
                v-for="menu in menus"
                :key="menu.path"
                :to="menu.path"
                :class="{
                  'py-3.5 px-10 mb-2 hover:bg-sky-500 rounded-full rounded-br-full transition duration-150 ease-linear': true,
                  'bg-sky-500': isActiveTab(menu.path)
                }"
                @click="setSelectedTab(menu)"
              >
                {{ menu.text }}
              </RouterLink>
            </nav>

            <button
              type="button"
              class="self-center mt-auto py-2 w-3/4 border border-white rounded-lg"
              @click="logout"
            >
              Logout
            </button>
          </div>
        </transition>
      </header>

      <section class="flex flex-col">
        <slot />
      </section>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { XIcon } from '@heroicons/vue/solid'
import BurgerMenu from '@/components/BurgerMenu'
import useResponsive from '@/composable/responsive'
import config from '@/constant/config'

const menus = [
  {
    path: config.page.adminHome,
    text: 'Home'
  },
  {
    path: config.page.adminBooking,
    text: 'Booking'
  }
]

const { isMobile } = useResponsive()
const route = useRoute()
const router = useRouter()
const store = useStore()

const selectedTab = ref(menus[0])
const visibleMobileMenu = ref(false)

const currentUser = computed(() => store.getters.currentUser || {})

const isActiveTab = path => route.path.indexOf(path) > -1

const setSelectedTab = tab => {
  selectedTab.value = tab
}

const logout = () => {
  store.commit('clearCurrentUser')
  window.localStorage.removeItem('token')
  router.push(config.page.adminLogin)
}
</script>
