<template>
  <BaseLayout>
    <section
      v-if="service.id"
      class="flex flex-col px-6 xl:px-0 xl:w-1/2 mx-auto my-10"
    >
      <div class="text-2xl font-bold">
        {{ service.name }}
      </div>
      <p class="mt-1">
        Check out our availability and book the date and time that works for you
      </p>

      <section class="flex flex-col xl:flex-row items-center xl:items-start mt-6 mb-10">
        <Calendar
          :max-date="maxDate"
          :min-date="minDate"
          :attributes="attributes"
          @dayclick="onDayClick"
        />
        <div class="mt-4 xl:mt-0 xl:ml-6">
          <div class="font-bold text-center xl:text-left mb-2">
            {{ selectedDateString }}
          </div>

          <TimeSelection
            v-model:selectedTime="selectedTime"
            :selectedDate="selectedDate"
            :onUpdateTimestamp="onUpdateTimestamp"
          />
        </div>
      </section>

      <div
        :ref="setBookingSumaryElement"
        class="text-2xl font-bold"
      >
        Booking Summary
      </div>

      <div class="my-3 h-0.5 bg-gray-200 w-full" />

      <div class="font-semibold text-xl">
        {{ service.name }}
      </div>
      <div v-if="selectedTime">
        {{ selectedTimeString }}
      </div>

      <div class="mt-2 text-gray-400">
        Futusut Studio
      </div>
      <div class="text-gray-400">
        {{ service.duration.photoSession }} minutes
      </div>
      <div class="text-gray-600 text-lg mt-1">
        {{ numberFormatter(service.price, 'Rp.') }}
      </div>

      <button
        type="button"
        class="bg-sky-700 text-white py-2 mt-4"
        @click="toBookFormPage"
      >
        Next
      </button>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Calendar } from 'v-calendar'
import { numberFormatter } from '@/utils/formatter'
import { setStartOfDay, getIncrementedDate } from '@/utils/date'
import TimeSelection from '@/components/TimeSelection'
import config from '@/constant/config'

const route = useRoute()
const router = useRouter()
const serviceId = computed(() => route.params.serviceId)

const store = useStore()
const service = ref({})
const selectedDate = ref(null)
const selectedTime = ref(0)
const refreshTimeSelection = ref(0)
const bookingSummaryEl = ref()

const minDate = computed(() => getIncrementedDate(1))
const maxDate = computed(() => getIncrementedDate(14))

const attributes = computed(() => [
  {
    highlight: true,
    dates: selectedDate.value
  }
])

const selectedDateString = computed(() => selectedDate.value.toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))

const selectedTimeString = computed(() => new Date(selectedTime.value).toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}))

const onDayClick = day => {
  const startOfDay = setStartOfDay(day.date)

  if (startOfDay.getTime() >= minDate.value.getTime() && startOfDay.getTime() <= maxDate.value.getTime()) {
    selectedDate.value = day.date
    selectedTime.value = 0
  }
}

const onUpdateTimestamp = () => {
  window.scrollTo({
    top: bookingSummaryClientRect.value.top,
    behavior: 'smooth'
  })
}

const bookingSummaryClientRect = computed(() => bookingSummaryEl.value.getBoundingClientRect())
const setBookingSumaryElement = el => {
  bookingSummaryEl.value = el
}

const isBookingTimeAvailable = timestamp => {
  store.dispatch('isBookingTimeAvailable', {
    payload: { timestamp },
    onSuccess: res => {
      const { data } = res.data
      if (data) {
        store.commit('setCurrentBook', {
          serviceId: serviceId.value,
          bookingDate: selectedDate.value.getTime(),
          bookingTime: selectedTime.value
        })
        router.push(config.page.bookForm)
      } else {
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        refreshTimeSelection.value++
      }
    }
  })
}

const toBookFormPage = () => {
  if (!selectedTime.value) {
    return
  }
  isBookingTimeAvailable(selectedTime.value)
}

const getService = () => {
  store.dispatch('getService', {
    payload: {
      serviceId: serviceId.value
    },
    onSuccess: res => {
      service.value = res.data.data
    }
  })
}

onMounted(() => {
  selectedDate.value = minDate.value
  getService()
})
</script>
