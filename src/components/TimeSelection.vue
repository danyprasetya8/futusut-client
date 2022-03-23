<template>
  <div class="flex flex-wrap justify-center xl:justify-start">
    <button
      v-for="time in bookingHours"
      :key="time.timestamp"
      type="button"
      :class="{
        'p-2 w-1/4 m-1 border border-gray-300 transition duration-200 ease-linear': true,
        'hover:bg-gray-200': time.available,
        'bg-gray-100 text-gray-400 cursor-default': !time.available,
        'bg-sky-700 hover:bg-sky-700 text-sky-50': (time.available && time.timestamp === props.selectedTime) || currentCustomerBooking.bookingTime === time.timestamp
      }"
      @click="setSelectedTime(time)"
    >
      {{ time.text }}
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import config from '@/constant/config'

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true
  },
  selectedTime: {
    type: Number,
    required: true
  },
  onUpdateTimestamp: {
    type: Function,
    default: () => {}
  },
  bookingId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:selectedTime'])

const store = useStore()

const reservedBookings = ref([])

const bookingHours = computed(() => config.bookingHours.map(toBookingHourInformation))

const reservedTimes = computed(() => (reservedBookings.value || []).map(b => b.bookingTime))

const toBookingHourInformation = bookingHour => {
  const date = new Date(props.selectedDate.getTime() + bookingHour)
  return {
    timestamp: date.getTime(),
    text: ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
    available: !reservedTimes.value.includes(date.getTime()) && date.getTime() > new Date().getTime()
  }
}

const setSelectedTime = time => {
  if (!time.available) return
  isBookingTimeAvailable(time.timestamp)
}

const isBookingTimeAvailable = timestamp => {
  store.dispatch('isBookingTimeAvailable', {
    payload: { timestamp },
    onSuccess: res => {
      const { data } = res.data
      if (data) {
        emit('update:selectedTime', timestamp)
        props.onUpdateTimestamp()
      } else {
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        getReservedBookings()
      }
    }
  })
}

const currentCustomerBooking = computed(() => reservedBookings.value.find(b => b.id === props.bookingId) || {})

const getReservedBookings = () => {
  store.dispatch('getReservedBookingTimes', {
    payload: {
      timestamp: props.selectedDate.getTime()
    },
    onSuccess: res => {
      reservedBookings.value = res.data.data
      if (currentCustomerBooking.value.id) {
        emit('update:selectedTime', currentCustomerBooking.value.bookingTime)
      } else {
        emit('update:selectedTime', 0)
      }
    },
    onFail: () => {
      store.dispatch('toastGeneralError')
    }
  })
}

onMounted(getReservedBookings)

watch(() => props.selectedDate, getReservedBookings)
</script>
