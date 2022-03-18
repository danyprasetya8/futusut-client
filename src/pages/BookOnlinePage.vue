<template>
  <BaseLayout>
    <section class="self-center xl:mb-10">
      <div class="text-2xl xl:text-3xl font-bold mt-6 xl:mt-10">Our Services</div>

      <div class="my-6">
        <input
          v-model="isAgreedToPolicy"
          class="h-4 w-4 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top mr-2 cursor-pointer"
          id="checkbox"
          type="checkbox"
        >
        <label
          class="form-check-label inline-block text-gray-800"
          for="checkbox"
        >
          I have read and agreed to
          <RouterLink
            :to="config.page.studioPolicy"
            class="underline text-blue-800"
          >
            Futusut Studios' policy
          </RouterLink>
          and protocols
        </label>
      </div>

      <div class="xl:flex xl:mb-8">
        <div
          v-for="service in services"
          :key="service.id"
          class="mb-6 xl:mb-0 xl:mr-8 border border-gray-200 shadow rounded-md"
        >
          <div class="w-56 h-32 bg-gray-300" />
          <div class="py-4 px-6">
            <div class="text-xl font-semibold">
              {{ service.name }}
            </div>
            <div class="h-0.5 w-full bg-gray-100 my-3" />
            <div class="mb-1">
              {{ photoSessionDuration(service.duration.photoSession) }}
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
import config from '@/constant/config'

const router = useRouter()
const store = useStore()
const services = ref([])
const isAgreedToPolicy = ref(false)

const toBookDetailPage = serviceId => {
  if (!isAgreedToPolicy.value) return
  router.push({
    name: 'BookDetail',
    params: { serviceId }
  })
}

const photoSessionDuration = duration => duration + ' minutes'

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  store.dispatch('getServices', {
    onSuccess: res => {
      services.value = res.data.data
    }
  })
})
</script>
