<template>
  <RouterView />
  <FullPageLoader v-if="isLoading" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400&display=swap');

.toast-container {
  min-height: 20px !important;
  padding: 15px 24px !important;
  border-radius: 4px !important;
}

.toast-container .Vue-Toastification__toast-body {
  font-size: 14px !important;
}
</style>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import {
  isMediumDesktop,
  isMediumDesktopAndDown,
  isMediumDesktopAndUp,
  isMobile,
  isSmallDesktop,
  isSmallDesktopAndUp,
  isSmallMobile
} from '@/utils/responsive'
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'
import FullPageLoader from '@/components/FullPageLoader'

const store = useStore()

const isLoading = computed(() => store.getters.isLoading)

onBeforeMount(() => {
  store.commit('setIsMobile', isMobile())
  store.commit('setIsSmallDesktop', isSmallDesktop())
  store.commit('setIsSmallDesktopAndUp', isSmallDesktopAndUp())
  store.commit('setIsMediumDesktop', isMediumDesktop())
  store.commit('setIsMediumDesktopAndDown', isMediumDesktopAndDown())
  store.commit('setIsMediumDesktopAndUp', isMediumDesktopAndUp())
  store.commit('setIsSmallMobile', isSmallMobile())

  store.dispatch('getCurrentUser')
})

</script>
