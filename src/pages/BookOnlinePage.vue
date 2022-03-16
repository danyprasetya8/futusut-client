<template>
  <BaseLayout>
    <section class="self-center xl:mb-10">
      <div class="text-2xl xl:text-3xl font-bold my-6 xl:my-10">Our Services</div>

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
              class="py-1.5 bg-sky-700 text-white rounded-sm w-full hover:bg-sky-600 transition duration-200 ease-linear"
              @click="toBookServicePage(service.id)"
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

const router = useRouter()
const store = useStore()
const services = ref([])

const toBookServicePage = serviceId => {
  router.push({
    name: 'BookService',
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
