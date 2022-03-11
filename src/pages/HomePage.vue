<template>
  <BaseLayout>
    <section class="mb-24 mt-20 w-2/3 self-center">
      <section class="flex">
        <div
          v-for="banner in paginatedBanners"
          :key="banner.image"
        >
          <HomeBanner :banner="banner" />
        </div>
      </section>

      <section
        v-if="totalPage > 1"
        class="flex items-center justify-end mt-4"
      >
        <ChevronLeftIcon
          v-if="currentPage > 1"
          class="w-7 cursor-pointer"
          @click="currentPage = currentPage - 1"
        />
        <div class="mx-2">
          {{ currentPage }} &nbsp;/&nbsp; {{ totalPage }}
        </div>
        <ChevronRightIcon
          v-if="currentPage < totalPage"
          class="w-7 cursor-pointer"
          @click="currentPage = currentPage + 1"
        />
      </section>

      <section class="flex justify-center">
        <RouterLink
          :to="page.bookOnline"
          class="text-white bg-black px-6 py-2 hover:bg-gray-800 transition duration-300 ease-linear"
        >
          Book Now
        </RouterLink>
      </section>
    </section>
  </BaseLayout>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { computed, onMounted, ref } from 'vue'
import BaseLayout from '@/components/BaseLayout'
import HomeBanner from '@/components/HomeBanner'
import config from '@/constant/config'

const BANNER_PER_PAGE = 3
const page = config.page

const currentPage = ref(1)
const totalPage = ref(0)
const banners = ref([])

const dummy = {
  image: 'http://dummy',
  title: 'very very very very very very very very very long',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt reiciendis quis laborum unde sed rem consequuntur placeat. Itaque obcaecati inventore rerum harum quos odit, recusandae deserunt saepe, molestias rem in!'
}

onMounted(() => {
  banners.value = Array.from({ length: 15 }, (v, i) => ({ ...dummy, title: 'Image ' + (i + 1) + dummy.title }))
  totalPage.value  = banners.value.length / BANNER_PER_PAGE
})

const paginatedBanners = computed(() => {
  return banners.value.slice((currentPage.value - 1) * BANNER_PER_PAGE, currentPage.value * BANNER_PER_PAGE)
})
</script>
