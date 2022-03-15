<template>
  <div class="banner-container relative">
    <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30" />
    <img
      :src="props.banner.url"
      alt=""
      class="banner-image"
    >

    <div class="banner-description__overlay" />
    <p class="banner-description__text">
      {{ props.banner.description }}
    </p>

    <div class="text-white w-3/4 text-xl xl:text-2xl text-left absolute left-0 bottom-0 mx-8 mb-8 xl:mx-14 xl:mb-14">
      {{ props.banner.title }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-image {
  height: 520px;
  width: 390px;
  object-fit: cover;
}

.banner-description {
  &__overlay {
    @apply absolute left-0 top-0 h-0
      text-gray-800 w-full
      flex justify-end items-end
      bg-white bg-opacity-60;
    transition: .4s ease;
  }

  &__text {
    @apply absolute right-0 bottom-1/3
      transform -translate-y-1/2
      w-3/4 mr-6 opacity-0 text-left text-sm;
    transition: .1s ease;
    transition-delay: .1s;
  }
}

.banner-container:hover {
  .banner-description {
    &__overlay {
      @apply h-2/3 pb-20 pr-8;
    }

    &__text {
      opacity: 1;
    }
  }
}
</style>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  banner: {
    type: Object,
    required: true
  }
})
</script>
