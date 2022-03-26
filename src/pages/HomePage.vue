<template>
  <BaseLayout>
    <section class="mb-10 xl:mb-24 mt-8 xl:mt-20 w-10/12 xl:w-2/3 self-center">
      <section class="flex flex-col xl:flex-row justify-center mb-6">
        <div
          v-for="banner in paginatedBanners"
          :key="banner.image"
        >
          <HomeBanner :banner="banner" />
        </div>
      </section>

      <section
        v-if="totalPage > 1"
        class="flex items-center justify-end mb-4"
      >
        <ChevronLeftIcon
          v-if="currentPage > 1"
          class="w-7 cursor-pointer"
          @click="changePage(currentPage - 1)"
        />
        <div class="mx-2">
          {{ currentPage }} &nbsp;/&nbsp; {{ totalPage }}
        </div>
        <ChevronRightIcon
          v-if="currentPage < totalPage"
          class="w-7 cursor-pointer"
          @click="changePage(currentPage + 1)"
        />
      </section>

      <section class="flex justify-center mt-6 xl:mt-0">
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
import useResponsive from '@/composable/responsive'
import dummy from '@/assets/images/image1.jpeg'
import dummy2 from '@/assets/images/image2.jpeg'

const BANNER_PER_PAGE = 3
const page = config.page

const currentPage = ref(1)
const totalPage = ref(0)
const banners = ref([])
const { isMobile } = useResponsive()

onMounted(() => {
  banners.value = Array.from({ length: 15 })
    .map((_, i) => ({
      description: 'Description',
      title: 'Image title',
      url: i % 2 ? dummy : dummy2
    }))
  totalPage.value = banners.value.length / BANNER_PER_PAGE
})

const paginatedBanners = computed(() => {
  return banners.value.slice((currentPage.value - 1) * BANNER_PER_PAGE, currentPage.value * BANNER_PER_PAGE)
})

const changePage = page => {
  currentPage.value = page
  if (isMobile) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>
