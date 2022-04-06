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
        'bg-sky-700 hover:bg-sky-700 text-sky-50': time.available && props.selectedTimes.includes(time.timestamp),
        'border-sky-800 text-sky-800 bg-white': currentCustomerBooking.bookingTime && currentCustomerBooking.bookingTime.includes(time.timestamp)
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

const TEN_MINUTES = 10 * 60 * 1000

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true
  },
  selectedTimes: {
    type: Array,
    required: true
  },
  timeCount: {
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

const emit = defineEmits(['update:selectedTimes'])

const store = useStore()

const reservedBookings = ref([])

const bookingHours = computed(() => config.bookingHours.map(toBookingHourInformation))

const bufferHours = computed(() => config.bufferHourMillis.map(h => props.selectedDate.getTime() + h))

const reservedTimes = computed(() => (reservedBookings.value || []).flatMap(b => b.bookingTime))

const toBookingHourInformation = (bookingHour, index) => {
  const date = new Date(props.selectedDate.getTime() + bookingHour)

  const notReservedYet = !reservedTimes.value.includes(date.getTime())
  const greaterThanCurrentTime = date.getTime() + TEN_MINUTES > new Date().getTime()

  return {
    timestamp: date.getTime(),
    text: ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
    available: notReservedYet && greaterThanCurrentTime,
    index
  }
}

const setSelectedTime = time => {
  if (!time.available) return

  if (bufferHours.value.includes(time.timestamp) && props.timeCount > 1) {
    store.dispatch('toastInfo', `We are taking a break after ${time.text}. Please choose another time`)
    return
  }

  /**
   * Ex: time -> 10.55
   * Ex: bookingHours -> [10.30, 10.55, 11.20, 11.45, 12.10]
   * Service type one -> timeCount: 1 | Service type two -> timeCount: 2
   * Expected reservingTime value
   * - service type one -> [10.55]
   * - service type two -> [10.55, 11.20]
   */
  const reservingTime = bookingHours.value.slice(time.index, props.timeCount + time.index)
    .filter(t => t.available)
    .map(t => t.timestamp)

  /**
   * If service type one -> reservingTime length should be 1
   * If service type two -> reservingTime length should be 2
   * If not then there's unavailable time
   */
  if (reservingTime.length < props.timeCount) {

    /**
     * Case: when service type is two and user select the last booking time
     */
    if (time.index === bookingHours.value.length - 1) {
      store.dispatch('toastInfo', 'No more session available after ' + time.text)
      return
    }

    store.dispatch('toastInfo', 'Time is not available, please choose another time')
    return
  }

  maybeSetSelectedTime(reservingTime)
}

const maybeSetSelectedTime = reservingTime => {
  store.commit('setIsLoading', true)
  store.dispatch('isBookingTimesAvailable', {
    payload: {
      timestamps: reservingTime
    },
    onSuccess: res => {
      store.commit('setIsLoading', false)
      const availabilities = res.map(r => r.data.data) || []

      if (availabilities.some(a => !a)) {
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        getReservedBookings()
      } else {
        emit('update:selectedTimes', reservingTime)
        props.onUpdateTimestamp()
      }
    },
    onFail: () => {
      store.commit('setIsLoading', false)
      store.dispatch('toastGeneralError')
    }
  })
}

const currentCustomerBooking = computed(() => reservedBookings.value.find(b => b.id === props.bookingId) || {})

const getReservedBookings = () => {
  store.dispatch('getReservedBookingTimes', {
    payload: {
      timestampDate: props.selectedDate.getTime()
    },
    onSuccess: res => {
      reservedBookings.value = res.data.data
      emit('update:selectedTimes', [])
    },
    onFail: () => {
      store.dispatch('toastGeneralError')
    }
  })
}

onMounted(getReservedBookings)

watch(() => props.selectedDate, getReservedBookings)
</script>
