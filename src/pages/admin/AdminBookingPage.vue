<template>
  <BaseAdminLayout>
    <section class="my-2 mx-8">
      <section class="mt-6 flex flex-col">
        <div class="flex items-center justify-between">
          <div class="flex">
            <button
              v-for="status in STATUSES"
              :key="status.id"
              type="button"
              :class="{
                'py-2 mr-10 cursor-pointer text-sky-800 font-semibold border-b-4 border-transparent transition duration-150 ease-linear': true,
                'border-sky-800': status.id === selectedTab.id
              }"
              @click="setSelectedTab(status)"
            >
              {{ status.value }}
            </button>
          </div>
          <div class="flex border border-gray-300 px-3 py-2 mt-6 xl:mt-0 rounded-md xl:w-1/4">
            <SearchIcon class="w-7 mr-3 text-gray-500" />
            <input
              :value="searchKeyword"
              type="text"
              class="outline-none w-full"
              @input="e => debounce(() => setSearchKeyword(e.target.value), 300, 'search')"
            >
          </div>
        </div>

        <section class="my-7">
          <Table
            :headers="TABLE_HEADERS"
            :items="computeBookings"
          >
            <template #openDetail="{ item }">
              <RouterLink :to="{
                name: 'AdminBookingDetail',
                params: { id: item.id }
              }">
                <ExternalLinkIcon class="w-5 text-sky-600 cursor-pointer"/>
              </RouterLink>
            </template>
          </Table>
        </section>

        <Pagination
          v-model:currentPage="currentPage"
          :totalPage="totalPage"
          class="ml-auto"
        />
      </section>
    </section>
  </BaseAdminLayout>
</template>

<script setup>
import BaseAdminLayout from '@/components/admin/BaseAdminLayout'
import { ExternalLinkIcon, SearchIcon } from '@heroicons/vue/solid'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Pagination from '@/components/admin/Pagination'
import Table from '@/components/admin/Table'
import config from '@/constant/config'
import debounce from '@/utils/debouncer'

const STATUSES = Object.entries(config.paymentStatus).map(([id, value]) => ({ id, value }))
STATUSES.unshift({
  id: 'ALL',
  value: 'All'
})

const TABLE_HEADERS = [
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Email',
    value: 'email'
  },
  {
    text: 'Phone',
    value: 'phone'
  },
  {
    text: 'Service',
    value: 'serviceId'
  },
  {
    text: 'Time',
    value: 'bookingTime',
    date: true
  },
  {
    text: 'Total price',
    value: 'totalPrice',
    currency: true
  },
  {
    text: 'Payment status',
    value: 'paymentStatus'
  },
  {
    text: '',
    value: 'openDetail',
    slot: true
  }
]

const store = useStore()

const searchKeyword = ref('')
const selectedTab = ref(STATUSES[0])
const currentPage = ref(1)
const totalPage = ref(0)
const bookings = ref([])

const computeBookings = computed(() => bookings.value.map(booking => ({
  ...booking,
  paymentStatus: config.paymentStatus[booking.paymentStatus]
})))

const setSelectedTab = status => {
  selectedTab.value = status
}

const getBookingList = page => store.dispatch('getBookingList', {
  payload: {
    page,
    keyword: searchKeyword.value,
    ...(selectedTab.value.id !== 'ALL' && { status: selectedTab.value.id }),
    size: 10
  },
  onSuccess: res => {
    const { data, paging } = res.data
    bookings.value = data
    totalPage.value = paging.totalPage
    currentPage.value = paging.page
  }
})

const setSearchKeyword = keyword => {
  searchKeyword.value = keyword
}

onMounted(() => {
  getBookingList(1)
})

watch(currentPage, () => getBookingList(currentPage.value))
watch([selectedTab, searchKeyword], () => getBookingList(1))
</script>
