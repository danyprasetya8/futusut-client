<template>
  <BaseLayout>
    <section
      v-if="service.id"
      class="flex flex-col px-6 xl:px-0 xl:w-2/3 xl:mx-auto my-5 xl:my-10"
    >
      <form
        class="flex flex-col xl:flex-row"
        @submit="pay"
      >
        <section class="grid grid-cols-4 gap-3 xl:w-7/12">
          <div class="text-2xl font-bold col-span-4">
            Fill out your details
          </div>
          <div class="my-3 h-0.5 bg-gray-200 w-full col-span-4" />

          <div class="col-span-4 xl:col-span-2">
            <div class="mb-3">
              Name
            </div>
            <div class="px-4 py-2 border border-gray-300 rounded-md">
              <input
                v-model="form.name"
                type="text"
                class="outline-none w-full"
                placeholder="Input your name"
              >
            </div>
            <div class="text-xs text-red-400 mt-2">
              {{ error.name }}
            </div>
          </div>

          <div class="col-span-4 xl:col-span-2">
            <div class="mb-3">
              Phone
            </div>
            <div class="px-4 py-2 border border-gray-300 rounded-md">
              <input
                v-model="form.phone"
                type="text"
                class="outline-none w-full"
                placeholder="Input your phone number"
                @keypress="numberInput"
              >
            </div>
            <div class="text-xs text-red-400 mt-2">
              {{ error.phone }}
            </div>
          </div>

          <div class="col-span-4">
            <div class="mb-3">
              Email
            </div>
            <div class="px-4 py-2 border border-gray-300 rounded-md">
              <input
                v-model="form.email"
                type="text"
                class="outline-none w-full"
                placeholder="Input your email"
              >
            </div>
            <div class="text-xs text-red-400 mt-2">
              {{ error.email }}
            </div>
          </div>

          <div class="col-span-4 xl:col-span-2">
            <div class="mb-3">
              Additional printed photo's
            </div>
            <Dropdown
              v-model:selectedItem="form.additionalPrintedPhotos"
              :items="ADDITIONAL_PRINTED_PHOTOS"
            />
          </div>

          <div class="col-span-4 xl:col-span-1">
            <div class="mb-3">
              Number of Pax
            </div>
            <Dropdown
              v-model:selectedItem="form.pax"
              :items="paxOptions"
            />
          </div>

          <div class="col-span-4 xl:col-span-1">
            <div class="mb-3">
              Backdrop
            </div>
            <Dropdown
              v-model:selectedItem="form.backdrop"
              :items="BACKDROP"
            />
          </div>

          <div class="col-span-4 mt-3 xl:mt-0">
            <input
              v-model="form.withSoftcopy"
              class="h-4 w-4 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top mr-2 cursor-pointer"
              id="checkbox"
              type="checkbox"
            >
            <label
              class="form-check-label inline-block text-gray-800"
              for="checkbox"
            >
              I want softcopy for my photo's
            </label>
          </div>

          <div class="col-span-4 mt-3">
            <div class="mb-3">
              Message
            </div>
            <div class="px-4 py-2 border border-gray-300 rounded-md">
              <textarea
                v-model="form.message"
                class="outline-none w-full"
                placeholder="Add additional message"
              />
            </div>
          </div>
        </section>

        <section class="xl:ml-6 xl:w-5/12 mt-12 xl:mt-0">
          <div class="text-2xl font-bold col-span-1">
            Booking Summary
          </div>
          <div class="my-6 h-0.5 bg-gray-200 w-full col-span-1" />

          <div class="px-4">
            <div class="text-xl font-semibold">
              {{ service.name }}
            </div>
            <div class="mt-1">
              {{ bookingTimeString }}
            </div>
            <div class="mt-1">
              {{ service.pax }} people
            </div>
            <div class="mt-1">
              {{ service.printedPhotos }} printed photo's
            </div>

            <div class="flex justify-between mt-4">
              <div>{{ service.name }}</div>
              <div>{{ numberFormatter(service.price, 'Rp.') }}</div>
            </div>

            <div v-if="addOnsInformation.length">
              <div
                v-for="addOn in addOnsInformation"
                :key="addOn.id"
                class="flex justify-between"
              >
                <div>
                  {{ addOn.name }}
                </div>
                <div>
                  {{ numberFormatter(addOn.total, 'Rp.') }}
                </div>
              </div>
            </div>

            <div class="my-3 h-0.5 bg-gray-700 w-full" />
            <div class="flex justify-between font-bold mt-4">
              <div>
                Total price:
              </div>
              <div>
                {{ numberFormatter(totalPrice, 'Rp.') }}
              </div>
            </div>

            <button
              type="submit"
              class="bg-sky-700 text-white py-2 mt-4 w-full"
            >
              Pay Now
            </button>
          </div>
        </section>
      </form>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import Dropdown from '@/components/Dropdown'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { numberInput } from '@/utils/number-input'
import { numberFormatter } from '@/utils/formatter'
import { isValidEmail } from '@/utils/validation'
import { formatDate, formatTime } from '@/utils/date'
import { useRouter } from 'vue-router'
import { popupCenter } from '@/utils/window'
import config from '@/constant/config'

const DATE_FORMAT = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const ADDITIONAL_PRINTED_PHOTOS = Array.from({ length: 11 }, (_, i) => i)

const BACKDROP = config.addOns.backdrop

const router = useRouter()
const store = useStore()

const service = ref({})
const addOns = ref([])
const paxOptions = ref([])
const bookingInfo = ref({})

const form = ref({
  email: '',
  message: '',
  name: '',
  phone: '',
  pax: '',
  additionalPrintedPhotos: '',
  backdrop: {},
  withSoftcopy: false
})
const error = ref({
  email: '',
  name: '',
  phone: ''
})

const currentBook = computed(() => store.getters.currentBook || {})

const totalServiceDurationMillis = computed(() => {
  const { photoSession, photoSelection } = service.value.duration
  return (photoSession + photoSelection) * 60 * 1000
})

const bookingTimeString = computed(() => {
  const first = currentBook.value.bookingTime[0]
  return `${formatDate(first, DATE_FORMAT)}
      ${formatTime(first)} - ${formatTime(first + totalServiceDurationMillis.value)}`
})

const personAddOns = computed(() => addOns.value.find(a => a.id === 'people'))
const softcopyAddOns = computed(() => addOns.value.find(a => a.id === 'softcopy'))
const printedPhotosAddOns = computed(() => addOns.value.find(a => a.id === 'printedPhotos'))

const softcopyAdditionalPrice = computed(() => ({
  id: softcopyAddOns.value.id,
  total: +form.value.withSoftcopy ? softcopyAddOns.value.price : 0
}))

const printedPhotosAdditionalPrice = computed(() => ({
  id: printedPhotosAddOns.value.id,
  total: +form.value.additionalPrintedPhotos * printedPhotosAddOns.value.price
}))

const paxAdditionalPrice = computed(() => {
  let multiplier = 0
  if (+form.value.pax > service.value.pax) {
    multiplier = +form.value.pax - service.value.pax
  }
  return {
    id: personAddOns.value.id,
    total: multiplier * personAddOns.value.price
  }
})

const totalPrice = computed(() => {
  return [service.value.price, softcopyAdditionalPrice.value.total, printedPhotosAdditionalPrice.value.total, paxAdditionalPrice.value.total]
    .reduce((accumulator, current) => accumulator + current, 0)
})

const addOnsInformation = computed(() => {
  return [softcopyAdditionalPrice.value, printedPhotosAdditionalPrice.value, paxAdditionalPrice.value]
    .filter(x => x.total)
    .map(x => ({
      ...addOns.value.find(a => a.id === x.id),
      ...x
    }))
})

const isValidForm = () => {
  if (!isValidEmail(form.value.email)) {
    error.value.email = 'Must be valid email'
  }

  Object.keys(error.value).forEach(key => {
    if (!form.value[key]) {
      error.value[key] = 'Must be filled' 
    }
  })

  return !Object.keys(error.value)
    .filter(e => error.value[e])
    .length
}

const cleanErrors = () => {
  Object.keys(error.value).forEach(e => {
    error.value[e] = ''
  })
}

const getService = () => {
  store.dispatch('getService', {
    payload: {
      serviceId: currentBook.value.serviceId
    },
    onSuccess: res => {
      service.value = res.data.data
      paxOptions.value = Array.from({ length: 8 }, (_, i) => i + 1)
      form.value.pax = paxOptions.value[0]
    }
  })
}

const getServiceAddOns = () => {
  store.dispatch('getServiceAddOns', {
    onSuccess: res => {
      addOns.value = res.data.data
    }
  })
}

const pay = e => {
  e.preventDefault()
  cleanErrors()

  if (isValidForm()) {
    store.commit('setIsLoading', true)
    store.dispatch('isBookingTimesAvailable', {
      payload: {
        timestamp: currentBook.value.bookingTime
      },
      onSuccess: getBookingTimeAvailabilityOnSuccess,
      onFail: () => {
        store.dispatch('toastGeneralError')
        store.commit('setIsLoading', false)
      }
    })
  } else {
    scrollToTop()
  }
}

const getBookingTimeAvailabilityOnSuccess = res => {
  store.commit('setIsLoading', false)
  const availabilities = res.map(r => r.data.data) || []

  if (availabilities.some(a => !a)) {
    store.dispatch('toastError', 'Time is not available, please choose another time')
    router.push({
      name: 'BookTime',
      params: {
        serviceId: currentBook.value.serviceId
      }
    })
  } else {
    createBooking()
  }
}

const createBooking = () => {
  const {
    email,
    message,
    name,
    phone,
    pax,
    additionalPrintedPhotos,
    backdrop = {},
    withSoftcopy
  } = form.value

  store.dispatch('createBooking', {
    payload: {
      email,
      message,
      name,
      phone,
      pax: +pax,
      additionalPrintedPhotos: +additionalPrintedPhotos,
      backdrop: backdrop.id,
      withSoftcopy,
      serviceId: currentBook.value.serviceId,
      bookingDate: currentBook.value.bookingDate,
      bookingTime: currentBook.value.bookingTime,
      totalPrice: totalPrice.value
    },
    onSuccess: createBookingOnSuccess
  })
}

const createBookingOnSuccess = res => {
  bookingInfo.value = res.data.data
  popupCenter({
    url: bookingInfo.value.paymentUrl,
    title: 'Futusut payment',
    w: 800,
    h: 1000
  })
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const beforeUnloadCallback = e => {
  e.preventDefault()
  e.returnValue = ''
}

onMounted(() => {
  if (!currentBook.value.serviceId) {
    router.push(config.page.bookOnline)
    return
  }
  window.addEventListener('beforeunload', beforeUnloadCallback)
  scrollToTop()
  getService()
  getServiceAddOns()
  form.value.backdrop = BACKDROP[0]
  form.value.additionalPrintedPhotos = ADDITIONAL_PRINTED_PHOTOS[0]
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeUnloadCallback)
})
</script>
