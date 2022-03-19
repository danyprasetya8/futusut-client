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
          <div class="font-bold text-center xl:text-left">
            {{ selectedDateString }}
          </div>

          <div class="flex flex-wrap mt-2 justify-center xl:justify-start">
            <button
              v-for="time in bookingHours"
              :key="time.timestamp"
              type="button"
              :class="{
                'p-2 w-1/4 m-1 border border-gray-300 transition duration-200 ease-linear': true,
                'hover:bg-gray-200': time.available && time.timestamp !== selectedTime,
                'bg-sky-700 text-white': time.available && time.timestamp === selectedTime,
                'bg-gray-100 text-gray-400 cursor-default': !time.available,
              }"
              @click="setSelectedTime(time)"
            >
              {{ time.text }}
            </button>
          </div>
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
        {{ photoSessionDuration(service.duration.photoSession) }}
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Calendar } from 'v-calendar'
import { numberFormatter } from '@/utils/formatter'
import config from '@/constant/config'

const route = useRoute()
const router = useRouter()
const serviceId = computed(() => route.params.serviceId)
const photoSessionDuration = duration => duration + ' minutes'

const store = useStore()
const service = ref({})
const selectedDate = ref(null)
const selectedTime = ref(null)
const reservedTimes = ref([])
const bookingSummaryEl = ref()

const minDate = computed(() => getIncrementedDate(1))
const maxDate = computed(() => getIncrementedDate(14))

const getIncrementedDate = increment => {
  const date = new Date()
  date.setDate(date.getDate() + increment)
  return setStartOfDay(date)
}

const attributes = computed(() => [
  {
    highlight: true,
    dates: selectedDate.value
  }
])

const selectedDateString = computed(() => selectedDate.value.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))

const selectedTimeString = computed(() => new Date(selectedTime.value).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}))

const bookingHours = computed(() => config.bookingHours.map(toBookingHourInformation))

const toBookingHourInformation = bookingHour => {
  const date = new Date(selectedDate.value.getTime() + bookingHour)
  return {
    timestamp: date.getTime(),
    text: ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
    available: !reservedTimes.value.includes(date.getTime())
  }
}

const setStartOfDay = date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

const onDayClick = day => {
  const startOfDay = setStartOfDay(day.date)

  if (startOfDay.getTime() >= minDate.value.getTime() && startOfDay.getTime() <= maxDate.value.getTime()) {
    selectedDate.value = day.date
  }
}

const setSelectedTime = time => {
  if (!time.available) return
  isBookingTimeAvailable(time.timestamp, () => {
    selectedTime.value = time.timestamp
    window.scrollTo({
      top: bookingSummaryClientRect.value.top,
      behavior: 'smooth'
    })
  })
}

const isBookingTimeAvailable = (timestamp, onAvailableTime) => {
  store.dispatch('isBookingTimeAvailable', {
    payload: { timestamp },
    onSuccess: res => {
      const { data } = res.data
      if (data) {
        onAvailableTime()
      } else {
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        getReservedTimesOnChangingTime()
      }
    }
  })
}

const bookingSummaryClientRect = computed(() => bookingSummaryEl.value.getBoundingClientRect())
const setBookingSumaryElement = el => {
  bookingSummaryEl.value = el
}

const toBookFormPage = () => {
  if (!selectedTime.value) {
    return
  }
  isBookingTimeAvailable(selectedTime.value, () => {
    store.commit('setCurrentBook', {
      serviceId: serviceId.value,
      bookingDate: selectedDate.value.getTime(),
      bookingTime: selectedTime.value
    })
    router.push(config.page.bookForm)
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

onMounted(() => {
  selectedDate.value = minDate.value
  getService()
})

const getReservedTimesOnChangingTime = () => {
  store.dispatch('getReservedBookingTimes', {
    payload: {
      timestamp: selectedDate.value.getTime()
    },
    onSuccess: res => {
      reservedTimes.value = res.data.data
    },
    onFail: () => {
      store.dispatch('toastGeneralError')
    }
  })
}

const getReservedTimesOnChangingDate = () => {
  store.commit('setIsLoading', true)
  store.dispatch('getReservedBookingTimes', {
    payload: {
      timestamp: selectedDate.value.getTime()
    },
    onSuccess: res => {
      reservedTimes.value = res.data.data
      store.commit('setIsLoading', false)
    },
    onFail: () => {
      store.commit('setIsLoading', false)
      store.dispatch('toastGeneralError')
    }
  })
}

watch(selectedDate, getReservedTimesOnChangingDate)
</script>
