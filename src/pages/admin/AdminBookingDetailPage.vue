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
        {{ formatDate(bookingDetail.bookingTime) }}
      </div>

      <section class="flex">
        <div class="w-1/2">
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
          <button
            v-if="isAvailableForReschedule"
            class="mt-4 text-sky-800"
            type="button"
            @click="visibleRescheduleSection = true"
          >
            Reschedule booking
          </button>
        </div>
        <div class="w-1/2">
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

      <section
        v-if="visibleRescheduleSection"
        class="mt-12 flex"
      >
        <Calendar
          :max-date="maxDate"
          :min-date="minDate"
          :attributes="attributes"
          @dayclick="onDayClick"
        />

        <TimeSelection
          v-model:selectedTime="selectedTime"
          :key="refreshTimeSelection"
          :selectedDate="selectedDate"
          class="mx-4 w-1/2"
        />

        <section>
          <div class="text-2xl font-bold mb-3">
            Change schedule
          </div>
          <div>
            <div>From:</div>
            {{ formatDate(bookingDetail.bookingTime) }}
          </div>
          <div
            v-if="selectedTime"
            class="mt-2"
          >
            <div>To:</div>
            {{ formatDate(selectedTime) }}
          </div>
          <button
            type="button"
            :class="{
              'mt-5 text-center w-full py-2 text-white transition duration-150 ease-linear': true,
              'bg-sky-800 hover:bg-sky-700': selectedTime,
              'bg-gray-400 cursor-default': !selectedTime
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
    <div class="fixed top-1/2 left-1/2 w-1/3 p-6 bg-white rounded transform -translate-x-1/2 -translate-y-1/2 flex flex-col z-20">
      <div class="text-xl font-bold mb-2">
        Reschedule confirmation
      </div>
      <div class="mb-10">
        Are you sure to change booking time from {{ formatDate(bookingDetail.bookingTime) }} to {{ formatDate(selectedTime) }}?
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

<script setup>
import BaseAdminLayout from '@/components/admin/BaseAdminLayout'
import { Calendar } from 'v-calendar'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { numberFormatter } from '@/utils/formatter'
import { formatDate, getIncrementedDate, setStartOfDay } from '@/utils/date'
import TimeSelection from '@/components/TimeSelection'
import config from '@/constant/config'

const route = useRoute()
const router = useRouter()
const store = useStore()

const bookingDetail = ref({})
const service = ref({})
const visibleRescheduleSection = ref(false)
const selectedDate = ref(null)
const selectedTime = ref(0)
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
  const currentDate = new Date().getTime()
  return bookingDetail.value.paymentStatus === 'PAID' && bookingDetail.value.bookingTime > currentDate
})

const onDayClick = day => {
  const startOfDay = setStartOfDay(day.date)

  if (startOfDay.getTime() >= minDate.value.getTime() && startOfDay.getTime() <= maxDate.value.getTime()) {
    selectedDate.value = day.date
    selectedTime.value = 0
  }
}

const confirmReschedule = () => {
  if (!selectedTime.value) return
  visibleRescheduleConfirmationModal.value = true
}

const doReschedule = () => {
  store.commit('setIsLoading', true)
  store.dispatch('isBookingTimeAvailable', {
    payload: {
      timestamp: selectedTime.value
    },
    onSuccess: res => {
      const { data } = res.data
      if (data) {
        rescheduleBooking()
      } else {
        store.commit('setIsLoading', false)
        store.dispatch('toastInfo', 'Time is not available, please choose another time')
        refreshTimeSelection.value++
        visibleRescheduleConfirmationModal.value = false
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
      bookingTime: selectedTime.value
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
