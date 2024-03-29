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
          :disabled-dates="disabledDates"
          :attributes="attributes"
          @dayclick="onDayClick"
        />
        <div class="mt-4 xl:mt-0 xl:ml-6">
          <div class="font-bold text-center xl:text-left mb-2">
            {{ selectedDateString }}
          </div>

          <TimeSelection
            v-model:selectedTimes="selectedTimes"
            :selectedDate="selectedDate"
            :timeCount="service.time"
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
      <div v-if="selectedTimes.length">
        {{ selectedTimesString }}
      </div>

      <div class="mt-2 text-gray-400">
        Futusut Studio
      </div>
      <div class="text-gray-400">
        {{ service.sessionDuration }} minutes
      </div>
      <div class="text-gray-600 text-lg mt-1">
        {{ numberFormatter(service.price, 'Rp.') }}
      </div>

      <button
        type="button"
        :class="{
          'text-white py-2 mt-4 transition duration-150 ease-linear': true,
          'bg-sky-700': selectedTimes.length,
          'bg-gray-400 cursor-default': !selectedTimes.length
        }"
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
import { setStartOfDay, getIncrementedDate, formatDate, formatTime } from '@/utils/date'
import TimeSelection from '@/components/TimeSelection'
import config from '@/constant/config'

const DATE_FORMAT = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const route = useRoute()
const router = useRouter()
const serviceId = computed(() => route.params.serviceId)

const store = useStore()
const service = ref({})
const selectedDate = ref(null)
const selectedTimes = ref([])
const refreshTimeSelection = ref(0)
const bookingSummaryEl = ref()
const disabledDates = ref([1648486800000, 1648573200000, 1648659600000])

const minDate = computed(() => getIncrementedDate(0))
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

const totalServiceDurationMillis = computed(() => {
  const { sessionDuration, selectionDuration } = service.value
  return (sessionDuration + selectionDuration) * 60 * 1000
})

const selectedTimesString = computed(() => {
  const first = selectedTimes.value[0]
  return `${formatDate(first, DATE_FORMAT)}
      ${formatTime(first)} - ${formatTime(first + totalServiceDurationMillis.value)}`
})

const onDayClick = day => {
  const startOfDay = setStartOfDay(day.date)

  const validChangingDate = startOfDay.getTime() >= minDate.value.getTime()
    && startOfDay.getTime() <= maxDate.value.getTime()
    && !isDateIsDisabled(startOfDay.getTime())

  if (validChangingDate) {
    selectedDate.value = day.date
    selectedTimes.value = []
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

const toBookFormPage = () => {
  if (!selectedTimes.value.length) return

  store.commit('setIsLoading', true)
  store.dispatch('isBookingTimesAvailable', {
    payload: {
      timestamps: selectedTimes.value
    },
    onSuccess: res => {
      store.commit('setIsLoading', false)
      const availabilities = res.map(r => r.data.data) || []

      if (availabilities.some(a => !a)) {
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        refreshTimeSelection.value++
      } else {
        store.commit('setCurrentBook', {
          serviceId: serviceId.value,
          bookingDate: selectedDate.value.getTime(),
          bookingTime: selectedTimes.value
        })
        router.push(config.page.bookForm)
      }
    },
    onFail: () => {
      store.commit('setIsLoading', false)
      store.dispatch('toastGeneralError')
    }
  })
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

const isDateIsDisabled = (date = setStartOfDay(new Date()).getTime()) => {
  return disabledDates.value.includes(date)
}

onMounted(() => {
  if (isDateIsDisabled()) {
    const last = disabledDates.value.length
    selectedDate.value = getIncrementedDate(1, new Date(disabledDates.value[last - 1]))
  } else {
    selectedDate.value = minDate.value
  }

  getService()
})
</script>
