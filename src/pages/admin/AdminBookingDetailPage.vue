<template>
  <BaseAdminLayout>
    <section
      v-if="bookingDetail.id"
      class="m-8"
    >
      <div class="text-2xl font-bold">
        {{ service.name }}
      </div>
      <div>
        {{ bookingTimeString }}
      </div>

      <section class="flex flex-col xl:flex-row">
        <div class="xl:w-1/2">
          <div class="mt-4">
            <div>Name:</div>
            {{ bookingDetail.name }}
          </div>

          <div class="mt-4">
            <div>Email:</div>
            {{ bookingDetail.email }}
          </div>

          <div class="mt-4">
            <div>Phone number:</div>
            {{ bookingDetail.phone }}
          </div>

          <div class="mt-4">
            <div>Additional Message:</div>
            {{ bookingDetail.message }}
          </div>

          <div class="mt-4">
            <div>Booking created at:</div>
            {{ formatDate(bookingDetail.createdDate) }}
          </div>
        </div>

        <div class="xl:w-1/2">
          <div class="mt-4">
            <div>Payment status:</div>
            <div class="font-semibold">
              {{ config.paymentStatus[bookingDetail.paymentStatus] }}
            </div>
          </div>

          <div class="mt-4">
            <div>Number of pax:</div>
            {{ bookingDetail.pax }}
          </div>

          <div class="mt-4">
            <div>Backdrop:</div>
            {{ backdrop.value }}
          </div>

          <div
            v-if="addOns.length"
            class="mt-4"
          >
            <div>Add ons:</div>
            <ul>
              <li
                v-for="(addOn, i) in addOns"
                :key="i"
                class="list-disc"
              >
                <div class="flex">
                  <div>
                    {{ addOn.text }} &nbsp;
                  </div>
                  <div>{{ addOn.value }}</div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-4 font-bold">
            <div>Total price:</div>
            {{ numberFormatter(bookingDetail.totalPrice, 'Rp.') }}
          </div>
        </div>
      </section>

      <button
        v-if="isAvailableForReschedule"
        class="mt-4 text-sky-800"
        type="button"
        @click="setVisibleRescheduleSection"
      >
        Reschedule booking
      </button>

      <div :ref="el => rescheduleSectionEl = el" />
      <section
        v-if="visibleRescheduleSection"
        class="mt-12 flex flex-col xl:flex-row items-center xl:items-start"
      >
        <Calendar
          :max-date="maxDate"
          :min-date="minDate"
          :attributes="attributes"
          @dayclick="onDayClick"
        />

        <TimeSelection
          v-model:selectedTimes="selectedTimes"
          :key="refreshTimeSelection"
          :selectedDate="selectedDate"
          :timeCount="service.time"
          :bookingId="bookingDetail.id"
          class="xl:mx-4 xl:w-1/2 mt-6 xl:mt-0"
        />

        <section class="self-start w-full xl:w-1/3">
          <div class="text-2xl font-bold mb-3 mt-4 xl:mt-0">
            Change schedule
          </div>
          <div>
            <div>From:</div>
            {{ bookingTimeString }}
          </div>
          <div
            v-if="selectedTimes.length"
            class="mt-2"
          >
            <div>To:</div>
            {{ selectedTimesString }}
          </div>
          <button
            type="button"
            :class="{
              'mt-5 text-center w-full py-2 text-white transition duration-150 ease-linear': true,
              'bg-sky-800 hover:bg-sky-700': selectedTimes.length,
              'bg-gray-400 cursor-default': !selectedTimes.length
            }"
            @click="confirmReschedule"
          >
            Reschedule
          </button>
        </section>
      </section>
    </section>
  </BaseAdminLayout>

  <div v-if="visibleRescheduleConfirmationModal">
    <div class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-20 z-10" />

    <div class="modal-container">
      <div class="text-xl font-bold mb-2">
        Reschedule confirmation
      </div>

      <div class="mb-10">
        Are you sure to change booking time from {{ bookingTimeString }} to {{ selectedTimesString }}?
      </div>

      <div class="ml-auto">
        <button
          type="button"
          class="mr-3 border border-sky-800 rounded text-sky-800 px-6 py-2 text-sm"
          @click="visibleRescheduleConfirmationModal = false"
        >
          Cancel
        </button>

        <button
          type="button"
          class="mr-3 border border-sky-800 bg-sky-800 rounded text-white px-6 py-2 text-sm"
          @click="doReschedule"
        >
          Reschedule
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  @apply fixed left-1/2 p-6 bg-white rounded transform -translate-x-1/2 flex flex-col z-20
    w-full xl:w-1/3 xl:top-1/2 bottom-0 xl:bottom-auto -translate-y-0 xl:-translate-y-1/2;
}
</style>

<script setup>
import BaseAdminLayout from '@/components/admin/BaseAdminLayout'
import { Calendar } from 'v-calendar'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { numberFormatter } from '@/utils/formatter'
import { formatDate, formatTime, getIncrementedDate, setStartOfDay } from '@/utils/date'
import TimeSelection from '@/components/TimeSelection'
import config from '@/constant/config'
import useResponsive from '@/composable/responsive'

const DATE_FORMAT = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const route = useRoute()
const router = useRouter()
const store = useStore()
const { isMobile } = useResponsive()

const bookingDetail = ref({})
const service = ref({})
const visibleRescheduleSection = ref(false)
const rescheduleSectionEl = ref(null)
const selectedDate = ref(null)
const selectedTimes = ref([])
const visibleRescheduleConfirmationModal = ref(false)
const refreshTimeSelection = ref(0)

const minDate = computed(() => getIncrementedDate(0))
const maxDate = computed(() => getIncrementedDate(14))

const attributes = computed(() => [
  {
    highlight: true,
    dates: selectedDate.value
  }
])

const serviceDuration = computed(() => service.value.duration || {})

const totalServiceDurationMillis = computed(() => {
  const { photoSession, photoSelection } = serviceDuration.value
  return (photoSession + photoSelection) * 60 * 1000
})

const firstBookingDetailTime = computed(() => bookingDetail.value.bookingTime[0] || 0)

const bookingTimeString = computed(() => {
  return `${formatDate(firstBookingDetailTime.value, DATE_FORMAT)}
      ${formatTime(firstBookingDetailTime.value)} - ${formatTime(firstBookingDetailTime.value + totalServiceDurationMillis.value)}`
})

const firstSelectedTime = computed(() => selectedTimes.value[0] || 0)

const selectedTimesString = computed(() => {
  return `${formatDate(firstSelectedTime.value, DATE_FORMAT)}
      ${formatTime(firstSelectedTime.value)} - ${formatTime(firstSelectedTime.value + totalServiceDurationMillis.value)}`
})

const backdrop = computed(() => config.addOns.backdrop.find(b => b.id === bookingDetail.value.backdrop))

const addOns = computed(() => [
    bookingDetail.value.pax > service.value.pax && {
      text: 'Additional pax:',
      value: bookingDetail.value.pax - service.value.pax
    },
    bookingDetail.value.additionalPrintedPhotos && bookingDetail.value.additionalPrintedPhotos > 0 && {
      text: 'Additional printed photos:',
      value: bookingDetail.value.additionalPrintedPhotos
    },
    bookingDetail.value.withSoftCopy && {
      text: 'Softcopy',
      value: ''
    }
  ]
  .filter(i => i)
)

const isAvailableForReschedule = computed(() => {
  return bookingDetail.value.paymentStatus === 'PAID' && firstBookingDetailTime.value > new Date().getTime()
})

const onDayClick = day => {
  const startOfDay = setStartOfDay(day.date)

  if (startOfDay.getTime() >= minDate.value.getTime() && startOfDay.getTime() <= maxDate.value.getTime()) {
    selectedDate.value = day.date
    selectedTimes.value = []
  }
}

const confirmReschedule = () => {
  if (!selectedTimes.value.length) return
  visibleRescheduleConfirmationModal.value = true
}

const setVisibleRescheduleSection = () => {
  if (visibleRescheduleSection.value) return
  visibleRescheduleSection.value = true
  if (isMobile) {
    setTimeout(() => {
      window.scrollTo({
        top: rescheduleSectionEl.value.getBoundingClientRect().top,
        behavior: 'smooth'
      })
    }, 100)
  }
}

const doReschedule = () => {
  store.commit('setIsLoading', true)
  store.dispatch('isBookingTimesAvailable', {
    payload: {
      timestamp: selectedTimes.value
    },
    onSuccess: res => {
      const availabilities = res.map(r => r.data.data) || []

      if (availabilities.some(a => !a)) {
        store.commit('setIsLoading', false)
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        refreshTimeSelection.value++
        visibleRescheduleConfirmationModal.value = false
      } else {
        rescheduleBooking()
      }
    },
    onFail: () => {
      store.commit('setIsLoading', false)
      store.dispatch('toastGeneralError')
    }
  })
}

const rescheduleBooking = () => {
  store.dispatch('rescheduleBooking', {
    payload: {
      bookingId: bookingDetail.value.id,
      bookingTime: selectedTimes.value
    },
    onSuccess: () => {
      router.push(config.page.adminBooking)
      store.dispatch('toastSuccess', 'Booking time updated')
    },
    onFail: () => {
      visibleRescheduleConfirmationModal.value = false
    }
  })
}

const getService = serviceId => store.dispatch('getService', {
  payload: { serviceId },
  onSuccess: res => {
    service.value = res.data.data
  }
})

onMounted(() => {
  store.dispatch('getBookingDetail', {
    payload: {
      bookingId: route.params.id
    },
    onSuccess: res => {
      bookingDetail.value = res.data.data
      getService(bookingDetail.value.serviceId)
    }
  })

  selectedDate.value = minDate.value
})
</script>
