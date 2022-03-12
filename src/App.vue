<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400&display=swap');
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
import { onBeforeMount } from 'vue'

const store = useStore()

onBeforeMount(() => {
  store.commit('setIsMobile', isMobile())
  store.commit('setIsSmallDesktop', isSmallDesktop())
  store.commit('setIsSmallDesktopAndUp', isSmallDesktopAndUp())
  store.commit('setIsMediumDesktop', isMediumDesktop())
  store.commit('setIsMediumDesktopAndDown', isMediumDesktopAndDown())
  store.commit('setIsMediumDesktopAndUp', isMediumDesktopAndUp())
  store.commit('setIsSmallMobile', isSmallMobile())
})

</script>
