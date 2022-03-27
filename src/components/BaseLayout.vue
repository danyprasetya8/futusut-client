<template>
  <div>
    <Header />
    <section class="flex flex-col">
      <slot />
    </section>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
</script>
