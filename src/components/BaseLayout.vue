<template>
  <div>
    <Header />
    <section class="flex flex-col">
      <slot />
    </section>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
</script>
