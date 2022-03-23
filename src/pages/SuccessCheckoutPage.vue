<template>
  <BaseLayout>
    <section class="my-20 w-1/2 mx-auto">
      <div class="text-2xl font-bold">
        Great, You're Booked!
      </div>

      <div class="my-3">
        You will be notified through email and WhatsApp
      </div>

      <div class="mt-10 border border-gray-200 p-7 flex">
        <div class="w-1/4 flex flex-col items-center text-sky-800">
          <div class="text-3xl font-bold">
            {{ dateInformation.getDate() }}
          </div>
          <div class="font-bold text-2xl">
            {{ dateInformation.toLocaleString('default', { month: 'long' }) }}
          </div>
          <div class="h-0.5 bg-gray-200 w-1/6 my-5" />
          <div class="font-bold">
            {{ dateInformation.toLocaleString('default', { weekday: 'long', hour: '2-digit', minute: '2-digit' }) }}
          </div>
        </div>

        <div class="h-20 w-0.5 bg-gray-200 self-center" />

        <div class="w-3/4 ml-10">
          <div class="text-xl font-bold mb-2">
            {{ service.name }}
          </div>
          <div>
            {{ serviceDuration.photoSession }} minutes photo selection
          </div>
          <div>
            {{ serviceDuration.photoSelection }} minutes photo selection
          </div>
          <div class="mt-4 font-semibold">
            Dominico Garden, Jalan Sei Besitang, Sei Sikambing D, Medan City, North Sumatra, Indonesia
          </div>
        </div>
      </div>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import config from '@/constant/config'

const route = useRoute()
const router = useRouter()
const store = useStore()

const bookingInformation = ref({})
const service = ref({})

const dateInformation = computed(() => new Date(bookingInformation.value.bookingTime))
const serviceDuration = computed(() => service.value.duration || {})

const getService = () => {
  store.dispatch('getService', {
    payload: {
      serviceId: bookingInformation.value.serviceId
    },
    onSuccess: res => {
      service.value = res.data.data
    }
  })
}

const toHomePage = () => {
  router.push(config.page.base)
}

onMounted(() => {
  const bookingId = route.params.bookingId
  if (!bookingId) {
    toHomePage()
  }
  store.dispatch('getCheckoutDetail', {
    payload: { bookingId },
    onSuccess: res => {
      bookingInformation.value = res.data.data

      if (bookingInformation.value.paymentStatus !== 'PAID') {
        toHomePage()
      } else {
        getService()
      }
    },
    onFail: toHomePage
  })
})
</script>
