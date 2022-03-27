<template>
  <BaseLayout>
    <section
      v-if="service.id"
      class="flex flex-col px-8 py-4 xl:py-8 mx-auto xl:w-1/2"
    >
      <div class="text-2xl xl:text-3xl font-bold mb-4">
        {{ service.name }}
      </div>
      <div>
        Valid for {{ service.pax }} pax
      </div>
      <div>
        {{ service.sessionDuration }} minutes photo session
      </div>
      <div>
        {{ service.selectionDuration }} minutes photo selection
      </div>
      <div>
        {{ service.printedPhotos }} printed photos
      </div>

      <div class="flex my-4">
        <div class="p-2.5 xl:p-4 border border-gray-300">
          {{ service.sessionDuration }} min
        </div>
        <div class="p-2.5 xl:p-4 border border-l-0 border-r-0 border-gray-300">
          {{ numberFormatter(service.price, 'Rp.') }}
        </div>
        <div class="p-2.5 xl:p-4 border border-gray-300">
          Futusut Studio
        </div>
      </div>

      <RouterLink
        :to="{ name: 'BookTime', params: serviceId }"
        class="py-1.5 bg-sky-700 text-white rounded-sm w-1/4 xl:w-32 hover:bg-sky-600 transition duration-200 ease-linear text-center"
      >
        Book
      </RouterLink>

      <div class="h-0.5 w-full bg-gray-200 my-8" />

      <div>
        <div class="text-xl font-bold mb-2">
          Service Description
        </div>
        <p>
          By making an appointment for a photo session at Futusut Studio, not only will you have a private space all by yourself but also be equipped with a high-resolution camera and professional studio lighting. Additionally, a shutter-button will be provided for you so you can strike as many poses as you want! A variety of props are also available to complement your self-photo experience.
        </p>
      </div>

      <div class="h-0.5 w-full bg-gray-200 my-8" />

      <div>
        <div class="text-xl font-bold mb-2">
          Contact Details
        </div>
        <p>
          Dominico Garden, Jalan Sei Besitang, Sei Sikambing D, Medan City, North Sumatra, Indonesia <br />
          088262274552 <br />
          futusut@gmail.com
        </p>
      </div>
    </section>
  </BaseLayout>
</template>

<style lang="scss" scoped>
  
</style>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { numberFormatter } from '@/utils/formatter'

const service = ref({})
const route = useRoute()
const store = useStore()

const serviceId = computed(() => route.params.serviceId)

onMounted(() => {
  store.dispatch('getService', {
    payload: {
      serviceId: serviceId.value
    },
    onSuccess: res => {
      service.value = res.data.data
    }
  })
})
</script>
