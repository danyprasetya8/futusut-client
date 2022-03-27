<template>
  <BaseAdminLayout>
    <div class="text-2xl font-bold m-8">
      Home
    </div>
    <section class="mx-8 flex flex-col xl:flex-row items-center xl:items-start">
      <Calendar
        :max-date="maxDate"
        :min-date="minDate"
        :attributes="attributes"
        @dayclick="onDayClick"
      />

      <div class="flex flex-wrap justify-center xl:justify-start xl:ml-6 mt-6 xl:mt-0">
        <button
          v-for="time in bookingHours"
          :key="time.timestamp"
          type="button"
          :class="{
            'p-2 w-1/4 mb-1.5 mr-1.5 hover:bg-sky-800 hover:text-white border border-gray-300 transition duration-200 ease-linear': true,
            'bg-sky-800 text-white': time.timestamp === selectedTime.timestamp,
            'border-sky-600': time.booking.id
          }"
          @click="setSelectedTime(time)"
        >
          {{ time.text }}
        </button>
      </div>
    </section>
    <section
      v-if="selectedTime.timestamp"
      class="mx-8 mt-6 mb-6 xl:mb-0"
    >
      <div class="flex items-center mb-2">
        <div class="text-lg font-semibold">
          {{ formatDate(selectedTime.timestamp) }}
        </div>
        <RouterLink
          v-if="selectedTime.booking.id"
          :to="{
            name: 'AdminBookingDetail',
            params: { id: selectedTime.booking.id }
          }"
        >
          <ExternalLinkIcon class="ml-2 w-5 text-sky-600" />
        </RouterLink>
      </div>

      <template v-if="selectedTime.booking.id">
        <div>
          Name: {{ selectedTime.booking.name }}
        </div>
      </template>

      <template v-else>
        <div>
          No booking on this time
        </div>
      </template>
    </section>
  </BaseAdminLayout>
</template>

<script setup>
import BaseAdminLayout from '@/components/admin/BaseAdminLayout'
import { ExternalLinkIcon } from '@heroicons/vue/solid'
import { Calendar } from 'v-calendar'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getIncrementedDate, setStartOfDay, formatDate } from '@/utils/date'
import config from '@/constant/config'

const store = useStore()
const selectedDate = ref(setStartOfDay(new Date()))
const selectedTime = ref({})
const reservedBookings = ref([])

const minDate = computed(() => getIncrementedDate(0))
const maxDate = computed(() => getIncrementedDate(14))

const bookingHours = computed(() => config.bookingHours.map(toBookingHourInformation))

const toBookingHourInformation = bookingHour => {
  const date = new Date(selectedDate.value.getTime() + bookingHour)
  return {
    timestamp: date.getTime(),
    text: ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
    booking: reservedBookings.value.find(b => b.bookingTime.includes(date.getTime())) || {}
  }
}

const attributes = computed(() => [
  {
    highlight: true,
    dates: selectedDate.value
  }
])

const onDayClick = day => {
  const startOfDay = setStartOfDay(day.date)

  if (startOfDay.getTime() >= minDate.value.getTime() && startOfDay.getTime() <= maxDate.value.getTime()) {
    selectedDate.value = day.date
  }
}

const setSelectedTime = time => {
  selectedTime.value = time
}

const getReservedBookings = () => {
  store.dispatch('getReservedBookingTimes', {
    payload: {
      timestampDate: selectedDate.value.getTime()
    },
    onSuccess: res => {
      reservedBookings.value = res.data
      selectedTime.value = {}
    },
    onFail: () => {
      store.dispatch('toastGeneralError')
    }
  })
}

onMounted(getReservedBookings)

watch(selectedDate, getReservedBookings)
</script>
