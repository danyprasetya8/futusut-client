<template>
  <BaseLayout>
    <section class="self-center flex flex-col items-center xl:items-start xl:mb-10">
      <div class="text-2xl xl:text-3xl font-bold mt-6 xl:mt-10">
        Our Services
      </div>

      <div class="my-6 text-sm xl:text-md flex px-8">
        <input
          v-model="isAgreedToPolicy"
          class="h-4 w-4 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top mr-2 cursor-pointer"
          id="checkbox"
          type="checkbox"
        >
        <label
          class="form-check-label inline-block text-gray-800 text-center xl:text-left"
          for="checkbox"
        >
          I have read and agreed to
          <RouterLink
            :to="config.page.studioPolicy"
            class="underline text-blue-800"
          >
            Futusut Studios' policy and protocols
          </RouterLink>
        </label>
      </div>

      <div class="xl:flex xl:mb-8">
        <template v-if="isGettingServices">
          <SkeletonCard
            v-for="i in 2"
            :key="i"
          />
        </template>
        <template v-else>
          <div
            v-for="service in services"
            :key="service.id"
            class="mb-6 xl:mb-0 xl:mr-8 w-60 shadow rounded-md"
          >
            <div class="rounded-t">
              <img
                v-if="service.id === oneSession"
                src="~@/assets/images/service-banner-1.jpeg"
                class="w-full h-52 object-cover rounded-t"
                alt=""
              >
              <img
                v-else-if="service.id === twoSession"
                src="~@/assets/images/service-banner-2.jpeg"
                class="w-full h-52 object-cover rounded-t"
                alt=""
              >
            </div>

            <div class="py-4 px-6">
              <div class="text-xl font-semibold">
                {{ service.name }}
              </div>
              <div class="h-0.5 w-full bg-gray-100 my-3" />
              <div class="mb-1">
                {{ service.sessionDuration }} minutes
              </div>
              <div class="mb-5">
                {{ numberFormatter(service.price, 'Rp.') }}
              </div>

              <button
                type="buton"
                :class="{
                  'py-1.5 rounded-sm w-full text-white transition duration-200 ease-linear': true,
                  'bg-sky-700 hover:bg-sky-600': isAgreedToPolicy,
                  'bg-gray-400 cursor-default': !isAgreedToPolicy
                }"
                @click="toBookDetailPage(service.id)"
              >
                Book
              </button>
            </div>
          </div>
        </template>
      </div>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { numberFormatter } from '@/utils/formatter'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SkeletonCard from '@/components/SkeletonCard'
import config from '@/constant/config'

const { oneSession, twoSession } = config.service

const router = useRouter()
const store = useStore()
const services = ref([])
const isAgreedToPolicy = ref(false)
const isGettingServices = ref(false)

const toBookDetailPage = serviceId => {
  if (!isAgreedToPolicy.value) return
  router.push({
    name: 'BookDetail',
    params: { serviceId }
  })
}

const getServices = () => {
  isGettingServices.value = true
  store.dispatch('getServices', {
    onSuccess: res => {
      console.log(res)
      isGettingServices.value = false
      services.value = res.data
    },
    onFail: () => {
      isGettingServices.value = false
      store.dispatch('toastGeneralError')
    }
  })
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  getServices()
})
</script>
