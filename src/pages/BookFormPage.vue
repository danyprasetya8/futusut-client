<template>
  <BaseLayout>
    <section
      v-if="service.id"
      class="flex flex-col px-6 xl:px-0 xl:w-2/3 mx-auto my-10"
    >
      <form
        class="flex"
        @submit="pay"
      >
        <section class="grid grid-cols-4 gap-3 w-7/12">
          <div class="text-2xl font-bold col-span-4">
            Fill out your details
          </div>
          <div class="my-3 h-0.5 bg-gray-200 w-full col-span-4" />

          <div class="col-span-2 xl:col-span-2">
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

          <div class="col-span-2 xl:col-span-2">
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

          <div class="col-span-2 xl:col-span-2">
            <div class="mb-3">
              Additional printed photo's
            </div>
            <div class="px-4 py-2 border border-gray-300 rounded-md">
              <input
                v-model="form.additionalPrintedPhotos"
                type="text"
                class="outline-none w-full"
                @keypress="numberInput"
              >
            </div>
          </div>

          <div class="col-span-2 xl:col-span-1">
            <div class="mb-3">
              Number of Pax
            </div>
            <Dropdown
              v-model:selectedItem="form.pax"
              :items="paxOptions"
            />
          </div>

          <div class="col-span-2 xl:col-span-1">
            <div class="mb-3">
              Backdrop
            </div>
            <Dropdown
              v-model:selectedItem="form.backdrop"
              :items="BACKDROP"
            />
          </div>

          <div class="col-span-4">
            <input
              v-model="form.withSoftcopy"
              class="h-4 w-4 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top mr-2 cursor-pointer"
              id="checkbox"
              type="checkbox"
              value=""
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

        <section class="ml-6 w-5/12">
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
              {{ service.pax }} person
            </div>
            <div class="mt-1">
              {{ service.printedPhotos }} printed photo's
            </div>

            <div
              v-if="addOnsInformation.length"
              class="mt-4"
            >
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

              <div class="my-3 h-0.5 bg-gray-700 w-full" />
            </div>

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
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { numberInput } from '@/utils/number-input'
import { numberFormatter } from '@/utils/formatter'
// import { useRouter } from 'vue-router'
// import config from '@/constant/config'

const BACKDROP = [
  {
    id: 'GRAY',
    value: 'Gray'
  },
  {
    id: 'WHITE',
    value: 'White'
  },
  {
    id: 'BLACK',
    value: 'Black'
  }
]

// const router = useRouter()
const store = useStore()

const service = ref({})
const addOns = ref([])
const paxOptions = ref([])

const form = ref({
  email: '',
  message: '',
  name: '',
  phone: '',
  pax: '',
  additionalPrintedPhotos: '0',
  backdrop: {},
  withSoftcopy: false
})
const error = ref({
  email: '',
  name: '',
  phone: ''
})

const currentBook = computed(() => store.getters.currentBook || {})
const bookingTimeString = computed(() => new Date(currentBook.value.bookingTime).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}))

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
  const multiplier = +form.value.pax - service.value.pax
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

const getService = () => {
  store.dispatch('getService', {
    payload: {
      serviceId: currentBook.value.serviceId
    },
    onSuccess: res => {
      service.value = res.data.data
      paxOptions.value = Array.from({ length: 9 - service.value.pax }, (_, i) => service.value.pax + i)
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
  console.log(form.value)
}

onMounted(() => {
  // if (!currentBook.value.serviceId) {
    // router.push(config.page.bookOnline)
  //   return
  // }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  getService()
  getServiceAddOns()
  form.value.backdrop = BACKDROP[0]
})
</script>